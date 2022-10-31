using Organize.DataAccess_WebAPI;
using Organize.Shared.Contracts;
using Organize.Shared.Entities;
using Organize.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Organize.Business_TestFake
{
    public class cItemsManagerFake : IForItemsManager
    {
        private static IForItemCRUD _itemCRUD;
        private static IForUserCRUD _userCRUD;

        public cItemsManagerFake(
            IForItemCRUD PassedInIMeansToPersistItemData, // ItemManager determines InMemory, IndexedDB or WebAPI
            IForUserCRUD objUserCRUD = null)
        { // constructor
            _itemCRUD = PassedInIMeansToPersistItemData; // injection by client for a "regular C# library"
            // PassedInIMeansToPersistItemData will determine InMemory, IndexedDB, or WebAPI
            _userCRUD = objUserCRUD;
        }

        public static clsUser TestUser { get; private set; } = new clsUser();

        public static async Task CreateTestUser(
            IForItemCRUD parm_itemCRUD, // ItemManager determines InMemory, IndexedDB or WebAPI
            IForUserCRUD parm_userCRUD)
        {
            string processStep = "";
            _itemCRUD = parm_itemCRUD;
            _userCRUD = parm_userCRUD;
            clsUser aNewTestUser = new clsUser();
            aNewTestUser.id = 123;

            try
            {
                var msgItem = await _itemCRUD.ClearTestItems(aNewTestUser);
                Console.Write(msgItem);
                var msgUser = await _userCRUD.ClearTestUser(aNewTestUser);
                Console.Write(msgUser);


                aNewTestUser.userName = "Ben";
                aNewTestUser.firstName = "Benjamin";
                aNewTestUser.lastName = "Proft";
                aNewTestUser.password = "12345678";
                aNewTestUser.phoneNumber = "(212) 555-1212"; // do not just put digits for this as JSON mistakes it for System.Int32
                aNewTestUser.genderType = GenderTypeEnum.Male;
                aNewTestUser.itemsBelongingToUserId = new ObservableCollection<BaseItem>();
                aNewTestUser.token = String.Empty;


                if (_userCRUD != null)
                {
                    cSuspectUser aSuspecttUser = new cSuspectUser();
                    aSuspecttUser.ExtractUnPwd(aNewTestUser);
                    var b = await _userCRUD.IsUserWithNameAvailableAsync(aSuspecttUser); // false means test user already exists
                    if (b)
                    {
                        var rtndId = await _userCRUD.InsertUserAsync(aNewTestUser); // add a new valid user to the available users via UserManager and its _persistenceService.InsertAsync 
                        if(rtndId != aNewTestUser.id)
                        {
                            throw new Exception("System did not persist test user with hardcoded id.");
                        }

                    }
                    else
                    {
                        if(_userCRUD.GetType().Name != typeof(cUserInfoFromWebAPI).Name)
                        { // clearDB only set up for WebAPI, so there is no need to recreate items for IndexedDB
                            TestUser = aNewTestUser;
                            return; // no need to recreate test user items
                        }
                        if (_userCRUD.GetType().Name == typeof(cUserInfoFromWebAPI).Name)
                        { // clearDB gets rid of the test user so needs to be added back
                            var bb = await _userCRUD.IsUserWithNameAvailableAsync(aSuspecttUser); // false means test user already exists
                            if (bb)
                            {
                                var rtndId = await _userCRUD.InsertUserAsync(aNewTestUser); // add a new valid user to the available users via UserManager and its _persistenceService.InsertAsync 
                                if (rtndId != aNewTestUser.id)
                                {
                                    throw new Exception("System did not persist test user with hardcoded id.");
                                }
                                else
                                {
                                    TestUser = aNewTestUser;
                                };
                            }
                            else
                            {
                                TestUser = aNewTestUser;

                                if (_itemCRUD != null)
                                {//Clear becuase entites are stored
                                    TestUser.eraseItemsBelongingToUserId(); // why erase collection??? by Farkas 26Sep2022 -- So you can later test the GetAysnc finds all the appropriate items
                                }
                                return;
                            }

                        }
                    }
                }

                // following are items for the organize UI
                processStep = "add text";
                TextItem aNewTextItem = new TextItem();
                if (_itemCRUD != null)
                { // make use of the ItemManager for test purposes
                    aNewTextItem.ParentId = aNewTestUser.id;
                    if(_itemCRUD.GetType().Name != "cItemCRUDwithOther")
                    {   // persisting to IndexedDB is different than persisting to C# List
                        // List needs to know the item location
                        var rtndItem1 = await _itemCRUD.InsertThisItemAsync(aNewTextItem);
                        aNewTextItem.id = rtndItem1;
                    }
                    aNewTextItem.Title = "Buy Apples";
                    aNewTextItem.SubTitle = "Red | 5";
                    aNewTextItem.Detail = "From New Zealand preferred";
                    aNewTextItem.ItemTypeEnum = ItemTypeEnum.Text;
                    aNewTextItem.Position = 1;

                    await _itemCRUD.UpdateThisItemAsync<TextItem>(aNewTextItem);
                }
                else
                { // if the ItemManager isn't set up ...
                    aNewTextItem = new TextItem();

                    aNewTextItem.ParentId = aNewTestUser.id;
                    aNewTextItem.id = 1;
                    aNewTextItem.Title = "Buy Apples";
                    aNewTextItem.SubTitle = "Red | 5";
                    aNewTextItem.Detail = "From New Zealand preferred";
                    aNewTextItem.ItemTypeEnum = ItemTypeEnum.Text;
                    aNewTextItem.Position = 1;

                    aNewTestUser.itemsBelongingToUserId.Add(aNewTextItem); // add directly to the list
                }


                processStep = "add url";
                UrlItem aNewUrlItem = new UrlItem(); ;
                if (_itemCRUD != null)
                {
                    aNewUrlItem.ParentId = aNewTestUser.id;
                    if (_itemCRUD.GetType().Name != "cItemCRUDwithOther")
                    {
                        var rtndItem2 = await _itemCRUD.InsertThisItemAsync(aNewUrlItem); // https://github.com/dotnet/aspnetcore/issues/22400
                        aNewUrlItem.id = rtndItem2;
                    }
                    aNewUrlItem.Title = "Buy Sunflowers";
                    aNewUrlItem.Url = "https://drive.google.com/file/d/1NXiNFLEUGUiNtkyzdHDtf-HDocFh3OJ0/view?usp=sharing";
                    aNewUrlItem.ItemTypeEnum = ItemTypeEnum.Url;
                    aNewUrlItem.Position = 2;
                    
                    // also includes urlItems in ItemsBelongingToUserId property of TestData.TestUser (aNewTestUser)
                    await _itemCRUD.UpdateThisItemAsync<UrlItem>(aNewUrlItem);
                }
                else
                {
                    aNewUrlItem.ParentId = aNewTestUser.id;
                    aNewUrlItem.id = 2;
                    aNewUrlItem.Title = "Buy Sunflowers";
                    aNewUrlItem.Url = "https://drive.google.com/file/d/1NXiNFLEUGUiNtkyzdHDtf-HDocFh3OJ0/view?usp=sharing";
                    aNewUrlItem.ItemTypeEnum = ItemTypeEnum.Url;
                    aNewUrlItem.Position = 2;

                    aNewTestUser.itemsBelongingToUserId.Add(aNewUrlItem);
                }


                processStep = "add parent";
                cParentItem aNewParentChildItem = new cParentItem();
                if (_itemCRUD != null)
                {
                    aNewParentChildItem.ParentId = aNewTestUser.id;
                    if (_itemCRUD.GetType().Name != "cItemCRUDwithOther")
                    {
                        var rtndItem3 = await _itemCRUD.InsertThisItemAsync<cParentItem>(aNewParentChildItem);
                        aNewParentChildItem.id = rtndItem3;
                    }
                    aNewParentChildItem.Title = "Make Birthday Present";
                    aNewParentChildItem.ItemTypeEnum = ItemTypeEnum.Parent;
                    aNewParentChildItem.Position = 3;
                    aNewParentChildItem.ChildItems = new ObservableCollection<ChildItem>();

                    await _itemCRUD.UpdateThisItemAsync<cParentItem>(aNewParentChildItem);
                }
                else
                {
                    aNewParentChildItem = new cParentItem();

                    aNewParentChildItem.ParentId = aNewTestUser.id;
                    aNewParentChildItem.id = 3;
                    aNewParentChildItem.Title = "Make Birthday Present";
                    aNewParentChildItem.ItemTypeEnum = ItemTypeEnum.Parent;
                    aNewParentChildItem.Position = 3;
                    aNewParentChildItem.ChildItems = new ObservableCollection<ChildItem>();

                    aNewTestUser.itemsBelongingToUserId.Add(aNewParentChildItem);
                }

                processStep = "add child";
                ChildItem aNewChildForTheParentItem = new ChildItem();
                if (_itemCRUD != null)
                {
                    aNewChildForTheParentItem.BelongsToUserId = aNewTestUser.id;

                    if (_itemCRUD.GetType().Name != "cItemCRUDwithOther")
                    {
                        var rtndItem4 = await _itemCRUD.InsertThisItemAsync<ChildItem>(aNewChildForTheParentItem, aNewTestUser.id);
                        aNewChildForTheParentItem.id = rtndItem4;
                    }
                    aNewChildForTheParentItem.ParentId = aNewParentChildItem.id;
                    aNewChildForTheParentItem.ItemTypeEnum = ItemTypeEnum.Child;
                    aNewChildForTheParentItem.Position = 1;
                    aNewChildForTheParentItem.Title = "Cut";

                    await _itemCRUD.UpdateThisItemAsync<ChildItem>(aNewChildForTheParentItem, aNewTestUser.id);
                }
                else
                {
                    aNewChildForTheParentItem = new ChildItem();

                    aNewChildForTheParentItem.ParentId = aNewParentChildItem.id;
                    aNewChildForTheParentItem.id = 4;
                    aNewChildForTheParentItem.ItemTypeEnum = ItemTypeEnum.Child;
                    aNewChildForTheParentItem.Position = 1;
                    aNewChildForTheParentItem.Title = "Cut";

                    aNewParentChildItem.ChildItems.Add(aNewChildForTheParentItem);
                }

                aNewTestUser.isUserItemsPropertyLoaded = true;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message + " while trying " + processStep);
                if(ex.InnerException != null)
                {
                    Console.WriteLine(ex.InnerException.Message.ToString());
                }
                aNewTestUser.isUserItemsPropertyLoaded = false;
            }


            TestUser = aNewTestUser;

            if (_itemCRUD != null)
            {//Clear becuase entites are stored
                TestUser.eraseItemsBelongingToUserId(); // why erase collection??? by Farkas 26Sep2022 -- So you can later test the GetAysnc finds all the appropriate items
            }
        }

        public async Task RetrieveAllItemsAssociatedWithGivenUserAsync(IforUser objUser)
        {
            objUser.itemsBelongingToUserId.Clear();
            int step = 0;
            var allItems = new List<BaseItem>();
            try
            {
                step++; // 1
                var textItems = await _itemCRUD.GetItemsBelongingToUserAsync<TextItem>(objUser.id); // objUser.Id is the same as parent.Id of the items
                step++;
                var urlItems = await _itemCRUD.GetItemsBelongingToUserAsync<UrlItem>(objUser.id);
                step++;
                var parentItems = await _itemCRUD.GetItemsBelongingToUserAsync<cParentItem>(objUser.id);
                step++;
                var parentItemsList = parentItems.ToList();
                step++; // 5
                foreach (var parentItem in parentItemsList)
                {
                    var childItems = await _itemCRUD.GetItemsBelongingToUserAsync<ChildItem>(parentItem.id);
                    parentItem.ChildItems = new ObservableCollection<ChildItem>(childItems.OrderBy(oneChildItem => oneChildItem.Position));  // extract the child's Position and sort ASC by Position
                }
                step++;

                allItems.AddRange(textItems); // 'AddRnage' adds all the elements of the specified collection (textItems) to the end of the List<BaseItem> for objUser.Id
                step++;
                allItems.AddRange(urlItems);
                step++;
                allItems.AddRange(parentItemsList);
                step++;

                objUser.itemsBelongingToUserId = new ObservableCollection<BaseItem>(allItems.OrderBy(everyItemInAllItems => everyItemInAllItems.Position)); // text, url, and parent items have a position also
                step++;
                objUser.isUserItemsPropertyLoaded = true;
                step++; // 10
                Console.Write(objUser.itemsBelongingToUserId);
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message + " after step {0}", step);
                if (!(ex.InnerException == null))
                {
                    Console.WriteLine(ex.InnerException.ToString());
                }
            }

        }

        public async Task<ChildItem> CreateNewChildItemAndAddItToParentItemAsync(cParentItem parent)
        {
            var fileLine = 50;
            try
            {
                var newChildItem = new ChildItem();
                newChildItem.ParentId = parent.id;
                newChildItem.ItemTypeEnum = ItemTypeEnum.Child; // so I can tell the difference between a parent-child
                                                                // and a text or url type at the same level as parent
                                                                //parent.ChildItems.Add(childItem);
                                                                //return await Task.FromResult(childItem); // need an await command in every async method

                // instead of the above via the persistence service ...
                // **************
                fileLine = 61;
                var newChildId = await _itemCRUD.InsertThisItemAsync<ChildItem>(newChildItem);
                fileLine = 63;

                newChildItem.id = newChildId;
                parent.ChildItems.Add(newChildItem);
                // return Task.FromResult<ChildItem>(newChildItem);
                fileLine = 67;
                return newChildItem; // await is already set up, so return does not need to return a Task.FromResult(...)
                                     // **************

                // For ObservableCollection (ObservableTask<TResult>), the NewItems and OldItems arguments never contain more than one item.
                // Other objects that implement INotifyCollectionChanged may pass more than one item.
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message + " at " + fileLine);
                throw;
            }
        }

        public async Task<BaseItem> CreateNewUserItemAndAddItToUserAsync(IforUser objUser, ItemTypeEnum typeTextUrlParent)
        {
            BaseItem anItem = new BaseItem();
            try
            {
                switch (typeTextUrlParent)
                {
                    case ItemTypeEnum.Text:
                        anItem = await CreateAndInsertItemAsync<TextItem>(objUser, typeTextUrlParent);
                        break;
                    case ItemTypeEnum.Url:
                        anItem = await CreateAndInsertItemAsync<UrlItem>(objUser, typeTextUrlParent);
                        break;
                    case ItemTypeEnum.Parent:
                        var parent = await CreateAndInsertItemAsync<cParentItem>(objUser, typeTextUrlParent);
                        parent.ChildItems = new ObservableCollection<ChildItem>();
                        anItem = parent;
                        break;
                }

                objUser.itemsBelongingToUserId.Add(anItem);
                objUser.isUserItemsPropertyLoaded = true;


            }
            catch (Exception ex)
            {
                anItem.Title = ex.Message;
                objUser.isUserItemsPropertyLoaded = false;
            }

            return anItem;
        }


        private async Task<T> CreateAndInsertItemAsync<T>(
            IforUser objUser,
            ItemTypeEnum typeTextUrlParent) where T : BaseItem, new() // where T means the T in Task<T>
        {
            // T is restricted to TextItem, UrlItem, or ParentItem.  Each of these
            // three implement BaseItem which in-turn implements BaseEntity which has the NotificationObject usage

            // need a public method to invoke CreateAndInsertItemAsync 

            var item = new T(); // command is not available unless ', new()' in the WHERE clause of the method signature

            // because T is either TextItem, UrlItem, or ParentItem and all three implement BaseItem, 
            // these next three properties are always present/available-for-use

            item.ItemTypeEnum = typeTextUrlParent;
            item.Position = objUser.itemsBelongingToUserId.Count + 1;
            item.ParentId = objUser.id;

            try
            {
                // use persistence instead ...
                var newId = await _itemCRUD.InsertThisItemAsync(item); // item has to implement BaseItem
                item.id = newId; // store/table in IndexedDB autonumbers the id; id sent is not necessarily the id resulting from store.add
                return item;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message + " while executing CreateAndInsertItemAsync");
                throw;
            }

        }
        public async Task UpdateAsync<T>(T item) where T : BaseItem
        {
            switch (item) // this technique is necessary because of multiple layers of interfaces for item
                          // cannot write a command that determines the typeof item
            {
                case TextItem textItem:
                    // how does item become textItem ???
                    await _itemCRUD.UpdateThisItemAsync(textItem);  // textItem has to implement BaseItem
                    break;
                case UrlItem urlItem:
                    await _itemCRUD.UpdateThisItemAsync(urlItem);
                    break;
                case cParentItem parentItem:
                    await _itemCRUD.UpdateThisItemAsync(parentItem);
                    break;
                case ChildItem childItem:
                    await _itemCRUD.UpdateThisItemAsync(childItem);
                    break;
            }
        }

        public async Task DeleteAllDoneAsync(IforUser objUser)
        {
            var everyParentItems = objUser.itemsBelongingToUserId.OfType<cParentItem>().ToList();
            var everyChildDoneItems = everyParentItems.SelectMany(i => i.ChildItems).Where(i => i.IsDone).ToList();

            if (everyChildDoneItems != null)
            {
                await _itemCRUD.DeleteTheseItemsAsync(everyChildDoneItems);
            }

            var doneItems = objUser.itemsBelongingToUserId.Where(i => i.IsDone).ToList(); // isDone is the check box; only delete items checked

            if (doneItems != null)
            {
                Console.WriteLine(doneItems.Count);

                var doneParentItem = doneItems.OfType<cParentItem>().ToList();
                var allChildItems = doneParentItem.SelectMany(i => i.ChildItems).ToList();

                await _itemCRUD.DeleteTheseItemsAsync(allChildItems);
                await _itemCRUD.DeleteTheseItemsAsync(doneParentItem);
                await _itemCRUD.DeleteTheseItemsAsync(doneItems.OfType<TextItem>());
                await _itemCRUD.DeleteTheseItemsAsync(doneItems.OfType<UrlItem>());

                foreach (var doneItem in doneItems)
                {
                    objUser.itemsBelongingToUserId.Remove(doneItem);
                }
            }


            var sortedByPosition = objUser.itemsBelongingToUserId.OrderBy(i => i.Position);
            var position = 1;
            foreach (var item in sortedByPosition)
            {
                item.Position = position;
                position++;
                await UpdateAsync(item);
            }
        }
    }
}


//using Organize.Shared.Entities;
//using Organize.Shared.Enums;
//using System;
//using System.Collections.Generic;
//using System.Collections.ObjectModel;
//using System.Text;

//namespace Organize.TestFake
//{
//    public class TestData
//    {
//        public static clsUser TestUser { get; private set; }

//        public static void CreateTestUser()
//        {
//            var user = new clsUser();
//            user.Id = 123;
//            user.UserName = "";
//            user.FirstName = "no";
//            user.LastName = "one";
//            user.Password = "test";
//            user.GenderType = GenderTypeEnum.Neutral;
//            user.UserItems = new ObservableCollection<BaseItem>();


//            var textItem = new TextItem();
//            textItem.ParentId = user.Id;
//            user.UserItems.Add(textItem);
//            textItem.Id = 1;
//            textItem.Title = "Buy Apples";
//            textItem.SubTitle = "Red | 5";
//            textItem.Detail = "From New Zealand preferred";
//            textItem.ItemTypeEnum = ItemTypeEnum.Text;
//            textItem.Position = 1;

//            var urlItem = new UrlItem();
//            urlItem.ParentId = urlItem.Id;
//            user.UserItems.Add(urlItem);
//            urlItem.Id = 2;
//            urlItem.Title = "Buy Sunflowers";
//            urlItem.Url = "https://drive.google.com/file/d/1NXiNFLEUGUiNtkyzdHDtf-HDocFh3OJ0/view?usp=sharing";
//            urlItem.ItemTypeEnum = ItemTypeEnum.Url;
//            urlItem.Position = 2;

//            var parentItem = new ParentItem();
//            parentItem.ParentId = user.Id;
//            user.UserItems.Add(parentItem);
//            parentItem.Id = 3;
//            parentItem.Title = "Make Birthday Present";
//            parentItem.ItemTypeEnum = ItemTypeEnum.Parent;
//            parentItem.Position = 3;
//            parentItem.ChildItems = new ObservableCollection<ChildItem>();

//            var childItem = new ChildItem();
//            childItem.ParentId = parentItem.Id;
//            parentItem.ChildItems.Add(childItem);
//            childItem.Id = 4;
//            childItem.Position = 1;
//            childItem.Title = "Cut";

//            TestUser = user;
//        }
//    }
//}
