import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import BackgroundPattern from '../components/BackgroundPattern';

const sectionStyle = {
  p: { xs: 2, sm: 3 },
  borderRadius: 2,
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  backdropFilter: 'blur(10px)',
  mb: 4,
};

const CaseStudies: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <BackgroundPattern />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
          <Paper variant="outlined" sx={{ ...sectionStyle, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700, mb: 2 }}>
              Case Studies
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 2 }}>
              Selected impact: system-level performance optimization, cost reduction, and scalability outcomes.
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, mb: 2, textAlign: 'left' }}>
              <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 600 }}>Distributed data platform</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Improved throughput by 35% through system-level performance optimization; reduced infrastructure cost exposure by more than $750K annually through telemetry-driven resource optimization.</Typography>
            </Paper>
            <Paper variant="outlined" sx={{ p: 2, mb: 2, textAlign: 'left' }}>
              <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 600 }}>Cloud data platform — ingestion & analytics</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Architected pipelines processing billions of telemetry and billing events annually; improved distributed query performance by 35% and reduced cost exposure by 25%.</Typography>
            </Paper>
            <Paper variant="outlined" sx={{ p: 2, textAlign: 'left' }}>
              <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 600 }}>Enterprise performance & capacity</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Predictive scaling models and automated profiling pipelines for distributed enterprise data platforms; JVM-based backend optimization for large-scale workloads.</Typography>
            </Paper>
          </Paper>
        </Container>
      </Box>
    </motion.div>
  );
};

export default CaseStudies;
