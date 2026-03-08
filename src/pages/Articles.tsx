import React from 'react';
import { Box, Typography, Container, Paper, Link } from '@mui/material';
import { motion } from 'framer-motion';
import BackgroundPattern from '../components/BackgroundPattern';

const sectionStyle = {
  p: { xs: 2, sm: 3 },
  borderRadius: 2,
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  backdropFilter: 'blur(10px)',
  mb: 4,
};

const Articles: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <BackgroundPattern />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
          <Paper variant="outlined" sx={{ ...sectionStyle, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700, mb: 2 }}>
              Articles
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 3 }}>
              Architecture insights and thought leadership on distributed systems and performance engineering.
            </Typography>
            <Box component="ul" sx={{ textAlign: 'left', pl: 2.5, '& li': { mb: 2, color: 'text.primary' } }}>
              <li><strong>Where Distributed Systems Fail at Scale</strong> — Pressure propagation and failure modes.</li>
              <li><strong>The Hidden Cost of Cloud Abstraction</strong> — Trade-offs and cost-to-serve visibility.</li>
              <li><strong>Performance Engineering in AI Infrastructure</strong> — Scaling and efficiency for ML workloads.</li>
              <li><Link href="https://kpi99.co/en/ppi-framework.html" target="_blank" rel="noopener noreferrer" sx={{ fontWeight: 600 }}>PPI-F™ Framework</Link> — System-level pressure analysis at KPI99.</li>
            </Box>
          </Paper>
        </Container>
      </Box>
    </motion.div>
  );
};

export default Articles;
