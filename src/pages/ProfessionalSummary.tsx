import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import BackgroundPattern from '../components/BackgroundPattern';
import {
  cardSx, pageBox, containerSx, pageTitleSx, sectionHeadingSx,
  bodyTextSx, fadeUp, inView, GOLD, GOLD_BORDER, GOLD_DIM, TEXT_MUTED,
} from '../styles/pageStyles';

const competencies = [
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

const ProfessionalSummary: React.FC = () => (
  <motion.div {...fadeUp}>
    <Box sx={pageBox}>
      <BackgroundPattern />
      <Container maxWidth="md" sx={containerSx}>

        <motion.div {...inView} transition={{ duration: 0.5 }}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography sx={pageTitleSx}>Professional Summary</Typography>
            <Box sx={{ height: '1px', width: 60, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, mx: 'auto', mt: 2 }} />
          </Box>
        </motion.div>

        <motion.div {...inView} transition={{ duration: 0.5, delay: 0.1 }}>
          <Box sx={cardSx}>
            <Box sx={{ p: { xs: 1.5, sm: 2 }, borderRadius: '10px', border: `1px solid ${GOLD_BORDER}`, backgroundColor: GOLD_DIM, mb: 2.5 }}>
              <Typography sx={{ color: GOLD, fontFamily: 'DS-DIGII, monospace', fontSize: { xs: '0.88rem', sm: '0.95rem' }, fontWeight: 700, textAlign: 'center', letterSpacing: '0.03em', lineHeight: 1.6 }}>
                I study how distributed systems behave under pressure —<br />technically, operationally, and economically.
              </Typography>
            </Box>
            <Typography sx={bodyTextSx} style={{ fontSize: '1rem', lineHeight: 1.8 }}>
              Systems Pressure Architect with 15+ years of experience defining and scaling distributed systems architectures for high-throughput data platforms. Expert in capacity planning, cost-to-serve modeling, and system-level performance engineering across multi-billion event workloads. Proven ability to design architectures that scale predictably, reduce infrastructure cost, and maintain reliability under production pressure.
            </Typography>
            <Typography sx={bodyTextSx} style={{ fontSize: '1rem', lineHeight: 1.8 }}>
              Performance pressure is not latency — it is the accumulated stress from traffic shape, resource saturation, coupling density, operational fragility, and economic misalignment, manifesting before any single metric crosses a threshold. My work maps where that pressure builds and traces its propagation paths before it surfaces as outages or cost overruns.
            </Typography>
            <Typography sx={bodyTextSx} style={{ fontSize: '1rem', lineHeight: 1.8 }}>
              Trusted advisor to engineering leadership on system risk, scalability strategy, and infrastructure investment decisions. Methodology formalised as the PPI-F™ (Performance Pressure Index) Framework — structured governance across Performance, Production Readiness, Infrastructure Efficiency, and Failure Resilience. Advisory through KPI99.
            </Typography>
          </Box>
        </motion.div>

        <motion.div {...inView} transition={{ duration: 0.5, delay: 0.15 }}>
          <Box sx={cardSx}>
            <Typography sx={sectionHeadingSx}>Core Competencies</Typography>
            <Box component="ul" sx={{ pl: 2.5, m: 0, mt: 1.5, '& li': { ...bodyTextSx, mb: 0.75, '&::marker': { color: GOLD } } }}>
              {competencies.map((c) => <li key={c}>{c}</li>)}
            </Box>
          </Box>
        </motion.div>

      </Container>
    </Box>
  </motion.div>
);

export default ProfessionalSummary;
