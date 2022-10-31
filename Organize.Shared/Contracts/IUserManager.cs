using Organize.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Organize.Shared.Contracts
{
    public interface IUserManager
    {
        Task<clsUser> TrySignInAndGetUserAsync(IAuthUser suspectUser);

        Task InsertUserAsync(clsUser objUser);
    }
}
