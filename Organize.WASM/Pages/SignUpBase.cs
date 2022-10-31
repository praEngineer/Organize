using Blazored.Modal;
using Blazored.Modal.Services;
using GeneralUi.nsBusyOverlay;
using GeneralUi.DropdownControl;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Primitives;
using Organize.Shared.Contracts;
using Organize.Shared.Enums;
using Organize.WASM.Components;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Components.Forms;
using Organize.Shared.Entities;

namespace Organize.WASM.Pages
{
    public class SignUpBase : SignBase
    {
        [Inject]
        private NavigationManager NavigationManager { get; set; }

        [Inject]
        private cBusyOverlayService BusyOverlayService { get; set; }

        [Inject]
        private IUserManager UserManager { get; set; }

        [Inject]
        private IModalService ModalService { get; set; }

        protected clsUser objUser { get; set; } = new clsUser(); // popuated with sign-up page

        protected IList<DropdownItem<GenderTypeEnum>> GenderTypeDropDownItems { get; } = new List<DropdownItem<GenderTypeEnum>>();

        protected DropdownItem<GenderTypeEnum> SelectedGenderTypeDropDownItem { get; set; }

        protected override void OnInitialized()
        {
            base.OnInitialized();

            EditContext = new EditContext(objUser);

            var male = new DropdownItem<GenderTypeEnum>
            {
                ItemObject = GenderTypeEnum.Male,
                DisplayText = "Male"
            };

            var female = new DropdownItem<GenderTypeEnum>
            {
                ItemObject = GenderTypeEnum.Female,
                DisplayText = "Female"
            };

            var neutral = new DropdownItem<GenderTypeEnum>
            {
                ItemObject = GenderTypeEnum.Neutral,
                DisplayText = "others"
            };

            GenderTypeDropDownItems.Add(male);
            GenderTypeDropDownItems.Add(female);
            GenderTypeDropDownItems.Add(neutral);

            SelectedGenderTypeDropDownItem = female;

            TryGetUsernameFromUri();
        }

        private void TryGetUsernameFromUri() // can also be done by [Parameter][SupplyParameterFromQuery] making a C# property with a matching URI query name
        {
            var uri = NavigationManager.ToAbsoluteUri(NavigationManager.Uri);
            if (QueryHelpers.ParseQuery(uri.Query).TryGetValue("userName", out StringValues sv))
            {
                objUser.userName = sv;
            }
        }

        protected async void OnValidSubmit()
        {
            try
            {
                LastSubmitResult = ""; // turn off validation messages 

                BusyOverlayService.SetBusyState(BusyEnum.Busy);
                objUser.genderType = SelectedGenderTypeDropDownItem.ItemObject;
                await UserManager.InsertUserAsync(objUser);
                NavigationManager.NavigateTo("signin");
            }
            catch (Exception e)
            {
                var parameters = new ModalParameters();
                parameters.Add(nameof(ModalMessage.Message), e.Message);
                ModalService.Show<ModalMessage>("Error", parameters);
            }
            finally
            {
                BusyOverlayService.SetBusyState(BusyEnum.NotBusy);
            }
        }
    }
}
