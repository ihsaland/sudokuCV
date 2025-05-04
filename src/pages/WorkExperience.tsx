import React from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';

const WorkExperience: React.FC = () => {
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
          Work Experience
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
            Salesforce Engineer
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{ 
              fontWeight: 500,
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            Salesforce
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 2,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
            }}
          >
            Present
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mt: 1,
              color: 'text.secondary',
              lineHeight: 1.8,
              mb: 2,
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            Driving innovation in infrastructure engineering and building resilient, scalable systems.
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
            <li>Leading infrastructure engineering initiatives</li>
            <li>Implementing scalable system architectures</li>
            <li>Optimizing financial operations and resource allocation</li>
            <li>Developing strategic solutions for complex technical challenges</li>
          </Box>
        </Box>

        <Divider sx={{ my: { xs: 2, sm: 3 } }} />

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
            Previous Experience
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{ 
              fontWeight: 500,
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            Various Companies
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 2,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
            }}
          >
            2007 - 2010
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mt: 1,
              color: 'text.secondary',
              lineHeight: 1.8,
              mb: 2,
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            Gained extensive experience in software development and infrastructure management.
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
            <li>Developed and maintained enterprise software solutions</li>
            <li>Managed infrastructure and deployment processes</li>
            <li>Collaborated with cross-functional teams</li>
            <li>Implemented best practices in software development</li>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default WorkExperience; 