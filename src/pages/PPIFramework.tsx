import React from 'react';
import { Box, Typography, Container, Button, Link } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import { motion } from 'framer-motion';
import BackgroundPattern from '../components/BackgroundPattern';
import {
  GOLD, GOLD_BORDER, GOLD_DIM, cardSx, pageBox, containerSx, pageTitleSx,
  pageSubtitleSx, sectionHeadingSx, bodyTextSx, goldOutlinedBtn, fadeUp, inView,
  TEXT_MUTED, TEXT_BODY,
} from '../styles/pageStyles';

const PPI_F_URL = 'https://kpi99.co/en/ppi-framework.html';

// ── Data ────────────────────────────────────────────────────────────────────

const pillars = [
  {
    id: 'perf',
    label: 'Performance',
    weight: '30%',
    color: '#64B5F6',
    desc: 'Latency, throughput, tail behaviour, and capacity under real mixed workloads. Measured against defined SLOs — not averages. Includes load testing discipline, regression detection, and capacity forecasting.',
    drivers: ['SLA/SLO definition for latency and throughput', 'Tail-latency monitoring (p95/p99)', 'Capacity planning by forecast', 'Regular load testing and regression detection', 'Response-time targets per API/DB layer'],
  },
  {
    id: 'prod',
    label: 'Production Readiness',
    weight: '25%',
    color: '#81C784',
    desc: 'Delivery safety, observability trust, and operational control. How confidently a team can ship, roll back, and diagnose problems in production without causing service degradation.',
    drivers: ['CI/CD with deployment gates', 'Progressive delivery (canary / blue-green)', 'Centralized observability and alert ownership', 'Formal release and rollback process', 'Incident classification and escalation clarity'],
  },
  {
    id: 'infra',
    label: 'Infrastructure Efficiency',
    weight: '25%',
    color: GOLD,
    desc: 'Unit economics, waste, scaling discipline, and cost guardrails. Efficiency is not cost-cutting — it\'s ensuring that spend directly maps to workload demand. Waste and over-provisioning mask real pressure signals.',
    drivers: ['Spend tracking per workload and team', 'Resource right-sizing and idle decommissioning', 'Cost anomaly detection and budget alerts', 'FinOps governance alignment', 'Commitment model optimisation'],
  },
  {
    id: 'fail',
    label: 'Failure Resilience',
    weight: '20%',
    color: '#E57373',
    desc: 'Isolation, recovery, and validated continuity assumptions. Not whether systems fail — they will — but how fast they recover, how far failure propagates, and whether runbooks and drills match reality.',
    drivers: ['Automated failover and regional resilience', 'RTO/RPO definition and DR validation', 'Dependency fault isolation (circuit breakers, bulkheads)', 'Resilience exercise cadence (chaos engineering)', 'Failure propagation controls (retries, backoff)'],
  },
];

const metrics = [
  { label: 'Pressure Index',     desc: 'Quantifies load relative to capacity across all four pillars, consequence-weighted.' },
  { label: 'Latency Elasticity', desc: 'How sensitively response time changes as load increases — the slope of the latency curve.' },
  { label: 'Failure Velocity',   desc: 'Rate of degradation under stress — how fast does a system move from marginal to failed?' },
  { label: 'Recovery Friction',  desc: 'Effort required to restore service: detection lag + escalation time + mitigation steps.' },
  { label: 'Cost-to-Serve',      desc: 'Infrastructure spend per unit of work delivered. Tracks whether efficiency scales with load.' },
];

const tiers = [
  {
    id: 'scout',
    label: 'Scout',
    tag: 'Free · 24 questions',
    color: 'rgba(100,181,246,0.18)',
    border: 'rgba(100,181,246,0.35)',
    desc: '6 narrative prompts per pillar. Intake signal for hypothesis generation — not a scored maturity assessment.',
  },
  {
    id: 'survey',
    label: 'Survey',
    tag: 'Diagnostic · 44 drivers',
    color: 'rgba(212,175,55,0.08)',
    border: GOLD_BORDER,
    desc: 'Full maturity scoring on consequence-weighted drivers (existential ×4, high ×3, medium ×2, low ×1). Per-pillar scores with evidence confidence band (A/B/C).',
  },
  {
    id: 'deep',
    label: 'Deep',
    tag: 'Full audit · 190 rules',
    color: 'rgba(229,115,115,0.08)',
    border: 'rgba(229,115,115,0.35)',
    desc: 'Detection-oriented rule catalog bound to live telemetry evidence. Covers PERF-LAT, PERF-JVM, PERF-KAFKA, PERF-SPARK, infrastructure, resilience, and delivery rules.',
  },
];

const engagementSteps = [
  { n: '01', label: 'Questionnaire',       desc: 'Scoped intake — problem statement, stakeholders, business harm, success criteria.' },
  { n: '02', label: 'Hypothesis Report',   desc: '3–5 testable, pre-registered predictions. Falsifiable. Locked before diagnostics begin.' },
  { n: '03', label: 'Diagnostics',         desc: 'Per-pillar evidence collection across Performance, Production Readiness, Infrastructure, and Failure Resilience.' },
  { n: '04', label: 'Playbook',            desc: 'Prioritised actions with entry/exit criteria, rollback plans, and hypothesis traceability.' },
  { n: '05', label: 'Run Log',             desc: 'Baseline (Run-0) through remediation (Run-N), delta-tracked per hypothesis.' },
  { n: '06', label: 'Pressure Map',        desc: 'Hero deliverable. Causal, layered, gradient-encoded. Client-specific — not a template paste-in.' },
  { n: '07', label: 'Hypothesis Close',    desc: 'Outcome vs prediction. What was confirmed, what was wrong, what was learned.' },
];

// ─────────────────────────────────────────────────────────────────────────────

const PPIFramework: React.FC = () => (
  <motion.div {...fadeUp}>
    <Box sx={pageBox}>
      <BackgroundPattern />
      <Container maxWidth="md" sx={containerSx}>

        {/* Hero */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography sx={pageTitleSx}>PPI-F™</Typography>
          <Typography sx={{ ...pageSubtitleSx, fontStyle: 'italic', mb: 3 }}>
            Performance is pressure, not latency.
          </Typography>
          <Typography sx={{ ...bodyTextSx, maxWidth: 600, mx: 'auto', textAlign: 'center', fontSize: '1rem', lineHeight: 1.8 }}>
            I study how distributed systems behave under pressure — technically, operationally, and economically.
            PPI-F™ is the formalisation of that methodology: a structured governance framework for understanding
            where pressure builds in revenue- and data-critical distributed systems, and how it propagates before
            latency or errors surface.
          </Typography>
          <Box sx={{ mt: 3, mb: 1, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              href={PPI_F_URL}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNew sx={{ fontSize: '0.9rem' }} />}
              sx={goldOutlinedBtn}
            >
              Full methodology at KPI99
            </Button>
          </Box>
        </Box>

        {/* Diagram */}
        <motion.div {...inView} transition={{ duration: 0.6 }}>
          <Box sx={{ ...cardSx, textAlign: 'center', p: { xs: 2, sm: 3 } }}>
            <Typography sx={sectionHeadingSx}>Framework Overview</Typography>
            <Box
              component="img"
              src="/images/ppi-f-diagram.png"
              alt="PPI-F Framework: Pressure Sources, Propagation Paths, System Invariants, Failure Modes, Optimization Levers"
              sx={{ width: '100%', maxWidth: 560, borderRadius: '10px', mt: 1.5, display: 'block', mx: 'auto' }}
            />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5, mt: 2.5 }}>
              {['Pressure Sources', 'Propagation Paths', 'System Invariants', 'Failure Modes', 'Optimization Levers'].map((c) => (
                <Box key={c} sx={{ px: 1.5, py: 0.5, borderRadius: '20px', border: `0.5px solid ${GOLD_BORDER}`, backgroundColor: GOLD_DIM }}>
                  <Typography sx={{ color: GOLD, fontFamily: 'DS-DIGII, monospace', fontSize: '0.75rem', letterSpacing: '0.04em' }}>{c}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Four Pillars */}
        <motion.div {...inView} transition={{ duration: 0.6, delay: 0.06 }}>
          <Box sx={cardSx}>
            <Typography sx={sectionHeadingSx}>Four Pillars</Typography>
            <Typography sx={{ ...bodyTextSx, mb: 2.5 }}>
              Pressure is consequence-weighted across four domains. A system can appear healthy on one axis
              while under critical stress on another — PPI-F surfaces those asymmetries.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {pillars.map(({ label, weight, color, desc, drivers }) => (
                <Box key={label} sx={{ p: { xs: 1.75, sm: 2.5 }, borderRadius: '12px', border: `0.5px solid ${color}44`, backgroundColor: `${color}08` }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.75, flexWrap: 'wrap', gap: 0.5 }}>
                    <Typography sx={{ color, fontWeight: 700, fontSize: { xs: '0.9rem', sm: '1rem' }, fontFamily: 'DS-DIGII, monospace', letterSpacing: '0.04em' }}>{label}</Typography>
                    <Typography sx={{ color: TEXT_MUTED, fontSize: '0.75rem', fontFamily: 'DS-DIGII, monospace' }}>weight {weight}</Typography>
                  </Box>
                  <Typography sx={{ ...bodyTextSx, mb: 1.25 }}>{desc}</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6 }}>
                    {drivers.map((d) => (
                      <Box key={d} sx={{ px: 1, py: 0.25, borderRadius: '4px', border: `0.5px solid ${color}33`, backgroundColor: `${color}0a` }}>
                        <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem' }}>{d}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Key Metrics */}
        <motion.div {...inView} transition={{ duration: 0.6, delay: 0.08 }}>
          <Box sx={cardSx}>
            <Typography sx={sectionHeadingSx}>Five Pressure Metrics</Typography>
            <Typography sx={{ ...bodyTextSx, mb: 2 }}>
              These five quantities make pressure measurable and comparable across time, teams, and system boundaries.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              {metrics.map(({ label, desc }) => (
                <Box key={label} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box sx={{ flexShrink: 0, mt: '3px', width: 8, height: 8, borderRadius: '50%', backgroundColor: GOLD, boxShadow: `0 0 6px ${GOLD}88` }} />
                  <Box>
                    <Typography sx={{ color: GOLD, fontWeight: 700, fontSize: '0.85rem', fontFamily: 'DS-DIGII, monospace', mb: 0.25 }}>{label}</Typography>
                    <Typography sx={{ color: TEXT_BODY, fontSize: '0.85rem', lineHeight: 1.6 }}>{desc}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Scoring */}
        <motion.div {...inView} transition={{ duration: 0.6, delay: 0.1 }}>
          <Box sx={cardSx}>
            <Typography sx={sectionHeadingSx}>Pressure Scoring</Typography>
            <Typography sx={{ ...bodyTextSx, mb: 2 }}>
              Each driver is rated on a 1–5 maturity scale. Lower maturity = higher pressure:
            </Typography>
            <Box sx={{ border: `1px solid ${GOLD}55`, borderRadius: '12px', p: { xs: 2, sm: 3 }, mb: 2.5, backgroundColor: 'rgba(212,175,55,0.05)', textAlign: 'center' }}>
              <Typography sx={{ fontFamily: 'DS-DIGII, monospace', fontSize: { xs: '0.88rem', sm: '1rem' }, fontWeight: 700, color: GOLD, lineHeight: 2 }}>
                Pressure = (5 − Maturity) / 5
              </Typography>
              <Typography sx={{ color: TEXT_MUTED, fontSize: '0.78rem', mt: 0.5 }}>
                Per-pillar score = consequence-weighted average of driver scores (existential ×4 · high ×3 · medium ×2 · low ×1)
              </Typography>
            </Box>
            <Typography sx={{ ...bodyTextSx, mb: 1 }}>
              Evidence confidence band (A/B/C) accompanies every score: dashboards and metrics are highest-quality evidence (weight 2); incidents and tickets (weight 1); informal sense (weight 0). Band A requires sum ≥ 7.
            </Typography>
            <Typography sx={{ color: TEXT_MUTED, fontSize: '0.82rem', fontStyle: 'italic', lineHeight: 1.65 }}>
              Planned: pressure velocity (ΔP/Δt), pressure half-life per pillar, and Bayesian posteriors with credible intervals replacing point estimates.
            </Typography>
          </Box>
        </motion.div>

        {/* Diagnostic Tiers */}
        <motion.div {...inView} transition={{ duration: 0.6, delay: 0.12 }}>
          <Box sx={cardSx}>
            <Typography sx={sectionHeadingSx}>Diagnostic Tiers</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1.5 }}>
              {tiers.map(({ label, tag, color, border, desc }) => (
                <Box key={label} sx={{ p: { xs: 1.75, sm: 2.25 }, borderRadius: '12px', border: `0.5px solid ${border}`, backgroundColor: color }}>
                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'baseline', mb: 0.75, flexWrap: 'wrap' }}>
                    <Typography sx={{ color: '#fff', fontWeight: 700, fontFamily: 'DS-DIGII, monospace', fontSize: '0.9rem' }}>{label}</Typography>
                    <Typography sx={{ color: TEXT_MUTED, fontSize: '0.72rem', fontFamily: 'DS-DIGII, monospace', letterSpacing: '0.04em' }}>{tag}</Typography>
                  </Box>
                  <Typography sx={{ color: TEXT_BODY, fontSize: '0.85rem', lineHeight: 1.6 }}>{desc}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Pressure Map */}
        <motion.div {...inView} transition={{ duration: 0.6, delay: 0.14 }}>
          <Box sx={cardSx}>
            <Typography sx={sectionHeadingSx}>Pressure Map — Hero Deliverable</Typography>
            <Typography sx={{ ...bodyTextSx, mb: 2 }}>
              KPI99 ships maps, not scores. The Pressure Map is the primary client artifact:
              a layered, causal representation of where pressure accumulates and how it propagates
              across system boundaries — encoded as a gradient, not a binary red/green flag.
            </Typography>
            <Box
              component="img"
              src="/images/kpi99-flagship-pressure-map.webp"
              alt="KPI99 Flagship Pressure Map — 7-layer distributed system pressure visualization"
              sx={{ width: '100%', borderRadius: '12px', mb: 2, border: `0.5px solid ${GOLD_BORDER}` }}
            />
            <Box component="ul" sx={{ pl: 2.5, m: 0, '& li': { ...bodyTextSx, mb: 0.75, '&::marker': { color: GOLD } } }}>
              <li>Minimum 7 layers: from user/traffic origin through compute, storage, and cost-to-serve levers</li>
              <li>Pressure gradient (low → critical) encoded as colour intensity per region</li>
              <li>Directed causal arrows labelled with mechanism — retry storm, queue wait amplification, daily-average planning blind spot</li>
              <li>Client-specific: rebuilt per engagement from their topology and evidence, not pasted from a template</li>
            </Box>
          </Box>
        </motion.div>

        {/* Engagement Flow */}
        <motion.div {...inView} transition={{ duration: 0.6, delay: 0.16 }}>
          <Box sx={cardSx}>
            <Typography sx={sectionHeadingSx}>Engagement Artifact Chain</Typography>
            <Typography sx={{ ...bodyTextSx, mb: 2 }}>
              Every engagement produces an ordered artifact chain. Pre-registered predictions are locked
              before diagnostics begin — no post-hoc rationalization.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {engagementSteps.map(({ n, label, desc }, i) => (
                <Box key={n} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', pb: i < engagementSteps.length - 1 ? 1.5 : 0 }}>
                  <Box sx={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ width: 28, height: 28, borderRadius: '50%', border: `1px solid ${GOLD_BORDER}`, backgroundColor: GOLD_DIM, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography sx={{ color: GOLD, fontFamily: 'DS-DIGII, monospace', fontWeight: 700, fontSize: '0.65rem' }}>{n}</Typography>
                    </Box>
                    {i < engagementSteps.length - 1 && (
                      <Box sx={{ width: '1px', flex: 1, minHeight: 16, backgroundColor: 'rgba(255,255,255,0.08)', mt: 0.5 }} />
                    )}
                  </Box>
                  <Box sx={{ pb: i < engagementSteps.length - 1 ? 0.5 : 0 }}>
                    <Typography sx={{ color: '#ffffff', fontWeight: 700, fontSize: '0.88rem', mb: 0.25 }}>{label}</Typography>
                    <Typography sx={{ color: TEXT_BODY, fontSize: '0.83rem', lineHeight: 1.6 }}>{desc}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Predictions Ledger */}
        <motion.div {...inView} transition={{ duration: 0.6, delay: 0.18 }}>
          <Box sx={cardSx}>
            <Typography sx={sectionHeadingSx}>Pre-Registered Predictions Ledger</Typography>
            <Typography sx={{ ...bodyTextSx }}>
              3–5 signed, falsifiable predictions are locked per qualifying engagement before diagnostics begin.
              Records are git-backed and immutable — append-only under <code style={{ color: GOLD, fontSize: '0.82rem' }}>data/prediction-ledger/</code>.
              Aggregate accuracy is reported at T+12 months: count locked, count evaluated, hit rate. No client names.
              No results before collection floor is reached. Transparency over silence.
            </Typography>
          </Box>
        </motion.div>

        {/* CTA */}
        <motion.div {...inView} transition={{ duration: 0.6, delay: 0.2 }}>
          <Box sx={{ ...cardSx, textAlign: 'center' }}>
            <Typography sx={{ color: GOLD, fontFamily: 'DS-DIGII, monospace', fontWeight: 700, fontSize: { xs: '1rem', sm: '1.1rem' }, letterSpacing: '0.05em', mb: 1.5 }}>
              PPI-F™ at KPI99
            </Typography>
            <Typography sx={{ ...bodyTextSx, maxWidth: 500, mx: 'auto', mb: 2.5 }}>
              Full methodology, interactive diagnostic, and Pressure Map examples.
              Open taxonomy (CC-BY-4.0) and reference CLI (MIT) available for integration.
            </Typography>
            <Button
              variant="outlined"
              href={PPI_F_URL}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNew sx={{ fontSize: '0.9rem' }} />}
              sx={goldOutlinedBtn}
            >
              Open methodology at KPI99
            </Button>
            <Box sx={{ mt: 1.5 }}>
              <Link
                href="https://kpi99.co"
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                sx={{ color: TEXT_MUTED, fontSize: '0.8rem', '&:hover': { color: GOLD } }}
              >
                kpi99.co →
              </Link>
            </Box>
          </Box>
        </motion.div>

      </Container>
    </Box>
  </motion.div>
);

export default PPIFramework;
