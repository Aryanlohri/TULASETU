const locationApi = {
    getCurrentLocation: () => {
        return new Promise((resolve) => {
            if (!('geolocation' in navigator)) {
                console.warn('Geolocation not supported');
                resolve(null);
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        timestamp: position.timestamp
                    });
                },
                (error) => {
                    console.warn('Geolocation error:', error);
                    resolve(null); // Return null on error so it doesn't block form
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        });
    }
};
