using Organize.Shared.Contracts;
using Organize.Shared.Entities;
using Organize.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Organize.DataAccess_Other
{
    public class cItemCRUDwithOther : IForItemCRUD
    {
        private IPersistenceService _persistenceService;

        public cItemCRUDwithOther(IPersistenceService persistenceService) // C# dependency injection
        { // constructor used by ???
            _persistenceService = persistenceService;
        }

        public async Task DeleteTheseItemsAsync<TItem>(IEnumerable<TItem> items) where TItem : BaseItem
        {
            foreach(var item in items)
            {
                await _persistenceService.DeleteAsync<TItem>(item);
            }
        }

        public async Task<IEnumerable<TItem>> GetItemsBelongingToUserAsync<TItem>(int theIDOfCurrentUser) where TItem : BaseItem 
        {// TItem is a placeholder type that has to implement BaseItem which has a ParentId property. Must be either TextItem, UrlItem, ParentItem, or ChildItem
            // user accounts/profiles in 'organize' of IndexedDB has its own CRUD

            return await _persistenceService.GetAsync<TItem>(i => i.ParentId == theIDOfCurrentUser); // extract TItems that have the ParentID matching the User ID
        }

        public async Task<int> InsertThisItemAsync<TItem>(TItem item, int BelongsToThisUserId = -2758) where TItem : BaseItem  // Item is not a User; Items are attached to one of the user properties
        {
            try
            {
                return await  _persistenceService.InsertAsync<TItem>(item); // return the id created by the autoincrement process in IndexedDB
                // the id sent was replaced by the IndexedDB autoincrement id value for the store/table for the item
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message + " while executing InsertThisItemAsync");
                if (!(ex.InnerException == null))
                {
                    Console.WriteLine(ex.InnerException.Message.ToString());
                }
                throw;
            }
        }

        public Task UpdateThisItemAsync<TItem>(TItem item, int BelongsToThisUserId = -2758) where TItem : BaseItem
        {
            return _persistenceService.UpdateAsync<TItem>(item); // UpdateAsync returns a Task 
        }

        Task<string> IForItemCRUD.ClearAllItems()
        {

            throw new NotImplementedException();
        }

        async Task<string> IForItemCRUD.ClearTestItems(clsUser aTestUser)
        {
            try
            {

                var textItems = await GetItemsBelongingToUserAsync<TextItem>(aTestUser.id); // objUser.Id is the same as parent.Id of the items

                var urlItems = await GetItemsBelongingToUserAsync<UrlItem>(aTestUser.id);

                var parentItems = await GetItemsBelongingToUserAsync<cParentItem>(aTestUser.id);

                var parentItemsList = parentItems.ToList();

                foreach (var parentItem in parentItemsList)
                {
                    var childItems = await GetItemsBelongingToUserAsync<ChildItem>(parentItem.id);
                    await DeleteTheseItemsAsync(childItems);
                }

                await DeleteTheseItemsAsync(parentItemsList);
                await DeleteTheseItemsAsync(textItems.OfType<TextItem>());
                await DeleteTheseItemsAsync(urlItems.OfType<UrlItem>());

                return "Test items removed";
            }
            catch (Exception ex)
            {
                return ("Test items not removed because " + ex.Message);
            }
        }
    }
}
