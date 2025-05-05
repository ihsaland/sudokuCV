import React from 'react';
import { Box, Paper, Typography, Grid, Chip } from '@mui/material';

const Skills: React.FC = () => {
  const skills = {
    'Core Technical Expertise': [
      'System Architecture & Design',
      'Distributed Systems',
      'Scalable Architecture',
      'Performance Engineering',
      'JVM Tuning',
      'Garbage Collection',
      'Low-latency Optimization',
      'Secure System Design',
      'SaaS Security',
      'Machine Learning for Performance Modeling',
      'System Behavior Prediction'
    ],
    'Cloud & Infrastructure': [
      'Cloud Infrastructure',
      'AWS',
      'Azure',
      'CI/CD',
      'Infrastructure as Code',
      'Performance Testing',
      'Infrastructure Validation',
      'Cloud Cost Efficiency',
      'Performance-Cost Alignment'
    ],
    'Database & Performance': [
      'Database Optimization',
      'SQL Query Tuning',
      'Trino',
      'Oracle',
      'SDB',
      'Capacity Planning',
      'Usage Growth Forecasting',
      'Infrastructure Needs Analysis'
    ],
    'Tools & Monitoring': [
      'Monitoring Tools',
      'YourKit',
      'JFR',
      'APM Tools',
      'System Profiling',
      'Performance Monitoring',
      'Framework Development',
      'Performance Validation Patterns'
    ],
    'Leadership & Strategy': [
      'Strategic Planning',
      'Cross-Functional Collaboration',
      'Product Management Collaboration',
      'Infrastructure Team Collaboration',
      'Developer Collaboration',
      'Business-Technical Alignment',
      'Performance Strategy Development',
      'Cost Optimization',
      'Resource Management',
      'Budget Planning'
    ],
    'Knowledge Sharing': [
      'Engineering Mentorship',
      'Best Practices Training',
      'Team Standardization',
      'Technical Coaching',
      'Performance Best Practices',
      'Technical Documentation',
      'Architectural Proposals',
      'Technical Writing',
      'Technical Presentations',
      'System Design Documentation'
    ]
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 800, mx: 'auto' }}>
      <Paper 
        variant="outlined"
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
          Skills
        </Typography>
        
        <Grid container spacing={2}>
          {Object.entries(skills).map(([category, items]) => (
            <Grid item xs={12} sm={6} key={category}>
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
                {category}
              </Typography>
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 1,
                  '& .MuiChip-root': {
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    color: 'primary.main',
                    borderColor: 'primary.main',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    height: { xs: 24, sm: 32 },
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.2)',
                    }
                  }
                }}
              >
                {items.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    variant="outlined"
                  />
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Skills; 