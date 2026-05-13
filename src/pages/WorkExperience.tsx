import React from 'react';
import { Box, Typography, Container, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import BackgroundPattern from '../components/BackgroundPattern';
import {
  cardSx, pageBox, containerSx, pageTitleSx,
  bodyTextSx, sectionHeadingSx, fadeUp, inView,
  GOLD, GOLD_BORDER, TEXT_BODY, TEXT_MUTED,
} from '../styles/pageStyles';

interface RoleProps {
  company: string;
  title: string;
  period: string;
  bullets: string[];
}

const Role: React.FC<RoleProps> = ({ company, title, period, bullets }) => (
  <Box sx={{ mb: 4 }}>
    <Typography sx={{ ...sectionHeadingSx, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
      {company}
    </Typography>
    <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600, fontSize: { xs: '0.9rem', sm: '0.95rem' }, mb: 0.5 }}>
      {title}
    </Typography>
    <Typography sx={{ color: TEXT_MUTED, fontSize: { xs: '0.78rem', sm: '0.82rem' }, mb: 1.5, fontFamily: 'DS-DIGII, monospace', letterSpacing: '0.04em' }}>
      {period}
    </Typography>
    <Box component="ul" sx={{ pl: 2.5, m: 0, '& li': { ...bodyTextSx, mb: 1, '&::marker': { color: GOLD } } }}>
      {bullets.map((b, i) => <li key={i}>{b}</li>)}
    </Box>
  </Box>
);

const WorkExperience: React.FC = () => (
  <motion.div {...fadeUp}>
    <Box sx={pageBox}>
      <BackgroundPattern />
      <Container maxWidth="md" sx={containerSx}>

        <motion.div {...inView} transition={{ duration: 0.5 }}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography sx={pageTitleSx}>Professional Experience</Typography>
            <Box sx={{ height: '1px', width: 60, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, mx: 'auto', mt: 2 }} />
          </Box>
        </motion.div>

        {/* Salesforce */}
        <motion.div {...inView} transition={{ duration: 0.5, delay: 0.1 }}>
          <Box sx={cardSx}>
            <Role
              company="Salesforce"
              title="Acting Principal Architect / Staff Performance Engineer"
              period="2021 – Present"
              bullets={[
                'Defined scalability architecture for distributed data platforms processing billions of events annually across multi-region deployments.',
                'Designed system-level scaling strategies across compute, storage, and query layers improving throughput by 35% under production-equivalent load.',
                'Built cost-to-serve models that informed infrastructure consolidation, reducing annual spend by ~$750K without degrading SLAs.',
                'Developed predictive workload models forecasting system behavior under 2×–10× growth scenarios, informing capacity investment decisions.',
                'Established performance diagnostics frameworks enabling cross-system bottleneck identification across heterogeneous data stacks (Spark, Trino, Kafka).',
                'Designed performance automation tooling enabling repeatable large-scale validation across releases and infrastructure changes.',
                'Led benchmarking and regression governance initiatives, setting org-wide quality gates ensuring stability across quarterly releases.',
                'Presented system risk, scaling constraints, and architectural recommendations to VP and C-suite stakeholders.',
              ]}
            />
          </Box>
        </motion.div>

        {/* IBM */}
        <motion.div {...inView} transition={{ duration: 0.5, delay: 0.15 }}>
          <Box sx={cardSx}>
            <Role
              company="IBM"
              title="Principal Performance & Capacity Engineer"
              period="2016 – 2021"
              bullets={[
                'Defined capacity planning and scalability strategies for enterprise distributed systems supporting millions of daily transactions.',
                'Designed diagnostics frameworks to systematically analyze system behavior under sustained and peak load conditions.',
                'Built infrastructure efficiency models aligning compute and storage allocation to actual workload demand, reducing waste by 20%+.',
                'Led JVM and backend optimization initiatives reducing p99 latency and improving system reliability under variable load.',
                'Operated as internal performance architect across multiple product lines, standardizing performance criteria and escalation paths.',
              ]}
            />
          </Box>
        </motion.div>

        {/* Accenture */}
        <motion.div {...inView} transition={{ duration: 0.5, delay: 0.2 }}>
          <Box sx={cardSx}>
            <Role
              company="Accenture"
              title="Lead Performance Engineer"
              period="2009 – 2016"
              bullets={[
                'Led performance architecture initiatives for large-scale enterprise systems across financial services, retail, and public sector clients.',
                'Designed load simulation and capacity stress frameworks to validate scalability ahead of peak seasonal events.',
                'Diagnosed and resolved distributed system bottlenecks impacting production reliability and SLA attainment.',
                'Delivered performance readiness assessments and executive briefings for go-live decisions on multi-million-dollar programs.',
              ]}
            />
          </Box>
        </motion.div>

      </Container>
    </Box>
  </motion.div>
);

export default WorkExperience;
