import React, { useState } from 'react';
import {
  Box, Typography, Container, Button, TextField, Link,
  Table, TableBody, TableCell, TableHead, TableRow,
  List, ListItem, ListItemIcon, ListItemText,
} from '@mui/material';
import { CheckBoxOutlineBlank } from '@mui/icons-material';
import { motion } from 'framer-motion';
import BackgroundPattern from '../components/BackgroundPattern';
import {
  GOLD, cardSx, pageBox, containerSx, pageTitleSx, pageSubtitleSx,
  sectionHeadingSx, bodyTextSx, goldOutlinedBtn, fadeUp, inView, TEXT_MUTED,
} from '../styles/pageStyles';

// Shared dark styles for MUI form/table overrides
const inputSx = {
  '& .MuiOutlinedInput-root': {
    color: 'rgba(255,255,255,0.85)',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
    '&:hover fieldset': { borderColor: GOLD },
    '&.Mui-focused fieldset': { borderColor: GOLD },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
  '& .MuiInputLabel-root.Mui-focused': { color: GOLD },
};

const tableCellSx = {
  color: 'rgba(255,255,255,0.78)',
  borderColor: 'rgba(255,255,255,0.08)',
  fontSize: { xs: '0.82rem', sm: '0.88rem' },
};

const prelaunch = [
  'Baseline metrics and SLOs defined',
  'Load and stress tests run with target profile',
  'Pressure sources and propagation paths documented',
  'Failure modes and rollback criteria agreed',
  'Observability (metrics, traces, logs) in place',
];

const capacity = [
  'Current utilisation and saturation measured',
  'Growth and peak demand forecasted',
  'PPI or equivalent pressure index reviewed',
  'Cost-to-serve and efficiency trends tracked',
  'Scaling triggers and limits documented',
];

const incident = [
  'Timeline and symptom data collected',
  'Pressure propagation and root cause mapped',
  'Invariants that were violated identified',
  'Detection and response gaps documented',
  'Remediation and prevention actions prioritised',
];

const finops = [
  'Resource usage and cost attribution clear',
  'Waste and optimisation levers identified',
  'Right-sizing and reservation options evaluated',
  'PPI or ICEA-style efficiency evidence used',
  'Actions tied to business and SRE goals',
];

const CheckList: React.FC<{ items: string[] }> = ({ items }) => (
  <List dense disablePadding>
    {items.map((item) => (
      <ListItem key={item} disablePadding sx={{ py: 0.35 }}>
        <ListItemIcon sx={{ minWidth: 28 }}>
          <CheckBoxOutlineBlank sx={{ fontSize: 16, color: GOLD }} />
        </ListItemIcon>
        <ListItemText
          primary={item}
          primaryTypographyProps={{ sx: { color: 'rgba(255,255,255,0.75)', fontSize: { xs: '0.88rem', sm: '0.93rem' }, lineHeight: 1.6 } }}
        />
      </ListItem>
    ))}
  </List>
);

const ResearchTools: React.FC = () => {
  const [nodes, setNodes]               = useState(10);
  const [hourlyCost, setHourlyCost]     = useState(0.92);
  const [jobsPerDay, setJobsPerDay]     = useState(100);
  const [avgRuntimeMin, setAvgRuntimeMin] = useState(15);
  const [wastePct, setWastePct]         = useState(25);

  const hourlyCluster = nodes * hourlyCost;
  const dailyCost     = hourlyCluster * (avgRuntimeMin / 60) * jobsPerDay;
  const monthlyCost   = dailyCost * 30;
  const wasteMonthly  = monthlyCost * (wastePct / 100);

  return (
    <motion.div {...fadeUp}>
      <Box sx={pageBox}>
        <BackgroundPattern />
        <Container maxWidth="md" sx={containerSx}>

          <Typography sx={pageTitleSx}>Research / Tools</Typography>
          <Typography sx={pageSubtitleSx}>
            Diagnostics, cost modelling, and engineering methodology — artifacts I build and use.
          </Typography>

          {/* 1. PPI Diagnostic */}
          <motion.div {...inView} transition={{ duration: 0.6 }}>
            <Box sx={cardSx}>
              <Typography sx={sectionHeadingSx}>PPI Diagnostic Tool</Typography>
              <Typography sx={bodyTextSx}>
                The KPI99 Diagnostic applies the PPI-F™ framework to your system and produces evidence-based findings — scored across Request Pressure, Resource Saturation, System Coupling, and Observability Maturity.
              </Typography>
              <Box component="ul" sx={{ pl: 2.5, mb: 2.5, '& li': { color: 'rgba(255,255,255,0.75)', fontSize: { xs: '0.88rem', sm: '0.93rem' }, mb: 0.75, lineHeight: 1.6 } }}>
                <li>Provide system context (architecture, metrics, or config).</li>
                <li>Receive a Performance Pressure Index with propagation paths and failure modes.</li>
                <li>Output: prioritised interventions, risk areas, and FinOps/SRE alignment.</li>
              </Box>
              <Button
                variant="outlined"
                href="https://diagnostic.kpi99.co"
                target="_blank"
                rel="noopener noreferrer"
                sx={goldOutlinedBtn}
              >
                Open PPI Diagnostic at KPI99 →
              </Button>
            </Box>
          </motion.div>

          {/* 2. ICEA / Cost Calculator */}
          <motion.div {...inView} transition={{ duration: 0.6, delay: 0.06 }}>
            <Box sx={cardSx}>
              <Typography sx={sectionHeadingSx}>ICEA — Infrastructure Cost &amp; Efficiency Analyzer</Typography>
              <Typography sx={bodyTextSx}>
                ICEA converts Spark cluster and executor configuration into efficiency scores, waste estimates, and recommended configurations. Enter your workload below for a directional cost estimate; the full ICEA tool at KPI99 includes executor-level analysis and PDF reports.
              </Typography>

              <Typography sx={{ color: GOLD, fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.06em', textTransform: 'uppercase', mb: 2, fontFamily: 'DS-DIGII, monospace' }}>
                Example calculator
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2.5 }}>
                {([
                  { label: 'Nodes', value: nodes, set: setNodes, min: 1, max: 10000, step: 1 },
                  { label: 'Hourly cost per node (USD)', value: hourlyCost, set: setHourlyCost, min: 0, step: 0.01 },
                  { label: 'Jobs per day', value: jobsPerDay, set: setJobsPerDay, min: 1, step: 1 },
                  { label: 'Avg runtime (minutes)', value: avgRuntimeMin, set: setAvgRuntimeMin, min: 0.1, step: 1 },
                  { label: 'Waste % (estimate)', value: wastePct, set: setWastePct, min: 0, max: 100, step: 5 },
                ] as Array<{ label: string; value: number; set: (v: number) => void; min?: number; max?: number; step?: number }>).map(({ label, value, set, min, max, step }) => (
                  <TextField
                    key={label}
                    label={label}
                    type="number"
                    size="small"
                    value={value}
                    onChange={(e) => set(Number(e.target.value) || 0)}
                    inputProps={{ min, max, step }}
                    sx={inputSx}
                  />
                ))}
              </Box>

              <Table size="small" sx={{ maxWidth: 420, mb: 1.5, '& .MuiTableCell-root': tableCellSx }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ ...tableCellSx, fontWeight: 700, color: '#fff' }}>Metric</TableCell>
                    <TableCell align="right" sx={{ ...tableCellSx, fontWeight: 700, color: '#fff' }}>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow><TableCell>Hourly cluster cost</TableCell><TableCell align="right">${hourlyCluster.toFixed(2)}</TableCell></TableRow>
                  <TableRow><TableCell>Daily cost (usage)</TableCell><TableCell align="right">${dailyCost.toFixed(2)}</TableCell></TableRow>
                  <TableRow><TableCell>Monthly cost</TableCell><TableCell align="right">${monthlyCost.toFixed(2)}</TableCell></TableRow>
                  <TableRow><TableCell sx={{ color: GOLD }}>Est. waste (monthly)</TableCell><TableCell align="right" sx={{ color: GOLD }}>${wasteMonthly.toFixed(2)}</TableCell></TableRow>
                </TableBody>
              </Table>

              <Typography sx={{ color: TEXT_MUTED, fontSize: '0.78rem', fontStyle: 'italic', mb: 2.5 }}>
                Formula: daily cost = nodes × hourly_cost × (avg_runtime_min / 60) × jobs_per_day. Waste is directional; use ICEA for executor-level analysis.
              </Typography>

              <Button
                variant="outlined"
                href="https://icea.kpi99.co"
                target="_blank"
                rel="noopener noreferrer"
                sx={goldOutlinedBtn}
              >
                ICEA at KPI99 →
              </Button>
            </Box>
          </motion.div>

          {/* 3. Checklists */}
          <motion.div {...inView} transition={{ duration: 0.6, delay: 0.08 }}>
            <Box sx={cardSx}>
              <Typography sx={sectionHeadingSx}>Performance Analysis Checklists</Typography>
              <Typography sx={bodyTextSx}>
                Engineering methodology for consistent, evidence-based performance work. Apply before launch, during capacity reviews, after incidents, and in cost reviews.
              </Typography>

              {[
                { heading: 'Pre-launch / change', items: prelaunch },
                { heading: 'Capacity & scale',    items: capacity  },
                { heading: 'Incident / post-mortem', items: incident },
                { heading: 'Cost / FinOps review', items: finops   },
              ].map(({ heading, items }, i) => (
                <Box key={heading} sx={{ mt: i === 0 ? 0.5 : 2.5 }}>
                  <Typography sx={{ color: GOLD, fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.06em', textTransform: 'uppercase', mb: 1, fontFamily: 'DS-DIGII, monospace' }}>
                    {heading}
                  </Typography>
                  <CheckList items={items} />
                </Box>
              ))}
            </Box>
          </motion.div>

          {/* CTA */}
          <motion.div {...inView} transition={{ duration: 0.6, delay: 0.1 }}>
            <Box sx={{ ...cardSx, textAlign: 'center' }}>
              <Typography sx={{ ...bodyTextSx, mb: 2 }}>
                These tools and checklists support the methodology behind PPI-F and ICEA. For reports, expert analysis, and implementation support, see KPI99.
              </Typography>
              <Link
                href="https://kpi99.co"
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                sx={{ color: GOLD, fontWeight: 700, fontSize: '1rem', '&:hover': { color: '#ffffff' } }}
              >
                kpi99.co →
              </Link>
            </Box>
          </motion.div>

        </Container>
      </Box>
    </motion.div>
  );
};

export default ResearchTools;
