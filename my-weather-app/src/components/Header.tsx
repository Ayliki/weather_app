import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* App title */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Weather App
                    </Typography>
                    {/* Navigation Buttons */}
                    <Button color="inherit" component={Link} to="/">
                        Dashboard
                    </Button>
                    <Button color="inherit" component={Link} to="/favorites">
                        Favorites
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
