import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { dummyForecastData } from '../../data/dummyData';
import ForecastView from '../../components/ForecastView/ForecastView';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import styles from './CityDetail.module.css';

const CityDetail: React.FC = () => {
    const navigate = useNavigate();
    const weatherData = dummyForecastData.list[0];
    const cityName = "New York";

    if (!weatherData) {
        return (
            <Box className={styles.container}>
                <Typography variant="h5">City not found</Typography>
                <Button onClick={() => navigate('/favorites')}>Back to Favorites</Button>
            </Box>
        );
    }

    return (
        <Box className={styles.container}>
            <Box className={styles.content}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/favorites')}
                    className={styles.backButton}
                >
                    Back to Favorites
                </Button>
                <Box className={styles.weatherRow}>
                    <Box className={styles.currentWeather}>
                        <WeatherCard
                            weatherData={{
                                city: cityName,
                                temperature: {
                                    celsius: weatherData.main.temp,
                                    fahrenheit: (weatherData.main.temp * 9 / 5) + 32
                                },
                                description: weatherData.weather[0].description,
                                feelsLike: weatherData.main.feels_like,
                                humidity: weatherData.main.humidity,
                                pressure: weatherData.main.pressure,
                                windSpeed: weatherData.wind.speed,
                                tempMin: weatherData.main.temp_min,
                                tempMax: weatherData.main.temp_max,
                                seaLevel: weatherData.main.sea_level,
                                groundLevel: weatherData.main.grnd_level,
                                visibility: weatherData.visibility,
                                windDeg: weatherData.wind.deg,
                                windGust: weatherData.wind.gust,
                                clouds: weatherData.clouds.all,
                                rainOneHour: weatherData.rain?.['1h'] || null,
                                snowOneHour: weatherData.snow?.['1h'] || null
                            }}
                            onAddToFavorites={() => { }}
                            isAuthenticated={true}
                            isLoading={false}
                        />
                    </Box>
                    <Box className={styles.forecastContainer}>
                        <ForecastView forecast={dummyForecastData} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CityDetail; 