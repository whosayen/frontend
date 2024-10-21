import axios, {InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

// Use NEXT_PUBLIC_ prefix for client-side access to environment variables in Next.js
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080';
export const BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API || `${BASE_URL}/api/v1`;

// Define a custom AxiosRequestConfig type to include custom options
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    skipAuth?: boolean; // Add the custom 'skipAuth' property
}

// Create an axios instance
const api = axios.create({
    baseURL: BASE_URL_API,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to handle custom configurations
api.interceptors.request.use((config: CustomAxiosRequestConfig) => {
    // Add Authorization header if the token exists in sessionStorage
    const token = sessionStorage.getItem('accessToken');

    // Ensure config.headers is of type AxiosHeaders
    if (!config.headers) {
        config.headers = new AxiosHeaders(); // Create an AxiosHeaders instance if not defined
    }

    // Check if the custom option 'skipAuth' is not set to true
    if (token && !(config as CustomAxiosRequestConfig).skipAuth) {
        config.headers.set('Authorization', `Bearer ${token}`);
    }

    // Check if the URL starts without a '/'
    if (config.url && !config.url.startsWith('/')) {
        console.warn(`The URL "${config.url}" should start with a '/'. It has been corrected.`);
        config.url = `/${config.url}`; // Add leading '/'
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor to add a custom 'ok' property
api.interceptors.response.use((response) => {
    response.ok = response.status >= 200 && response.status < 300;
    return response;
}, (error) => {
    return Promise.reject(error);
});

export default api;