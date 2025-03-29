import apiClient from './client';
import { CityResponse } from './types';

export const addToFavorites = async (city: CityResponse): Promise<void> => {
    await apiClient.post('/favorites', { cityId: city.id });
};

export const removeFromFavorites = async (cityId: number): Promise<void> => {
    await apiClient.delete(`/favorites/${cityId}`);
};

export const getFavorites = async (): Promise<CityResponse[]> => {
    const response = await apiClient.get('/favorites');
    return response.data;
}; 