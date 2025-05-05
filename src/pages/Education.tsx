import React from 'react';
import { Box, Paper, Typography, Divider, Container } from '@mui/material';
import { motion } from 'framer-motion';

const Education: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ 
          p: { xs: 2, sm: 3 }, 
          maxWidth: 800, 
          mx: 'auto',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <Paper 
            elevation={3}
            sx={{ 
              p: { xs: 3, sm: 5 },
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: (theme) => theme.shadows[8],
              }
            }}
          >
            <Typography 
              variant="h3" 
              gutterBottom 
              sx={{ 
                color: 'primary.main',
                fontWeight: 700,
                mb: 4,
                position: 'relative',
                fontSize: { xs: '2rem', sm: '2.5rem' },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -12,
                  left: 0,
                  width: '80px',
                  height: '4px',
                  backgroundColor: 'primary.main',
                  borderRadius: '2px',
                }
              }}
            >
              Education
            </Typography>
            
            <Box sx={{ mb: { xs: 4, sm: 5 } }}>
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{ 
                  color: 'primary.main',
                  fontWeight: 600,
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                }}
              >
                Master's Degree
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'text.primary',
                  fontWeight: 500,
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                }}
              >
                North Carolina State University
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: 'text.secondary',
                  mb: 2,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
                2004 - 2006
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mt: 1,
                  color: 'text.primary',
                  lineHeight: 1.8,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                }}
              >
                Advanced studies in computer science and engineering, focusing on software development and system architecture.
              </Typography>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Box sx={{ mb: { xs: 4, sm: 5 } }}>
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{ 
                  color: 'primary.main',
                  fontWeight: 600,
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                }}
              >
                Bachelor's Degree
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'text.primary',
                  fontWeight: 500,
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                }}
              >
                Morehouse College
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: 'text.secondary',
                  mb: 2,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
                2000 - 2004
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mt: 1,
                  color: 'text.primary',
                  lineHeight: 1.8,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                }}
              >
                Studied computer science and engineering, focusing on software development and system architecture.
              </Typography>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Typography 
              variant="h5" 
              gutterBottom
              sx={{ 
                color: 'primary.main',
                fontWeight: 600,
                mb: 3,
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
              }}
            >
              Relevant Coursework
            </Typography>
            
            <Box 
              component="ul" 
              sx={{ 
                pl: 2,
                '& li': {
                  mb: 2,
                  color: 'text.primary',
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  lineHeight: 1.6,
                  '&::marker': {
                    color: 'primary.main',
                    fontWeight: 'bold',
                  }
                }
              }}
            >
              <li>Computer Science Fundamentals</li>
              <li>System Architecture and Design</li>
              <li>Cloud Computing</li>
              <li>Infrastructure Management</li>
            </Box>
          </Paper>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Education; 