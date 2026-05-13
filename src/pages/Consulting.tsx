import React from 'react';
import { Box, Typography, Container, Button, Link } from '@mui/material';
import { motion } from 'framer-motion';
import BackgroundPattern from '../components/BackgroundPattern';
import { useNavigate } from 'react-router-dom';
import {
  GOLD, cardSx, pageBox, containerSx, pageTitleSx, pageSubtitleSx,
  sectionHeadingSx, bodyTextSx, goldOutlinedBtn, fadeUp, inView,
} from '../styles/pageStyles';

const services = [
  'Performance health audits & PPI diagnostic reviews',
  'Scale and latency optimisation',
  'Cost-to-serve modelling and FinOps alignment',
  'Executive advisory retainers',
  'Incident support and post-mortem analysis',
];

const Consulting: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div {...fadeUp}>
      <Box sx={pageBox}>
        <BackgroundPattern />
        <Container maxWidth="md" sx={containerSx}>

          <Typography sx={pageTitleSx}>Pressure Intelligence</Typography>
          <Typography sx={pageSubtitleSx}>
            Systems Pressure Architect–level advisory on distributed systems, scalability, cost-to-serve, and performance engineering for data platforms and SaaS.
          </Typography>

          {/* What I do */}
          <motion.div {...inView} transition={{ duration: 0.6 }}>
            <Box sx={cardSx}>
              <Typography sx={sectionHeadingSx}>Services</Typography>
              <Typography sx={bodyTextSx}>
                Methodology and consulting through KPI99, including the PPI-F™ framework and ICEA. Systems I've optimised span enterprise SaaS, real-time trading, and large-scale data pipelines.
              </Typography>
              <Box component="ul" sx={{ pl: 2.5, mt: 1, mb: 0, '& li': { color: 'rgba(255,255,255,0.75)', fontSize: { xs: '0.9rem', sm: '0.95rem' }, mb: 1, lineHeight: 1.6 } }}>
                {services.map((s) => <li key={s}>{s}</li>)}
              </Box>
            </Box>
          </motion.div>

          {/* KPI99 CTA */}
          <motion.div {...inView} transition={{ duration: 0.6, delay: 0.08 }}>
            <Box sx={{ ...cardSx, textAlign: 'center' }}>
              <Typography sx={{ color: GOLD, fontFamily: 'DS-DIGII, monospace', fontWeight: 700, fontSize: { xs: '1rem', sm: '1.15rem' }, mb: 1, letterSpacing: '0.04em' }}>
                KPI99
              </Typography>
              <Typography sx={{ ...bodyTextSx, mb: 2 }}>
                Advisory and methodology practice. Diagnostic tools, PPI-F™ framework, and ICEA cost modelling available at KPI99.
              </Typography>
              <Link
                href="https://kpi99.co"
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                sx={{ color: GOLD, fontWeight: 700, fontSize: '0.95rem', '&:hover': { color: '#ffffff' }, mr: 3 }}
              >
                kpi99.co →
              </Link>
              <Button variant="outlined" onClick={() => navigate('/contact')} sx={goldOutlinedBtn}>
                Contact Me
              </Button>
            </Box>
          </motion.div>

        </Container>
      </Box>
    </motion.div>
  );
};

export default Consulting;
