import { useState, useEffect } from 'react';
import { getCurrentWeather } from '../api/weatherApi';
import { WeatherResponse } from '../api/types';

export const useWeather = (latitude: string | null, longitude: string | null) => {
    const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!latitude || !longitude) {
                setWeatherData(null);
                return;
            }

            setIsLoading(true);
            setError(null);
            try {
                const data = await getCurrentWeather(latitude, longitude);
                setWeatherData(data);
            } catch (err) {
                setError('Failed to fetch weather data');
                console.error('Error fetching weather data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWeatherData();
    }, [latitude, longitude]);

    const convertKelvinToCelsius = (kelvin: number): number => {
        return Math.round(kelvin - 273.15);
    };

    const convertKelvinToFahrenheit = (kelvin: number): number => {
        return Math.round((kelvin - 273.15) * 9 / 5 + 32);
    };

    return {
        weatherData,
        isLoading,
        error,
        convertKelvinToCelsius,
        convertKelvinToFahrenheit
    };
}; 