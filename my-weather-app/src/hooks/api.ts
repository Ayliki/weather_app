import axios from 'axios';

const apiClient = axios.create({
    baseURL: '',
    headers: {
        'Content-Type': 'application/json'
    }
})

export interface CityResponse {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
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

export interface WeatherResponse {
    weather_name: string;
    weather_description: string;
    icon_url: string;
    temperature: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    sea_level: number;
    grnd_level: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    clouds: number;
    rain_one_hour?: number | null;
    snow_one_hour?: number | null;
}

export const getCurrentWeather = async (
    latitude: string,
    longitude: string
): Promise<WeatherResponse> => {
    const params = { latitude, longitude };
    const response = await apiClient.get<WeatherResponse>('/api/weather/current', { params });
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