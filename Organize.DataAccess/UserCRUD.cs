using Organize.Shared.Contracts;
using Organize.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Organize.DataAccess_Other
{
    public class cUserInfoFromOther : IForUserCRUD // CRUD user information, e.g., first name
    {
        private IPersistenceService _persistenceService;

        public cUserInfoFromOther(IPersistenceService persistenceService)
        {
            _persistenceService = persistenceService;
        }

        public async Task<bool> IsUserWithNameAvailableAsync(IAuthUser suspectUser)
        {
            var users = await _persistenceService.GetAsync<clsUser>(u => u.userName == suspectUser.UserName);
            // When the where clause results in a no-find, something other than a clsUser is being returned.
            Console.Write(suspectUser.UserName + " resulted in this from GetAsync: ");
            Console.Write(users.GetType().Name);
            if (users.Count() > 0)
            {
                return false; // suspected user id is already in the database
            }
            return true; // you found a new user id
        }

        public async Task<int> InsertUserAsync(clsUser objUser)
        {
            if (objUser == null)
            {
                return -1212;
            }
            else
            {
                if (objUser.id == 0) // typical for a new user 
                {
                    DateTime dt = DateTime.Now;
                    Random oRnd = new Random();
                    objUser.id = oRnd.Next(400, 3200) * dt.Millisecond;
                }
                return await _persistenceService.InsertUserAsync<clsUser>(objUser);
            }
        }

        public async Task<clsUser> AuthenticateAndGetUserAsync(IAuthUser lclAuthUser)
        {
            // look in User Store for any 'row' having objUser.userName and objUser.Password already
            var users = await _persistenceService.GetAsync<clsUser>(u => u.userName == lclAuthUser.UserName && lclAuthUser.Password == u.password);
            return users.FirstOrDefault(); // reurns a clsUser object built from whatever the user list is persisted as -- if such a uid/pwd exists
        }

        async Task<clsUser> IForUserCRUD.AuthenticateAndGetUserByTokenAsync(clsUser objUser)
        {
            var users = await _persistenceService.GetAsync<clsUser>(u => u.token == objUser.token);
            return users.FirstOrDefault(); // reurns a clsUser object built from whatever the user list is persisted as -- if such a uid/pwd exists
        }

        async Task<clsUser> IForUserCRUD.TrySigninAndGetUserAsync(IAuthUser suspectUser)
        {
            return await _persistenceService.AuthenticateAndGetUserAsync(suspectUser);
        }

        Task<clsUser> IForUserCRUD.GetUserByTokenAsync()
        {
            throw new NotImplementedException();
        }

        Task<string> IForUserCRUD.ClearAllUser()
        {
            throw new NotImplementedException();
        }

        async Task<string> IForUserCRUD.ClearTestUser(clsUser aTestUser)
        {
            await _persistenceService.DeleteAsync(aTestUser);
            return "test user removed";
        }
    }
}
