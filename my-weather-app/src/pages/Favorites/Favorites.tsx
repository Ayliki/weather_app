import { Box, Typography } from '@mui/material';
import styles from './Favorites.module.css';

const Favorites = () => {
    return (
        <Box className={styles.container}>
            <Typography variant="h4" component="h1" gutterBottom>
                Favorites
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Your favorite cities will appear here. Add cities to your favorites to see their weather information.
            </Typography>
        </Box>
    );
};

export default Favorites; 