using Organize.Shared.Contracts;
using Organize.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Organize.Persistence_InMemoryStorage
{
    public class cInMemoryStorage : IPersistenceService
    {

        private readonly Dictionary<Type, List<BaseEntity>> _entityDictionary = new Dictionary<Type, List<BaseEntity>>();
        private readonly Dictionary<Type, List<IforUser>> _entityDictionaryUsers = new Dictionary<Type, List<IforUser>>();
        // entities of the same type are stored in the same list

        private List<BaseEntity> GetListOrCreateIfNotAvailable<T>() where T : BaseEntity
        { // ensure against "problem of nothingness" by adding (when necessary) to the _entityDictionary each type (text, url, parent)
            if (_entityDictionary.ContainsKey(typeof(T)))
            {
                return _entityDictionary[typeof(T)];
            }

            var newList = new List<BaseEntity>();
            _entityDictionary.Add(typeof(T), newList);

            return newList;
        }

        public Task<clsUser> AuthenticateAndGetUserAsync(IAuthUser objUser)
        {
            var list = GetListOrCreateIfNotAvailable<clsUser>();

            clsUser defaultuser = new clsUser();
            defaultuser.isUserItemsPropertyLoaded = false;
            defaultuser.firstName = objUser.UserName + " does not exist in _entityDictionary";

            var foundUser = list.OfType<clsUser>()
                .DefaultIfEmpty(defaultuser).First(u => u.userName == objUser.UserName && u.password == objUser.Password);
            return Task.FromResult(foundUser);
        }

        public Task DeleteAsync<T>(T entity) where T : BaseEntity
        {
            var list = GetListOrCreateIfNotAvailable<T>();
            Boolean bErased = list.Remove(entity);
            Console.WriteLine("Delete - Id: " + entity.id);
            Console.WriteLine(JsonSerializer.Serialize(entity));

            return Task.FromResult(bErased);
        }

        public Task<IEnumerable<T>> GetAsync<T>(Expression<Func<T, bool>> whereExpression) where T : BaseEntity
        {
            var aList = GetListOrCreateIfNotAvailable<T>(); // convert dictionary to a system.collection.generic.list
            // List<BaseEntity> aList = GetListOrCreateIfNotAvailable<T>();
            IEnumerable<T> entityList = aList.OfType<T>().Where(whereExpression.Compile()); // lambda expression to extract objects from aList having a type <T>
                                                                                 // and produce a delegate (entityList) representing that lambda expresssion

            Console.WriteLine("Get - Count: " + entityList.Count());
            Console.WriteLine("Get - Count: {0}" , entityList.Count());
            return Task.FromResult(entityList); // return a Task because there was no async/await in this method
        }

        public Task InitAsync()
        {
            return Task.FromResult(true); // nothing extra needed for initialization of InMemoryStorage
            // TRUE signals success
        }

        public Task<int> InsertAsync<T>(T entity) where T : BaseEntity
        {
            List<BaseEntity> list = GetListOrCreateIfNotAvailable<T>();
            int id = list.Count == 0 ? 1 : list.Max(e => e.id) + 1;
            try
            {
                if(entity != null)
                {
                    entity.id = id; // assign a unique sequential integer to the entity according to its position in the list
                    // for some reason, Ben P. decided to assign the id in the DataAccess class (ItemDataAccess.cs)
                    list.Add(entity);
                    Console.WriteLine("newly inserted Id for entity below is: " + id);
                    Console.WriteLine(JsonSerializer.Serialize(entity)); // (System.Text.JSON) JSON of the newly created entity
                }
                else
                {
                    id = -200;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message + " while trying to add entity to a list with the same type.");
                return Task.FromResult(-100); // -100 is arbitrary
            }

            return Task.FromResult(id);
        }

        public Task UpdateAsync<T>(T entity) where T : BaseEntity
        {
            Console.WriteLine("Update: " + entity.id); // entity is either text, url, or parent; entity.id matches id of a user
            Console.WriteLine(JsonSerializer.Serialize(entity));
            return Task.FromResult(true); // updates are already applied directly to the entity currently in the UI; nothing extra need be done
            // pass back boolean TRUE to signal success
        }

        Task<int> IPersistenceService.InsertUserAsync<clsUser>(IforUser entity)
        {
            if (_entityDictionaryUsers.ContainsKey(typeof(IforUser)))
            {
                // add a new 'System.Collections.Generic.List<Organize.Shared.Entities.clsUser>'
                var newList = new List<IforUser>();
                newList.Add(entity);
                if (_entityDictionaryUsers.ContainsKey(typeof(IforUser))) // UserManager.cs has already checked for existing UserName and bypassed the INSERT command
                { // this would allow only one user at a time in memory with attributes like phone number in passed in entity ???
                    _entityDictionary.Remove(typeof(IforUser));
                    _entityDictionaryUsers.Add(typeof(IforUser), newList);
                }
                else
                {
                    _entityDictionaryUsers.Add(typeof(IforUser), newList); // how does dictionary handle uniqueness ???
                }
            }
            else
            {
                throw new Exception("(InMemory) user dictionary does not exist yet");
            }


            return Task.FromResult<int>(entity.id);
        }

        Task IPersistenceService.GetAsync<T>()
        {
            throw new NotImplementedException();
        }
    }
}
