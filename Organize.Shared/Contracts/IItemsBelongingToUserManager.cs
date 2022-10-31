using Organize.Shared.Entities;
using Organize.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Organize.Shared.Contracts
{
    public interface IForItemsManager
    {
        Task RetrieveAllItemsAssociatedWithGivenUserAsync(IforUser objUser);


        Task<ChildItem> CreateNewChildItemAndAddItToParentItemAsync(cParentItem parent);

        Task<BaseItem> CreateNewUserItemAndAddItToUserAsync(IforUser objUser, ItemTypeEnum typeTextUrlParent);

        Task UpdateAsync<T>(T item) where T : BaseItem;

        Task DeleteAllDoneAsync(IforUser objUser);
    }
}
