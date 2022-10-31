using Microsoft.AspNetCore.Components; // ComponentBase abstract class
using System;
using System.Collections.Generic;
using System.Text;

namespace GeneralUi.nsBusyOverlay
{
    public class cBusyOverlayBase : ComponentBase
    {
        [Parameter]
        public RenderFragment ChildContent { get; set; } // spinner etc.
        // naming convention will take the child tags of the BusyOverlay.razor component tag

        [Inject]
        public cBusyOverlayService BusyOverlayService { get; set; }

        protected bool IsBusy { get; set; } // used to determine whether overlay should be visible or not

        protected override void OnParametersSet() // Blazor lifecycle
        {
            base.OnParametersSet();
            BusyOverlayService.BusyStateChanged += HandleBusyStateChanged;
            IsBusy = BusyOverlayService.CurrentBusyState == BusyEnum.Busy;
        }

        private void HandleBusyStateChanged(object sender, BusyChangedEventArgs e)
        {
            IsBusy = e.BusyState == BusyEnum.Busy;
            StateHasChanged(); // ComponentBase
        }

        private string _aMsg = "Overlay ought to be visible";
        protected string aMsg {
            get {
                Console.WriteLine(_aMsg);
                return _aMsg;  
                // property added here as a way to pause the overlay so I can see it;
                // put a breakpoint on the line above and step through the remaining code
            }
            set { _aMsg = value; } 
        }

    }
}
