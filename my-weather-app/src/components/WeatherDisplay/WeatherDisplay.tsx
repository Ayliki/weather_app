import React from 'react';
import { Box } from '@mui/material';
import WeatherCard from '../WeatherCard/WeatherCard';
import ForecastView from '../ForecastView/ForecastView';
import { ForecastResponse, WeatherResponse } from '../../api/types';
import styles from './WeatherDisplay.module.css';

interface WeatherDisplayProps {
    cityName: string;
    currentWeather: WeatherResponse | ForecastResponse['list'][0];
    forecast: ForecastResponse;
    onAddToFavorites?: () => void;
    isAuthenticated?: boolean;
    isLoading?: boolean;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
    cityName,
    currentWeather,
    forecast,
    onAddToFavorites,
    isAuthenticated = true,
    isLoading = false
}) => {
    const isForecastItem = 'main' in currentWeather && 'weather' in currentWeather;

    const weatherData = isForecastItem ? {
        city: cityName,
        temperature: {
            celsius: currentWeather.main.temp,
            fahrenheit: (currentWeather.main.temp * 9 / 5) + 32
        },
        description: currentWeather.weather[0].description,
        feelsLike: currentWeather.main.feels_like,
        humidity: currentWeather.main.humidity,
        pressure: currentWeather.main.pressure,
        windSpeed: currentWeather.wind.speed,
        tempMin: currentWeather.main.temp_min,
        tempMax: currentWeather.main.temp_max,
        seaLevel: currentWeather.main.sea_level,
        groundLevel: currentWeather.main.grnd_level,
        visibility: currentWeather.visibility,
        windDeg: currentWeather.wind.deg,
        windGust: currentWeather.wind.gust,
        clouds: currentWeather.clouds.all,
        rainOneHour: currentWeather.rain?.['1h'] || null,
        snowOneHour: currentWeather.snow?.['1h'] || null
    } : {
        city: cityName,
        temperature: {
            celsius: currentWeather.temperature,
            fahrenheit: (currentWeather.temperature * 9 / 5) + 32
        },
        description: currentWeather.weather_description,
        feelsLike: currentWeather.feels_like,
        humidity: currentWeather.humidity,
        pressure: currentWeather.pressure,
        windSpeed: currentWeather.wind_speed,
        tempMin: currentWeather.temp_min,
        tempMax: currentWeather.temp_max,
        seaLevel: currentWeather.sea_level,
        groundLevel: currentWeather.grnd_level,
        visibility: currentWeather.visibility,
        windDeg: currentWeather.wind_deg,
        windGust: currentWeather.wind_gust,
        clouds: currentWeather.clouds,
        rainOneHour: currentWeather.rain_one_hour,
        snowOneHour: currentWeather.snow_one_hour
    };

    return (
        <Box className={styles.weatherRow}>
            <Box className={styles.currentWeather}>
                <WeatherCard
                    weatherData={weatherData}
                    onAddToFavorites={onAddToFavorites}
                    isAuthenticated={isAuthenticated}
                    isLoading={isLoading}
                />
            </Box>
            <Box className={styles.forecastContainer}>
                <ForecastView forecast={forecast} />
            </Box>
        </Box>
    );
};

export default WeatherDisplay; 