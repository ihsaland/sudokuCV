import React from 'react';
import { Box } from '@mui/material';

const BackgroundPattern: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        opacity: 0.05,
        backgroundImage: `
          radial-gradient(circle at 50% 50%, #dc004e 1px, transparent 1px),
          radial-gradient(circle at 50% 50%, #dc004e 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        backgroundPosition: '0 0, 20px 20px',
        pointerEvents: 'none',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(220,0,78,0.1) 0%, transparent 50%)',
          zIndex: -1,
        },
      }}
    />
  );
};

export default BackgroundPattern; 