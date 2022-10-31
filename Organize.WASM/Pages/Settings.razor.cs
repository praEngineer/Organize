using Blazored.LocalStorage;
using Blazored.Modal;
using Blazored.Modal.Services;
using GeneralUi.nsBusyOverlay;
using Microsoft.AspNetCore.Components;
using Organize.Business;
using Organize.Business_TestFake;
using Organize.Shared.Contracts;
using Organize.Shared.Entities;
using Organize.WASM.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Organize.WASM.Pages
{
    public partial class Settings : ComponentBase
    {
        [Inject]
        private IForItemsManager theScopedItemManager { get; set; }

        //[Inject]
        //private cBusyOverlayService BusyOverlayService { get; set; }

        [Inject]
        private ICurrentUserService theScopedCurrentUserService { get; set; }

        [Inject]
        private IModalService ModalService { get; set; }

        [Inject]
        private IForUserCRUD aUserManager { get; set; }

        [Inject]
        private IForItemCRUD aItemManager { get; set; }

        [Inject]
        NavigationManager NM { get; set; }

        [Inject]
        private BlazorSpinner.SpinnerService _spinnerService { get; set; } // https://github.com/dahln/blazorspinner


        private async void DeleteAllDone()
        {
            var parameters = new ModalParameters();
            try
            {
                // BusyOverlayService.SetBusyState(BusyEnum.Busy);
                _spinnerService.Show();
                await theScopedItemManager.DeleteAllDoneAsync(theScopedCurrentUserService.cCurrentUser);
                _spinnerService.Hide();
                parameters.Add(nameof(ModalMessage.Message), "marked items removed");
                ModalService.Show<ModalMessage>("Information", parameters);
            }
            catch(Exception ex)
            {
                _spinnerService.Hide();
                parameters.Add(nameof(ModalMessage.Message), ex.Message + " while deleting " + theScopedCurrentUserService.cCurrentUser.lastName + " marked items.");
                ModalService.Show<ModalMessage>("Error", parameters);

            }
            finally
            {
                //BusyOverlayService.SetBusyState(BusyEnum.NotBusy);
                _spinnerService.Hide();
            }
        }

        private async void ClearDB()
        {

            var parameters = new ModalParameters();
            try
            {
                _spinnerService.Show();
                var msgItem = await aItemManager.ClearAllItems();
                Console.Write(msgItem);
                var msgUser = await aUserManager.ClearAllUser();
                Console.Write(msgUser);
                NM.NavigateTo("/signup");

            }
            catch (Exception ex)
            {
                parameters.Add(nameof(ModalMessage.Message), ex.Message + " while deleting " + theScopedCurrentUserService.cCurrentUser.lastName + " marked items.");
                _spinnerService.Hide();
                ModalService.Show<ModalMessage>("Information", parameters);

            }
            finally
            {
                _spinnerService.Hide();
            }
        }

        private async void LoadDB()
        {

            var parameters = new ModalParameters();
            try
            {
                _spinnerService.Show();
                clsUser aTestUser = new();
                aTestUser.id = 123;
                var msgItem = await aItemManager.ClearTestItems(aTestUser);
                Console.Write("Pre-load " + msgItem);
                var msgUser = await aUserManager.ClearTestUser(aTestUser);
                Console.Write("Pre-load " + msgUser);
                await cItemsManagerFake.CreateTestUser(aItemManager, aUserManager);
                NM.NavigateTo("/signin");

            }
            catch (Exception ex)
            {
                parameters.Add(nameof(ModalMessage.Message), ex.Message + " while restoring the test user and his items.");
                _spinnerService.Hide();
                ModalService.Show<ModalMessage>("Information", parameters);

            }
            finally
            {
                _spinnerService.Hide();
            }

        }
    }
}
