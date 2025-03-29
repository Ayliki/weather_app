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
import AirIcon from '@mui/icons-material/Air';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import CompressIcon from '@mui/icons-material/Compress';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
    tempMin: number;
    tempMax: number;
    seaLevel: number;
    groundLevel: number;
    visibility: number;
    windDeg: number;
    windGust: number;
    clouds: number;
    rainOneHour?: number | null;
    snowOneHour?: number | null;
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
                            <Box className={styles.detailItem}>
                                <ThermostatIcon className={styles.detailIcon} />
                                <Typography variant="body2">
                                    Feels like: {weatherData.feelsLike}°C
                                </Typography>
                            </Box>
                            <Box className={styles.detailItem}>
                                <WaterDropIcon className={styles.detailIcon} />
                                <Typography variant="body2">
                                    Humidity: {weatherData.humidity}%
                                </Typography>
                            </Box>
                            <Box className={styles.detailItem}>
                                <CompressIcon className={styles.detailIcon} />
                                <Typography variant="body2">
                                    Pressure: {weatherData.pressure} hPa
                                </Typography>
                            </Box>
                            <Box className={styles.detailItem}>
                                <AirIcon className={styles.detailIcon} />
                                <Typography variant="body2">
                                    Wind: {weatherData.windSpeed} m/s
                                </Typography>
                            </Box>
                            <Box className={styles.detailItem}>
                                <VisibilityIcon className={styles.detailIcon} />
                                <Typography variant="body2">
                                    Visibility: {weatherData.visibility / 1000} km
                                </Typography>
                            </Box>
                            <Box className={styles.detailItem}>
                                <CloudIcon className={styles.detailIcon} />
                                <Typography variant="body2">
                                    Clouds: {weatherData.clouds}%
                                </Typography>
                            </Box>
                            <Box className={styles.detailItem}>
                                <ThermostatIcon className={styles.detailIcon} />
                                <Typography variant="body2">
                                    Min: {weatherData.tempMin}°C
                                </Typography>
                            </Box>
                            <Box className={styles.detailItem}>
                                <ThermostatIcon className={styles.detailIcon} />
                                <Typography variant="body2">
                                    Max: {weatherData.tempMax}°C
                                </Typography>
                            </Box>
                            {weatherData.rainOneHour && (
                                <Box className={styles.detailItem}>
                                    <WaterDropIcon className={styles.detailIcon} />
                                    <Typography variant="body2">
                                        Rain (1h): {weatherData.rainOneHour} mm
                                    </Typography>
                                </Box>
                            )}
                            {weatherData.snowOneHour && (
                                <Box className={styles.detailItem}>
                                    <AcUnitIcon className={styles.detailIcon} />
                                    <Typography variant="body2">
                                        Snow (1h): {weatherData.snowOneHour} mm
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default WeatherCard;
