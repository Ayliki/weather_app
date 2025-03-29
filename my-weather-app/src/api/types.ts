import { AxiosError } from 'axios';

export interface CityResponse {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
}

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

export interface LoginResponse {
    access_token: string;
}

export interface LogoutResponse {
    message: string;
}

export interface ErrorResponse {
    error: string;
}

export class ApiError extends Error {
    constructor(
        public status: number,
        public message: string,
        public data?: ErrorResponse
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export const handleApiError = (error: AxiosError<ErrorResponse>): never => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new ApiError(
            error.response.status,
            error.response.data.error || 'An error occurred',
            error.response.data
        );
    } else if (error.request) {
        // The request was made but no response was received
        throw new ApiError(0, 'No response received from server');
    } else {
        // Something happened in setting up the request that triggered an Error
        throw new ApiError(0, error.message || 'An error occurred');
    }
}; 