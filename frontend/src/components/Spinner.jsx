import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Spinner = () => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100vh" // Centered vertically in the viewport
        >
            <CircularProgress />
        </Box>
    );
};

export default Spinner;