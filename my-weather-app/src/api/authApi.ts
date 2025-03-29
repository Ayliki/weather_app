import apiClient from './client';
import {
    RegisterRequest,
    UserResponse,
    LoginRequest,
    LoginResponse,
    LogoutResponse,
    handleApiError,
    ErrorResponse
} from './types';
import { AxiosError } from 'axios';

export const registerUser = async (
    payload: RegisterRequest
): Promise<UserResponse> => {
    try {
        const response = await apiClient.post<UserResponse>('/api/auth/register', payload);
        return response.data;
    } catch (error) {
        handleApiError(error as AxiosError<ErrorResponse>);
        throw error;
    }
};

export const loginUser = async (
    payload: LoginRequest
): Promise<LoginResponse> => {
    try {
        const response = await apiClient.post<LoginResponse>('/api/auth/login', payload);
        return response.data;
    } catch (error) {
        handleApiError(error as AxiosError<ErrorResponse>);
        throw error;
    }
};

export const logoutUser = async (): Promise<LogoutResponse> => {
    try {
        const response = await apiClient.post<LogoutResponse>('/api/auth/logout');
        return response.data;
    } catch (error) {
        handleApiError(error as AxiosError<ErrorResponse>);
        throw error;
    }
}; 