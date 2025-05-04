import React from 'react';
import { Box, Typography, Container, Grid, Button } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import AnimatedCard from '../components/AnimatedCard';
import BackgroundPattern from '../components/BackgroundPattern';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          p: 3,
        }}
      >
        <BackgroundPattern />
        <Container maxWidth="lg">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh',
                gap: 4,
                p: 3,
                border: '2px solid #ffffff',
                borderRadius: '8px',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(5px)',
                maxWidth: '800px',
                margin: '0 auto',
              }}
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                    textAlign: 'center',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  Ian Salandy
                </Typography>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    color: '#ffffff',
                    fontWeight: 500,
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                    textAlign: 'center',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  Software Engineer & Problem Solver
                </Typography>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/game')}
                    sx={{
                      fontSize: { xs: '1rem', sm: '1.2rem' },
                      padding: { xs: '8px 16px', sm: '12px 24px' },
                      border: '2px solid #ffffff',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                        borderColor: 'primary.light',
                      },
                    }}
                  >
                    Play Sudoku
                  </Button>
                </Box>
              </motion.div>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </motion.div>
  );
};

export default Home; 