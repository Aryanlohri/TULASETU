const DB_NAME = 'tulasetu-inspector';
const DB_VERSION = 1;
let db = null;

const dbApi = {
    openDB: () => {
        return new Promise((resolve, reject) => {
            if (db) return resolve(db);
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onerror = (e) => reject(e.target.error);
            request.onsuccess = (e) => {
                db = e.target.result;
                resolve(db);
            };
            request.onupgradeneeded = (e) => {
                const database = e.target.result;
                if (!database.objectStoreNames.contains('inspections')) {
                    database.createObjectStore('inspections', { keyPath: 'id' });
                }
                if (!database.objectStoreNames.contains('pending-sync')) {
                    database.createObjectStore('pending-sync', { keyPath: 'localId', autoIncrement: true });
                }
                if (!database.objectStoreNames.contains('auth')) {
                    database.createObjectStore('auth', { keyPath: 'key' });
                }
            };
        });
    },

    saveInspections: async (inspections) => {
        const database = await dbApi.openDB();
        const tx = database.transaction('inspections', 'readwrite');
        inspections.forEach(i => tx.objectStore('inspections').put(i));
        return new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });
    },

    getInspections: async () => {
        const database = await dbApi.openDB();
        return new Promise((resolve, reject) => {
            const tx = database.transaction('inspections', 'readonly');
            const request = tx.objectStore('inspections').getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    savePendingInspection: async (data) => {
        const database = await dbApi.openDB();
        return new Promise((resolve, reject) => {
            const tx = database.transaction('pending-sync', 'readwrite');
            const request = tx.objectStore('pending-sync').add(data);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    },

    getPendingInspections: async () => {
        const database = await dbApi.openDB();
        return new Promise((resolve, reject) => {
            const tx = database.transaction('pending-sync', 'readonly');
            const request = tx.objectStore('pending-sync').getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    deletePendingInspection: async (localId) => {
        const database = await dbApi.openDB();
        return new Promise((resolve, reject) => {
            const tx = database.transaction('pending-sync', 'readwrite');
            const request = tx.objectStore('pending-sync').delete(localId);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    },

    getPendingSyncCount: async () => {
        const database = await dbApi.openDB();
        return new Promise((resolve, reject) => {
            const tx = database.transaction('pending-sync', 'readonly');
            const request = tx.objectStore('pending-sync').count();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    saveAuth: async (token, user) => {
        const database = await dbApi.openDB();
        return new Promise((resolve, reject) => {
            const tx = database.transaction('auth', 'readwrite');
            const request = tx.objectStore('auth').put({ key: 'current_user', token, user });
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    },

    getAuth: async () => {
        const database = await dbApi.openDB();
        return new Promise((resolve, reject) => {
            const tx = database.transaction('auth', 'readonly');
            const request = tx.objectStore('auth').get('current_user');
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    clearAuth: async () => {
        const database = await dbApi.openDB();
        return new Promise((resolve, reject) => {
            const tx = database.transaction('auth', 'readwrite');
            const request = tx.objectStore('auth').delete('current_user');
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
};
