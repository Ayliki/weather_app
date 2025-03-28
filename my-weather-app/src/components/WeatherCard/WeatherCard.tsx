import { Card, CardHeader, CardContent, Typography, Box } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
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
}

const WeatherCard = ({ weatherData }: WeatherCardProps) => {
    return (
        <Card className={styles.card}>
            <CardHeader
                avatar={<WbSunnyIcon className={styles.icon} />}
                title={weatherData.city}
                className={styles.cardHeader}
            />
            <CardContent>
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
            </CardContent>
        </Card>
    );
};

export default WeatherCard;
