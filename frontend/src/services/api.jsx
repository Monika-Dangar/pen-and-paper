import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: BACKEND_URL,
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');  // Get the token from localStorage
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;  // Attach the token to the headers
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;
