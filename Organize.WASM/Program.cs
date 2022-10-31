using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Components.Authorization;
using Blazored.LocalStorage; // https://www.thecodehubs.com/use-localstorage-in-blazor/
using Blazored.Modal;

using Organize.Shared.Contracts;

using Organize.Business;
using Organize.Business_TestFake;

using Organize.DataAccess_Other;
using Organize.DataAccess_WebAPI;

using Organize.WASM.OrganizeAuthenticationStateProvider;
using GeneralUi.nsBusyOverlay;
using System.Security.Claims;
using BlazorSpinner;
using Microsoft.AspNetCore.Components.Web;

//using Organize.Persistence_InMemoryStorage;
//using Organize.Persistence_IndexedDB;


namespace Organize.WASM
{
    public class Program
    {
        private static bool _isApipersistence = false;

        private static bool _isInitialized = false;
        public static async Task Main(string[] args)
        {
            try
            {
                WebAssemblyHostBuilder builder = WebAssemblyHostBuilder.CreateDefault(args);
                builder.RootComponents.Add<App>("app");
                builder.RootComponents.Add<HeadOutlet>("head::after"); // dotNET6 page title needs this

                builder.Services.AddOptions();
                builder.Services.AddAuthorizationCore(); // https://stackoverflow.com/questions/65512890/blazor-webassembly-cannot-provide-a-value-for-property-authenticationstateprov

                builder.Services.AddBlazoredLocalStorage(); // must come before cWebAPIAuthenticationStateProvider

                builder.Services.AddBlazoredModal(); // allows pop-up information and error messages; github.com/Blazored/Modal
                builder.Services.AddScoped<cBusyOverlayService>(); // from uDemy course
                builder.Services.AddScoped<SpinnerService>();  // https://github.com/dahln/blazorspinner


                builder.Services.AddScoped<ICurrentUserService, cCurrentUserService>(); // must come before cWebAPIAuthenticationStateProvider

                if (_isApipersistence)
                {
                    Console.WriteLine(builder.Configuration["apiAddress"] + " is the expected URL for the ");
                    builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.Configuration["apiAddress"]) }); // appsettings.json in wwwroot // must come before cWebAPIAuthenticationStateProvider

                    builder.Services.AddScoped<IForUserCRUD, cUserInfoFromWebAPI>(); // User Info CRUD via WebAPI
                    builder.Services.AddScoped<IForItemCRUD, cItemCRUDwithWebAPI>();  // Item CRUD via WebAPI

                    builder.Services.AddScoped<IPersistenceService, cWebAPIaccessToItems>(); // has the http Client calls // must come before cWebAPIAuthenticationStateProvider

                    builder.Services.AddScoped<IUserManager, cUserManager>(); // one class to abstrat away the appropriate CRUD calls related to the User ID
                    builder.Services.AddScoped<IForItemsManager, cItemsManager>(); // one class to abstrat away the appropriate CRUD calls related to Items

                    builder.Services.AddApiAuthorization(); // https://stackoverflow.com/questions/65512890/blazor-webassembly-cannot-provide-a-value-for-property-authenticationstateprov

                    builder.Services.AddScoped<cWebAPIAuthenticationStateProvider>(); // necessary for the next two; order of these three is important.  This line "registers" class cWebAPIAuthenticationStateProvider
                    builder.Services.AddScoped<IAuthenticationStateProvider>(provider => provider.GetRequiredService<cWebAPIAuthenticationStateProvider>()); // interface implementation 
                    builder.Services.AddScoped<AuthenticationStateProvider>(implementationFactory: provider => provider.GetRequiredService<cWebAPIAuthenticationStateProvider>()); // abstract implementation used for <CascadingAuthenticationState> in app.razor 
                }
                else
                {
                    builder.Services.AddScoped<IForUserCRUD, cUserInfoFromOther>();  // User info CRUD to either InMemory or IndexedDB
                    builder.Services.AddScoped<IForItemCRUD, cItemCRUDwithOther>(); // Item CRUD to either InMemory or IndexedDB

                    //builder.Services.AddScoped<IPersistenceService, Persistence_InMemoryStorage.cInMemoryStorage>();
                    builder.Services.AddScoped<IPersistenceService, Persistence_IndexedDB.cIndexedDB>();

                    builder.Services.AddScoped<IUserManager, cUserManagerFake>(); // one class to abstrat away the appropriate CRUD calls related to the User ID
                    builder.Services.AddScoped<IForItemsManager, cItemsManagerFake>();  // one class to abstrat away the appropriate CRUD calls related to Items

                    builder.Services.AddScoped<cSimpleAuthenticationStateProvider>(); // necessary for the next two; order of these three is important
                    builder.Services.AddScoped<IAuthenticationStateProvider>(provider => provider.GetRequiredService<cSimpleAuthenticationStateProvider>()); // interface implementation
                    builder.Services.AddScoped<AuthenticationStateProvider>(provider => provider.GetRequiredService<cSimpleAuthenticationStateProvider>());// abstract implementation
                }

                //builder.Services.AddScoped<ItemEditService>(); // type is not necessary, however it makes it more difficult to set up a 'Fake' for testing
                //// ItemEditService has to be 'injected' into various components in the application.

                var host = builder.Build();

                ICurrentUserService CurrentUserService = host.Services.GetRequiredService<ICurrentUserService>();

                var persistenceService = host.Services.GetRequiredService<IPersistenceService>(); // persistence service

                var lclUserCRUD = host.Services.GetRequiredService<IForUserCRUD>();
                var lclItemCRUD = host.Services.GetRequiredService<IForItemCRUD>();
                var lclLocalStg = host.Services.GetRequiredService<ILocalStorageService>();

                if ((persistenceService is Persistence_InMemoryStorage.cInMemoryStorage || persistenceService is Persistence_IndexedDB.cIndexedDB) && !_isInitialized)
                {
                    if (persistenceService is Persistence_IndexedDB.cIndexedDB)
                    {
                        await persistenceService.InitAsync(); // needed for all persistence approaches except InMemory -- means nothing in the InMemory approach
                        // for IndexedDB, this will build an empty 'organize' with five stores
                    }

                    await cItemsManagerFake.CreateTestUser(lclItemCRUD, lclUserCRUD);
                    CurrentUserService.cCurrentUser = cItemsManagerFake.TestUser;
                    _isInitialized = true;
                }                
                
                if (!(persistenceService is Persistence_InMemoryStorage.cInMemoryStorage) && !_isInitialized)
                { // WebAPI should fall here

                    string savedToken = await lclLocalStg.GetItemAsync<string>("authToken");

                    if ((savedToken == null))
                    {
                        await persistenceService.InitAsync(); // needed for all persistence approaches except InMemory -- means nothing in the InMemory approach

                        var msgItem = await lclItemCRUD.ClearAllItems();
                        Console.Write(msgItem);
                        var msgUser = await lclUserCRUD.ClearAllUser();
                        Console.Write(msgUser);
                        await cItemsManagerFake.CreateTestUser(lclItemCRUD, lclUserCRUD);
                        _isInitialized = true;
                    }

                }

                await host.RunAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Program.cs exception: " + ex.Message);
            }


        }
    }
}
