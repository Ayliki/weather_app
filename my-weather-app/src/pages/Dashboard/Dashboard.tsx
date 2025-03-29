import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { dummyForecastData } from '../../data/dummyData';
import WeatherDisplay from '../../components/WeatherDisplay/WeatherDisplay';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
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

        try {
            // TODO: Implement actual API call
            setSelectedCity(searchQuery);
            setSnackbar({
                open: true,
                message: `Weather data for ${searchQuery} loaded successfully`,
                severity: 'success'
            });
        } catch {
            setSnackbar({
                open: true,
                message: 'Failed to load weather data',
                severity: 'error'
            });
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
                    >
                        Search
                    </Button>
                </form>

                {selectedCity ? (
                    <WeatherDisplay
                        cityName={selectedCity}
                        currentWeather={dummyForecastData.list[0]}
                        forecast={dummyForecastData}
                        onAddToFavorites={() => {
                            setSnackbar({
                                open: true,
                                message: `${selectedCity} added to favorites`,
                                severity: 'success'
                            });
                        }}
                        isAuthenticated={true}
                        isLoading={false}
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