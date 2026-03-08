import React from 'react';
import { Box, Paper, Typography, Divider, Container } from '@mui/material';
import { motion } from 'framer-motion';

const ProfessionalSummary: React.FC = () => {
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
          Professional Summary
        </Typography>
        
        <Typography 
              variant="h6" 
          paragraph
          sx={{ 
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
            lineHeight: 1.8,
                color: 'text.primary',
                mb: 4,
                fontWeight: 400,
          }}
        >
          Principal / Staff-level software engineer with 15+ years of experience designing and optimizing large-scale distributed systems, high-throughput data platforms, and backend infrastructure supporting multi-tenant cloud environments. Deep expertise in performance engineering, distributed compute platforms, and infrastructure scalability for systems processing billions of events annually. Proven ability to improve system throughput, reliability, and cost efficiency through architectural design, telemetry-driven diagnostics, predictive workload modeling, and platform optimization. Experienced leading cross-team technical initiatives and developing internal frameworks that identify scaling limits, detect performance regressions, and improve distributed system efficiency.
        </Typography>

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
          Core Technical Strengths
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
          <li>Distributed Systems Architecture · High-Throughput Event Processing · Backend Platform Engineering</li>
          <li>Distributed Data Platforms (Spark, Trino) · Cloud Infrastructure (AWS, Kubernetes) · Performance Engineering</li>
          <li>Capacity Planning & Workload Modeling · Telemetry & Observability Platforms · Infrastructure Optimization</li>
          <li>JVM Performance Optimization · Scalability Diagnostics · Synthetic Workload Simulation</li>
        </Box>
      </Paper>
    </Box>
      </motion.div>
    </Container>
  );
};

export default ProfessionalSummary; 