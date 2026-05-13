import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { motion } from 'framer-motion';
import BackgroundPattern from '../components/BackgroundPattern';
import { useNavigate } from 'react-router-dom';
import {
  GOLD, cardSx, pageBox, containerSx, pageTitleSx, pageSubtitleSx,
  sectionHeadingSx, bodyTextSx, goldOutlinedBtn, fadeUp, inView,
} from '../styles/pageStyles';

const Frameworks: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div {...fadeUp}>
      <Box sx={pageBox}>
        <BackgroundPattern />
        <Container maxWidth="md" sx={containerSx}>

          <Typography sx={pageTitleSx}>Frameworks</Typography>
          <Typography sx={pageSubtitleSx}>
            Methodologies I develop and use for performance engineering, pressure analysis, and cost efficiency.
          </Typography>

          {/* PPI-F */}
          <motion.div {...inView} transition={{ duration: 0.6 }}>
            <Box sx={cardSx}>
              <Typography sx={sectionHeadingSx}>PPI-F™ — Performance Pressure Index Framework</Typography>
              <Typography sx={bodyTextSx}>
                System-level pressure analysis across four dimensions: Request Pressure, Resource Saturation, System Coupling, and Observability Maturity. Predicts and prevents failure before incidents — turning performance from a reactive concern into a quantifiable, manageable metric.
              </Typography>
              <Typography sx={{ ...bodyTextSx, mb: 2 }}>
                PPI-F produces a single comparable index so teams can prioritise where to reduce pressure — architecture, capacity, or observability — before production degrades.
              </Typography>

              {/* Four pillars */}
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr' }, gap: 1.5, mb: 3 }}>
                {[
                  { label: 'Request Pressure',      desc: 'Incoming load relative to capacity' },
                  { label: 'Resource Saturation',   desc: 'CPU, memory, I/O proximity to limits' },
                  { label: 'System Coupling',        desc: 'Dependency depth & cascading risk' },
                  { label: 'Observability Maturity', desc: 'Ability to see & diagnose pressure' },
                ].map(({ label, desc }) => (
                  <Box key={label} sx={{
                    p: { xs: 1.5, sm: 2 },
                    borderRadius: '10px',
                    border: `0.5px solid ${GOLD}33`,
                    backgroundColor: 'rgba(212,175,55,0.04)',
                  }}>
                    <Typography sx={{ color: GOLD, fontWeight: 700, fontSize: { xs: '0.8rem', sm: '0.85rem' }, fontFamily: 'DS-DIGII, monospace', mb: 0.5 }}>
                      {label}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: { xs: '0.78rem', sm: '0.82rem' }, lineHeight: 1.5 }}>
                      {desc}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Button variant="outlined" size="small" onClick={() => navigate('/ppi-framework')} sx={goldOutlinedBtn}>
                Details & Formula →
              </Button>
            </Box>
          </motion.div>

          {/* Research / ICEA cross-link */}
          <motion.div {...inView} transition={{ duration: 0.6, delay: 0.08 }}>
            <Box sx={{ ...cardSx, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Typography sx={sectionHeadingSx}>ICEA — Infrastructure Cost &amp; Efficiency Analyzer</Typography>
                <Typography sx={{ ...bodyTextSx, mb: 0 }}>
                  Diagnostic tool for Spark executor packing, utilisation, waste, and recommended configurations.
                </Typography>
              </Box>
              <Button variant="outlined" size="small" onClick={() => navigate('/research')} sx={{ ...goldOutlinedBtn, flexShrink: 0 }}>
                Research &amp; Tools →
              </Button>
            </Box>
          </motion.div>

        </Container>
      </Box>
    </motion.div>
  );
};

export default Frameworks;
