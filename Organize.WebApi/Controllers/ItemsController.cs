using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Organize.Shared.Entities;
using Organize.Shared.Enums;
using Organize.Business_TestFake;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace Organize.Persistence_WebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private static readonly IList<BaseItem> WebAPI_Items; // Can be any of four: TextItem, UrlItem, ParentItem, ChildItem

        static ItemsController()
        {
            // initialize the pseudo database table
            WebAPI_Items = cTestUserAndItemData.TestUser.itemsBelongingToUserId.ToList();
            var childItems = WebAPI_Items.OfType<ParentItem>().SelectMany(p => p.ChildItems).ToList();
            foreach (var childItem in childItems)
            {
                WebAPI_Items.Add(childItem);
            }
        }

        public void Options() { }

        [HttpPost("clearTest")]
        [AllowAnonymous] // blocks authentication logic so anyone can try to sign-in
        public IActionResult ClearTestItems(JObject itemAsJson)
        {
            try
            {
                var aTestUser = itemAsJson.ToObject<clsUser>();
                var TestUser_Items = aTestUser.itemsBelongingToUserId.ToList();
                var childItems = TestUser_Items.OfType<ParentItem>().SelectMany(p => p.ChildItems).ToList();
                foreach (var childItem in childItems)
                {
                    WebAPI_Items.Remove(childItem);
                }

                foreach (var item in TestUser_Items)
                {
                    WebAPI_Items.Remove(item);
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("clear")]
        [AllowAnonymous] // blocks authentication logic so anyone can try to sign-in
        public IActionResult ClearItems()
        {
            WebAPI_Items.Clear();
            return Ok("item list cleared");
        }

        [HttpGet]
        public IActionResult Get([FromQuery]int type) // int 'type' has to match one in ItemTypeEnum
        {
            try
            {
                var idDerivedFromJWT = int.Parse(Request.HttpContext.User.FindFirst("id").Value); // clsUser id is buried in the Request header JWT
                var typeEnum = (ItemTypeEnum) type;

                if(typeEnum == ItemTypeEnum.Child) // special handling for ChildItem type
                {
                    var parentItemsIds = WebAPI_Items
                        .Where(i => i.ParentId == idDerivedFromJWT && i.ItemTypeEnum == ItemTypeEnum.Parent)
                        .Select(i => i.id)
                        .ToList();
                    return Ok(WebAPI_Items.Where(i => parentItemsIds.Contains(i.ParentId) && i.ItemTypeEnum == typeEnum));
                }

                // more typically ...
                return Ok(WebAPI_Items.Where(i => i.ParentId == idDerivedFromJWT && i.ItemTypeEnum == typeEnum)); // users do not necessarily have all item types so 'nothing' returned is expected
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message + " trying to retrieve an unrecognized item type: " + type.ToString());
            }
        }

        [HttpPost]
        public IActionResult Post(JObject itemAsJson)
        {
            var newCreatedItem = CreateItem(itemAsJson);
            var newId = WebAPI_Items.Count == 0
                ? 1
                : WebAPI_Items.Max(i => i.id) + 1;
            newCreatedItem.id = newId;
            WebAPI_Items.Add(newCreatedItem);
            return Created(string.Empty,newCreatedItem.id);
        }

        [HttpPost("TestItem")]
        [AllowAnonymous] // blocks authentication logic so test data can be loaded
        public IActionResult PostTestItem(JObject itemAsJson)
        {
            var newCreatedItem = CreateItem(itemAsJson);
            var newId = WebAPI_Items.Count == 0
                ? 1
                : WebAPI_Items.Max(i => i.id) + 1;
            newCreatedItem.id = newId;
            WebAPI_Items.Add(newCreatedItem);
            return Created(string.Empty, newCreatedItem.id);
        }

        private BaseItem CreateItem(JObject itemAsJson)
        {
            var asBaseItem = itemAsJson.ToObject<BaseItem>();

            BaseItem newCreatedItem = new BaseItem();
            switch (asBaseItem.ItemTypeEnum)
            {
                case ItemTypeEnum.Text:
                    newCreatedItem = itemAsJson.ToObject<TextItem>();
                    break;
                case ItemTypeEnum.Url:
                    newCreatedItem = itemAsJson.ToObject<UrlItem>();
                    break;
                case ItemTypeEnum.Parent:
                    newCreatedItem = itemAsJson.ToObject<ParentItem>();
                    break;
                case ItemTypeEnum.Child:
                    newCreatedItem = itemAsJson.ToObject<ChildItem>();
                    break;
            }

            return newCreatedItem;
        }


        [HttpPut]
        public IActionResult Put([FromBody]JObject itemAsJson)
        {
            var updatedItem = CreateItem(itemAsJson);
            var itemInList = WebAPI_Items.FirstOrDefault(i => i.id == updatedItem.id);

            if(itemInList == null)
            {
                return BadRequest("Item not found");
            }

            var index = WebAPI_Items.IndexOf(itemInList);
            WebAPI_Items[index] = updatedItem;

            return Ok();
        }

        [HttpPut("TestItem")]
        [AllowAnonymous] // blocks authentication logic so test data can be loaded
        public IActionResult PutTestItem([FromBody] JObject itemAsJson)
        {
            var updatedItem = CreateItem(itemAsJson);
            var itemInList = WebAPI_Items.FirstOrDefault(i => i.id == updatedItem.id);

            if (itemInList == null)
            {
                return BadRequest("Item not found");
            }

            var index = WebAPI_Items.IndexOf(itemInList);
            WebAPI_Items[index] = updatedItem;

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var item = WebAPI_Items.FirstOrDefault(i => i.id == id);
            if(item == null)
            {
                return BadRequest("No item with id found");
            }

            WebAPI_Items.Remove(item);
            return Ok();
        }
    }
}
