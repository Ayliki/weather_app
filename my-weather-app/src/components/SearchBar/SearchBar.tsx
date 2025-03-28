import React from 'react';
import { TextField, Button, Box, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from './SearchBar.module.css';

interface SearchBarProps {
    searchTerm: string;
    onSearchTermChange: (value: string) => void;
    onSearch: () => void;
    isLoading?: boolean;
}

const SearchBar = ({ searchTerm, onSearchTermChange, onSearch, isLoading = false }: SearchBarProps) => {
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <Box className={styles.searchBarContainer}>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search for a city..."
                value={searchTerm}
                onChange={(e) => onSearchTermChange(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={onSearch}
                disabled={isLoading}
                className={styles.searchButton}
                startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
            >
                {isLoading ? 'Searching...' : 'Search'}
            </Button>
        </Box>
    );
};

export default SearchBar;
