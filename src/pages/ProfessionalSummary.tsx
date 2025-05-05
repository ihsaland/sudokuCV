import React from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';

const ProfessionalSummary: React.FC = () => {
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
          Seasoned Performance Architect with a proven track record in software engineering, SaaS optimization, and enterprise-scale product development. Expertise spans performance tuning, capacity planning, system profiling, and architectural process improvement. Known for designing and leading strategic initiatives that elevate application performance, scalability, and operational efficiency across complex, distributed systems.
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
          <li>Architected scalable performance frameworks at Salesforce to optimize JVM behavior, database efficiency, and startup sequencing across globalized SaaS platforms including Platform Services, Digital Wallet, and Data Cloud.</li>
          <li>Led end-to-end capacity planning and performance tuning initiatives, identifying bottlenecks and forecasting inflection points across high-volume services like Agentforce and UCP to support sustainable infrastructure growth.</li>
          <li>Designed and implemented cross-stack performance strategies using Trino, Oracle, and SDB, achieving significant reductions in query latency and improving system throughput under production loads.</li>
          <li>Standardized CICD-integrated performance engineering processes at IBM, enabling repeatable, automated evaluations of system health using machine learning-enhanced scenario models.</li>
          <li>Collaborated across engineering, product, and infrastructure teams to architect solutions that reduced resource consumption, optimized transformation pipelines, and improved latency in mission-critical systems.</li>
          <li>Championed continuous improvement through training and mentoring, leading initiatives on performance profiling, workload development, and global delivery of scalable performance testing architectures.</li>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfessionalSummary; 