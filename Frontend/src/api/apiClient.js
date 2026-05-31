import axios from 'axios';

const apiClient = axios.create({
  // Localhost setup for development
  baseURL: import.meta.env.VITE_API_BASE_URL ||'https://api.srgroupandbuilders.com/api',
  // 'http://localhost:3000/api',
  timeout: 120000, 
  withCredentials: true, 
});

// ✅ Request Interceptor: Attach JWT Token securely
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor: Handle Session Expiry
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("jwt");
      sessionStorage.clear();
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;