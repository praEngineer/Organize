organizeIndexedDB = { // use of organizeIndexedDB is case-sensitive
// organizeIndexedDB can be thought of as a namespace
    db: {},

    initAsync: async function () { // do not return until the operation is finished
    // initialize the content of the empty db: {} above
        if (!('indexedDB' in window)) { // https://www.freecodecamp.org/news/a-quick-but-complete-guide-to-indexeddb-25f030425501/
            console.warn('IndexedDB not supported')
            return
        }
        const openRequestPromise = new Promise((resolve, reject) => { // enable associate event handler with a callback
            const request = window.indexedDB.open("organize"); // create/open a child of IndexedDB in the browser storage with name 'organize'.
            request.onupgradeneeded = this.onUpgradeNeeded; // calls function onUpgradeNeeded when version number changes, or 'organize' needs to be initialized, etc.

            request.onsuccess = function (event) {
                setTimeout(() => resolve(event.target.result), 4000);
                event.target.result.onversionchange = function () { // https://javascript.info/indexeddb
                    db.close();
                    alert("Database is outdated, please reload the page.")
                };
                resolve(event.target.result); // result is a handle to the open database 'organize'
            }
            request.onblocked = function () { // https://javascript.info/indexeddb
                // this event shouldn't trigger if we handle onversionchange correctly

                // it means that there's another open connection to the same database
                // and it wasn't closed after db.onversionchange triggered for it
                alert("Database 'organize' is opened elsewhere and that connection is blocking.")
            };
            request.onerror = function (event) {
                console.log("could not open IndexedDB organize");
                reject(event);
            }

        });

        this.db = await openRequestPromise; // return something when resolve or reject are invoked
    },

    onUpgradeNeeded: function (event) { // event handler function attached to the openRequestPromise request created in initAsync
        // called when DB needs to be created or the version # changes (second argument to the .open() command in the intiAsync above)

        const db = event.target.result;
            console.log("current oldVersion is " + event.oldVersion);

        db.createObjectStore("clsUser", { keyPath: "id", autoIncrement: false });  // a 'store' can be thought of as a table; db is a structure holding all stores/tables
        // object store name has to match the C# class name being stored
        // autoincrement as false means a unique id has to be set in the object of store.add(object)

        let textItemStore = db.createObjectStore("TextItem", { keyPath: "id", autoIncrement: true }); // P in keyPath must be capitalized
        textItemStore.createIndex("parentId", "parentId", { unique: false });

        let urlItemStore = db.createObjectStore("UrlItem", { keyPath: "id", autoIncrement: true });
        urlItemStore.createIndex("parentId", "parentId", { unique: false });

        let parentItemStore = db.createObjectStore("cParentItem", { keyPath: "id", autoIncrement: true });
        parentItemStore.createIndex("parentId", "parentId", { unique: false });

        let childItemStore = db.createObjectStore("ChildItem", { keyPath: "id", autoIncrement: true });
        childItemStore.createIndex("parentId", "parentId", { unique: false });
    },

    getAllAsync: async function (tableName) { // return all entities of a store (tableName)
        return await new Promise((resolve, reject) => {
            let transaction = this.db.transaction(tableName,"readonly"); // https://stackoverflow.com/questions/49866003/typeerror-db-transaction-is-not-a-function
            transaction.onerror = function (event) {
                console.log("cannot open " + tableName);
                reject(event); // intended to be caught in C# code
            };
            const store = transaction.objectStore(tableName);
            store.onerror = function (event) {
                console.log("cannot get a handle on " + tableName);
                reject(event);
            };
            const elements = [];
            store.openCursor().onsuccess = function (event) {
                var cursor = event.target.result;
                if (cursor) { // false when cursor reaches end of store
                    elements.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(elements);
                }
            };
        });
    },

    addAsync: async function (tableName, entityToAdd) { // new entities into a store (tableName); entityToAdd arrives as JSON
        console.log(entityToAdd);  // confirms C# sends entityToAdd as JSON
        console.log("work on id " + entityToAdd.id);
        parsedEntityToAdd = JSON.parse(entityToAdd); // this step is vital; the id was undefined until after JSON.parse(); convert JSON to javascript object without the curly brace or quotes around key (key:value)
        console.log("after JSON parse, id is " + parsedEntityToAdd.id); // id is a key in the parsedEntityToAdd javascript object
        try {
            if (tableName != 'clsUser') {
                delete parsedEntityToAdd.id; // delete propery called 'id'; if an ID is allowed past here, process with break because store(s) except clsUser are all set up with id/autoincrement 
                console.log("delete propery called 'id' success");
            }
        }
        catch (error) {
            console.log(error);
            console.log("while trying 'delete entityToAdd.id{0}'", parsedEntityToAdd.id)
        }

        try {
            return await new Promise((resolve, reject) => { // when Promise is finished, return either the argument of resolve(...) or reject(...)
                const transaction = this.db.transaction(tableName, "readwrite");
                transaction.onerror = function (event) {
                    console.log("addAsync transaction.error detected");
                    console.log(event.target.error.name);
                    reject(event.target.error.name);
                };
                console.log("try to add ");
                console.log(parsedEntityToAdd); 
                console.log(" to " + tableName);

                const store = transaction.objectStore(tableName);
                // const request = store.add(parsedEntityToAdd); // must have identifiable id key
                const request = store.put(parsedEntityToAdd); // line above was making doubles during initiation
                request.onerror = function (event) { // onerror is an event passed to the function
                    console.log("addAsync store.add error detected while trying this parsedEntityToAdd: ");
                    console.log(parsedEntityToAdd);
                    // console.log("Exception message:");
                    // console.log(event.target.error.name);
                    reject(event.target.error.name);
                };
                request.onsuccess = function (event) { // onsuccess is an event passed to the function
                    //Returns the id of the entity confirmed by the next two commands
                    //console.log("event.target.result is: ");
                    console.log(parsedEntityToAdd);
                    console.log("successfuly added to " + tableName + " at key " + event.target.result);
                    resolve(event.target.result); // this ID has to be put into the C# object
                };
            }); //.catch(error => console.log(error + " in js addAsync Promise")).then((event) => event); // expecting an integer
        }
        catch (error) {
            console.log(error);
            console.log("in js addAsync");
            return -2758;
        }


    },

    putAsync: async function (tableName, entityToPut, id) { //put is HTTP for update; assumes passed in existing entity
        entityToPut = JSON.parse(entityToPut);
        return await new Promise((resolve, reject) => {
            let transaction = this.db.transaction(tableName, "readwrite");
            transaction.onerror = function (event) {
                reject(event);
            };

            const store = transaction.objectStore(tableName);
            entityToPut.id = id; // store needs to know which entity to replace, and this system assumes id passed in is unique to the store/table
            const request = store.put(entityToPut);

            request.onsuccess = function (event) {
                resolve(); // C# is treating putAsync as a void method
            };
        });
    },
    deleteAsync: async function (tableName, id) { // delete a specific entity (with id) from the store (tableName)
        return await new Promise((resolve, reject) => {
            let transaction = this.db.transaction(tableName, "readwrite");
            transaction.onerror = function (event) {
                reject(event);
            };

            const store = transaction.objectStore(tableName);
            const request = store.delete(id);
            request.onsuccess = function (event) {
                resolve(); // C# is treating deleteAsync as a void method
            };
        });
    },
}