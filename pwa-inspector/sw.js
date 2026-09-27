const CACHE_NAME = 'tulasetu-inspector-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/css/styles.css',
    '/js/db.js',
    '/js/auth.js',
    '/js/location.js',
    '/js/camera.js',
    '/js/sync.js',
    '/js/app.js',
    '/icons/icon-192.svg',
    '/icons/icon-512.svg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    // API calls: Network first, don't cache here (handled by indexedDB in app)
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(fetch(event.request).catch(() => {
            return new Response(JSON.stringify({ error: 'Offline' }), {
                status: 503,
                headers: { 'Content-Type': 'application/json' }
            });
        }));
        return;
    }

    // App shell: Cache first, fallback to network
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            return fetch(event.request).then((response) => {
                // Cache dynamic assets if needed
                return response;
            });
        })
    );
});

// Background Sync
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-inspections') {
        // Sync delegated to main thread or handled here if importing db.js via importScripts
        // Modern approach: ping client to trigger sync or use importScripts
        event.waitUntil(triggerClientsToSync());
    }
});

async function triggerClientsToSync() {
    const clients = await self.clients.matchAll();
    clients.forEach(client => client.postMessage({ type: 'DO_SYNC' }));
}
