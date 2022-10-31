using Microsoft.VisualBasic;
using Organize.DataAccess_WebAPI;
using Organize.Shared.Contracts;
using Organize.Shared.Entities;
//using Organize.WebApi.Controllers;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Net.Http;
using System.Net.Http.Json;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace Organize.DataAccess_WebAPI
{

    public class cUserInfoFromWebAPI : IForUserCRUD
    {
        private readonly HttpClient _httpClient;

        public cUserInfoFromWebAPI(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<clsUser> AuthenticateAndGetUserAsync(IAuthUser lclAuthUser)
        {
            var response = await _httpClient.PostAsJsonAsync<IAuthUser>("api/users/authenticate", lclAuthUser);
            await ThrowExceptionIfResponseIsNotSuccessfulAsync(response);

            var foundUser = await response.Content.ReadFromJsonAsync<clsUser>();
            return foundUser;
        }

        private Task<bool> IsUserWithNameAvailableAsync(IAuthUser lclAuthUser)
        {
            return Task.FromResult(true); // false, let authentication features assure a ligitmate user
            // see how UserController handles the test for an existing user
            //try
            //{
            //    //Task thread1 = Task.Factory.StartNew(() => _httpClient.GetAsync(lclAuthUser.UserName));
            //    //Task.WaitAll(thread1);

                //    var response = _httpClient.GetAsync(lclAuthUser.UserName).ContinueWith(async responseTask =>
                //    {
                //        var innerResponse = await responseTask;

                //        var isSuccess = await ResponseIsNotSuccessfulAsync(innerResponse);
                //        if (isSuccess)
                //        {
                //            var users = innerResponse.Content.ReadFromJsonAsync<clsUser>().Result;
                //            return (users == null); // false when user id is already in the database, it is okay to add this user ID to the DB
                //        }
                //        return true; // item not found in api

                //    }).Result;

                //    return response.Result;

                //var response = await _httpClient.GetAsync(lclAuthUser.UserName);
                //var isSuccess = await ResponseIsNotSuccessfulAsync(response);
                //if (isSuccess)
                //{
                //    var users = response.Content.ReadFromJsonAsync<clsUser>().Result;
                //    return (users == null); // false when user id is already in the database, it is okay to add this user ID to the DB
                //}
                //return true; // item not found in api
            //}
            //catch(Exception ex)
            //{
            //    Console.Write(ex.Message);
            //    return false; // suspected user id is already in the database
            //}
        }


        public async Task<clsUser> GetUserByTokenAsync()
        {
            var response = await _httpClient.GetAsync("api/users/");
            await ThrowExceptionIfResponseIsNotSuccessfulAsync(response);

            var foundUser = await response.Content.ReadFromJsonAsync<clsUser>();
            return foundUser;
        }

        async Task<clsUser> IForUserCRUD.AuthenticateAndGetUserByTokenAsync(clsUser suspectUser)
        {
            var response = await _httpClient.GetAsync(suspectUser.userName);
            await ThrowExceptionIfResponseIsNotSuccessfulAsync(response);
            var users = response.Content.ReadFromJsonAsync<clsUser>().Result;
            if (users == null)
            {
                return null;
            }
            clsUser okUser = users;
            if(okUser.token == suspectUser.token)
            {
                return okUser; // reurns a clsUser object built from whatever the user list is persisted as -- if such a token exists
            }
            return null;
        }

        async Task<clsUser> IForUserCRUD.TrySigninAndGetUserAsync(IAuthUser suspectUser)
        {
            var response = await _httpClient.GetAsync(suspectUser.UserName);
            await ThrowExceptionIfResponseIsNotSuccessfulAsync(response);
            var users = response.Content.ReadFromJsonAsync<clsUser>().Result;
            return users; // reurns a clsUser object built from whatever the user list is persisted as -- if such a uid/pwd exists
        }

        async Task<int> IForUserCRUD.InsertUserAsync(clsUser objUser)
        {
            var requestUri = EntityRouteAssignments.PostEntityRouteAssignment[typeof(clsUser)];
            var response = await _httpClient.PostAsJsonAsync<clsUser>(requestUri, objUser);
            await ThrowExceptionIfResponseIsNotSuccessfulAsync(response);
            var idString = await response.Content.ReadAsStringAsync();

            return Convert.ToInt32(idString);
        }

        public async Task<string> ClearAllUser()
        {
            var requestUri = "api/users/clear";
            //HttpRequestMessage hrm = new HttpRequestMessage();
            //hrm.Content = JsonContent.Create(requestUri);
            //await hrm.Content.LoadIntoBufferAsync();
            //var response = await _httpClient.SendAsync(hrm);
            var response = await _httpClient.PostAsync(requestUri,null);
            await ThrowExceptionIfResponseIsNotSuccessfulAsync(response);
            var msgString = await response.Content.ReadAsStringAsync();

            return msgString;
        }

        public async Task<string> ClearTestUser(clsUser aTestUser)
        {
            var requestUri = "api/users/clearTest";
            HttpRequestMessage hrm = new HttpRequestMessage();
            hrm.Content = JsonContent.Create(aTestUser);
            await hrm.Content.LoadIntoBufferAsync();
            //var response = await _httpClient.SendAsync(hrm);
            var response = await _httpClient.PostAsync(requestUri, hrm.Content);
            await ThrowExceptionIfResponseIsNotSuccessfulAsync(response);
            var msgString = await response.Content.ReadAsStringAsync();

            return msgString;
        }

        private async Task ThrowExceptionIfResponseIsNotSuccessfulAsync(HttpResponseMessage responseMessage)
        {
            if (!responseMessage.IsSuccessStatusCode)
            {
                var errorMessage = await TryToGetMessageAsync(responseMessage);
                throw new Exception(errorMessage.Message);
            }
        }

        private async Task<ErrorMessage> TryToGetMessageAsync(HttpResponseMessage responseMessage)
        {
            try
            {
                return await responseMessage.Content.ReadFromJsonAsync<ErrorMessage>();
            }
            catch
            {
                return new ErrorMessage { Message = "Unknown Error" };
            }
        }

        Task<bool> IForUserCRUD.IsUserWithNameAvailableAsync(IAuthUser suspectUser)
        {
            var rslt = IsUserWithNameAvailableAsync(suspectUser);
            return rslt;
        }
    }
}
