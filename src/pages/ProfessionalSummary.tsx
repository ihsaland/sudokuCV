import React from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';

const ProfessionalSummary: React.FC = () => {
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
          Professional Summary
        </Typography>
        
        <Typography 
          variant="body1" 
          paragraph
          sx={{ 
            fontSize: { xs: '1rem', sm: '1.1rem' },
            lineHeight: 1.8,
            color: 'text.secondary',
            mb: 3,
          }}
        >
          Experienced software engineer with a strong background in Salesforce development and infrastructure engineering. 
          Proven track record of driving innovation in infrastructure engineering and building resilient, scalable systems. 
          Specialized in strategic leadership and FinOps expertise, with a focus on creating efficient and cost-effective solutions.
        </Typography>

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
          Key Strengths
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
          <li>Salesforce development and implementation</li>
          <li>Infrastructure engineering and system architecture</li>
          <li>Strategic leadership and team management</li>
          <li>Financial operations optimization</li>
          <li>Building scalable and resilient systems</li>
          <li>Cloud infrastructure and DevOps practices</li>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfessionalSummary; 