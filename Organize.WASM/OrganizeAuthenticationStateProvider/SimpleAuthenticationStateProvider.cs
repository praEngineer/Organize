 using Microsoft.AspNetCore.Components.Authorization;
using Organize.Shared.Contracts;
using Organize.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Organize.WASM.OrganizeAuthenticationStateProvider
{
    public class cSimpleAuthenticationStateProvider : AuthenticationStateProvider, IAuthenticationStateProvider
    {
        private readonly ICurrentUserService _currentUserService;

        public cSimpleAuthenticationStateProvider(
            ICurrentUserService currentUserService)
        {
            _currentUserService = currentUserService;
        }

        public override Task<AuthenticationState> GetAuthenticationStateAsync()
        {
            // a Task<TResult> object whose Task<TResult>.Result property is result and whose Status property is RanToCompletion

            if (_currentUserService.cCurrentUser == null)
            {
                return Task.FromResult(new AuthenticationState(new ClaimsPrincipal(new ClaimsIdentity())));
            }

            var authenticatedUser = new ClaimsPrincipal(
                new ClaimsIdentity(new[] { 
                    new Claim("id", _currentUserService.cCurrentUser.id.ToString()),
                    new Claim(ClaimTypes.Role,"admin")}
                , "apiauth"));
            return Task.FromResult(new AuthenticationState(authenticatedUser)); // returns Task<AuthenticationState>
            // Task.FromResult creates a Task<TResult> that's completed successfully with the specified result
        }

        public void SetAuthenticatedState(clsUser user)
        {
             var authenticatedUser = new ClaimsPrincipal(
                new ClaimsIdentity(new[] { 
                    new Claim("id", user.id.ToString()), 
                    new Claim(ClaimTypes.Role, "admin") }, 
                    "apiauth"));
            var authState = Task.FromResult(new AuthenticationState(authenticatedUser));
            NotifyAuthenticationStateChanged(authState);
        }

        public void UnsetUser()
        {
            var unsetUser = new ClaimsPrincipal(new ClaimsIdentity());
            var authState = Task.FromResult(new AuthenticationState(unsetUser));
            NotifyAuthenticationStateChanged(authState);
        }
    }
}
