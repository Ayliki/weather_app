import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
    return (
        <AppBar position="static" className={styles.header}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Weather App
                </Typography>
                <Box>
                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/"
                        className={styles.navButton}
                    >
                        Dashboard
                    </Button>
                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/favorites"
                        className={styles.navButton}
                    >
                        Favorites
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header; 