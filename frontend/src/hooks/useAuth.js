'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth as authApi } from '../lib/api';
import { setTokens, clearTokens, getToken, getUserRole } from '../lib/auth';
import toast from 'react-hot-toast';

export function useAuth(requireAuth = false) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (getToken()) {
        try {
          const res = await authApi.getProfile();
          setUser({ ...res.data, role: getUserRole() });
        } catch (error) {
          clearTokens();
          if (requireAuth) router.push('/login');
        }
      } else if (requireAuth) {
        router.push('/login');
      }
      setLoading(false);
    };
    fetchUser();
  }, [requireAuth, router]);

  const login = async (email, password) => {
    try {
      const res = await authApi.login({ email, password });
      setTokens(res.data.access, res.data.refresh);
      const profileRes = await authApi.getProfile();
      const role = getUserRole();
      setUser({ ...profileRes.data, role });
      router.push(`/${role.toLowerCase()}`);
      return true;
    } catch (error) {
      if (error.response?.data && typeof error.response.data === 'object' && !error.response.data.message && !error.response.data.error) {
        const firstErrorKey = Object.keys(error.response.data)[0];
        const firstErrorMessage = error.response.data[firstErrorKey][0];
        toast.error(`${firstErrorKey}: ${firstErrorMessage}`);
      } else {
        toast.error(error.response?.data?.message || error.response?.data?.error || 'Login failed');
      }
      return false;
    }
  };

  const logout = () => {
    clearTokens();
    setUser(null);
    router.push('/login');
  };

  return { user, loading, login, logout };
}
