import apiClient from './client';
import { CityResponse, WeatherResponse, handleApiError, ErrorResponse } from './types';
import { AxiosError } from 'axios';

export const getCities = async (
    minPopulation?: number,
    namePrefix?: string
): Promise<CityResponse[]> => {
    try {
        const params: Record<string, string | number> = {};
        if (minPopulation) params.min_population = minPopulation;
        if (namePrefix) params.name_prefix = namePrefix;

        const response = await apiClient.get<CityResponse[]>('/api/weather/cities', { params });
        return response.data;
    } catch (error) {
        handleApiError(error as AxiosError<ErrorResponse>);
        throw error;
    }
};

export const getCurrentWeather = async (
    latitude: string,
    longitude: string
): Promise<WeatherResponse> => {
    try {
        const params = { latitude, longitude };
        const response = await apiClient.get<WeatherResponse>('/api/weather/current', { params });
        return response.data;
    } catch (error) {
        handleApiError(error as AxiosError<ErrorResponse>);
        throw error;
    }
}; 