import React from 'react';
import { Box, Typography, Container, Paper, Button } from '@mui/material';
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
              Ian Salandy — Principal Software Architect. Distributed systems, performance &amp; reliability.
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 2 }}>
              15+ years defining and scaling distributed systems architectures for high-throughput data platforms — capacity planning, cost-to-serve modeling, and system-level performance engineering. Trusted advisor to leadership on system risk, scalability strategy, and infrastructure investment.
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 2 }}>
              Java • Python • Spark • Kafka • Kubernetes • AWS. Methodology includes the PPI-F™ framework; consulting and advisory through KPI99 where applicable.
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
