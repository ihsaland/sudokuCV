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
              Selected architectural impact aligned with recent platform work: scale, throughput, cost, and predictive modeling.
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, mb: 2, textAlign: 'left' }}>
              <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 600 }}>Billions-of-events architectures</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Defined scalability architecture for distributed data platforms at multi-billion annual event scale.</Typography>
            </Paper>
            <Paper variant="outlined" sx={{ p: 2, mb: 2, textAlign: 'left' }}>
              <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 600 }}>Throughput &amp; cost</Typography>
              <Typography sx={{ color: 'text.secondary' }}>System-level scaling strategies improving throughput by 35%; cost-to-serve modeling reducing infrastructure cost by ~$750K annually (25%).</Typography>
            </Paper>
            <Paper variant="outlined" sx={{ p: 2, textAlign: 'left' }}>
              <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 600 }}>Predictive scaling &amp; diagnostics</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Workload models for 2x–10x growth scenarios; diagnostics frameworks, performance automation, and benchmarking / regression governance for release stability.</Typography>
            </Paper>
          </Paper>
        </Container>
      </Box>
    </motion.div>
  );
};

export default CaseStudies;
