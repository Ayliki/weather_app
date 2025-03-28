import React from 'react';
import { Card, CardContent, CardHeader, Typography, Box } from '@mui/material';

interface WeatherCardProps {
    city: string;
    temperatureC: number;
    temperatureF: number;
    description: string;
    feelsLike: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    iconUrl?: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
    city,
    temperatureC,
    temperatureF,
    description,
    feelsLike,
    humidity,
    pressure,
    windSpeed,
    iconUrl,
}) => {
    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardHeader title={city} />
            <CardContent>
                <Box display="flex" alignItems="center">
                    {iconUrl && (
                        <img
                            src={iconUrl}
                            alt={description}
                            style={{ width: 50, height: 50, marginRight: 16 }}
                        />
                    )}
                    <Box>
                        <Typography variant="h6">{description}</Typography>
                        <Typography variant="body2">
                            Temperature: {temperatureC}°C / {temperatureF}°F
                        </Typography>
                        <Typography variant="body2">Feels Like: {feelsLike}°C</Typography>
                        <Typography variant="body2">Humidity: {humidity}%</Typography>
                        <Typography variant="body2">Pressure: {pressure} hPa</Typography>
                        <Typography variant="body2">
                            Wind Speed: {windSpeed} m/s
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default WeatherCard;
