using Organize.Shared.Contracts;
using Organize.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace Organize.DataAccess_WebAPI
{
    public class cItemCRUDwithWebAPI : IForItemCRUD
    {
        private readonly HttpClient _httpClient;

        public cItemCRUDwithWebAPI(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }


        public async Task DeleteTheseItemsAsync<TItem>(IEnumerable<TItem> items) where TItem : BaseItem
        {
            foreach (var item in items)
            {
                var requestUri = EntityRouteAssignments.DeleteEntityRouteAssignment[typeof(TItem)] + "/" + item.id;
                Console.WriteLine(requestUri);
                var response = await _httpClient.DeleteAsync(requestUri);
                await ThrowExceptionIfResponseIsNotSuccessfulAsync(response);
            }
        }

        async Task<IEnumerable<TItem>> IForItemCRUD.GetItemsBelongingToUserAsync<TItem>(int parentId)
        {
            var requestUri = EntityRouteAssignments.GetEntityRouteAssignment[typeof(TItem)];
            IList<TItem> list = await _httpClient.GetFromJsonAsync<IList<TItem>>(requestUri);
            return list.Where(thing => thing.ParentId == parentId);
        }

        public Task InitAsync()
        {
            return Task.FromResult(true);
        }

        async Task<int> IForItemCRUD.InsertThisItemAsync<TItem>(TItem item, int BelongsToUserId)
        {
            var requestUri = EntityRouteAssignments.PostEntityRouteAssignment[typeof(TItem)];
            if(item.ParentId == 123 && item.GetType() != typeof(ChildItem)) // expected test user id
            {
                requestUri = requestUri + "/TestItem";
            }
            if (item.GetType() == typeof(ChildItem) && BelongsToUserId != -2758) // expected test user id
            {
                requestUri = requestUri + "/TestItem";
            }
            var response = await _httpClient.PostAsJsonAsync<TItem>(requestUri, item);
            await ThrowExceptionIfResponseIsNotSuccessfulAsync(response);
            var strID = await response.Content.ReadAsStringAsync(); // Content. is only available on await'd values

            return Convert.ToInt32(strID); // the new autoincremented row id for the entity
        }

        async Task IForItemCRUD.UpdateThisItemAsync<TItem>(TItem item, int BelongsToUserId)
        {
            try
            {
                var requestUri = EntityRouteAssignments.PutEntityRouteAssignment[typeof(TItem)];
                if (item.ParentId == 123 && item.GetType() != typeof(ChildItem)) // expected test user id
                {
                    requestUri = requestUri + "/TestItem";
                }
                if (item.GetType() == typeof(ChildItem) && BelongsToUserId != -2758) // expected test user id
                {
                    requestUri = requestUri + "/TestItem";
                }
                var response = await _httpClient.PutAsJsonAsync<TItem>(requestUri, item);
                await ThrowExceptionIfResponseIsNotSuccessfulAsync(response);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message + " while executing WebAPI UpdateThisItemAsync");
                if (!(ex.InnerException == null))
                {
                    Console.WriteLine(ex.InnerException.Message.ToString());
                }
                throw;
            }
        }

        public async Task<string> ClearAllItems()
        {
            var requestUri = "api/items/clear";
            //HttpRequestMessage hrm = new HttpRequestMessage();
            //hrm.Content = JsonContent.Create(requestUri);
            //await hrm.Content.LoadIntoBufferAsync();
            //var response = await _httpClient.SendAsync(hrm);
            var response = await _httpClient.PostAsync(requestUri, null);
            await ThrowExceptionIfResponseIsNotSuccessfulAsync(response);
            var msgString = await response.Content.ReadAsStringAsync();

            return msgString;
        }


        public async Task<string> ClearTestItems(clsUser aTestUser)
        {
            var requestUri = "api/items/clearTest";
            HttpRequestMessage hrm = new HttpRequestMessage();
            hrm.Content = JsonContent.Create(aTestUser);
            await hrm.Content.LoadIntoBufferAsync();

            var response = await _httpClient.PostAsync(requestUri, hrm.Content);
            await ThrowExceptionIfResponseIsNotSuccessfulAsync(response);
            var msgString = await response.Content.ReadAsStringAsync();

            return msgString;
        }

        private async Task ThrowExceptionIfResponseIsNotSuccessfulAsync(HttpResponseMessage responseMessage)
        {
            if (!responseMessage.IsSuccessStatusCode)
            {
                var errorMessage = await TryToGetMessageAsync(responseMessage);
                throw new Exception(errorMessage.Message);
            }
        }

        private async Task<ErrorMessage> TryToGetMessageAsync(HttpResponseMessage responseMessage)
        {
            try
            {
                return await responseMessage.Content.ReadFromJsonAsync<ErrorMessage>();
            }
            catch (Exception ex)
            {
                string strInner = (ex.InnerException == null) ? "" : " | " + ex.InnerException.ToString();
                return new ErrorMessage { Message = "Unknown Error (" + ex.Message + strInner + ")" };
            }
        }
    }
}
