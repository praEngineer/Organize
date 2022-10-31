using Blazored.Modal;
using Blazored.Modal.Services;
using GeneralUi.nsBusyOverlay;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.WebUtilities;
using Organize.Business;
using Organize.Shared.Contracts;
using Organize.Shared.Entities;
using Organize.Shared.Enums;
using Organize.Business_TestFake;
using Organize.WASM.Components;
using Organize.WASM.OrganizeAuthenticationStateProvider;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using BlazorSpinner;

namespace Organize.WASM.Pages
{
    public class SignInBase : SignBase
    {
        protected string Day { get; } = DateTime.Now.DayOfWeek.ToString();

        [Inject]
        private NavigationManager NavigationManager { get; set; }

        [Inject]
        private IUserManager UserManager { get; set; }

        [Inject]
        private IForItemCRUD ItemCRUD { get; set; }

        [Inject]
        private IForUserCRUD UserCRUD { get; set; }

        [Inject]
        private IModalService ModalService { get; set; }


        [Inject]
        private cBusyOverlayService BusyOverlayService { get; set; }

        [Inject]
        private ICurrentUserService CurrentUserService { get; set; }

        [Inject]
        private IAuthenticationStateProvider AuthenticationStateProvider { get; set; }

        [Inject]
        private BlazorSpinner.SpinnerService _spinnerService { get; set; } // https://github.com/dahln/blazorspinner

        protected cSuspectUser aSuspectUser { get; set; } = new cSuspectUser(); // popuated with sign-in page

        public bool ShowPassword { get; set; }
        protected async override void OnInitialized()
        {
            base.OnInitialized();

            EditContext = new EditContext(aSuspectUser);

            //if(aItemsManagerFake.TestUser.userName == null)
            //{
            //    await aItemsManagerFake.CreateTestUser(ItemCRUD, UserCRUD);
            //}


            //if(CurrentUserService.cCurrentUser == null)
            //{
            //    //objUser = new clsUser
            //    //{
            //    //    FirstName = "no",
            //    //    LastName = "one",
            //    //    PhoneNumber = "2125551212"
            //    //};
            //    clsUser objUser = cItemsManagerFake.TestUser;
            //    objUser.token = ""; // force regenerating a token
            //    CurrentUserService.cCurrentUser = objUser;
            //    Console.WriteLine("cCurrentUser defaulted to TestUser");
            //}


            //try
            //{
            //    if (NavigationManager != null)
            //    {
            //        var uri = NavigationManager.ToAbsoluteUri(NavigationManager.Uri);
            //        Microsoft.Extensions.Primitives.StringValues sv;
            //        if (QueryHelpers.ParseQuery(uri.Query).TryGetValue("userName", out sv))
            //        {
            //            objUser.UserName = sv;
            //        }
            //        else
            //        {
            //            objUser.UserName = null; //= "cannot determine UID from browser";
            //        }
            //    }
            //    else
            //    {
            //        objUser.UserName = "no handle to navigation manager";
            //    }

            //}
            //catch (Exception ex)
            //{
            //    objUser.UserName = ex.Message;
            //}

            // EditContext = new EditContext(CurrentUserService.cCurrentUser);
        }

        protected async void OnSubmit()
        {

            try
            {
                EditContext = new EditContext(aSuspectUser);
                bool IsValid = EditContext.Validate();

                if(IsValid && aSuspectUser.UserName.Length > 2 && aSuspectUser.Password.Length > 7)
                {
                    LastSubmitResult = ""; // turn off validation messages

                    BusyOverlayService.SetBusyState(BusyEnum.Busy); // BusyOverlayService is Inject'd above; declared in program.cs
                                                                    //_spinnerService.Show();
                                                                    //var suspectUser = new cSuspectUser();
                                                                    //suspectUser.ExtractUnPwd(objUser);

                    clsUser foundUser = new();
                    try
                    {
                        foundUser = await UserManager.TrySignInAndGetUserAsync(aSuspectUser);

                    }
                    catch (Exception)
                    {
                        foundUser.userName = null;
                    }

                    if (foundUser.userName != null)
                    {


                        AuthenticationStateProvider.SetAuthenticatedState(foundUser);
                        CurrentUserService.cCurrentUser = foundUser; // CurrentUserService was [Inject]'d above
                                                                     //if (!foundUser.IsUserItemsPropertyLoaded)
                                                                     //{
                                                                     //    CurrentUserService.cCurrentUser.UserName = objUser.UserName;
                                                                     //    CurrentUserService.cCurrentUser.FirstName = objUser.FirstName;
                                                                     //    CurrentUserService.cCurrentUser.LastName = objUser.LastName;
                                                                     //    CurrentUserService.cCurrentUser.GenderType = GenderTypeEnum.Neutral;
                                                                     //}

                        NavigationManager.NavigateTo("/items"); // @page "/items"
                    }
                    else
                    {
                        var parameters = new ModalParameters();
                        parameters.Add(nameof(ModalMessage.Message), "Case-sensitive User ID '" + aSuspectUser.UserName + "' not found, or an unrecognized password entered.");
                        ModalService.Show<ModalMessage>("Information", parameters);
                    }
                }
                else
                {
                    Console.WriteLine("One of the validations failed.");
                    // Console.WriteLine(EditContext.Model.ToString());
                    var parameters = new ModalParameters();
                    if (!IsValid)
                    {
                        parameters.Add(nameof(ModalMessage.Message), "One of the validations failed.");
                    }
                    if(aSuspectUser.UserName.Length < 5 || aSuspectUser.Password.Length < 8)
                    {
                        parameters.Add(nameof(ModalMessage.Message), "One or both enteries is too short.");
                    }
                    foreach (var amsg in EditContext.GetValidationMessages())
                    {
                        parameters.Add(nameof(ModalMessage.Message), amsg);
                    }
                    ModalService.Show<ModalMessage>("Information", parameters);
                }
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
                //_spinnerService.Hide();
            }
        }

    }
}
