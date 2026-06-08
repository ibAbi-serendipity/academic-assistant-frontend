import api from '../lib/api';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = (userData) => {
    return api.post('/register/', userData);
};

export const loginUser = (credentials) => {
    return api.post('/login/', credentials);
};

export const refreshAccessToken = (refreshToken) => {
    return axios.post(`${API_URL}/token/refresh/`, {
        refresh: refreshToken,
    });
};

export const getUserInfo = () => {
    return api.get('/profile/');
};

export const logoutUser = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};
