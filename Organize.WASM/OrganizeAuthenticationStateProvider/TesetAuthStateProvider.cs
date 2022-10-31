using Microsoft.AspNetCore.Components.Authorization;
using Organize.Shared.Entities;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Organize.WASM.OrganizeAuthenticationStateProvider
{
    public class cTesetAuthStateProvider : AuthenticationStateProvider, IAuthenticationStateProvider // https://code-maze.com/authenticationstateprovider-blazor-webassembly/
    {
        public async override Task<AuthenticationState> GetAuthenticationStateAsync()
        {
            await Task.Delay(1500); // adding some delay before the authentication state provider returns information about the current user
                                    // if we pass at least the authenticationType, the user won’t be anonymous. That’s why we are using the parameterless constructor – to simulate an anonymous user.
                                    // var anonymous = new ClaimsIdentity();
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, "John Doe"),
                new Claim(ClaimTypes.Role, "Administrator")
            };
            var anonymous = new ClaimsIdentity(claims, "testAuthType");
            return await Task.FromResult(new AuthenticationState(new ClaimsPrincipal(anonymous)));
        }

        public void SetAuthenticatedState(clsUser user)
        {
            throw new System.NotImplementedException();
        }

        public void UnsetUser()
        {
            throw new System.NotImplementedException();
        }
    }
}
