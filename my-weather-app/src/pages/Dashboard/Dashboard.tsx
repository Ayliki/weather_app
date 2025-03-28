import { Box, Snackbar, Alert } from '@mui/material';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import styles from './Dashboard.module.css';
import { useEffect, useState } from 'react';
import { CityResponse, getCities } from '../../hooks/api';
import SearchBar from '../../components/SearchBar/SearchBar';


const USE_DUMMY_DATA = true;

const dummyCities: CityResponse[] = [
    { id: '1', name: 'New York' },
    { id: '2', name: 'Los Angeles' },
    { id: '3', name: 'Chicago' },
];



const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState<CityResponse | null>(null);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    // TODO: Replace with actual authentication state
    const isAuthenticated = false;

    // const [cities, setCities] = useState<CityResponse[]>([]);

    // useEffect(() => {
    //   if (!USE_DUMMY_DATA) {
    //     const fetchCities = async () => {
    //       try {
    //         const data = await getCities();
    //         setCities(data);
    //       } catch (error) {
    //         console.error('Error fetching cities:', error);
    //       }
    //     };
    //     fetchCities();
    //   }
    // }, []);

    const handleSearch = () => {
        let foundCity: CityResponse | undefined;
        if (USE_DUMMY_DATA) {
            foundCity = dummyCities.find(
                (city) => city.name.toLowerCase() === searchTerm.toLowerCase()
            );
        } else {
            // foundCity = cities.find((city) => city.name.toLowerCase() === searchTerm.toLowerCase());
        }
        setSelectedCity(foundCity || null);
    };

    const handleAddToFavorites = () => {
        if (!isAuthenticated) {
            setShowLoginPrompt(true);
        } else {
            // TODO: Implement add to favorites logic
            console.log('Adding to favorites...');
        }
    };

    return (
        <Box className={styles.container}>
            <Box className={styles.searchBarRow}>
                <SearchBar
                    searchTerm={searchTerm}
                    onSearchTermChange={setSearchTerm}
                    onSearch={handleSearch}
                />
            </Box>

            <Box className={styles.cardContainer}>
                {selectedCity ? (
                    <WeatherCard
                        weatherData={{
                            city: selectedCity.name,
                            temperature: { celsius: 25, fahrenheit: 77 },
                            description: 'Sunny',
                            feelsLike: 24,
                            humidity: 60,
                            pressure: 1013,
                            windSpeed: 3,
                        }}
                        onAddToFavorites={handleAddToFavorites}
                        isAuthenticated={isAuthenticated}
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
        </Box>
    );
};

export default Dashboard;