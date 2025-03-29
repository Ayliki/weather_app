import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './Favorites.module.css';
import { useAuth } from '../../context/AuthContext';
import FavoriteCard from '../../components/FavoriteCard/FavoriteCard';
import { useState } from 'react';

const Favorites = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [favoriteCities, setFavoriteCities] = useState([
        {
            id: 1,
            name: 'New York',
            temperature: 20,
            humidity: 65,
            windSpeed: 4.2,
            description: 'Clear sky'
        },
        {
            id: 2,
            name: 'Los Angeles',
            temperature: 25,
            humidity: 55,
            windSpeed: 3.6,
            description: 'Scattered clouds'
        },
        {
            id: 3,
            name: 'Chicago',
            temperature: 15,
            humidity: 75,
            windSpeed: 5.5,
            description: 'Light rain'
        },
        {
            id: 4,
            name: 'London',
            temperature: 12,
            humidity: 70,
            windSpeed: 4.8,
            description: 'Broken clouds'
        },
        {
            id: 5,
            name: 'Tokyo',
            temperature: 22,
            humidity: 60,
            windSpeed: 3.8,
            description: 'Clear sky'
        },
        {
            id: 6,
            name: 'Paris',
            temperature: 18,
            humidity: 68,
            windSpeed: 4.5,
            description: 'Partly cloudy'
        },
        {
            id: 7,
            name: 'Berlin',
            temperature: 16,
            humidity: 72,
            windSpeed: 5.2,
            description: 'Light rain'
        },
        {
            id: 8,
            name: 'Sydney',
            temperature: 24,
            humidity: 62,
            windSpeed: 4.9,
            description: 'Sunny'
        }
    ]);

    const handleUnfavorite = (cityId: number) => {
        setFavoriteCities(prevCities => prevCities.filter(city => city.id !== cityId));
    };

    if (!isAuthenticated) {
        return (
            <Box className={styles.container}>
                <Paper elevation={3} className={styles.paper}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Favorites
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Please log in to save and view your favorite cities.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/login')}
                        className={styles.loginButton}
                    >
                        Log In
                    </Button>
                </Paper>
            </Box>
        );
    }

    return (
        <Box className={styles.container}>
            <Paper elevation={3} className={styles.paper}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Favorites
                </Typography>
                <div className={styles.cityGrid}>
                    {favoriteCities.map((city) => (
                        <FavoriteCard
                            key={city.id}
                            city={city}
                            onClick={() => navigate(`/city/${city.id}`)}
                            onUnfavorite={handleUnfavorite}
                        />
                    ))}
                </div>
            </Paper>
        </Box>
    );
};

export default Favorites; 