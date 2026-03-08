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

const Consulting: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <BackgroundPattern />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
          <Paper variant="outlined" sx={{ ...sectionStyle, textAlign: 'center' }}>
            <Box
              component="img"
              src="/images/ian-salandy-headshot.png"
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
              Consulting
            </Typography>
            <Typography sx={{ color: 'text.primary', mb: 2 }}>
              Architecture advisory and performance engineering for distributed systems and SaaS platforms. Consulting and methodology are delivered through KPI99, including the PPI-F™ framework and ICEA.
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 2 }}>
              Services include performance health audits, scale and latency optimization, executive retainers, and incident support. Systems I've optimized span enterprise SaaS, real-time trading, and large-scale data pipelines.
            </Typography>
            <Link href="https://kpi99.co" target="_blank" rel="noopener noreferrer" sx={{ fontWeight: 700, display: 'inline-block', mb: 2 }}>
              KPI99
            </Link>
            <Typography sx={{ color: 'text.secondary', mb: 2 }}>For direct contact:</Typography>
            <Button variant="outlined" color="primary" onClick={() => navigate('/contact')}>
              Contact Me
            </Button>
          </Paper>
        </Container>
      </Box>
    </motion.div>
  );
};

export default Consulting;
