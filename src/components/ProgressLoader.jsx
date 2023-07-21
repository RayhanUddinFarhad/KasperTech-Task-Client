import { Box } from '@mui/material';
import React from 'react';

const ProgressLoader = () => {
    return (
            <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
    );
};

export default ProgressLoader;