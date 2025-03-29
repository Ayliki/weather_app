import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, logoutUser } from '../api/authApi';
import { LoginRequest, RegisterRequest, LoginResponse } from '../api/types';

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const login = async (credentials: LoginRequest) => {
        setIsLoading(true);
        setError(null);
        try {
            const response: LoginResponse = await loginUser(credentials);
            localStorage.setItem('token', response.access_token);
            navigate('/');
        } catch (err) {
            setError('Invalid email or password');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: RegisterRequest) => {
        setIsLoading(true);
        setError(null);
        try {
            await registerUser(data);
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Please try again.');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        setError(null);
        try {
            await logoutUser();
            localStorage.removeItem('token');
            navigate('/login');
        } catch (err) {
            setError('Logout failed. Please try again.');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        login,
        register,
        logout,
        isLoading,
        error
    };
}; 