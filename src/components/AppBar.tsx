import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';

const AppBar: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MuiAppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
          }}
        >
          <Button
            color="inherit"
            onClick={() => navigate('/')}
            sx={{
              color: '#ffffff',
              fontWeight: 700,
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            {isMobile ? 'Home' : 'Home'}
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate('/game')}
            sx={{
              color: '#ffffff',
              fontWeight: 700,
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            {isMobile ? 'Play' : 'Play Sudoku'}
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate('/cv')}
            sx={{
              color: '#ffffff',
              fontWeight: 700,
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            {isMobile ? 'CV' : 'View CV'}
          </Button>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar; 