import React from 'react';
import { Box, Typography, Container, Link, Chip } from '@mui/material';
import { OpenInNew, GitHub } from '@mui/icons-material';
import { motion } from 'framer-motion';
import BackgroundPattern from '../components/BackgroundPattern';
import { GOLD } from '../styles/pageStyles';

const workProjects = [
  {
    title: 'Scalability Architecture — Billions of Events',
    description:
      'Defined scalability architecture for distributed data platforms processing billions of events annually. Designed system-level scaling across compute, storage, and query layers, improving throughput by 35%.',
    tags: ['Spark', 'Kafka', 'Distributed Systems', 'High Throughput'],
  },
  {
    title: 'Cost-to-Serve & Efficiency Modelling',
    description:
      'Developed cost-to-serve models that reduced infrastructure cost by $750K+ annually. Combined telemetry-driven analysis with capacity and efficiency modelling across cloud workloads.',
    tags: ['Cost-to-Serve', 'AWS', 'Capacity Planning', 'FinOps'],
  },
  {
    title: 'Predictive Workload Modelling (2x–10x Growth)',
    description:
      'Built predictive workload models forecasting system behaviour under 2x–10x growth scenarios — enabling proactive scaling decisions and failure prevention before production pressure hits.',
    tags: ['Workload Modelling', 'Forecasting', 'Scaling', 'SRE'],
  },
  {
    title: 'Performance Diagnostics & Governance',
    description:
      'Established performance diagnostics frameworks for cross-system bottleneck identification. Designed automation for large-scale validation and led benchmarking and regression governance across releases.',
    tags: ['Diagnostics', 'Automation', 'Benchmarking', 'Governance'],
  },
  {
    title: 'Architecture Leadership & Executive Communication',
    description:
      'Presented system risk, scaling constraints, and architectural recommendations to senior leadership. Cross-team architecture ownership on platform stability, performance investment decisions, and long-range roadmap alignment.',
    tags: ['Architecture', 'Risk Modelling', 'Leadership', 'Roadmap'],
  },
];

const openSourceProjects = [
  {
    title: 'Scalebreaker — Build Your Throughput',
    url: 'https://github.com/ihsaland/scalebreaker',
    tags: ['TypeScript', 'System Design', 'Interactive', 'Architecture'],
    description:
      'A gamified platform for learning distributed systems architecture hands-on. Users design systems in a real-time flow interface, test against realistic performance metrics — throughput, latency, bottlenecks — and progress through increasingly complex scenarios. Built to make architectural trade-offs legible through experience, not theory.',
  },
  {
    title: 'CodingPrep — Interactive Interview Platform',
    url: 'https://github.com/ihsaland/codingPrep',
    tags: ['TypeScript', 'Algorithms', 'Data Structures', 'Visualisation'],
    description:
      '10 data structures and 10 algorithms with step-by-step animated visualisations, 20 practice problems across difficulty levels, and a full Python syntax reference. Built as a structured learning tool with complexity analysis and runnable examples for each concept.',
  },
  {
    title: 'SudokuCV — This Site',
    url: 'https://github.com/ihsaland/sudokuCV',
    tags: ['TypeScript', 'React', 'Framer Motion', 'MUI'],
    description:
      'An interactive CV where Sudoku puzzles at increasing difficulty levels unlock progressively detailed sections of professional experience. Built as a demonstration that how you present work is itself a signal about how you think.',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

const Projects: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <BackgroundPattern />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 5 }}>

          {/* Open Source */}
          <Typography
            variant="h4"
            sx={{ color: '#ffffff', fontWeight: 700, mb: 0.75 }}
          >
            Projects
          </Typography>
          <Typography
            sx={{ color: 'rgba(255,255,255,0.45)', mb: 4, fontSize: '0.9rem' }}
          >
            Open source tools and platforms built to make architectural thinking legible.
          </Typography>

          <motion.div variants={container} initial="hidden" animate="show">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 6 }}>
              {openSourceProjects.map((project) => (
                <motion.div key={project.title} variants={item}>
                  <Link href={project.url} target="_blank" rel="noopener noreferrer" underline="none">
                    <Box
                      sx={{
                        p: { xs: 2.5, sm: 3 },
                        borderRadius: '12px',
                        border: `0.5px solid rgba(212, 175, 55, 0.3)`,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: GOLD,
                          backgroundColor: 'rgba(212,175,55,0.05)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 40px rgba(212,175,55,0.12)',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <GitHub sx={{ color: GOLD, fontSize: '1rem' }} />
                          <Typography
                            sx={{
                              color: '#ffffff',
                              fontWeight: 700,
                              fontSize: { xs: '0.95rem', sm: '1.05rem' },
                            }}
                          >
                            {project.title}
                          </Typography>
                        </Box>
                        <OpenInNew sx={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.85rem', flexShrink: 0, mt: '3px' }} />
                      </Box>
                      <Typography
                        sx={{
                          color: 'rgba(255,255,255,0.65)',
                          fontSize: { xs: '0.85rem', sm: '0.9rem' },
                          lineHeight: 1.7,
                          mb: 1.5,
                        }}
                      >
                        {project.description}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                        {project.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                              height: 22,
                              fontSize: '0.7rem',
                              color: 'rgba(255,255,255,0.6)',
                              backgroundColor: 'rgba(255,255,255,0.07)',
                              border: '0.5px solid rgba(255,255,255,0.12)',
                              borderRadius: '4px',
                              '& .MuiChip-label': { px: 1 },
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Link>
                </motion.div>
              ))}
            </Box>
          </motion.div>

          {/* Work Projects */}
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              mb: 2,
            }}
          >
            Professional Work
          </Typography>

          <motion.div variants={container} initial="hidden" animate="show">
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
                gap: 2,
              }}
            >
              {workProjects.map((project) => (
                <motion.div key={project.title} variants={item}>
                  <Box
                    sx={{
                      p: { xs: 2, sm: 2.5 },
                      borderRadius: '10px',
                      border: '0.5px solid rgba(255,255,255,0.1)',
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      backdropFilter: 'blur(8px)',
                      height: '100%',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: 'rgba(255,255,255,0.2)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: { xs: '0.88rem', sm: '0.92rem' },
                        mb: 1,
                        lineHeight: 1.4,
                      }}
                    >
                      {project.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'rgba(255,255,255,0.55)',
                        fontSize: { xs: '0.8rem', sm: '0.83rem' },
                        lineHeight: 1.65,
                        mb: 1.5,
                      }}
                    >
                      {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                      {project.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.67rem',
                            color: 'rgba(255,255,255,0.45)',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            border: '0.5px solid rgba(255,255,255,0.08)',
                            borderRadius: '4px',
                            '& .MuiChip-label': { px: 0.75 },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </motion.div>

        </Container>
      </Box>
    </motion.div>
  );
};

export default Projects;
