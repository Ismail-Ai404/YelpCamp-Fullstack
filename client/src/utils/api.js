import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/api` 
    : 'http://localhost:3000/api', // Fallback for development
  withCredentials: true, // Important for session-based auth
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error.response || error);
    
    // Don't redirect on auth check failures, just let them fail silently
    if (error.response?.status === 401 && !error.config?.url?.includes('/auth/me')) {
      // Only redirect to login for actual protected route failures, not auth checks
      console.warn('Unauthorized access, but not redirecting for auth check');
    }
    
    return Promise.reject(error);
  }
);

export default api;