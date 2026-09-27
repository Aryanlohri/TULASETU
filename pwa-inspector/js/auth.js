const authApi = {
    login: async (email, password) => {
        // Mock network request since we don't have real backend setup in requirements
        return new Promise((resolve) => {
            setTimeout(async () => {
                const token = "mock_jwt_token_" + Date.now();
                const user = { email, name: "Officer" };
                await dbApi.saveAuth(token, user);
                resolve({ token, user });
            }, 500);
        });
    },

    getToken: async () => {
        const auth = await dbApi.getAuth();
        return auth ? auth.token : null;
    },

    isLoggedIn: async () => {
        const token = await authApi.getToken();
        return !!token;
    },

    logout: async () => {
        await dbApi.clearAuth();
        window.location.hash = '#login';
    },

    getAuthHeaders: async () => {
        const token = await authApi.getToken();
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    }
};
