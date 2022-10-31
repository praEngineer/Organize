using Organize.Shared.Contracts;
using Organize.Shared.Entities;
using Organize.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Organize.Business
{
    public class cItemsManager : IForItemsManager
    {
        private IForItemCRUD _itemDataAccess;

        public cItemsManager(IForItemCRUD PassedInIMeansToPersistItemData)
        { // constructor
            _itemDataAccess = PassedInIMeansToPersistItemData; // injection by client for a "regular C# library"
            // PassedInIMeansToPersistItemData will determine InMemory, IndexedDB, or WebAPI
        }

        public async Task RetrieveAllItemsAssociatedWithGivenUserAsync(IforUser objUser)
        { // populate the objUser itemsBelongingToUserId property with items from persistance system
            int step = 0;
            var allItems = new List<BaseItem>();
            try
            {
                step++; // 1
                var textItems = await _itemDataAccess.GetItemsBelongingToUserAsync<TextItem>(objUser.id); // objUser.Id is the same as parent.Id of the items
                step++;
                var urlItems = await _itemDataAccess.GetItemsBelongingToUserAsync<UrlItem>(objUser.id);
                step++;
                var parentItems = await _itemDataAccess.GetItemsBelongingToUserAsync<cParentItem>(objUser.id);
                step++;
                var parentItemsList = parentItems.ToList();
                step++; // 5
                foreach (var parentItem in parentItemsList)
                {
                    var childItems = await _itemDataAccess.GetItemsBelongingToUserAsync<ChildItem>(parentItem.id);
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
                if(!(ex.InnerException == null))
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
                var newChildId = await _itemDataAccess.InsertThisItemAsync<ChildItem>(newChildItem);
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
                var newId = await _itemDataAccess.InsertThisItemAsync(item); // item has to implement BaseItem
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
                    await _itemDataAccess.UpdateThisItemAsync(textItem);  // textItem has to implement BaseItem
                    break;
                case UrlItem urlItem:
                    await _itemDataAccess.UpdateThisItemAsync(urlItem);
                    break;
                case cParentItem parentItem:
                    await _itemDataAccess.UpdateThisItemAsync(parentItem);
                    break;
                case ChildItem childItem:
                    await _itemDataAccess.UpdateThisItemAsync(childItem);
                    break;
            }
        }

        public async Task DeleteAllDoneAsync(IforUser objUser)
        {
            var everyParentItems = objUser.itemsBelongingToUserId.OfType<cParentItem>().ToList();
            var everyChildDoneItems = everyParentItems.SelectMany(i => i.ChildItems).Where(i => i.IsDone).ToList();

            if (everyChildDoneItems != null)
            {
                await _itemDataAccess.DeleteTheseItemsAsync(everyChildDoneItems);
            }

            var doneItems = objUser.itemsBelongingToUserId.Where(i => i.IsDone).ToList(); // isDone is the check box; only delete items checked

            if (doneItems != null)
            {
                Console.WriteLine(doneItems.Count);

                var doneParentItem = doneItems.OfType<cParentItem>().ToList();
                var allChildItems = doneParentItem.SelectMany(i => i.ChildItems).ToList();

                await _itemDataAccess.DeleteTheseItemsAsync(allChildItems);
                await _itemDataAccess.DeleteTheseItemsAsync(doneParentItem);
                await _itemDataAccess.DeleteTheseItemsAsync(doneItems.OfType<TextItem>());
                await _itemDataAccess.DeleteTheseItemsAsync(doneItems.OfType<UrlItem>());

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
