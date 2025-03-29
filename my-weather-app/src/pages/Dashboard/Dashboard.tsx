import { Box, Snackbar, Alert, Menu, MenuItem, ListItemText, Typography } from '@mui/material';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import ForecastView from '../../components/ForecastView/ForecastView';
import styles from './Dashboard.module.css';
import { useState, useRef } from 'react';
import { CityResponse, WeatherResponse } from '../../api/types';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../hooks/useFavorites';
import { useWeather } from '../../hooks/useWeather';
import { useCities } from '../../hooks/useCities';
import { dummyForecastData } from '../../data/dummyData';

const USE_DUMMY_DATA = true;

const dummyCities: CityResponse[] = [
    { id: 1, name: 'New York', longitude: -74.006, latitude: 40.7128 },
    { id: 2, name: 'Los Angeles', longitude: -118.2437, latitude: 34.0522 },
    { id: 3, name: 'Chicago', longitude: -87.6298, latitude: 41.8781 },
    { id: 4, name: 'London', longitude: -0.1276, latitude: 51.5074 },
    { id: 5, name: 'Tokyo', longitude: 139.6917, latitude: 35.6895 },
    { id: 6, name: 'New York Main', longitude: -75.006, latitude: 41.7128 },
];

const dummyWeatherData: Record<number, WeatherResponse> = {
    1: { // New York
        weather_name: 'Clear',
        weather_description: 'clear sky',
        icon_url: '01d',
        temperature: 20,
        feels_like: 19,
        pressure: 1015,
        humidity: 65,
        temp_min: 17,
        temp_max: 23,
        sea_level: 1015,
        grnd_level: 1010,
        visibility: 10000,
        wind_speed: 4.12,
        wind_deg: 180,
        wind_gust: 5.5,
        clouds: 0,
        rain_one_hour: null,
        snow_one_hour: null
    },
    2: { // Los Angeles
        weather_name: 'Clouds',
        weather_description: 'scattered clouds',
        icon_url: '03d',
        temperature: 25,
        feels_like: 24,
        pressure: 1013,
        humidity: 55,
        temp_min: 22,
        temp_max: 28,
        sea_level: 1013,
        grnd_level: 1008,
        visibility: 10000,
        wind_speed: 3.6,
        wind_deg: 270,
        wind_gust: 4.8,
        clouds: 40,
        rain_one_hour: null,
        snow_one_hour: null
    },
    3: { // Chicago
        weather_name: 'Rain',
        weather_description: 'light rain',
        icon_url: '10d',
        temperature: 15,
        feels_like: 14,
        pressure: 1012,
        humidity: 75,
        temp_min: 12,
        temp_max: 18,
        sea_level: 1012,
        grnd_level: 1007,
        visibility: 8000,
        wind_speed: 5.5,
        wind_deg: 90,
        wind_gust: 7.2,
        clouds: 75,
        rain_one_hour: 0.5,
        snow_one_hour: null
    },
    4: { // London
        weather_name: 'Clouds',
        weather_description: 'broken clouds',
        icon_url: '04d',
        temperature: 12,
        feels_like: 11,
        pressure: 1016,
        humidity: 70,
        temp_min: 9,
        temp_max: 15,
        sea_level: 1016,
        grnd_level: 1011,
        visibility: 9000,
        wind_speed: 4.8,
        wind_deg: 240,
        wind_gust: 6.5,
        clouds: 75,
        rain_one_hour: null,
        snow_one_hour: null
    },
    5: { // Tokyo
        weather_name: 'Clear',
        weather_description: 'clear sky',
        icon_url: '01d',
        temperature: 22,
        feels_like: 21,
        pressure: 1014,
        humidity: 60,
        temp_min: 19,
        temp_max: 25,
        sea_level: 1014,
        grnd_level: 1009,
        visibility: 10000,
        wind_speed: 3.8,
        wind_deg: 135,
        wind_gust: 5.2,
        clouds: 0,
        rain_one_hour: null,
        snow_one_hour: null
    },
    6: { // New York Main
        weather_name: 'Clouds',
        weather_description: 'scattered clouds',
        icon_url: '03d',
        temperature: 18,
        feels_like: 17,
        pressure: 1014,
        humidity: 68,
        temp_min: 15,
        temp_max: 21,
        sea_level: 1014,
        grnd_level: 1009,
        visibility: 9500,
        wind_speed: 4.5,
        wind_deg: 190,
        wind_gust: 6.0,
        clouds: 35,
        rain_one_hour: null,
        snow_one_hour: null
    },
};

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState<CityResponse | null>(null);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const searchBarRef = useRef<HTMLDivElement>(null);
    const { isAuthenticated } = useAuth();
    const { addFavorite } = useFavorites();
    const { weatherData, isLoading: isWeatherLoading, convertCelsiusToFahrenheit } = useWeather(
        selectedCity?.latitude.toString() || null,
        selectedCity?.longitude.toString() || null
    );
    const { cities, isLoading: isCitiesLoading, searchCities, setCities } = useCities();

    const handleSearch = async () => {
        if (USE_DUMMY_DATA) {
            const foundCities = dummyCities.filter(
                (city) => city.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setCities(foundCities);
            setAnchorEl(searchBarRef.current);
        } else {
            await searchCities(searchTerm);
            setAnchorEl(searchBarRef.current);
        }
    };

    const handleCitySelect = (city: CityResponse) => {
        setSelectedCity(city);
        setAnchorEl(null);
        setSearchTerm(city.name);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

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

    const getWeatherData = () => {
        if (USE_DUMMY_DATA && selectedCity) {
            return dummyWeatherData[selectedCity.id];
        }
        return weatherData;
    };

    const getForecastData = () => {
        if (USE_DUMMY_DATA && selectedCity) {
            return dummyForecastData;
        }
        // In a real app, you would fetch forecast data here
        return dummyForecastData;
    };

    return (
        <Box className={styles.container}>
            <Box className={styles.searchBarRow} ref={searchBarRef}>
                <SearchBar
                    searchTerm={searchTerm}
                    onSearchTermChange={setSearchTerm}
                    onSearch={handleSearch}
                    isLoading={isCitiesLoading}
                />
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                PaperProps={{
                    style: {
                        maxHeight: 300,
                        width: '100%',
                        maxWidth: searchBarRef.current?.offsetWidth,
                    },
                }}
            >
                {cities.map((city) => (
                    <MenuItem key={city.id} onClick={() => handleCitySelect(city)}>
                        <ListItemText primary={city.name} />
                    </MenuItem>
                ))}
            </Menu>

            <Box className={styles.cardContainer}>
                {selectedCity ? (
                    <Box className={styles.weatherRow}>
                        <Box className={styles.currentWeather}>
                            <WeatherCard
                                weatherData={{
                                    city: selectedCity.name,
                                    temperature: getWeatherData() ? {
                                        celsius: getWeatherData()!.temperature,
                                        fahrenheit: convertCelsiusToFahrenheit(getWeatherData()!.temperature),
                                    } : { celsius: 0, fahrenheit: 0 },
                                    description: getWeatherData()?.weather_description || '',
                                    feelsLike: getWeatherData()?.feels_like || 0,
                                    humidity: getWeatherData()?.humidity || 0,
                                    pressure: getWeatherData()?.pressure || 0,
                                    windSpeed: getWeatherData()?.wind_speed || 0,
                                    tempMin: getWeatherData()?.temp_min || 0,
                                    tempMax: getWeatherData()?.temp_max || 0,
                                    seaLevel: getWeatherData()?.sea_level || 0,
                                    groundLevel: getWeatherData()?.grnd_level || 0,
                                    visibility: getWeatherData()?.visibility || 0,
                                    windDeg: getWeatherData()?.wind_deg || 0,
                                    windGust: getWeatherData()?.wind_gust || 0,
                                    clouds: getWeatherData()?.clouds || 0,
                                    rainOneHour: getWeatherData()?.rain_one_hour || null,
                                    snowOneHour: getWeatherData()?.snow_one_hour || null
                                }}
                                onAddToFavorites={handleAddToFavorites}
                                isAuthenticated={isAuthenticated}
                                isLoading={isWeatherLoading}
                            />
                        </Box>
                        <Box className={styles.forecastContainer}>
                            <ForecastView forecast={getForecastData()} />
                        </Box>
                    </Box>
                ) : (
                    <Typography variant="h6" className={styles.noCitySelected}>
                        Search for a city to view weather information
                    </Typography>
                )}
            </Box>

            <Snackbar
                open={showLoginPrompt}
                autoHideDuration={6000}
                onClose={() => setShowLoginPrompt(false)}
            >
                <Alert severity="info" onClose={() => setShowLoginPrompt(false)}>
                    Please log in to add cities to your favorites
                </Alert>
            </Snackbar>

            <Snackbar
                open={showSuccessMessage}
                autoHideDuration={6000}
                onClose={() => setShowSuccessMessage(false)}
            >
                <Alert severity="success" onClose={() => setShowSuccessMessage(false)}>
                    City added to favorites successfully
                </Alert>
            </Snackbar>

            <Snackbar
                open={showErrorMessage}
                autoHideDuration={6000}
                onClose={() => setShowErrorMessage(false)}
            >
                <Alert severity="error" onClose={() => setShowErrorMessage(false)}>
                    Failed to add city to favorites
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Dashboard;