import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';
import { useUnlockedSections } from '../context/UnlockedSectionsContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  section: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, section }) => {
  const { isSectionUnlocked } = useUnlockedSections();
  const location = useLocation();

  if (!isSectionUnlocked(section)) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          p: 3,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            maxWidth: 600,
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            Section Locked
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Complete the corresponding Sudoku puzzle to unlock this section of the CV.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Return to the game to continue unlocking sections.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute; 