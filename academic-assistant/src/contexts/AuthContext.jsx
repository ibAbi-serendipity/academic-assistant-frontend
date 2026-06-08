import { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load user on initial app load
    useEffect(() => {
        const loadUser = async () => {
            const accessToken = localStorage.getItem('access_token');
            if (accessToken) {
                try {
                    const response = await authService.getUserInfo();
                    setUser(response.data);
                } catch (err) {
                    console.error('Error cargando usuario:', err);
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        loadUser();
    }, []);

    const register = async (userData) => {
        setLoading(true);
        setError(null);
        try {
        const response = await authService.registerUser(userData);
        return response.data;
        } catch (err) {
        const errorMessage = err.response?.data?.message || 'Error al registrarse';
        setError(errorMessage);
        throw err;
        } finally {
        setLoading(false);
        }
    };

    const login = async (username, password) => {
        setLoading(true);
        setError(null);
        try {
        const response = await authService.loginUser({ username, password });
        const { access, refresh } = response.data;

        // Save tokens
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);

        // Load user information
        const userResponse = await authService.getUserInfo();
        setUser(userResponse.data);

        return userResponse.data;
        } catch (err) {
        const errorMessage = err.response?.data?.detail || 'Error al iniciar sesión';
        setError(errorMessage);
        throw err;
        } finally {
        setLoading(false);
        }
    };

    const logout = () => {
        authService.logoutUser();
        setUser(null);
        setError(null);
    };

    const value = {
        user,
        loading,
        error,
        isAuthenticated: !!user,
        register,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
