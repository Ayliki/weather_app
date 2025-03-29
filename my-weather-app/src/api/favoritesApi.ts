import apiClient from './client';
import { CityResponse } from './types';

export const getFavorites = async (): Promise<CityResponse[]> => {
    const response = await apiClient.get('/api/favorites');
    return response.data;
};

export const addToFavorites = async (city: CityResponse): Promise<void> => {
    await apiClient.post('/api/favorites', city);
};

export const removeFromFavorites = async (cityId: number): Promise<void> => {
    await apiClient.delete(`/api/favorites/${cityId}`);
}; 