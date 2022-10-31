using Microsoft.JSInterop;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Organize.Shared.Contracts;
using Organize.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Organize.Persistence_IndexedDB
{
    public class cIndexedDB : IPersistenceService
    {
        private IJSRuntime _jsRuntime;
        private JsonSerializerSettings _settings;

        public cIndexedDB(IJSRuntime jSRuntime)
        {
            _jsRuntime = jSRuntime;
            _settings = new JsonSerializerSettings();
            _settings.ContractResolver = new SimplePropertyContractResolver();
        }

        public async Task<clsUser> AuthenticateAndGetUserAsync(IAuthUser suspectUser)
        {
            try
            {
                var tableName = "clsUser"; // typeof(clsUser).Name;

                var entities = await _jsRuntime.InvokeAsync<clsUser[]>("organizeIndexedDB.getAllAsync", tableName);
                // tableName has to match a 'store' name in the .js file and the name of the class, e.g., clsUser

                //var foundUser = entities.FirstOrDefault<clsUser>(u => u.userName == suspectUser.UserName && u.password == suspectUser.Password);
                var foundUser = entities.FirstOrDefault(u => u.userName == suspectUser.UserName && u.password == suspectUser.Password);

                return foundUser;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message + " while exectuting AuthenticateAndGetUserAsync");
                throw;
            }
        }

        public async Task DeleteAsync<T>(T entity) where T : BaseEntity
        {
            var tableName = typeof(T).Name;
            await _jsRuntime.InvokeVoidAsync("organizeIndexedDB.deleteAsync", tableName, entity.id); // use of organizeIndexedDB is case sensitive
        }

        public async Task<IEnumerable<T>> GetAsync<T>(Expression<Func<T, bool>> whereExpression) where T : BaseEntity
        {
            var tableName = typeof(T).Name; // table name has to match the name of the store in 'organize' child of IndexedDB

            T[] entities = await _jsRuntime.InvokeAsync<T[]>("organizeIndexedDB.getAllAsync", tableName);
            // tableName has to match a 'store' name in the .js file and the name of the class, e.g., clsUser
            var rslt = entities.Where(whereExpression.Compile());
            return rslt.ToList<T>();
        }
        public async Task InitAsync()
        {
            await _jsRuntime.InvokeVoidAsync("organizeIndexedDB.initAsync"); // organizeIndexedDB is the name of const at the top of indexedDB.js (case sensitive)
            // all _jsRuntime operations are asynchronis because of the Blazor Runtime because the JS is going to be in the browser
        }

        public async Task<int> InsertAsync<T>(T entity) where T : BaseEntity
        {
            var tableName = typeof(T).Name; // Extract the name either TextItem, UrlItem, ParentItem, or ChildItem
            var serializedEntity = SerializeAndRemoveArraysAndNavigationProperties(entity);

            try
            {
                var id = await _jsRuntime.InvokeAsync<int>("organizeIndexedDB.addAsync", tableName, serializedEntity);
                //if(entity.Id != id)
                //{
                //    Console.WriteLine("entity id changed from {0} to {1}", entity.Id, id);  // item IDs change, User IDs do not change bacause of autoincrement settings for the stores
                //}
                return id; // this value is the autoincrement id assigned to the serializedEntity added to the store (primary key id of the store/table row for serializedEntity)
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message + " while executing InsertAsync");
                if(!(ex.InnerException == null))
                {
                    Console.WriteLine(ex.InnerException.Message.ToString());
                }
                throw;
            }
        }

        private string SerializeAndRemoveArraysAndNavigationProperties<T>(T entity) // using NewtonSoft methods
        {
            var stringWithoutNavigationProperties = JsonConvert.SerializeObject(entity,_settings); // _settings is related to SimplePropertyContractResolver
                                                                                                   // _settings guards against complex columns in IndexedDB child db store/tables
            return stringWithoutNavigationProperties;
        }

        public async Task UpdateAsync<T>(T entity) where T : BaseEntity
        {
            var tableName = typeof(T).Name;
            Console.WriteLine("update existing entity of " + tableName);
            var serializedEntity = SerializeAndRemoveArraysAndNavigationProperties(entity);
            await _jsRuntime.InvokeVoidAsync("organizeIndexedDB.putAsync", tableName, serializedEntity, entity.id); // InvokeVoidAsync because there is no return from javascript putAsync
        }

        public async Task<int> InsertUserAsync<clsUser>(IforUser entity) // different because you can only have one username/pwd pair in the clsUser table
        {
            var tableName = typeof(clsUser).Name; // Extract the name either TextItem, UrlItem, ParentItem, or ChildItem
            var serializedEntity = SerializeAndRemoveArraysAndNavigationProperties(entity);

            //await _jsRuntime.InvokeVoidAsync("organizeIndexedDB.initAsync"); // problem of nothingness; remaining code assumes IndexedDB stores exist
            //// above creates organize in IndexedDB object of the browser when run the first time.  Later calls have no effect 

            var entities = await _jsRuntime.InvokeAsync<clsUser[]>("organizeIndexedDB.getAllAsync", tableName);
            // tableName has to match a 'store' name in the .js file and the name of the class, e.g., clsUser

            if(entities.Length == 0)
            { // clsUser table is empty
                try
                {
                    var id = await _jsRuntime.InvokeAsync<int>("organizeIndexedDB.addAsync", tableName, serializedEntity);
                    return id;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message + " while executing InsertAsync");
                    if (!(ex.InnerException == null))
                    {
                        Console.WriteLine(ex.InnerException.Message.ToString());
                    }
                    throw;
                }
            }

            List<clsUser> listOfEntities = entities.ToList<clsUser>();

            // need to test and make sure user does not already exist
            if(listOfEntities.Count > 0)
            {
                foreach(IforUser aUser in listOfEntities)
                {
                    if(aUser.userName == entity.userName && aUser.password == entity.password)
                    {
                        try
                        { // handles a replacement of user profile attributes, e.g., phone number update
                            await _jsRuntime.InvokeVoidAsync("organizeIndexedDB.putAsync", tableName, serializedEntity, aUser.id);
                            return entity.id;
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine(ex.Message + " while executing putAsync");
                            if (!(ex.InnerException == null))
                            {
                                Console.WriteLine(ex.InnerException.Message.ToString());
                            }
                            throw;
                        }
                    }
                }
            }

            // must be a new user
            try
            {
                var id = await _jsRuntime.InvokeAsync<int>("organizeIndexedDB.addAsync", tableName, serializedEntity);
                //if(entity.Id != id)
                //{
                //    Console.WriteLine("entity id changed from {0} to {1}", entity.Id, id);
                //}
                return id;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message + " while executing InsertAsync");
                if (!(ex.InnerException == null))
                {
                    Console.WriteLine(ex.InnerException.Message.ToString());
                }
                throw;
            }

        }

        Task IPersistenceService.GetAsync<T>()
        {
            throw new NotImplementedException();
        }
    }
}
