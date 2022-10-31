using Organize.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Organize.WASM.OrganizeAuthenticationStateProvider
{
    public interface IAuthenticationStateProvider // this is needed to accomodate multiple persistence techniques 
    {
        void SetAuthenticatedState(clsUser user);
        void UnsetUser();
    }
}
