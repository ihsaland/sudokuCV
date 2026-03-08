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
            Principal Performance Engineer / Acting Principal Architect — Cloud Data Platform
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
            <li>Architected and optimized distributed ingestion pipelines and backend infrastructure processing billions of telemetry and billing events annually.</li>
            <li>Designed large-scale distributed analytics workflows using Spark and Trino supporting high-throughput operational workloads.</li>
            <li>Improved distributed query performance by 35% and reduced infrastructure cost exposure by 25% through telemetry-driven optimization.</li>
            <li>Developed predictive workload modeling frameworks to forecast system scaling limits and infrastructure capacity requirements.</li>
            <li>Built internal diagnostic platforms identifying performance regressions and architectural bottlenecks across distributed services.</li>
            <li>Designed Kubernetes resource allocation strategies improving cluster utilization and platform reliability.</li>
            <li>Led cross-team architectural initiatives improving telemetry pipelines, observability systems, and platform diagnostics.</li>
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
            Principal Performance and Capacity Engineer — Distributed Enterprise Platforms
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
            <li>Designed performance engineering and capacity planning frameworks for distributed enterprise data platforms.</li>
            <li>Built predictive scaling models evaluating system throughput limits and infrastructure requirements.</li>
            <li>Developed automated profiling pipelines enabling rapid root-cause diagnostics for platform performance regressions.</li>
            <li>Optimized JVM-based backend services supporting large-scale enterprise workloads.</li>
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
            Lead Performance Engineer — Enterprise Application Platforms
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
            <li>Led performance engineering initiatives for large-scale backend systems and distributed enterprise platforms.</li>
            <li>Designed workload simulation frameworks validating system scalability under high concurrency conditions.</li>
            <li>Built regression detection and performance monitoring pipelines improving platform reliability.</li>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default WorkExperience;
