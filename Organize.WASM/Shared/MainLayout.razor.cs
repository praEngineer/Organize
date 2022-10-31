using Blazored.Modal;
using Blazored.Modal.Services;
using GeneralUi.nsBusyOverlay;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.JSInterop;
using Organize.Shared.Contracts;
using Organize.WASM.Components;
using Organize.WASM.OrganizeAuthenticationStateProvider;
using Organize.WASM.Pages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.NetworkInformation;
using System.Text.Json;
using System.Threading.Tasks;

namespace Organize.WASM.Shared
{
    public partial class MainLayout : LayoutComponentBase, IAsyncDisposable
    {
        private DotNetObjectReference<MainLayout> _dotNetReference; // for javascript deregistration function in jsInterop.js
        private IJSObjectReference _module;

        public MainLayout()
        {
            Console.WriteLine("MainLayout start");
        }

        protected override void OnInitialized()
        {
            Console.WriteLine("MainLayout starts here");
        }

        [Inject]
        protected ICurrentUserService CurrentUserService { get; set; }

        [Inject]
        private cBusyOverlayService BusyOverlayService { get; set; }

        [Inject]
        private IJSRuntime JSRuntime { get; set; }

        [Inject]
        private IAuthenticationStateProvider AuthenticationStateProvider { get; set; } // so I can sign-out

        [Inject]
        private IForItemsManager ItemManager { get; set; }

        private bool IsAuthenticated { get; set; } = false;

        [Inject]
        private IModalService ModalService { get; set; }


        [CascadingParameter]
        private Task<AuthenticationState> AuthenticationStateTask { get; set; } // WebAssembly.Authentication NuGet Package // using Microsoft.AspNetCore.Components.Authorization;
        // value is set by Task<AuthenticationState> GetAuthenticationStateAsync() in cWebAPIAuthenticationStateProvider

        private string aPageTItle { get; set; } = "Get Organized!";


        protected override async Task OnParametersSetAsync() // fires every time the @page navigation changes
        { // event handler whenever a cascading "parameter" changes
            var parameters = new ModalParameters();
            try
            {
                await base.OnParametersSetAsync();
                var authState = await AuthenticationStateTask;
                IsAuthenticated = authState.User.Identity.IsAuthenticated;

                if (!IsAuthenticated)
                {
                    BusyOverlayService.SetBusyState(BusyEnum.NotBusy);
                    parameters.Add(nameof(ModalMessage.Message), "authentication no longer valid");
                    ModalService.Show<ModalMessage>("Information", parameters);
                    return;
                }
                if (CurrentUserService.cCurrentUser.isUserItemsPropertyLoaded)
                {
                    return;
                }

                BusyOverlayService.SetBusyState(BusyEnum.Busy);
                await ItemManager.RetrieveAllItemsAssociatedWithGivenUserAsync(CurrentUserService.cCurrentUser);
                   
                Console.WriteLine("Items retrieved");
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message + " in MainLayout.razor.cs OnParametersSetAsync");
                BusyOverlayService.SetBusyState(BusyEnum.NotBusy);

                parameters.Add(nameof(ModalMessage.Message), ex.Message);
                ModalService.Show<ModalMessage>("Error", parameters);
            }
            finally
            {
                BusyOverlayService.SetBusyState(BusyEnum.NotBusy);
            }
        }

        public bool UseShortNavText { get; set; }

        protected void SignOut()
        {
            AuthenticationStateProvider.UnsetUser(); // clears token from local storage
        }

        protected override async Task OnInitializedAsync() /* needs to already have injected IJSRuntime */
        {
            Console.WriteLine("Task OnInitializedAsync()");
            await base.OnInitializedAsync();
            //var width = await JSRuntime.InvokeAsync<int>("blazorDimension.getWidth");
            // blazorDimension is an attached object to the window object in javascript (see window.blazorDimension in jsInterop.js)
            // getWidth is the name of the function to call
            // getWidth has no parameters so nothing but ("blazorDimension.getWidth") is needed
            // getWidth returns an integer so the C# type has to be set as <int>

            // Next code demonstrates how to set up "javasript isolation" use of jsisolation instead of jsInterop to avoid javasript function naming conflicts.
            // This is a technique to only load javascript when needed.  Configureation of jsInterop is such that its
            // methods are available globally.
            // following depends upon: private IJSObjectReference _module;
            _module = await JSRuntime.InvokeAsync<IJSObjectReference>(
                 "import", "./js/jsIsolation.js");

            var width = await _module.InvokeAsync<int>("getWidth");

            CheckUseShortNavText(width);

            // next: register; see dispose for deregister ...
            _dotNetReference = DotNetObjectReference.Create(this); // ' this ' is the MainLayout.razor component
            // jsInterop.js is hooked into this sytem via index.html and @using Microsoft.JSInterop in the _Imports.razor file
            await JSRuntime.InvokeVoidAsync("blazorResize.registerReferenceForResizeEvent"
                , nameof(MainLayout)
                , _dotNetReference);

            Console.WriteLine(JsonSerializer.Serialize(CurrentUserService.cCurrentUser));
        }

        [JSInvokable]
        public static void OnResize() /* intended to be called by JavaScript code */
        {
            Console.Write("OnResize in MainLayout.razor.cs");
        }

        [JSInvokable]
        public void HandleResize(int width, int height)
        {
            CheckUseShortNavText(width); // executed every time the window object raises its resize event
        }

        private void CheckUseShortNavText(int width)
        {
            var oldValue = UseShortNavText; // UseShortNavText is a boolean declared above
            UseShortNavText = width < 700; // detect whether the current window width is less than 700 
            if (oldValue != UseShortNavText)
            {
                StateHasChanged(); // redraw the UI
            }
        }

        public async ValueTask DisposeAsync()
        {
            await JSRuntime.InvokeVoidAsync("blazorResize.unRegister", nameof(MainLayout));
            _dotNetReference?.Dispose(); // if created it MUST be disposed.  Question-mark is a null-test.  If not null, then dispose
            if(_module != null)
            {
                await _module.DisposeAsync(); // private IJSObjectReference _module;
            }
        }
    }
}
