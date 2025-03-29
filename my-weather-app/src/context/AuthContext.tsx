import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, logoutUser } from '../api';
import { DEV_MODE } from '../config';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        if (DEV_MODE) return true; // Always return true in dev mode
        const token = localStorage.getItem('token');
        return !!token;
    });

    useEffect(() => {
        if (DEV_MODE) {
            setIsAuthenticated(true);
            localStorage.setItem('token', 'dev-token');
        }
    }, []);

    const login = async (email: string, password: string) => {
        if (DEV_MODE) {
            setIsAuthenticated(true);
            localStorage.setItem('token', 'dev-token');
            return;
        }

        try {
            const response = await loginUser({ email, password });
            localStorage.setItem('token', response.access_token);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = async () => {
        if (DEV_MODE) {
            setIsAuthenticated(false);
            localStorage.removeItem('token');
            return;
        }

        try {
            await logoutUser();
            localStorage.removeItem('token');
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 