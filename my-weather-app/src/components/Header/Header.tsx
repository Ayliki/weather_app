import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from './Header.module.css';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

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
                    {isAuthenticated ? (
                        <Button
                            color="inherit"
                            onClick={handleLogout}
                            className={styles.navButton}
                            startIcon={<LogoutIcon />}
                        >
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Button
                                color="inherit"
                                component={RouterLink}
                                to="/login"
                                className={styles.navButton}
                            >
                                Login
                            </Button>
                            <Button
                                color="inherit"
                                component={RouterLink}
                                to="/signup"
                                className={styles.navButton}
                            >
                                Sign Up
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header; 