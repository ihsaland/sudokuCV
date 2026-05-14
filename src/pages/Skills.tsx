import React from 'react';
import { Box, Typography, Container, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import BackgroundPattern from '../components/BackgroundPattern';
import {
  cardSx, pageBox, containerSx, pageTitleSx, sectionHeadingSx,
  bodyTextSx, fadeUp, inView, GOLD, GOLD_BORDER, GOLD_DIM,
  TEXT_BODY, TEXT_MUTED,
} from '../styles/pageStyles';

const chipSx = {
  backgroundColor: GOLD_DIM,
  color: GOLD,
  borderColor: GOLD_BORDER,
  fontSize: { xs: '0.72rem', sm: '0.78rem' },
  height: 26,
  fontFamily: 'DS-DIGII, monospace',
  letterSpacing: '0.02em',
  '& .MuiChip-label': { px: 1.2 },
};

const techSections: { label: string; items: string[] }[] = [
  { label: 'Languages',    items: ['Java', 'Python', 'SQL', 'Bash'] },
  { label: 'Platforms',    items: ['Apache Spark', 'Trino / Presto', 'Apache Kafka', 'Kubernetes', 'AWS EMR', 'AWS EKS'] },
  { label: 'Infrastructure', items: ['AWS (EC2, S3, RDS, CloudWatch)', 'Distributed systems design', 'Telemetry & observability pipelines'] },
  { label: 'Performance',  items: ['Workload modeling', 'JVM tuning', 'Capacity planning', 'Regression governance', 'Load simulation'] },
];

const coreStrengths = [
  'Distributed Systems Architecture & Design',
  'Scalability Strategy & Capacity Planning',
  'Cost-to-Serve & Infrastructure Efficiency Modeling',
  'Performance Engineering & System Diagnostics',
  'AI / Data Workload Performance Architecture',
  'Benchmarking, Regression Governance & Standards',
  'Performance Tooling & Platform Enablement',
  'Cross-Team Architecture Leadership & Influence',
  'Executive Communication & Risk Modeling',
];

const Skills: React.FC = () => (
  <motion.div {...fadeUp}>
    <Box sx={pageBox}>
      <BackgroundPattern />
      <Container maxWidth="md" sx={containerSx}>

        <motion.div {...inView} transition={{ duration: 0.5 }}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography sx={pageTitleSx}>Skills</Typography>
            <Box sx={{ height: '1px', width: 60, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, mx: 'auto', mt: 2 }} />
          </Box>
        </motion.div>

        {/* Core strengths */}
        <motion.div {...inView} transition={{ duration: 0.5, delay: 0.1 }}>
          <Box sx={cardSx}>
            <Typography sx={sectionHeadingSx}>Architecture & Technical Leadership</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1.5 }}>
              {coreStrengths.map((s) => (
                <Chip key={s} label={s} variant="outlined" sx={chipSx} />
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Methodology */}
        <motion.div {...inView} transition={{ duration: 0.5, delay: 0.15 }}>
          <Box sx={cardSx}>
            <Typography sx={sectionHeadingSx}>Methodology</Typography>
            <Typography sx={bodyTextSx}>
              I study how distributed systems behave under pressure — technically, operationally, and economically.
              That research is formalised as the{' '}
              <Box
                component="a"
                href="https://kpi99.co/en/ppi-framework.html"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: GOLD, fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                PPI-F™ (Performance Pressure Index) Framework
              </Box>
              : a four-pillar governance model spanning Performance, Production Readiness, Infrastructure Efficiency,
              and Failure Resilience. Covers pressure sources, propagation paths, system invariants, failure blast radius,
              consequence-weighted scoring, and the Pressure Map as primary diagnostic deliverable.
              Consulting and advisory through KPI99.
            </Typography>
          </Box>
        </motion.div>

        {/* Technologies */}
        <motion.div {...inView} transition={{ duration: 0.5, delay: 0.2 }}>
          <Box sx={cardSx}>
            <Typography sx={sectionHeadingSx}>Technologies</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1.5 }}>
              {techSections.map(({ label, items }) => (
                <Box key={label}>
                  <Typography sx={{ color: TEXT_MUTED, fontSize: { xs: '0.75rem', sm: '0.8rem' }, mb: 1, fontFamily: 'DS-DIGII, monospace', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {label}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {items.map((item) => (
                      <Chip key={item} label={item} variant="outlined" size="small" sx={chipSx} />
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </motion.div>

      </Container>
    </Box>
  </motion.div>
);

export default Skills;
