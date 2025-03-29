import { useState } from 'react';
import { getCities } from '../api/weatherApi';
import { CityResponse } from '../api/types';

export const useCities = () => {
    const [cities, setCities] = useState<CityResponse[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchCities = async (searchTerm: string) => {
        if (!searchTerm.trim()) {
            setCities([]);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const data = await getCities(undefined, searchTerm);
            setCities(data);
        } catch (err) {
            setError('Failed to fetch cities');
            console.error('Error fetching cities:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        cities,
        isLoading,
        error,
        searchCities,
        setCities
    };
}; 