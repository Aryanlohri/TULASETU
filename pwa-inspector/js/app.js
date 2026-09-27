document.addEventListener('DOMContentLoaded', async () => {
    // UI Elements
    const networkStatus = document.getElementById('network-status');
    const logoutBtn = document.getElementById('logout-btn');
    const toastContainer = document.getElementById('toast-container');
    
    // Register Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(() => {
            console.log('Service Worker Registered');
        }).catch(err => console.error('SW Error:', err));
    }

    // Network status management
    const updateNetworkStatus = () => {
        if (navigator.onLine) {
            networkStatus.className = 'status-dot online';
            syncApi.syncPendingInspections(); // Auto sync when back online
        } else {
            networkStatus.className = 'status-dot offline';
        }
    };
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    updateNetworkStatus();

    // Router
    const router = async () => {
        const hash = window.location.hash || '#login';
        const isLoggedIn = await authApi.isLoggedIn();

        if (!isLoggedIn && hash !== '#login') {
            window.location.hash = '#login';
            return;
        }
        if (isLoggedIn && hash === '#login') {
            window.location.hash = '#inspections';
            return;
        }

        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        
        if (hash === '#login') {
            document.getElementById('login-section').classList.add('active');
            logoutBtn.classList.add('hidden');
        } else if (hash === '#inspections') {
            document.getElementById('inspections-section').classList.add('active');
            logoutBtn.classList.remove('hidden');
            renderInspections();
        } else if (hash === '#new-inspection') {
            document.getElementById('inspection-form-section').classList.add('active');
            logoutBtn.classList.remove('hidden');
            resetForm();
        }
        
        syncApi.updateSyncBadge();
    };

    window.addEventListener('hashchange', router);
    
    // Login
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const pass = document.getElementById('password').value;
        await authApi.login(email, pass);
        window.location.hash = '#inspections';
        showToast('Logged in successfully');
    });

    // Logout
    logoutBtn.addEventListener('click', () => {
        authApi.logout();
    });

    // Inspections List
    const renderInspections = async () => {
        const list = document.getElementById('inspections-list');
        list.innerHTML = '<p>Loading...</p>';
        
        // Try getting cached
        let cached = await dbApi.getInspections();
        
        if (cached.length === 0) {
            // Mock fetching from server
            cached = [
                { id: '1', entity: 'Metro Market', status: 'Pending' },
                { id: '2', entity: 'Super Bazaar', status: 'Pending' }
            ];
            await dbApi.saveInspections(cached);
        }

        list.innerHTML = cached.map(i => `
            <div class="card">
                <h3>${i.entity}</h3>
                <p>Status: ${i.status}</p>
                <a href="#new-inspection" class="btn btn-secondary w-full" style="margin-top:0.5rem">Conduct Inspection</a>
            </div>
        `).join('');
    };

    // Location
    document.getElementById('btn-get-location').addEventListener('click', async () => {
        const btn = document.getElementById('btn-get-location');
        btn.textContent = 'Locating...';
        const loc = await locationApi.getCurrentLocation();
        if (loc) {
            document.getElementById('lat').value = loc.lat;
            document.getElementById('lng').value = loc.lng;
            document.getElementById('location-display').textContent = `${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}`;
        } else {
            document.getElementById('location-display').textContent = 'Location unavailable';
        }
        btn.textContent = 'Get Coordinates';
    });

    // Camera
    const cameraOverlay = document.getElementById('camera-overlay');
    const cameraView = document.getElementById('camera-view');
    const photoPreview = document.getElementById('photo-preview');
    const photoData = document.getElementById('photo-data');

    document.getElementById('btn-open-camera').addEventListener('click', async () => {
        const success = await cameraApi.openCamera(cameraView);
        if (success) cameraOverlay.classList.remove('hidden');
        else showToast('Camera access denied');
    });

    document.getElementById('btn-close-camera').addEventListener('click', () => {
        cameraApi.closeCamera();
        cameraOverlay.classList.add('hidden');
    });

    document.getElementById('btn-take-photo').addEventListener('click', () => {
        const dataUrl = cameraApi.capturePhoto(cameraView);
        photoData.value = dataUrl;
        photoPreview.src = dataUrl;
        photoPreview.classList.remove('hidden');
        cameraApi.closeCamera();
        cameraOverlay.classList.add('hidden');
    });

    // Submit Form
    document.getElementById('inspection-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const data = {
            entityName: document.getElementById('entity-name').value,
            lat: document.getElementById('lat').value,
            lng: document.getElementById('lng').value,
            photo: photoData.value,
            notes: document.getElementById('notes').value,
            timestamp: new Date().toISOString()
        };

        // Save to pending sync
        await dbApi.savePendingInspection(data);
        showToast('Inspection saved locally');
        
        // Try background sync
        syncApi.registerBackgroundSync();
        // Fallback manual try
        if (navigator.onLine) syncApi.syncPendingInspections();
        
        syncApi.updateSyncBadge();
        window.location.hash = '#inspections';
    });

    function resetForm() {
        document.getElementById('inspection-form').reset();
        photoPreview.classList.add('hidden');
        photoPreview.src = '';
        photoData.value = '';
        document.getElementById('location-display').textContent = 'Not captured';
    }

    window.addEventListener('sync-completed', (e) => {
        showToast(`Synced ${e.detail.count} offline inspections!`);
        syncApi.updateSyncBadge();
    });

    // Toasts
    function showToast(msg) {
        const t = document.createElement('div');
        t.className = 'toast';
        t.textContent = msg;
        toastContainer.appendChild(t);
        setTimeout(() => t.remove(), 3000);
    }

    // Init
    router();
});
