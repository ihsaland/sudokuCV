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

const Frameworks: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <BackgroundPattern />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
          <Paper variant="outlined" sx={{ ...sectionStyle, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700, mb: 2 }}>
              Frameworks
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 3 }}>
              Methodologies and frameworks I use and develop for performance engineering, pressure analysis, and cost efficiency.
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, mb: 2, textAlign: 'left' }}>
              <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>PPI-F™ — Performance Pressure Index Framework</Typography>
              <Typography sx={{ color: 'text.secondary', mb: 2 }}>System-level pressure analysis: Request Pressure, Resource Saturation, System Coupling, Observability Maturity. Predict and prevent failure before incidents.</Typography>
              <Button variant="outlined" size="small" onClick={() => navigate('/ppi-framework')}>Details & formula</Button>
            </Paper>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
              For ICEA (Infrastructure Cost & Efficiency Analyzer) and diagnostic tools, see <Link component="button" type="button" onClick={() => navigate('/research')} sx={{ fontWeight: 600, cursor: 'pointer' }}>Research</Link>.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </motion.div>
  );
};

export default Frameworks;
