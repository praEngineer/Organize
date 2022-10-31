using Microsoft.AspNetCore.Components;
using Organize.Shared.Entities;
using Organize.WASM.ItemEdit;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace Organize.WASM.Components
{
    public partial class ItemElement<TItem> : ComponentBase, IDisposable where TItem : BaseItem
    { 
        [Parameter] 
        // Parameter value comes from the immediate parent.
        // Blazor will automatically initialize the property MainFragment with the corresponding value from the route parameters.
        // https://www.c-sharpcorner.com/article/parameters-in-blazor-server-deep-dive/#:~:text=Optional%20Parameters%20In%20C%23%2C%20we%20can%20create%20optional,allow%20for%20optional%20parameters%20in%20our%20Blazor%20Components.
        //
        public RenderFragment MainFragment { get; set; } // @MainFragment is found in the ItemElement.razor file
                                                         // template placeholder -- Represents a segment of UI content,
                                                         // implemented as a delegate that
                                                         // writes the content to a "RenderTreeBuilder".
                                                         // implemented with @MainFragment in the razor file
        /*
            RenderFragment is not a string or block of html code, it's a delegate. Any method that implements the pattern 
                void method(RenderTreeBuilder builder) 
            can be assigned to a RenderFragment property or field.
         */


        [Parameter]
        public RenderFragment DetailFragment { get; set; } // template placeholder; @DetailFragment is found in the ItemElement.razor file
        /*
        A technique used when the consumer (parent of ItemElement) wishes to identify a place-holder in their mark-up for content that will be passed to them during render.
        In this solution, ItemsList is choosing between parent, text, and url desribed in Organize.Shared.Entities (ParentItem.cs, TextItem.cs, and UrlItem.cs).  
        The "detail" between those three choices is different (see parent ItemList.razor switch statement).

        Because we don't know what HTML to show when rendering @DetailFragment, DetailFragment markup has to be passed by parent (ItemsList) to child (ItemElement).
        Parent (ItemsList) passes contents of the <DetailFragment></DetailFragment> tag to the ItemElment razor markup.

        https://blazor-university.com/templating-components-with-renderfragements/passing-placeholders-to-renderfragments/
        */

        [Parameter]
        public TItem Item { get; set; } // ' where TItem : BaseItem ' in partial class declaration above

        [CascadingParameter] // ColorPrefix will pick up the first string declared in razor, e.g., <CascadingValue Value="@("primary")"> looking in all the parent tags
        public string ColorPrefix { get; set; } // primary, secondary, tertiary, e.g., .secondary-border-color; ex. ColorPrefix+"-background-disabled" in app.scss

        [CascadingParameter] // TotalNumber will pick up the first integer declared in razor, e.g., <CascadingValue Value="UserItems.Count"> looking in all the parent tags
        public int TotalNumber { get; set; }

        [Inject]
        private NavigationManager NM { get; set; } // This was added after the ItemEditService code was removed.

        //[Inject]
        //private ItemEditService ItemEditService { get; set; }

        private string DetailAreaId { get; set; }

        protected override void OnParametersSet()
        {
            base.OnParametersSet();
            DetailAreaId = "detailArea" + Item.Position; // expected to result in a unique value for DetailAreaId
        }

        protected override void OnAfterRender(bool firstRender)
        // OnAfterRender is a life cycle method that executes after
        // OnParameterSet that executes after
        // OnInitialized that executes after
        // SetParameterAsync
        {
            base.OnAfterRender(firstRender);
            if (firstRender)
            {
                Item.PropertyChanged += HandleItemPropertyChanged;
            }
        }

        private void HandleItemPropertyChanged(object sender, PropertyChangedEventArgs e)
        {
            StateHasChanged(); // causes ItemElement.razor part of the UI to refresh
        }

        private void OpenItemInEditMode()
        {
            //ItemEditService.EditItem = Item;

            // pass data via query string parameters, e.g., ../Text/1  or ../{ItemType}/{id}
            Uri.TryCreate("/items/" + Item.ItemTypeEnum + "/" + Item.id,
                UriKind.Relative, out var createdUri); 
                // UriKind.Relative is for validation and allows a route without the http current html page address prefix
                // result of Ur.TryCreate(...) is found in the output ' out var createdUri ' where createdUri is an auto-determined type.
                // https://stackoverflow.com/questions/4161247/uri-trycreate-returns-true-for-any-string-value
            NM.NavigateTo(createdUri.ToString());
        }

        public void Dispose()
        {
            Item.PropertyChanged -= HandleItemPropertyChanged;
        }
    } 
}
