using Organize.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Organize.Shared.Contracts
{
    public interface IAuthUserTasks
    {
        Task<clsUser> AuthenticateAndGetUserAsync(IAuthUser suspectUser);
        Task InsertUserAsync(clsUser objUser);
        Task<bool> IsUserWithNameAvailableAsync(IAuthUser suspetjUser);

        Task<clsUser> AuthenticateAndGetUserByTokenAsync(clsUser suspectUser);
    }
}
