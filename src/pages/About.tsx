import React from 'react';
import { Box, Typography, Container, Paper, Button, Link } from '@mui/material';
import { motion } from 'framer-motion';
import BackgroundPattern from '../components/BackgroundPattern';
import { useNavigate } from 'react-router-dom';

const sectionStyle = {
  p: { xs: 2, sm: 3 },
  borderRadius: 2,
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  backdropFilter: 'blur(10px)',
  mb: 4,
};

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <BackgroundPattern />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
          <Paper variant="outlined" sx={{ ...sectionStyle, textAlign: 'center' }}>
            <Box
              component="img"
              src="/images/ian-salandy.png"
              alt="Ian Salandy"
              sx={{
                width: { xs: 140, sm: 180 },
                height: { xs: 140, sm: 180 },
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid',
                borderColor: 'primary.main',
                mb: 2,
                display: 'block',
                mx: 'auto',
              }}
            />
            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700, mb: 2 }}>
              About
            </Typography>
            <Typography sx={{ color: 'text.primary', mb: 2 }}>
              Ian Salandy — Principal Performance Architect. Diagnosing and optimizing large-scale distributed systems.
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 2 }}>
              Principal / Staff-level software engineer with 15+ years designing and optimizing large-scale distributed systems, high-throughput data platforms, and backend infrastructure. Deep expertise in performance engineering, distributed compute platforms, and infrastructure scalability for systems processing billions of events annually.
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 2 }}>
              JVM • Spark • Distributed Systems • Cost-to-Serve Engineering. Methodology includes the PPI-F™ framework and ICEA for evidence-based performance and cost decisions. Consulting and advisory delivered through KPI99.
            </Typography>
            <Button variant="outlined" color="primary" onClick={() => navigate('/cv')} sx={{ mr: 1 }}>
              View CV
            </Button>
            <Button variant="outlined" color="primary" onClick={() => navigate('/contact')}>
              Contact
            </Button>
          </Paper>
        </Container>
      </Box>
    </motion.div>
  );
};

export default About;
