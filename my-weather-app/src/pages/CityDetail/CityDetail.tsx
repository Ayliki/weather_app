import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { dummyForecastData } from '../../data/dummyData';
import WeatherDisplay from '../../components/WeatherDisplay/WeatherDisplay';
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
                <WeatherDisplay
                    cityName={cityName}
                    currentWeather={weatherData}
                    forecast={dummyForecastData}
                    onAddToFavorites={() => { }}
                    isAuthenticated={true}
                    isLoading={false}
                />
            </Box>
        </Box>
    );
};

export default CityDetail; 