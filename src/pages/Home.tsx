import React from 'react';
import { Box, Typography, Container, Button, Link } from '@mui/material';
import { PlayArrow, GetApp } from '@mui/icons-material';
import BackgroundPattern from '../components/BackgroundPattern';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const sectionStyle = {
    p: 3,
    border: '0.5px solid rgba(255,255,255,0.4)',
    borderRadius: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    backdropFilter: 'blur(5px)',
    maxWidth: '800px',
    margin: '0 auto',
    mb: 4,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          position: 'relative',
          overflow: 'hidden',
          p: 3,
          pt: { xs: 8, sm: 10 },
        }}
      >
        <BackgroundPattern />
        <Container maxWidth="lg">
          {/* Headline & Summary — Immediate professional signal */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Box sx={sectionStyle}>
              <Typography
                variant="h1"
                sx={{
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: { xs: '2rem', sm: '2.75rem', md: '3rem' },
                  textAlign: 'center',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                }}
              >
                Ian Salandy
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: { xs: '1.1rem', sm: '1.35rem', md: '1.5rem' },
                  textAlign: 'center',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  mt: 1,
                }}
              >
                Principal / Staff Engineer — Distributed Systems & Performance Engineering
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.95)',
                  fontSize: { xs: '0.95rem', sm: '1.05rem' },
                  textAlign: 'center',
                  mt: 2,
                  maxWidth: '640px',
                  mx: 'auto',
                }}
              >
                Principal / Staff-level software engineer with 15+ years of experience designing and optimizing large-scale distributed systems, high-throughput data platforms, and backend infrastructure for multi-tenant cloud environments. Deep expertise in performance engineering, distributed compute platforms, and infrastructure scalability for systems processing billions of events annually. Proven ability to improve throughput, reliability, and cost efficiency through architectural design, telemetry-driven diagnostics, predictive workload modeling, and platform optimization.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  href="/Ian_Salandy_Principal_Staff_Distributed_Systems.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<GetApp />}
                  sx={{
                    fontSize: { xs: '0.95rem', sm: '1rem' },
                    padding: { xs: '8px 16px', sm: '10px 20px' },
                    border: '0.5px solid #ffffff',
                    '&:hover': { backgroundColor: 'primary.dark', borderColor: 'primary.light' },
                  }}
                >
                  Download Resume
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate('/cv')}
                  sx={{
                    fontSize: { xs: '0.95rem', sm: '1rem' },
                    padding: { xs: '8px 16px', sm: '10px 20px' },
                    '&:hover': { color: '#ffff00', borderColor: '#ffff00' },
                  }}
                >
                  View CV
                </Button>
              </Box>
            </Box>
          </motion.div>

          {/* Key Systems & Platform Impact */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <Box sx={sectionStyle}>
              <Typography
                variant="h4"
                sx={{
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: { xs: '1.35rem', sm: '1.5rem' },
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                Key Systems & Platform Impact
              </Typography>
              <Box
                component="ul"
                sx={{
                  pl: 2.5,
                  color: 'rgba(255,255,255,0.95)',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  lineHeight: 1.8,
                  '& li': { mb: 1 },
                }}
              >
                <li>Improved distributed data platform throughput by 35% through system-level performance optimization.</li>
                <li>Reduced infrastructure cost exposure by more than $750K annually through telemetry-driven resource optimization.</li>
                <li>Enabled scalable processing of billions of distributed events across multi-tenant cloud platforms.</li>
                <li>Improved system reliability and scalability through predictive workload modeling and infrastructure diagnostics.</li>
              </Box>
            </Box>
          </motion.div>

          {/* Architecture Insights — Thought leadership */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <Box sx={sectionStyle}>
              <Typography
                variant="h4"
                sx={{
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: { xs: '1.35rem', sm: '1.5rem' },
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                Architecture Insights
              </Typography>
              <Box
                component="ul"
                sx={{
                  pl: 2.5,
                  color: 'rgba(255,255,255,0.95)',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  lineHeight: 1.8,
                  '& li': { mb: 1 },
                }}
              >
                <li>Where Distributed Systems Fail at Scale</li>
                <li>The Hidden Cost of Cloud Abstraction</li>
                <li>Performance Engineering in AI Infrastructure</li>
              </Box>
            </Box>
          </motion.div>

          {/* Consulting & Areas of Expertise */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <Box sx={sectionStyle}>
              <Typography
                variant="h4"
                sx={{
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: { xs: '1.35rem', sm: '1.5rem' },
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                Consulting & Areas of Expertise
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.95)',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                Architecture advisory and performance engineering for distributed systems and SaaS platforms. 
                Systems I've optimized span enterprise SaaS, real-time trading, and large-scale data pipelines.
              </Typography>
              <Box sx={{ textAlign: 'center' }}>
                <Link
                  href="https://kpi99.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: '#ffff00',
                    fontWeight: 700,
                    '&:hover': { color: '#ffffff', textDecoration: 'underline' },
                  }}
                >
                  KPI99
                </Link>
              </Box>
            </Box>
          </motion.div>

          {/* Interactive Puzzle — Optional exploration */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            <Box sx={sectionStyle}>
              <Typography
                variant="h5"
                sx={{
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                Explore more about my engineering approach
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                Unlock detailed CV sections by completing Sudoku puzzles at increasing difficulty levels.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/game')}
                  startIcon={<PlayArrow />}
                  sx={{
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    padding: { xs: '8px 16px', sm: '12px 24px' },
                    border: '0.5px solid #ffffff',
                    '&:hover': { backgroundColor: 'primary.dark', borderColor: 'primary.light' },
                  }}
                >
                  Play Sudoku to Unlock CV
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </motion.div>
  );
};

export default Home;
