import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import WeatherDisplay from '../../components/WeatherDisplay/WeatherDisplay';
import { getCities, getCurrentWeather, getForecast } from '../../api/weatherApi';
import { WeatherResponse, ForecastResponse } from '../../api/types';
import styles from './Dashboard.module.css';

interface WeatherData {
    currentWeather: WeatherResponse;
    forecast: ForecastResponse;
}

const Dashboard: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error';
    }>({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setSnackbar({
                open: true,
                message: 'Please enter a city name',
                severity: 'error'
            });
            return;
        }

        setIsLoading(true);
        try {
            // Search for city
            const cities = await getCities(undefined, searchQuery);
            if (cities.length === 0) {
                throw new Error('City not found');
            }

            const city = cities[0];
            setSelectedCity(city.name);

            // Get weather data
            const [currentWeather, forecast] = await Promise.all([
                getCurrentWeather(city.latitude.toString(), city.longitude.toString()),
                getForecast(city.latitude.toString(), city.longitude.toString())
            ]);

            setWeatherData({
                currentWeather,
                forecast
            });

            setSnackbar({
                open: true,
                message: `Weather data for ${city.name} loaded successfully`,
                severity: 'success'
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: error instanceof Error ? error.message : 'Failed to load weather data',
                severity: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return (
        <Box className={styles.container}>
            <Box className={styles.content}>
                <Typography variant="h4" className={styles.title}>
                    Weather Dashboard
                </Typography>
                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter city name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={styles.searchButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Search'}
                    </Button>
                </form>

                {selectedCity && weatherData ? (
                    <WeatherDisplay
                        cityName={selectedCity}
                        currentWeather={weatherData.currentWeather}
                        forecast={weatherData.forecast}
                        onAddToFavorites={() => {
                            setSnackbar({
                                open: true,
                                message: `${selectedCity} added to favorites`,
                                severity: 'success'
                            });
                        }}
                        isAuthenticated={true}
                        isLoading={isLoading}
                    />
                ) : (
                    <Box className={styles.noCitySelected}>
                        <Typography variant="h6">
                            Enter a city name to view weather information
                        </Typography>
                    </Box>
                )}
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Dashboard;