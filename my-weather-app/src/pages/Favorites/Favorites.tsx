import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './Favorites.module.css';
import { useAuth } from '../../context/AuthContext';

const Favorites = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

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
                <Typography variant="body1" color="text.secondary">
                    Your favorite cities will appear here. Add cities to your favorites to see their weather information.
                </Typography>
            </Paper>
        </Box>
    );
};

export default Favorites; 