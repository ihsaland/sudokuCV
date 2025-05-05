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
              Seasoned Performance Architect with a proven track record in software engineering, SaaS optimization, and enterprise-scale product development. Expertise spans performance tuning, capacity planning, system profiling, and architectural process improvement. Known for designing and leading strategic initiatives that elevate application performance, scalability, and operational efficiency across complex, distributed systems.
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
              Key Strengths
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
              <li>Architected scalable performance frameworks at Salesforce to optimize JVM behavior, database efficiency, and startup sequencing across globalized SaaS platforms including Platform Services, Digital Wallet, and Data Cloud.</li>
              <li>Led end-to-end capacity planning and performance tuning initiatives, identifying bottlenecks and forecasting inflection points across high-volume services like Agentforce and UCP to support sustainable infrastructure growth.</li>
              <li>Designed and implemented cross-stack performance strategies using Trino, Oracle, and SDB, achieving significant reductions in query latency and improving system throughput under production loads.</li>
              <li>Standardized CICD-integrated performance engineering processes at IBM, enabling repeatable, automated evaluations of system health using machine learning-enhanced scenario models.</li>
              <li>Collaborated across engineering, product, and infrastructure teams to architect solutions that reduced resource consumption, optimized transformation pipelines, and improved latency in mission-critical systems.</li>
              <li>Championed continuous improvement through training and mentoring, leading initiatives on performance profiling, workload development, and global delivery of scalable performance testing architectures.</li>
            </Box>
          </Paper>
        </Box>
      </motion.div>
    </Container>
  );
};

export default ProfessionalSummary; 