import React from 'react';
import { Box } from '@mui/material';
import WeatherCard from '../WeatherCard/WeatherCard';
import ForecastView from '../ForecastView/ForecastView';
import { ForecastResponse } from '../../api/types';
import styles from './WeatherDisplay.module.css';

interface WeatherDisplayProps {
    cityName: string;
    currentWeather: ForecastResponse['list'][0];
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
    return (
        <Box className={styles.weatherRow}>
            <Box className={styles.currentWeather}>
                <WeatherCard
                    weatherData={{
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
                    }}
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