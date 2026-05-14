import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { motion } from 'framer-motion';
import BackgroundPattern from '../components/BackgroundPattern';
import { useNavigate } from 'react-router-dom';
import {
  GOLD, cardSx, pageBox, containerSx, pageTitleSx, pageSubtitleSx,
  bodyTextSx, goldOutlinedBtn, fadeUp, inView,
} from '../styles/pageStyles';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div {...fadeUp}>
      <Box sx={pageBox}>
        <BackgroundPattern />
        <Container maxWidth="md" sx={containerSx}>

          {/* Hero card */}
          <motion.div {...inView} transition={{ duration: 0.6 }}>
            <Box sx={{ ...cardSx, textAlign: 'center', mb: 4 }}>
              {/* Avatar */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Box sx={{
                  p: '3px', borderRadius: '50%',
                  background: `conic-gradient(from 180deg, ${GOLD}, rgba(212,175,55,0.2), ${GOLD})`,
                }}>
                  <Box
                    component="img"
                    src="/images/animePic.jpeg"
                    alt="Ian Salandy"
                    sx={{
                      width: { xs: 130, sm: 160 },
                      height: { xs: 130, sm: 160 },
                      borderRadius: '50%',
                      objectFit: 'cover',
                      display: 'block',
                      border: '2px solid #07070f',
                    }}
                  />
                </Box>
              </Box>

              <Typography sx={pageTitleSx}>About</Typography>

              {/* Separator */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
                <Box sx={{ height: '1px', width: 40, background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
                <Typography sx={{ color: GOLD, fontSize: { xs: '0.8rem', sm: '0.9rem' }, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'DS-DIGII, monospace' }}>
                  Systems Pressure Architect
                </Typography>
                <Box sx={{ height: '1px', width: 40, background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
              </Box>

              <Typography sx={{ ...pageSubtitleSx, mb: 3 }}>
                Distributed systems, performance &amp; reliability.
              </Typography>

              <Typography sx={bodyTextSx}>
                I study how distributed systems behave under pressure — technically, operationally, and economically.
                15+ years translating that research into architecture decisions: capacity planning, cost-to-serve modeling,
                and system-level performance engineering across multi-billion event workloads.
              </Typography>

              <Typography sx={bodyTextSx}>
                Methodology formalised as PPI-F™ — mapping pressure sources, propagation paths, and failure blast radius
                across Performance, Production Readiness, Infrastructure Efficiency, and Failure Resilience.
                Consulting and advisory through KPI99. Java · Python · Spark · Kafka · Kubernetes · AWS.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mt: 3 }}>
                <Button variant="outlined" onClick={() => navigate('/cv')} sx={goldOutlinedBtn}>
                  View CV
                </Button>
                <Button
                  variant="outlined"
                  component="a"
                  href="/Ian_Salandy.pdf"
                  download="Ian_Salandy.pdf"
                  sx={goldOutlinedBtn}
                >
                  Download Resume
                </Button>
                <Button variant="outlined" onClick={() => navigate('/contact')} sx={goldOutlinedBtn}>
                  Contact
                </Button>
              </Box>
            </Box>
          </motion.div>

        </Container>
      </Box>
    </motion.div>
  );
};

export default About;
