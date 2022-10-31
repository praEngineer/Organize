using Microsoft.AspNetCore.Components;
using Organize.Shared.Contracts;
using Organize.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Organize.WASM.Components
{
    public partial class ChildItemEdit : ComponentBase
    {
        [Inject]
        private IForItemsManager anItemManager { get; set; }
        // Organize.Business cItemsManager was initialized because it implements IForItemsManager as spec'd in Program.cs so just inject to make use of it

        [Parameter]
        public cParentItem ParentItem { get; set; } // changing from ParentItem to itsParentItem breaks the Parent / Child item editor



        private async Task AddNewChildToParentAsync()
        {
            await anItemManager.CreateNewChildItemAndAddItToParentItemAsync(ParentItem); // in the Organize.Business project
        }

        private async void OnChildItemTitleChanged(ChildItem aChildItem,ChangeEventArgs eventArgs)
        {
            aChildItem.Title = eventArgs.Value.ToString();
            await anItemManager.UpdateAsync(aChildItem);
        }
    }
}
