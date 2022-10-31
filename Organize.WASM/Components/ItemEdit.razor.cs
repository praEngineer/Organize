using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Routing;
using Organize.Business;
using Organize.Shared.Contracts;
using Organize.Shared.Entities;
using Organize.Shared.Enums;
using Organize.WASM.ItemEdit;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using System.Timers;

namespace Organize.WASM.Components
{
    public partial class ItemEdit : ComponentBase, IDisposable
    {

        //[Inject]
        //private ItemEditService ItemEditService { get; set; }

        [Inject]
        private NavigationManager lclNavigationManager { get; set; }

        [Inject]
        private ICurrentUserService lclCurrentUserService { get; set; } 
        // Making CurrentUserService available in this component via injection
        // requires that the interface be specified, not the class
        // (see Program.cs) ' builder.Services.AddScoped<ICurrentUserService, CurrentUserService>(); '

        [Inject]
        private IForItemsManager theScopedItemManager { get; set; }

        private BaseItem lclItem { get; set; } = new BaseItem();

        private int TotalNumber { get; set; }

        private Timer _debounceTimer = new Timer(); // must be System.Timers rather than System.Threading
        // had to add =new Timer() as it is being disposed somewhere after use ??? -- OnInitialized is not firing more than once


        private Type anyComponentType { get; set; }
        private Dictionary<string, object> anyComponentParameter { get; set; }
        private void CreateDynamiccomponentData()
        {
            if (lclItem is TextItem aTextItem)
            {
                anyComponentType = typeof(TextItemEdit);
                anyComponentParameter = new Dictionary<string, object>
                {
                    [nameof(TextItemEdit.pTextItem)] = aTextItem // key must match parameter name
                };
            }
            else if (lclItem is UrlItem aUrlItem)
            {
                anyComponentType = typeof(UrlItemEdit);
                anyComponentParameter = new Dictionary<string, object>
                {
                    [nameof(UrlItemEdit.pUrlItem)] = aUrlItem // key must match parameter name
                };
            }
            else if (lclItem is cParentItem aParentItem)
            {
                anyComponentType = typeof(ChildItemEdit);
                anyComponentParameter = new Dictionary<string, object>
                {
                    [nameof(ChildItemEdit.ParentItem)] = aParentItem // key must match parameter name
                };
            }
        }


        protected override void OnInitialized()
        {
            base.OnInitialized();
            _debounceTimer = new Timer(); // minimize calls to persistence method -- assumes entries during the interval are related to the same property
            _debounceTimer.Interval = 500; // milliseconds
            _debounceTimer.AutoReset = false; // indicating whether the Timer should raise the Elapsed event only once (false) or repeatedly (true)
            _debounceTimer.Elapsed += HandleDebounceTimerElapsed;
            //ItemEditService.EditItemChanged += HandleEditItemChanged; // ' HandleEditItemChanged ' defined below
            //Item = ItemEditService.EditItem;
            SetDataFromUri();
        }

        private void HandleDebounceTimerElapsed(object sender, ElapsedEventArgs e)
        {
            Console.WriteLine("Timer elapsed");
            theScopedItemManager.UpdateAsync(lclItem); // update one text, url, or parent item
        }

        private void SetDataFromUri() // URI has the currently active editor attributes
        {
            if(lclItem != null)
            {
                lclItem.PropertyChanged -= HandleItemPropertyChanged; // deregister if lclItem already exists
            }
            
            var uri = lclNavigationManager.ToAbsoluteUri(lclNavigationManager.Uri);

            var segmentCount = uri.Segments.Length;
            // next is a test for a valid uri for retrieving particular items
            if (segmentCount > 2 
                && Enum.TryParse(typeof(ItemTypeEnum), uri.Segments[segmentCount - 2].Trim('/'), out var typeEnum) 
                && int.TryParse(uri.Segments[segmentCount - 1], out var id))
            {
                var userItem = lclCurrentUserService.cCurrentUser
                    .itemsBelongingToUserId
                    .SingleOrDefault(item => item.ItemTypeEnum == (ItemTypeEnum)typeEnum && item.id == id); // id is the 'out var' in the if-statement above

                //Not found? default redirect to ' /items ' page directive
                if (userItem == null)
                {
                    lclNavigationManager.LocationChanged -= HandleLocationChanged;
                    lclNavigationManager.NavigateTo("/items");
                }
                else
                {
                    lclItem = userItem;
                    lclItem.PropertyChanged += HandleItemPropertyChanged;
                    lclNavigationManager.LocationChanged += HandleLocationChanged;
                    TotalNumber = lclCurrentUserService.cCurrentUser.itemsBelongingToUserId.Count;
                    CreateDynamiccomponentData();
                    StateHasChanged();
                }
            }
        }

        private void HandleItemPropertyChanged(object sender, PropertyChangedEventArgs e)
        {
            if(_debounceTimer != null)
            {
                _debounceTimer.Stop();
                _debounceTimer.Start();
            }
        }

        private void HandleLocationChanged(object sender, LocationChangedEventArgs e)
        {
            SetDataFromUri(); // keep the right-side edit component in-synch with the chosen item on the left
        }
         
        public void Dispose()
        {
            _debounceTimer?.Dispose();
            lclNavigationManager.LocationChanged -= HandleLocationChanged;
            lclItem.PropertyChanged -= HandleItemPropertyChanged;
        }

        private void HandleEditItemChanged(object sender, ItemEditEventArgs e)
        {
            if (lclItem != null)
            {
                lclItem.PropertyChanged -= HandleItemPropertyChanged;
            }
            lclItem = e.Item;
            lclItem.PropertyChanged += HandleItemPropertyChanged;
            StateHasChanged();
        }
    }
}
