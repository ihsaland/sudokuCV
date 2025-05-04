import React from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';

const Education: React.FC = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 800, mx: 'auto' }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, sm: 4 },
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
          }
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            color: 'primary.main',
            fontWeight: 600,
            mb: 3,
            position: 'relative',
            fontSize: { xs: '1.75rem', sm: '2rem' },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: 0,
              width: '60px',
              height: '4px',
              backgroundColor: 'primary.main',
              borderRadius: '2px',
            }
          }}
        >
          Education
        </Typography>
        
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ 
              color: 'primary.main',
              fontWeight: 500,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
            }}
          >
            Bachelor's Degree
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{ 
              fontWeight: 500,
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            North Carolina State University
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 2,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
            }}
          >
            2000 - 2004
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mt: 1,
              color: 'text.secondary',
              lineHeight: 1.8,
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            Studied computer science and engineering, focusing on software development and system architecture.
          </Typography>
        </Box>

        <Divider sx={{ my: { xs: 2, sm: 3 } }} />

        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ 
            color: 'primary.main',
            fontWeight: 500,
            mb: 2,
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
          }}
        >
          Relevant Coursework
        </Typography>
        
        <Box 
          component="ul" 
          sx={{ 
            pl: 2,
            '& li': {
              mb: 1.5,
              color: 'text.secondary',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              '&::marker': {
                color: 'primary.main',
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
  );
};

export default Education; 