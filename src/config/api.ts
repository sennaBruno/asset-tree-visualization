export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'https://fake-api.tractian.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};
