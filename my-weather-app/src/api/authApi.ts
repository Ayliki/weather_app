import apiClient from './client';
import { RegisterRequest, UserResponse, LoginRequest, LoginResponse, LogoutResponse } from './types';

export const registerUser = async (
    payload: RegisterRequest
): Promise<UserResponse> => {
    const response = await apiClient.post<UserResponse>('/api/auth/register', payload);
    return response.data;
};

export const loginUser = async (
    payload: LoginRequest
): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/api/auth/login', payload);
    return response.data;
};

export const logoutUser = async (): Promise<LogoutResponse> => {
    const response = await apiClient.post<LogoutResponse>('/api/auth/logout');
    return response.data;
}; 