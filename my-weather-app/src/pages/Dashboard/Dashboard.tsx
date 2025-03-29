import { Box, Snackbar, Alert } from '@mui/material';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import styles from './Dashboard.module.css';
import { useEffect, useState } from 'react';
import { CityResponse, getCurrentWeather, WeatherResponse } from '../../api';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../hooks/useFavorites';

const USE_DUMMY_DATA = true;

const dummyCities: CityResponse[] = [
    { id: 1, name: 'New York', longitude: -74.006, latitude: 40.7128 },
    { id: 2, name: 'Los Angeles', longitude: -118.2437, latitude: 34.0522 },
    { id: 3, name: 'Chicago', longitude: -87.6298, latitude: 41.8781 },
];

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState<CityResponse | null>(null);
    const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const { isAuthenticated } = useAuth();
    const { addFavorite } = useFavorites();

    const handleSearch = () => {
        setIsSearching(true);
        let foundCity: CityResponse | undefined;
        if (USE_DUMMY_DATA) {
            foundCity = dummyCities.find(
                (city) => city.name.toLowerCase() === searchTerm.toLowerCase()
            );
        } else {
            // foundCity = cities.find((city) => city.name.toLowerCase() === searchTerm.toLowerCase());
        }
        setSelectedCity(foundCity || null);
        setIsSearching(false);
    };

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (selectedCity) {
                setIsLoading(true);
                try {
                    const weather = await getCurrentWeather(
                        selectedCity.latitude.toString(),
                        selectedCity.longitude.toString()
                    );
                    setWeatherData(weather);
                } catch (error) {
                    console.error('Error fetching weather data:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchWeatherData();
    }, [selectedCity]);

    const handleAddToFavorites = async () => {
        if (!isAuthenticated) {
            setShowLoginPrompt(true);
            return;
        }

        if (!selectedCity) {
            setShowErrorMessage(true);
            return;
        }

        const success = await addFavorite(selectedCity);
        if (success) {
            setShowSuccessMessage(true);
        } else {
            setShowErrorMessage(true);
        }
    };

    const convertKelvinToCelsius = (kelvin: number): number => {
        return Math.round(kelvin - 273.15);
    };

    const convertKelvinToFahrenheit = (kelvin: number): number => {
        return Math.round((kelvin - 273.15) * 9 / 5 + 32);
    };

    return (
        <Box className={styles.container}>
            <Box className={styles.searchBarRow}>
                <SearchBar
                    searchTerm={searchTerm}
                    onSearchTermChange={setSearchTerm}
                    onSearch={handleSearch}
                    isLoading={isSearching}
                />
            </Box>

            <Box className={styles.cardContainer}>
                {selectedCity ? (
                    <WeatherCard
                        weatherData={{
                            city: selectedCity.name,
                            temperature: weatherData ? {
                                celsius: convertKelvinToCelsius(weatherData.temperature),
                                fahrenheit: convertKelvinToFahrenheit(weatherData.temperature),
                            } : { celsius: 0, fahrenheit: 0 },
                            description: weatherData?.weather_description || '',
                            feelsLike: weatherData ? convertKelvinToCelsius(weatherData.feels_like) : 0,
                            humidity: weatherData?.humidity || 0,
                            pressure: weatherData?.pressure || 0,
                            windSpeed: weatherData?.wind_speed || 0,
                        }}
                        onAddToFavorites={handleAddToFavorites}
                        isAuthenticated={isAuthenticated}
                        isLoading={isLoading}
                    />
                ) : (
                    <p>No city selected. Please search for a city.</p>
                )}
            </Box>

            <Snackbar
                open={showLoginPrompt}
                autoHideDuration={6000}
                onClose={() => setShowLoginPrompt(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setShowLoginPrompt(false)}
                    severity="info"
                    sx={{ width: '100%' }}
                >
                    Please log in to save cities to your favorites
                </Alert>
            </Snackbar>

            <Snackbar
                open={showSuccessMessage}
                autoHideDuration={6000}
                onClose={() => setShowSuccessMessage(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setShowSuccessMessage(false)}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    City added to favorites successfully!
                </Alert>
            </Snackbar>

            <Snackbar
                open={showErrorMessage}
                autoHideDuration={6000}
                onClose={() => setShowErrorMessage(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setShowErrorMessage(false)}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    Failed to add city to favorites. Please try again.
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Dashboard;