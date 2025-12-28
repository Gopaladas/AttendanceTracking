import axios from 'axios';

// 1. Create an instance with your backend base URL
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. Add a Request Interceptor to include JWT tokens automatically
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. Add a Response Interceptor for global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // If the backend returns 401 (Unauthorized), the token might be expired
        if (error.response && error.response.status === 401) {
            console.error('Session expired. Redirecting to login...');
            localStorage.removeItem('token');
            // Optional: window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;