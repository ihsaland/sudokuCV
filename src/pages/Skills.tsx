import React from 'react';
import { Box, Paper, Typography, Grid, Chip } from '@mui/material';

const Skills: React.FC = () => {
  const coreStrengths = [
    'Distributed Systems Architecture',
    'High-Throughput Event Processing',
    'Backend Platform Engineering',
    'Distributed Data Platforms (Spark, Trino)',
    'Cloud Infrastructure (AWS, Kubernetes)',
    'Performance Engineering',
    'Capacity Planning & Workload Modeling',
    'Telemetry & Observability Platforms',
    'Infrastructure Optimization',
    'JVM Performance Optimization',
    'Scalability Diagnostics',
    'Synthetic Workload Simulation',
  ];

  const technologies = {
    'Languages': ['Java', 'Python', 'SQL'],
    'Platforms': ['Spark', 'Trino/Presto', 'Kafka', 'Kubernetes', 'EMR', 'EKS'],
    'Infrastructure': ['AWS', 'Distributed data platforms', 'Telemetry pipelines'],
    'Performance': ['JVM tuning', 'Distributed query optimization', 'Workload modeling', 'Capacity planning'],
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
          Core Technical Strengths
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1,
            mb: 3,
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
          {coreStrengths.map((skill) => (
            <Chip key={skill} label={skill} variant="outlined" />
          ))}
        </Box>

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
          Technologies
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(technologies).map(([category, items]) => (
            <Grid item xs={12} sm={6} key={category}>
              <Typography 
                variant="subtitle1" 
                gutterBottom
                sx={{ 
                  color: 'primary.main',
                  fontWeight: 600,
                  mb: 1,
                  fontSize: { xs: '1rem', sm: '1.05rem' },
                }}
              >
                {category}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {items.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    variant="outlined"
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                      color: 'primary.main',
                      borderColor: 'primary.main',
                      fontSize: { xs: '0.7rem', sm: '0.8rem' },
                    }}
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
