using Organize.Shared.Contracts;
using Organize.Shared.Entities;
using Organize.DataAccess_WebAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace Organize.DataAccess_WebAPI
{
    public class cWebAPIaccessToItems: IPersistenceService
    {
        private static HttpClient _httpClient;

        public cWebAPIaccessToItems(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        async Task<clsUser> IPersistenceService.AuthenticateAndGetUserAsync(IAuthUser objUser)
        {
            var lclUser = new clsUser();
            lclUser.userName = objUser.UserName;
            lclUser.password = objUser.Password;
            lclUser.firstName = String.Empty;
            lclUser.lastName = String.Empty;
            lclUser.phoneNumber = "1235551212";
            lclUser.id = -2758;

            try
            {
                var response = await _httpClient.PostAsJsonAsync<clsUser>("api/users/authenticate", lclUser);
                await ThrowExceptionIfResponseIsNotSuccessfulAsync(response);

                var foundUser = await response.Content.ReadFromJsonAsync<clsUser>();
                return foundUser;
            }
            catch
            {
                return lclUser;
            }

        }

        async Task<IEnumerable<T>> IPersistenceService.GetAsync<T>(Expression<Func<T, bool>> whereExpression)
        { // items only, not users
            var requestUri = EntityRouteAssignments.GetEntityRouteAssignment[typeof(T)];
            var aList = await _httpClient.GetFromJsonAsync<IList<T>>(requestUri);

            return aList;
        }

        async Task<int> IPersistenceService.InsertAsync<T>(T entity) // the new autoincremented row id for the entity
        {
            var requestUri = EntityRouteAssignments.GetEntityRouteAssignment[typeof(T)];
            var response = await _httpClient.PostAsJsonAsync<T>(requestUri, entity);
            await ThrowExceptionIfResponseIsNotSuccessfulAsync(response);
            var strID = await response.Content.ReadAsStringAsync(); // Content. is only available on await'd values
            return Convert.ToInt32(strID);
        }

        async Task<int> IPersistenceService.InsertUserAsync<clsUser>(IforUser entity)
        {
            var response = await _httpClient.PostAsJsonAsync<IforUser>("api/users/", entity); // Post is a default method in the controller
            await ThrowExceptionIfResponseIsNotSuccessfulAsync(response);
            var strID = await response.Content.ReadAsStringAsync(); // Content. is only available on await'd values

            return Convert.ToInt32(strID);
        }

        async Task IPersistenceService.UpdateAsync<T>(T entity)
        {
            var requestUri = EntityRouteAssignments.PutEntityRouteAssignment[typeof(T)];
            var response = await _httpClient.PostAsJsonAsync<T>(requestUri, entity);
            await ThrowExceptionIfResponseIsNotSuccessfulAsync(response);
        }

        async Task IPersistenceService.DeleteAsync<T>(T entity)
        {
            var requestUri = EntityRouteAssignments.DeleteEntityRouteAssignment[typeof(T)];
            var response = await _httpClient.PostAsJsonAsync<T>(requestUri, entity);
            await ThrowExceptionIfResponseIsNotSuccessfulAsync(response);
        }

        Task IPersistenceService.InitAsync()
        {
            return Task.FromResult(true);
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

        public Task GetAsync<T>()
        {
            throw new NotImplementedException();
        }
    }
}
