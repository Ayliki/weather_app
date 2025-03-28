import { useState } from 'react';
import { Card, CardHeader, CardContent, Typography, Box, IconButton, Tooltip, CircularProgress } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styles from './WeatherCard.module.css';

interface WeatherData {
    city: string;
    temperature: {
        celsius: number;
        fahrenheit: number;
    };
    description: string;
    feelsLike: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
}

interface WeatherCardProps {
    weatherData: WeatherData;
    onAddToFavorites?: () => void;
    isAuthenticated?: boolean;
    isLoading?: boolean;
}

const getWeatherIcon = (description: string) => {
    const lowerDescription = description.toLowerCase();

    if (lowerDescription.includes('clear') || lowerDescription.includes('sunny')) {
        return <WbSunnyIcon className={styles.icon} />;
    } else if (lowerDescription.includes('cloud')) {
        if (lowerDescription.includes('partly')) {
            return <CloudQueueIcon className={styles.icon} />;
        }
        return <CloudIcon className={styles.icon} />;
    } else if (lowerDescription.includes('rain')) {
        return <WaterDropIcon className={styles.icon} />;
    } else if (lowerDescription.includes('storm') || lowerDescription.includes('thunder')) {
        return <ThunderstormIcon className={styles.icon} />;
    } else if (lowerDescription.includes('snow')) {
        return <AcUnitIcon className={styles.icon} />;
    }

    // Default icon
    return <WbSunnyIcon className={styles.icon} />;
};

const WeatherCard = ({ weatherData, onAddToFavorites, isAuthenticated = false, isLoading = false }: WeatherCardProps) => {
    const weatherIcon = getWeatherIcon(weatherData.description);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavoriteClick = () => {
        if (onAddToFavorites) {
            onAddToFavorites();
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <Card className={styles.card}>
            <CardHeader
                avatar={weatherIcon}
                title={weatherData.city}
                className={styles.cardHeader}
                action={
                    <Tooltip title={isAuthenticated ? "Add to favorites" : "Login to add favorites"}>
                        <IconButton
                            onClick={handleFavoriteClick}
                            color={isFavorite ? "error" : "default"}
                            className={styles.favoriteButton}
                        >
                            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                    </Tooltip>
                }
            />
            <CardContent>
                {isLoading ? (
                    <Box className={styles.loadingContainer}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Box className={styles.temperatureContainer}>
                            <Typography variant="h4" component="div">
                                {weatherData.temperature.celsius}°C
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                {weatherData.temperature.fahrenheit}°F
                            </Typography>
                        </Box>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            {weatherData.description}
                        </Typography>
                        <Box className={styles.detailsContainer}>
                            <Typography variant="body2">
                                Feels like: {weatherData.feelsLike}°C
                            </Typography>
                            <Typography variant="body2">
                                Humidity: {weatherData.humidity}%
                            </Typography>
                            <Typography variant="body2">
                                Pressure: {weatherData.pressure} hPa
                            </Typography>
                            <Typography variant="body2">
                                Wind Speed: {weatherData.windSpeed} m/s
                            </Typography>
                        </Box>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default WeatherCard;
