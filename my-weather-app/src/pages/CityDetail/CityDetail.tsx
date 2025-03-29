import { useParams, useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './CityDetail.module.css';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import { WeatherResponse } from '../../api';

const CityDetail = () => {
    const { cityId } = useParams<{ cityId: string }>();
    const navigate = useNavigate();

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
    };

    const weatherData = cityId ? dummyWeatherData[parseInt(cityId)] : null;

    if (!weatherData) {
        return (
            <Box className={styles.container}>
                <Paper elevation={3} className={styles.paper}>
                    <Typography variant="h5">City not found</Typography>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/favorites')}
                        sx={{ mt: 2 }}
                    >
                        Back to Favorites
                    </Button>
                </Paper>
            </Box>
        );
    }

    return (
        <Box className={styles.container}>
            <Paper elevation={3} className={styles.paper}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/favorites')}
                    sx={{ mb: 2 }}
                >
                    Back to Favorites
                </Button>
                <Box className={styles.cardContainer}>
                    <WeatherCard
                        weatherData={{
                            city: 'City Name',
                            temperature: {
                                celsius: weatherData.temperature,
                                fahrenheit: (weatherData.temperature * 9 / 5) + 32
                            },
                            description: weatherData.weather_description,
                            feelsLike: weatherData.feels_like,
                            humidity: weatherData.humidity,
                            pressure: weatherData.pressure,
                            windSpeed: weatherData.wind_speed,
                            tempMin: weatherData.temp_min,
                            tempMax: weatherData.temp_max,
                            seaLevel: weatherData.sea_level,
                            groundLevel: weatherData.grnd_level,
                            visibility: weatherData.visibility,
                            windDeg: weatherData.wind_deg,
                            windGust: weatherData.wind_gust,
                            clouds: weatherData.clouds,
                            rainOneHour: weatherData.rain_one_hour,
                            snowOneHour: weatherData.snow_one_hour
                        }}
                        onAddToFavorites={() => { }}
                        isAuthenticated={true}
                        isLoading={false}
                    />
                </Box>
            </Paper>
        </Box>
    );
};

export default CityDetail; 