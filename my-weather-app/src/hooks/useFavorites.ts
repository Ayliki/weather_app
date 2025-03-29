import { useState, useEffect } from 'react';
import { CityResponse } from '../api/types';
import { getFavorites, addToFavorites, removeFromFavorites } from '../api/favoritesApi';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<CityResponse[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchFavorites = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getFavorites();
            setFavorites(data);
        } catch (err) {
            setError('Failed to fetch favorites');
            console.error('Error fetching favorites:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const addFavorite = async (city: CityResponse) => {
        try {
            await addToFavorites(city);
            await fetchFavorites(); // Refresh the list
            return true;
        } catch (err) {
            console.error('Error adding to favorites:', err);
            return false;
        }
    };

    const removeFavorite = async (cityId: number) => {
        try {
            await removeFromFavorites(cityId);
            await fetchFavorites(); // Refresh the list
            return true;
        } catch (err) {
            console.error('Error removing from favorites:', err);
            return false;
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return {
        favorites,
        isLoading,
        error,
        addFavorite,
        removeFavorite,
        refreshFavorites: fetchFavorites
    };
}; 