window.indexedDbFunctions = {
    openDb: function () {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open("MyDatabase", 1);

            request.onupgradeneeded = function (event) {
                const db = event.target.result;
                if (!db.objectStoreNames.contains("myStore")) {
                    db.createObjectStore("myStore");
                }
            };

            request.onsuccess = function () {
                resolve(true);
            };

            request.onerror = function () {
                reject("Error opening DB");
            };
        });
    },

    saveData: function (key, value) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open("MyDatabase", 1);

            request.onsuccess = function () {
                const db = request.result;
                const tx = db.transaction("myStore", "readwrite");
                const store = tx.objectStore("myStore");
                store.put(value, key);
                tx.oncomplete = () => resolve(true);
                tx.onerror = () => reject("Error saving data");
            };
        });
    },

    getData: function (key) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open("MyDatabase", 1);

            request.onsuccess = function () {
                const db = request.result;
                const tx = db.transaction("myStore", "readonly");
                const store = tx.objectStore("myStore");
                const getRequest = store.get(key);

                getRequest.onsuccess = () => resolve(getRequest.result);
                getRequest.onerror = () => reject("Error getting data");
            };
        });
    }
};
