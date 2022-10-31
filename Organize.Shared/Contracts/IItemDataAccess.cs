using Organize.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Organize.Shared.Contracts
{
    public interface IForItemCRUD
    {
        public Task<IEnumerable<TItem>> GetItemsBelongingToUserAsync<TItem>(int parentId) where TItem : BaseItem;
        public Task<int> InsertThisItemAsync<TItem>(TItem item, int BelongsToUserId = -2758) where TItem : BaseItem;
        public Task UpdateThisItemAsync<TItem>(TItem item, int BelongsToUserId = -2758) where TItem : BaseItem;
        public Task DeleteTheseItemsAsync<TItem>(IEnumerable<TItem> items) where TItem : BaseItem;
        Task<string> ClearAllItems();
        Task<string> ClearTestItems(clsUser aTestUser);
    }
}
