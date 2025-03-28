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