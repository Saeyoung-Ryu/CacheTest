window.indexedDbFunctions = {
    saveData: function (key, jsonValue) {
        const value = JSON.parse(jsonValue);

        const request = indexedDB.open("MyDatabase", 1);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("item")) {
                db.createObjectStore("item");
            }
        };

        request.onsuccess = function () {
            const db = request.result;
            const tx = db.transaction("item", "readwrite");
            const store = tx.objectStore("item");
            store.put(value, key);
        };
    },

    getData: function (key) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open("MyDatabase", 1);
            request.onsuccess = function () {
                const db = request.result;
                const tx = db.transaction("item", "readonly");
                const store = tx.objectStore("item");
                const getRequest = store.get(key);

                getRequest.onsuccess = () => {
                    resolve(JSON.stringify(getRequest.result));
                };
                getRequest.onerror = () => reject("Error getting data");
            };
        });
    }
};
