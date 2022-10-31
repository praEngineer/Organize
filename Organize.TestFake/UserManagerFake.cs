using Microsoft.AspNetCore.Components;
using Organize.Shared.Contracts;
using Organize.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Organize.Business_TestFake
{
    public class cUserManagerFake : IUserManager
    {
        private readonly IForUserCRUD _userDataAccess;
        private readonly IForItemCRUD _itemDataAccess;

        public cUserManagerFake(IForUserCRUD pUserDataAccess, IForItemCRUD pItemDataAccess)
        {
            try {             
                _userDataAccess = pUserDataAccess;
                _itemDataAccess = pItemDataAccess;
                if (cItemsManagerFake.TestUser != null)
                {
                    if (cItemsManagerFake.TestUser.userName != null)
                    {
                        _userDataAccess.InsertUserAsync(cItemsManagerFake.TestUser);
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Cannot load TestUser. | " + ex.Message);
            }
        }
        public async Task<int> InsertUserAsync(clsUser objUser)
        {
            var suspectUser = new cSuspectUser();
            suspectUser.ExtractUnPwd(objUser);
            var isUserNameAlreadyTaken = await _userDataAccess.IsUserWithNameAvailableAsync(suspectUser);
            if (isUserNameAlreadyTaken)
            {
                throw new Exception("Username already exists");
            }

            return await _userDataAccess.InsertUserAsync(objUser);

        }

        async Task<clsUser> IUserManager.TrySignInAndGetUserAsync(IAuthUser suspectUser)
        {
            Console.WriteLine("Hello " + suspectUser.UserName + " from fake");
            var isUserNameAlreadyTaken = await _userDataAccess.IsUserWithNameAvailableAsync(suspectUser);
            if (cItemsManagerFake.TestUser == null)
            {
                await cItemsManagerFake.CreateTestUser(_itemDataAccess, _userDataAccess);
            }
            if (cItemsManagerFake.TestUser.userName == null)
            {
                await cItemsManagerFake.CreateTestUser(_itemDataAccess, _userDataAccess);
            }
            clsUser lclTestU =  cItemsManagerFake.TestUser;

            if (!isUserNameAlreadyTaken && lclTestU.userName.ToUpper() == suspectUser.UserName.ToUpper() && lclTestU.password == suspectUser.Password)
            {
                return await _userDataAccess.AuthenticateAndGetUserAsync(suspectUser);
            }
            else if (lclTestU.userName.ToUpper() == suspectUser.UserName.ToUpper() && lclTestU.password == suspectUser.Password)
            { // this condition is to allow the test user through
                return lclTestU;
            }
            else
            {
                return await _userDataAccess.AuthenticateAndGetUserAsync(suspectUser);
            }


        }

        async Task IUserManager.InsertUserAsync(clsUser objUser)
        {
            var suspectUser = new cSuspectUser();
            suspectUser.ExtractUnPwd(objUser);
            var isUserNameAvailable = await _userDataAccess.IsUserWithNameAvailableAsync(suspectUser);
            if (!isUserNameAvailable)
            {
                throw new Exception("Username already exists");
            }
            else
            {
                // added else because I only want to Insert when the UID is available, not rely on InsertUserAsync to detect a duplicate
                await _userDataAccess.InsertUserAsync(objUser);
            }
        }
    }
}
