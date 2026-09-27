import axios from 'axios';
import { getToken, clearTokens } from './auth';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
});

// Add auth token to every request
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle 401 responses globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearTokens();
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ── Auth ─────────────────────────────────────────────────────
export const auth = {
  login: (data) => api.post('/auth/login/', data),
  register: (data) => api.post('/auth/register/', data),
  refresh: (data) => api.post('/auth/refresh/', data),
  getProfile: () => api.get('/auth/me/'),
  verifyIdentity: (data) => api.post('/auth/verify-identity/', data),
};

// ── Traders ──────────────────────────────────────────────────
export const traders = {
  getProfile: () => api.get('/traders/profile/'),
  updateProfile: (data) => api.put('/traders/profile/', data),
  getInstruments: () => api.get('/traders/instruments/'),
  createInstrument: (data) => api.post('/traders/instruments/', data),
  updateInstrument: (id, data) => api.put(`/traders/instruments/${id}/`, data),
  deleteInstrument: (id) => api.delete(`/traders/instruments/${id}/`),
};

// ── Applications ─────────────────────────────────────────────
export const applications = {
  list: () => api.get('/applications/'),
  create: (data) => api.post('/applications/', data),
  getById: (id) => api.get(`/applications/${id}/`),
  assign: (id, data) => api.patch(`/applications/${id}/assign/`, data),
  schedule: (id, data) => api.patch(`/applications/${id}/schedule/`, data),
};

// ── Inspections ──────────────────────────────────────────────
export const inspections = {
  list: () => api.get('/inspections/'),
  submit: (data) => api.post('/inspections/', data),
  batchSync: (data) => api.post('/inspections/sync/', data),
};

// ── Certificates ─────────────────────────────────────────────
export const certificates = {
  list: () => api.get('/certificates/'),
  issue: (data) => api.post('/certificates/issue/', data),
  getById: (id) => api.get(`/certificates/${id}/`),
  getQR: (id) => api.get(`/certificates/${id}/qr/`, { responseType: 'blob' }),
};

// ── Public Verification (no auth) ────────────────────────────
export const verify = {
  verifyCertificate: (id) => api.get(`/verify/${id}/`),
};

// ── Rules ────────────────────────────────────────────────────
export const rules = {
  getStates: () => api.get('/rules/states/'),
  getFees: (params) => api.get('/rules/fees/', { params }),
};

export default api;
