import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { keyframes } from '@mui/system';

const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const LoadingSpinner: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        animation: `${pulseAnimation} 2s ease-in-out infinite`,
      }}
    >
      <CircularProgress
        size={60}
        thickness={4}
        sx={{
          color: '#dc004e',
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          },
        }}
      />
    </Box>
  );
};

export default LoadingSpinner; 