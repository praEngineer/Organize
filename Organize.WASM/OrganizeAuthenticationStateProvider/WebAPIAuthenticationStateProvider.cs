using Blazored.LocalStorage;
using Microsoft.AspNetCore.Components.Authorization; // abstract class AuthenticationStateProvider
using Microsoft.JSInterop;
using Newtonsoft.Json;
using Organize.Shared.Contracts;
using Organize.Shared.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt; // JwtSecurityTokenHandler
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;

namespace Organize.WASM.OrganizeAuthenticationStateProvider
{
    public class cWebAPIAuthenticationStateProvider : AuthenticationStateProvider, IAuthenticationStateProvider
    { // IAuthenticationStateProvider is needed to accomodate multiple persistence techniques
      // and AuthenticationStateProvider is an abstract class

        private readonly ILocalStorageService _localStorageService; // Blazored local storage installed with Blazor
        private readonly ICurrentUserService _currentUserService;
        private readonly HttpClient _httpClient;
        private readonly IForUserCRUD _webAPIAccess_U;

        public cWebAPIAuthenticationStateProvider(
            ILocalStorageService localStorageService,
            ICurrentUserService currentUserService,
            HttpClient httpClient,
            IPersistenceService persistenceService)
        {
            _localStorageService = localStorageService;
            _currentUserService = currentUserService;
            _httpClient = httpClient;
            _webAPIAccess_U = new DataAccess_WebAPI.cUserInfoFromWebAPI(_httpClient); // cUserInfoFromWebAPI includes persistence methods
        }

        public override async Task<AuthenticationState> GetAuthenticationStateAsync() // from the abstract class AuthenticationStateProvider
        {
            var savedToken = await _localStorageService.GetItemAsync<string>("authToken");

            if (string.IsNullOrWhiteSpace(savedToken))
            {
                return new AuthenticationState(new ClaimsPrincipal(new ClaimsIdentity()));
            }

            try
            {
                _httpClient.DefaultRequestHeaders.Authorization
                    = new AuthenticationHeaderValue("bearer", savedToken);
                var user = await _webAPIAccess_U.GetUserByTokenAsync();
                user.token = savedToken;
                return await CreateAuthenticationState(user);
            }
            catch
            {
                return new AuthenticationState(new ClaimsPrincipal(new ClaimsIdentity()));
            }
        }

        public void UnsetUser()
        {
            NotifyAuthenticationStateChanged(CreateUnsetUserAuthenticationStateAsync()); // passes an empty for clsUser, but why is this allowed ??? the method has a non-optional argument
        }

        public void SetAuthenticatedState(clsUser user) // sent by Sign-In page
        {
            var authStateTask = CreateAuthenticationState(user); // user has been authenticated already; user.token has a value
            NotifyAuthenticationStateChanged(authStateTask);
        }

        private async Task<AuthenticationState> CreateAuthenticationState(clsUser user)
        {
            //throw new NotImplementedException();

            await _localStorageService.SetItemAsync("authToken", user.token);
            _currentUserService.cCurrentUser = user;
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", user.token);


            /*  vvvvvvvvvvvvvvvvvv      
                Determine role of the user kept in the JWT
            */

            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(user.token);

            var claims = token.Claims.ToList();
            var roleClaim = claims.FirstOrDefault(c => c.Type == "role");
            // Above reads the token looking for the string, e.g., "admin, superuser" associated with "role"
            // see WebAPI UserController new Claim(ClaimTypes.Role,"admin")

            if (roleClaim != null)
            {
                var newRoleClaim = new Claim(ClaimTypes.Role, roleClaim.Value);
                claims.Add(newRoleClaim);
            }
            /*    ^^^^^^^^^^^^^^^^^^        */

            Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(claims));

            var claimsPrincipal = new ClaimsPrincipal(
                new ClaimsIdentity(claims, "apiauth"));

            //var claimsPrincipal = new ClaimsPrincipal(
            //    new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }, "apiauth"));

            return new AuthenticationState(claimsPrincipal);
        }


        private async Task<AuthenticationState> CreateUnsetUserAuthenticationStateAsync()
        {
            await _localStorageService.RemoveItemAsync("authToken");
            var unsetUser = new ClaimsPrincipal(new ClaimsIdentity());
            return new AuthenticationState(unsetUser);
        }
    }
}
