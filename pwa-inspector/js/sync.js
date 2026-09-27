const syncApi = {
    registerBackgroundSync: async () => {
        if ('serviceWorker' in navigator && 'SyncManager' in window) {
            try {
                const swRegistration = await navigator.serviceWorker.ready;
                await swRegistration.sync.register('sync-inspections');
                console.log('Background sync registered');
            } catch (err) {
                console.error('Background sync registration failed:', err);
            }
        }
    },

    syncPendingInspections: async () => {
        if (!navigator.onLine) return;

        const pending = await dbApi.getPendingInspections();
        if (pending.length === 0) return;

        console.log(`Attempting to sync ${pending.length} inspections...`);
        let syncedCount = 0;

        for (const item of pending) {
            try {
                // Mock network request to sync
                // In real app: fetch('/api/inspections/sync/', { method: 'POST', body: JSON.stringify(item) })
                await new Promise(resolve => setTimeout(resolve, 300)); 
                
                // Simulate success
                await dbApi.deletePendingInspection(item.localId);
                syncedCount++;
            } catch (err) {
                console.error('Failed to sync item:', item.localId, err);
                // Keep in DB for next time
            }
        }

        if (syncedCount > 0) {
            window.dispatchEvent(new CustomEvent('sync-completed', { detail: { count: syncedCount } }));
        }
    },

    manualSync: async () => {
        await syncApi.syncPendingInspections();
    },

    updateSyncBadge: async () => {
        const count = await dbApi.getPendingSyncCount();
        const badge = document.getElementById('sync-badge');
        if (count > 0) {
            badge.textContent = count;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }
};

// Listen for messages from SW (fallback if background sync uses postMessage)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', event => {
        if (event.data.type === 'DO_SYNC') {
            syncApi.syncPendingInspections();
        }
    });
}
