import { Box } from '@mui/material';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const dummyWeatherData = {
        city: 'New York',
        temperature: {
            celsius: 22,
            fahrenheit: 72,
        },
        description: 'Clear sky',
        feelsLike: 21,
        humidity: 65,
        pressure: 1015,
        windSpeed: 3.5,
    };

    return (
        <Box className={styles.container}>
            <WeatherCard weatherData={dummyWeatherData} />
        </Box>
    );
};

export default Dashboard;