using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeneralUi.DropdownControl
{
    public partial class Dropdown<TValue> : ComponentBase
    {
        /*
        [Parameter] is used to mark the component parameters that can be set by a parent component when this component is used in another page. 
        */
        [Parameter]
        [EditorRequired] // triggers a warning in the IDE during design time
        public IList<DropdownItem<TValue>> SelectableItems { get; set; }

        [Parameter]
        public DropdownItem<TValue> SelectedItem { get; set; }

        [Parameter]
        public EventCallback<DropdownItem<TValue>> SelectedItemChanged { get; set; }

        public async void OnItemClicked(DropdownItem<TValue> item)
        {
            SelectedItem = item;
            StateHasChanged();
            await SelectedItemChanged.InvokeAsync(item);
        }
    }
}
