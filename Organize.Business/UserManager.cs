using Organize.Shared.Contracts;
using Organize.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Organize.Business
{
    public class cUserManager : IUserManager
    {
        private readonly IForUserCRUD _userDataAccess;

        public cUserManager(IForUserCRUD userDataAccess)
        {
            _userDataAccess = userDataAccess;
        }

        public async Task<clsUser> TrySignInAndGetUserAsync(IAuthUser suspectUser)
        {
            return await _userDataAccess.AuthenticateAndGetUserAsync(suspectUser);
        }

        public async Task InsertUserAsync(clsUser objUser)
        {
            var suspectUser = new cSuspectUser();
            suspectUser.ExtractUnPwd(objUser);
            try
            {
                var userNameNotTaken = await _userDataAccess.IsUserWithNameAvailableAsync(suspectUser);
                if (!userNameNotTaken)
                {
                    throw new Exception("Username already exists 1");
                }

                await _userDataAccess.InsertUserAsync(objUser);
            }
            catch (Exception ex)
            {
                    throw new Exception("Username already exists; " + ex.Message);

            }
        }

    }
}

