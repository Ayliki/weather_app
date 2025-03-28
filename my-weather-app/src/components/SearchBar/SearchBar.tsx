import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import styles from './SearchBar.module.css';

interface SearchBarProps {
    searchTerm: string;
    onSearchTermChange: (value: string) => void;
    onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchTermChange, onSearch }) => {
    return (
        <Box className={styles.searchContainer}>
            <TextField
                label="Search City"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => onSearchTermChange(e.target.value)}
                className={styles.textField}
            />
            <Button variant="contained" onClick={onSearch} className={styles.searchButton}>
                Search
            </Button>
        </Box>
    );
};

export default SearchBar;
