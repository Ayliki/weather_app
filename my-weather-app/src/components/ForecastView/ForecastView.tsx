import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { ForecastResponse } from '../../api/types';
import { format } from 'date-fns';
import styles from './ForecastView.module.css';

interface ForecastViewProps {
    forecast: ForecastResponse;
}

const ForecastView: React.FC<ForecastViewProps> = ({ forecast }) => {
    // Group forecast items by date
    const dailyForecasts = forecast.list.reduce((acc, item) => {
        const date = format(new Date(item.dt * 1000), 'yyyy-MM-dd');
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {} as Record<string, typeof forecast.list>);

    // Get the first item for each day (midday forecast)
    const dailyItems = Object.values(dailyForecasts).map(items => items[0]);

    return (
        <Box className={styles.container}>
            <Typography
                variant="h5"
                gutterBottom
                sx={{
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '24px',
                    textAlign: 'center'
                }}
            >
                5-Day Forecast
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' }, gap: 2 }}>
                {dailyItems.map((item, index) => (
                    <Card key={index} className={styles.forecastCard}>
                        <CardContent>
                            <Typography
                                variant="subtitle1"
                                gutterBottom
                                sx={{
                                    fontWeight: 500,
                                    color: '#666'
                                }}
                            >
                                {format(new Date(item.dt * 1000), 'EEE, MMM d')}
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    color: '#333',
                                    marginBottom: '8px'
                                }}
                            >
                                {Math.round(item.main.temp)}°C
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{ marginBottom: '4px' }}
                            >
                                Feels like: {Math.round(item.main.feels_like)}°C
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{
                                    textTransform: 'capitalize',
                                    fontWeight: 500
                                }}
                            >
                                {item.weather[0].description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default ForecastView; 