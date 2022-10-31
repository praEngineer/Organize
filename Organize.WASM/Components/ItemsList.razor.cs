using Microsoft.AspNetCore.Components;
using Organize.Shared.Contracts;
using Organize.Shared.Entities;
using Organize.WASM.ItemEdit;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.ComponentModel;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace Organize.WASM.Components
{
    public partial class ItemsList : ComponentBase, IDisposable
    {
        [Inject]
        private ICurrentUserService theScopedCurrentUserService { get; set; }

        [Inject]
        private IForItemsManager theScopedItemManager { get; set; }


        [Inject]
        private NavigationManager NM { get; set; }

        //[Inject]
        //private ItemEditService ItemEditService { get; set; }

        protected ObservableCollection<BaseItem> colOfItemsForOneUserId { get; set; } = new ObservableCollection<BaseItem>();
        // When first requested, the object properties are blank awaiting inclusion in the list of items for the current user.
        // Observable allows a trigger-function to capture changes in the list of BaseItems.

        protected override async void OnInitialized()
        {
            await base.OnInitializedAsync();

            Console.WriteLine("Initialize ItemsList");

            await theScopedItemManager.RetrieveAllItemsAssociatedWithGivenUserAsync(theScopedCurrentUserService.cCurrentUser); // populates current user's list of items, ItemsBelongingToUserId

            colOfItemsForOneUserId = theScopedCurrentUserService.cCurrentUser.itemsBelongingToUserId; // gather and present items associated with the current user
            colOfItemsForOneUserId.CollectionChanged += HandleUserItemsCollectionChanged; // next time the collection changes, redraw the UI
            theScopedCurrentUserService.cCurrentUser.PropertyChanged += HandleUserPropertyChanged; // when a different user logs in then execute ' HandleUserProperyChanged ' method
            StateHasChanged(); // force a UI redraw added by Farkas 29Sep2022 to get initial screen draw
        }

        private void HandleUserPropertyChanged(object sender, PropertyChangedEventArgs e)
        {
            if(e.PropertyName.Equals(nameof(clsUser.itemsBelongingToUserId)))
            {
                if(colOfItemsForOneUserId != null) { 
                    colOfItemsForOneUserId.CollectionChanged -= HandleUserItemsCollectionChanged; // de-register any existing/pending events
                }

                colOfItemsForOneUserId = theScopedCurrentUserService.cCurrentUser.itemsBelongingToUserId;
                colOfItemsForOneUserId.CollectionChanged += HandleUserItemsCollectionChanged; // new user needs a new event handler for his item collection
                StateHasChanged(); // force a UI redraw
            }
        }

        private void HandleUserItemsCollectionChanged(object sender, NotifyCollectionChangedEventArgs e)
        {
            StateHasChanged(); // force a UI redraw
        }

        private void OnBackgroundClicked() // the <div> around the ItemsList.razor markup 
            // In reality, can only click above first item, below the page nav bar.
            // Also responds to a click in the <div> surrounding the down-arrow portion of the collapsed item.
        {
            //ItemEditService.EditItem = null;
            NM.NavigateTo("/items");
        }

        public void Dispose()
        {
            colOfItemsForOneUserId.CollectionChanged -= HandleUserItemsCollectionChanged; // remove the handler method before closing
        }
    }
}
