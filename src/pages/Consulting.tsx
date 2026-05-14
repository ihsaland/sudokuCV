import React from 'react';
import { Box, Typography, Container, Button, Link } from '@mui/material';
import { motion } from 'framer-motion';
import BackgroundPattern from '../components/BackgroundPattern';
import { useNavigate } from 'react-router-dom';
import {
  GOLD, GOLD_BORDER, GOLD_DIM, cardSx, pageBox, containerSx, pageTitleSx,
  pageSubtitleSx, sectionHeadingSx, bodyTextSx, goldOutlinedBtn, fadeUp, inView,
  TEXT_MUTED, TEXT_BODY,
} from '../styles/pageStyles';

const engagementTypes = [
  {
    label: 'PPI-F™ Survey',
    tag: '44-driver diagnostic',
    desc: 'Consequence-weighted maturity assessment across all four pillars. Per-pillar scores with evidence confidence band (A/B/C). Baseline Pressure Map. Prioritised finding set.',
  },
  {
    label: 'PPI-F™ Deep Audit',
    tag: '190-rule catalog + telemetry',
    desc: 'Full detection-oriented rule evaluation bound to live telemetry evidence. Covers latency, JVM, Kafka, Spark, infrastructure efficiency, failure resilience, and delivery safety. Pressure Map with causal path annotations.',
  },
  {
    label: 'Pressure Architecture Review',
    tag: 'Design-phase advisory',
    desc: 'Applied before a major architecture decision, migration, or scaling event. Maps pressure propagation paths and failure blast radius in proposed designs before they ship.',
  },
  {
    label: 'Executive Briefing',
    tag: 'Leadership communication',
    desc: 'Translate technical pressure risk into business terms. Controlled vs external pressure, infrastructure investment rationale, and capacity headroom for 2×–10× growth scenarios.',
  },
  {
    label: 'Incident Post-Mortem',
    tag: 'Root-cause and prevention',
    desc: 'Structured analysis of system failure events using PPI-F propagation and failure mode taxonomy. Produces a causal narrative, not a blame log.',
  },
];

const focusAreas = [
  {
    label: 'Technical pressure',
    items: ['Latency elasticity under mixed workloads', 'JVM and Spark execution pressure', 'Kafka consumer lag and partition dynamics', 'Tail-latency and p99 regression patterns', 'Query, index, and hot-partition bottlenecks'],
  },
  {
    label: 'Operational pressure',
    items: ['Deployment and rollback safety', 'Observability maturity and alert fatigue', 'Incident classification and escalation discipline', 'Dependency fault isolation and circuit-breaker coverage', 'Resilience exercise cadence and DR validation'],
  },
  {
    label: 'Economic pressure',
    items: ['Cost-to-serve modeling per workload and team', 'Infrastructure efficiency and waste indexing', 'Commitment model optimisation (reserved vs spot)', 'Cost anomaly detection and budget guardrails', 'FinOps and SRE alignment on shared SLO economics'],
  },
];

const Consulting: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div {...fadeUp}>
      <Box sx={pageBox}>
        <BackgroundPattern />
        <Container maxWidth="md" sx={containerSx}>

          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography sx={pageTitleSx}>Pressure Intelligence</Typography>
            <Typography sx={pageSubtitleSx}>
              I study how distributed systems behave under pressure — technically, operationally, and economically.
              Advisory through KPI99 using the PPI-F™ framework.
            </Typography>
          </Box>

          {/* Position */}
          <motion.div {...inView} transition={{ duration: 0.6 }}>
            <Box sx={cardSx}>
              <Typography sx={sectionHeadingSx}>What This Work Is</Typography>
              <Typography sx={{ ...bodyTextSx, fontSize: '1rem', lineHeight: 1.8, mb: 1.5 }}>
                Performance pressure is not the same as latency. It is the accumulated stress on a system
                from traffic shape, resource saturation, coupling density, operational fragility, and
                economic misalignment — manifesting before any single metric crosses a threshold.
              </Typography>
              <Typography sx={bodyTextSx}>
                My work maps where pressure builds in revenue- and data-critical distributed systems
                and traces the propagation paths before they surface as outages or cost overruns.
                The output is a structured Pressure Map — causal, layered, gradient-encoded — not a
                dashboard summary or a set of tool recommendations.
              </Typography>
              <Box sx={{ mt: 2.5, p: { xs: 1.5, sm: 2 }, borderRadius: '10px', border: `1px solid ${GOLD_BORDER}`, backgroundColor: GOLD_DIM, textAlign: 'center' }}>
                <Typography sx={{ color: GOLD, fontFamily: 'DS-DIGII, monospace', fontSize: { xs: '0.88rem', sm: '0.95rem' }, fontWeight: 700, letterSpacing: '0.03em', lineHeight: 1.6 }}>
                  "Performance is pressure, not latency. Systems fail under unmanaged pressure, not bad code."
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* Focus dimensions */}
          <motion.div {...inView} transition={{ duration: 0.6, delay: 0.06 }}>
            <Box sx={cardSx}>
              <Typography sx={sectionHeadingSx}>Three Dimensions of Pressure</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1.5 }}>
                {focusAreas.map(({ label, items }) => (
                  <Box key={label} sx={{ p: { xs: 1.5, sm: 2 }, borderRadius: '10px', border: `0.5px solid rgba(255,255,255,0.1)`, backgroundColor: 'rgba(255,255,255,0.03)' }}>
                    <Typography sx={{ color: GOLD, fontWeight: 700, fontSize: '0.88rem', fontFamily: 'DS-DIGII, monospace', letterSpacing: '0.04em', mb: 1 }}>
                      {label}
                    </Typography>
                    <Box component="ul" sx={{ pl: 2.5, m: 0, '& li': { color: TEXT_BODY, fontSize: '0.85rem', mb: 0.5, lineHeight: 1.6, '&::marker': { color: GOLD } } }}>
                      {items.map((item) => <li key={item}>{item}</li>)}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </motion.div>

          {/* Engagement types */}
          <motion.div {...inView} transition={{ duration: 0.6, delay: 0.08 }}>
            <Box sx={cardSx}>
              <Typography sx={sectionHeadingSx}>Engagement Types</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1.5 }}>
                {engagementTypes.map(({ label, tag, desc }) => (
                  <Box key={label} sx={{ p: { xs: 1.5, sm: 2 }, borderRadius: '10px', border: `0.5px solid rgba(255,255,255,0.1)`, backgroundColor: 'rgba(255,255,255,0.03)' }}>
                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'baseline', flexWrap: 'wrap', mb: 0.75 }}>
                      <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>{label}</Typography>
                      <Typography sx={{ color: TEXT_MUTED, fontSize: '0.72rem', fontFamily: 'DS-DIGII, monospace', letterSpacing: '0.04em' }}>{tag}</Typography>
                    </Box>
                    <Typography sx={{ color: TEXT_BODY, fontSize: '0.85rem', lineHeight: 1.6 }}>{desc}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </motion.div>

          {/* KPI99 CTA */}
          <motion.div {...inView} transition={{ duration: 0.6, delay: 0.1 }}>
            <Box sx={{ ...cardSx, textAlign: 'center' }}>
              <Typography sx={{ color: GOLD, fontFamily: 'DS-DIGII, monospace', fontWeight: 700, fontSize: { xs: '1rem', sm: '1.15rem' }, mb: 1, letterSpacing: '0.04em' }}>
                KPI99
              </Typography>
              <Typography sx={{ ...bodyTextSx, mb: 2 }}>
                Advisory and methodology practice. Diagnostic tools, PPI-F™ framework open taxonomy,
                and Pressure Map deliverables available at KPI99. Open taxonomy published under CC-BY-4.0.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link
                  href="https://kpi99.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  sx={{ color: GOLD, fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 0.5, '&:hover': { color: '#ffffff' } }}
                >
                  kpi99.co →
                </Link>
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

export default Consulting;
