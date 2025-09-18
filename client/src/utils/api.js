import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? '/api'  // In production, use relative path
    : 'http://localhost:3000/api', // In development, use full URL
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
    
    if (error.response?.status === 401) {
      // Redirect to login on unauthorized
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;