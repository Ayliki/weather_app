import axios from 'axios';

const apiClient = axios.create({
    baseURL: '',
    headers: {
        'Content-Type': 'application/json'
    }
})

export interface CityResponse {
    id: string,
    name: string,
}

export const getCities = async (
    minPopulation?: number,
    namePrefix?: string
): Promise<CityResponse[]> => {
    const params: Record<string, string | number> = {};
    if (minPopulation) params.min_population = minPopulation;
    if (namePrefix) params.name_prefix = namePrefix;

    const response = await apiClient.get<CityResponse[]>('/api/weather/cities', { params });
    return response.data;
};

export interface RegisterRequest {
    email: string;
    password: string;
}

export interface UserResponse {
    id: string;
    email: string;
    created_at: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export const registerUser = async (
    payload: RegisterRequest
): Promise<UserResponse> => {
    const response = await apiClient.post<UserResponse>('/api/auth/register', payload);
    return response.data;
};


export const loginUser = async (
    payload: LoginRequest
): Promise<{ access_token: string }> => {
    const response = await apiClient.post<{ access_token: string }>('/api/auth/login', payload);
    return response.data;
};

export const logoutUser = async (): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/api/auth/logout');
    return response.data;
};

export default apiClient;