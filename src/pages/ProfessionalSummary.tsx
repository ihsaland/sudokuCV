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
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
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
          Principal Software Architect with 15+ years of experience defining and scaling distributed systems architectures for high-throughput data platforms. Expert in capacity planning, cost-to-serve modeling, and system-level performance engineering across multi-billion event workloads. Proven ability to design architectures that scale predictably, reduce infrastructure cost, and improve reliability. Trusted advisor to engineering leadership for system risk, scalability strategy, and infrastructure investment decisions. Methodology includes the PPI-F™ (Performance Pressure Index) framework for system-level pressure analysis and KPI99 consulting where applicable.
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
          Architecture &amp; Technical Leadership
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
          <li>Distributed Systems Architecture &amp; Design</li>
          <li>Scalability Strategy &amp; Capacity Planning</li>
          <li>Cost-to-Serve &amp; Infrastructure Efficiency Modeling</li>
          <li>Performance Engineering &amp; System Diagnostics</li>
          <li>AI / Data Workload Performance Architecture</li>
          <li>Benchmarking, Regression Governance &amp; Standards</li>
          <li>Performance Tooling &amp; Platform Enablement</li>
          <li>Cross-Team Architecture Leadership &amp; Influence</li>
          <li>Executive Communication &amp; Risk Modeling</li>
        </Box>
      </Paper>
    </Box>
      </motion.div>
    </Container>
  );
};

export default ProfessionalSummary; 