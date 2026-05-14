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

const focusAreas = [
  {
    label: 'Technical pressure',
    color: '#64B5F6',
    items: [
      'Latency elasticity under mixed workloads',
      'JVM and Spark execution pressure',
      'Kafka consumer lag and partition dynamics',
      'Tail-latency and p99 regression patterns',
      'Query, index, and hot-partition bottlenecks',
    ],
  },
  {
    label: 'Operational pressure',
    color: '#81C784',
    items: [
      'Deployment and rollback safety',
      'Observability maturity and alert fatigue',
      'Incident classification and escalation discipline',
      'Dependency fault isolation and circuit-breaker coverage',
      'Resilience exercise cadence and DR validation',
    ],
  },
  {
    label: 'Economic pressure',
    color: GOLD,
    items: [
      'Cost-to-serve per unit of work (not total spend)',
      'Waste indexing — idle compute, over-provisioned storage',
      'Economic blast radius from architectural coupling',
      'Spend elasticity under load — linear vs super-linear growth',
      'FinOps–SRE alignment on shared SLO economics',
    ],
  },
];

const economicsDetails = [
  {
    label: 'Cost-to-Serve Modeling',
    desc: 'Spend per unit of work — not total infrastructure cost. A system processing 1B events/day at $X/day has a cost-to-serve of $X per billion events. Changes in that ratio are the real signal: rising cost-to-serve means the architecture is becoming less efficient under load, independent of whether total spend went up or down.',
  },
  {
    label: 'Waste Indexing',
    desc: 'Idle compute, over-provisioned storage, zombie resources, and cross-AZ transfer bleed are not just cost line items — they are pressure signals. Waste accumulates when capacity is not tracking demand shape. A system with high waste is also a system with hidden over-provisioning that will not protect it during real spikes.',
  },
  {
    label: 'Economic Blast Radius',
    desc: 'Architectural coupling creates cost propagation, not just failure propagation. A single misbehaving Spark job, a misconfigured shuffle partition count, or a hot Kafka partition can inflate costs across shared clusters that have nothing to do with the original workload. Mapping economic blast radius is the cost equivalent of failure blast radius analysis.',
  },
  {
    label: 'Spend Elasticity',
    desc: 'Does cost grow linearly, sub-linearly, or super-linearly as load increases? Sub-linear growth is the goal — well-designed systems get cheaper per unit as they scale. Super-linear cost growth under pressure is a structural warning: it means the architecture is absorbing demand through expensive paths rather than efficient ones.',
  },
  {
    label: 'FinOps–SRE Alignment',
    desc: 'SLOs without cost guardrails are incomplete. Reliability has a unit price, and teams that do not know it cannot make defensible architecture tradeoffs. Aligning FinOps and SRE means SLO decisions include a cost-to-serve component — so reliability targets are set with awareness of what headroom they consume economically, not just operationally.',
  },
];

const engagementTypes = [
  {
    label: 'PPI-F™ Survey',
    tag: '44-driver diagnostic',
    desc: 'Consequence-weighted maturity assessment across all four pillars. Per-pillar scores with evidence confidence band (A/B/C). Baseline Pressure Map. Prioritised finding set.',
  },
  {
    label: 'PPI-F™ Deep Audit',
    tag: '190-rule catalog + telemetry',
    desc: 'Full detection-oriented rule evaluation bound to live telemetry evidence. Covers latency, JVM, Kafka, Spark, infrastructure economics, failure resilience, and delivery safety. Pressure Map with causal path annotations.',
  },
  {
    label: 'Pressure Architecture Review',
    tag: 'Design-phase advisory',
    desc: 'Applied before a major architecture decision, migration, or scaling event. Maps pressure propagation paths, failure blast radius, and economic blast radius in proposed designs before they ship.',
  },
  {
    label: 'Executive Briefing',
    tag: 'Leadership communication',
    desc: 'Translate technical and economic pressure risk into business terms. Controlled vs external pressure, infrastructure investment rationale, cost-to-serve trajectory, and capacity headroom for 2×–10× growth scenarios.',
  },
  {
    label: 'Incident Post-Mortem',
    tag: 'Root-cause and prevention',
    desc: 'Structured analysis of system failure events using PPI-F propagation and failure mode taxonomy. Includes cost impact attribution. Produces a causal narrative, not a blame log.',
  },
];

const PressureIntelligence: React.FC = () => {
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

          {/* Three Dimensions */}
          <motion.div {...inView} transition={{ duration: 0.6, delay: 0.06 }}>
            <Box sx={cardSx}>
              <Typography sx={sectionHeadingSx}>Three Dimensions of Pressure</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1.5 }}>
                {focusAreas.map(({ label, color, items }) => (
                  <Box key={label} sx={{ p: { xs: 1.5, sm: 2 }, borderRadius: '10px', border: `0.5px solid ${color}33`, backgroundColor: `${color}08` }}>
                    <Typography sx={{ color, fontWeight: 700, fontSize: '0.88rem', fontFamily: 'DS-DIGII, monospace', letterSpacing: '0.04em', mb: 1 }}>
                      {label}
                    </Typography>
                    <Box component="ul" sx={{ pl: 2.5, m: 0, '& li': { color: TEXT_BODY, fontSize: '0.85rem', mb: 0.5, lineHeight: 1.6, '&::marker': { color } } }}>
                      {items.map((item) => <li key={item}>{item}</li>)}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </motion.div>

          {/* Infrastructure Economics — dedicated section */}
          <motion.div {...inView} transition={{ duration: 0.6, delay: 0.08 }}>
            <Box sx={cardSx}>
              <Typography sx={sectionHeadingSx}>Infrastructure Economics</Typography>
              <Typography sx={{ ...bodyTextSx, mb: 2.5 }}>
                Most performance work stops at latency and throughput. Infrastructure economics asks the
                next question: <em style={{ color: 'rgba(255,255,255,0.88)' }}>what does this system cost per unit of work, and how does that ratio
                change under pressure?</em> Cost-to-serve is not a FinOps concern bolted onto engineering —
                it is a first-class pressure signal.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {economicsDetails.map(({ label, desc }, i) => (
                  <Box
                    key={label}
                    sx={{
                      display: 'flex', gap: 2, alignItems: 'flex-start',
                      pb: i < economicsDetails.length - 1 ? 2 : 0,
                      mb: i < economicsDetails.length - 1 ? 2 : 0,
                      borderBottom: i < economicsDetails.length - 1 ? '0.5px solid rgba(255,255,255,0.06)' : 'none',
                    }}
                  >
                    <Box sx={{ flexShrink: 0, mt: '5px', width: 7, height: 7, borderRadius: '50%', backgroundColor: GOLD, boxShadow: `0 0 6px ${GOLD}88` }} />
                    <Box>
                      <Typography sx={{ color: GOLD, fontWeight: 700, fontSize: '0.88rem', fontFamily: 'DS-DIGII, monospace', letterSpacing: '0.03em', mb: 0.5 }}>
                        {label}
                      </Typography>
                      <Typography sx={{ color: TEXT_BODY, fontSize: '0.85rem', lineHeight: 1.7 }}>
                        {desc}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box sx={{ mt: 2.5, p: { xs: 1.5, sm: 2 }, borderRadius: '10px', border: `0.5px solid ${GOLD_BORDER}`, backgroundColor: GOLD_DIM }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                  Infrastructure economics is built into PPI-F™'s Infrastructure Efficiency pillar (25% consequence weight), with drivers covering spend tracking per workload, right-sizing discipline, cost anomaly detection, and FinOps governance alignment — scored alongside reliability and performance, not separately.
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* Engagement Types */}
          <motion.div {...inView} transition={{ duration: 0.6, delay: 0.1 }}>
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
          <motion.div {...inView} transition={{ duration: 0.6, delay: 0.12 }}>
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

export default PressureIntelligence;
