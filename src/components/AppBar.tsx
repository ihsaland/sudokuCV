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
import { Link } from 'react-router-dom';

const AppBar: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MuiAppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '0.5px solid #ffffff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
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
            component={Link}
            to="/"
            sx={{
              color: '#ffffff',
              fontWeight: 700,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              '&:hover': {
                color: '#ffff00'
              }
            }}
          >
            {isMobile ? 'Home' : 'Home'}
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/game"
            sx={{
              color: '#ffffff',
              fontWeight: 700,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              '&:hover': {
                color: '#ffff00'
              }
            }}
          >
            {isMobile ? 'Play' : 'Play Sudoku'}
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/cv"
            sx={{
              color: '#ffffff',
              fontWeight: 700,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              '&:hover': {
                color: '#ffff00'
              }
            }}
          >
            {isMobile ? 'CV' : 'View CV'}
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/contact"
            sx={{
              color: '#ffffff',
              fontWeight: 700,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              '&:hover': {
                color: '#ffff00'
              }
            }}
          >
            Contact Me
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/coding"
            sx={{
              color: '#ff0000',
              fontWeight: 700,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              '&:hover': {
                color: '#ffff00'
              },
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Test Your Might
          </Button>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar; 