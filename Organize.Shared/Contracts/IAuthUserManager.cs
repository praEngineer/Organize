using Organize.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Organize.Shared.Contracts
{
    public interface IForUserCRUD
    {
        public Task<clsUser> TrySigninAndGetUserAsync(IAuthUser suspectUser);

        public Task<int> InsertUserAsync(clsUser objUser);

        public Task<clsUser> AuthenticateAndGetUserAsync(IAuthUser lclAuthUser);

        public Task<bool> IsUserWithNameAvailableAsync(IAuthUser suspectUser);

        public Task<clsUser> AuthenticateAndGetUserByTokenAsync(clsUser suspectUser);
        Task<clsUser> GetUserByTokenAsync();
        Task<string> ClearAllUser();

        Task<string> ClearTestUser(clsUser aTestUser);
    }
}
