import React from 'react';
import { Paper, Typography, Box, IconButton } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styles from './FavoriteCard.module.css';

interface FavoriteCardProps {
    city: {
        id: number;
        name: string;
        temperature: number;
        humidity?: number;
        windSpeed?: number;
        description?: string;
    };
    onClick: () => void;
    onUnfavorite: (cityId: number) => void;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({ city, onClick, onUnfavorite }) => {
    const handleUnfavorite = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click when clicking the unfavorite button
        onUnfavorite(city.id);
    };

    return (
        <Paper
            elevation={2}
            className={styles.card}
            onClick={onClick}
        >
            <Box className={styles.header}>
                <Typography variant="h6" className={styles.cityName}>
                    {city.name}
                </Typography>
                <IconButton
                    onClick={handleUnfavorite}
                    className={styles.unfavoriteButton}
                    size="small"
                >
                    <FavoriteIcon color="error" />
                </IconButton>
            </Box>

            <Box className={styles.weatherInfo}>
                <Box className={styles.mainTemp}>
                    <ThermostatIcon />
                    <Typography variant="h4">
                        {city.temperature}°C
                    </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" className={styles.description}>
                    {city.description || 'Clear sky'}
                </Typography>

                <Box className={styles.details}>
                    <Box className={styles.detailItem}>
                        <WaterDropIcon fontSize="small" />
                        <Typography variant="body2">
                            {city.humidity || 65}%
                        </Typography>
                    </Box>

                    <Box className={styles.detailItem}>
                        <AirIcon fontSize="small" />
                        <Typography variant="body2">
                            {city.windSpeed || 4.5} m/s
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};

export default FavoriteCard; 