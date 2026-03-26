import React from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';

const WorkExperience: React.FC = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 800, mx: 'auto' }}>
      <Paper 
        variant="outlined"
        sx={{ 
          p: { xs: 2, sm: 4 },
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
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
          Professional Experience
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
            Salesforce — Acting Principal Architect / Staff Performance Engineer
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 2,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
            }}
          >
            2021 – Present
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
            <li>Defined scalability architecture for distributed data platforms processing billions of events annually.</li>
            <li>Designed system-level scaling strategies across compute, storage, and query layers improving throughput by 35%.</li>
            <li>Developed cost-to-serve models reducing infrastructure cost by 25% (~$750K annually).</li>
            <li>Built predictive workload models forecasting system behavior under 2x–10x growth scenarios.</li>
            <li>Established performance diagnostics frameworks for cross-system bottleneck identification.</li>
            <li>Designed performance automation tooling enabling repeatable large-scale system validation.</li>
            <li>Led benchmarking and regression governance initiatives ensuring system stability across releases.</li>
            <li>Presented system risk, scaling constraints, and architectural recommendations to senior leadership.</li>
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
            IBM — Principal Performance &amp; Capacity Engineer
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 2,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
            }}
          >
            2016 – 2021
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
            <li>Defined capacity planning and scalability strategies for enterprise distributed systems.</li>
            <li>Designed diagnostics frameworks to analyze system behavior under load.</li>
            <li>Developed infrastructure efficiency models to optimize cost and performance.</li>
            <li>Led JVM and backend optimization improving system latency and reliability.</li>
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
            Accenture — Lead Performance Engineer
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 2,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
            }}
          >
            2009 – 2016
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
            <li>Led performance architecture initiatives for large-scale enterprise systems.</li>
            <li>Designed load simulation frameworks to validate system scalability under peak conditions.</li>
            <li>Diagnosed and resolved distributed system bottlenecks impacting production reliability.</li>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default WorkExperience;
