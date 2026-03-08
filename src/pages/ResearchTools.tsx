import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Link,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { CheckBoxOutlineBlank } from '@mui/icons-material';
import { motion } from 'framer-motion';
import BackgroundPattern from '../components/BackgroundPattern';

const ResearchTools: React.FC = () => {
  const [nodes, setNodes] = useState(10);
  const [hourlyCost, setHourlyCost] = useState(0.92);
  const [jobsPerDay, setJobsPerDay] = useState(100);
  const [avgRuntimeMin, setAvgRuntimeMin] = useState(15);
  const [wastePct, setWastePct] = useState(25);

  const hourlyCluster = nodes * hourlyCost;
  const dailyCost = hourlyCluster * (avgRuntimeMin / 60) * jobsPerDay;
  const monthlyCost = dailyCost * 30;
  const wasteMonthly = monthlyCost * (wastePct / 100);

  const sectionStyle = {
    p: { xs: 2, sm: 3 },
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(10px)',
    mb: 4,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <BackgroundPattern />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
          {/* Hero */}
          <Paper variant="outlined" sx={{ ...sectionStyle, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700, mb: 1 }}>
              Research / Tools
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              Artifacts I build — diagnostics, cost modeling, and engineering methodology.
            </Typography>
          </Paper>

          {/* 1. PPI Diagnostic Tool */}
          <Paper variant="outlined" sx={sectionStyle}>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700, mb: 1 }}>
              PPI Diagnostic Tool
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', mb: 2 }}>
              KPI99 Diagnostic applies the PPI-F™ framework to your system and produces evidence-based findings.
            </Typography>
            <Typography sx={{ color: 'text.primary', mb: 1.5 }}>
              <strong>How it works:</strong>
            </Typography>
            <Box component="ul" sx={{ pl: 2.5, mb: 2, '& li': { mb: 0.5, color: 'text.primary' } }}>
              <li>You provide context (architecture, metrics, or config).</li>
              <li>The tool scores <strong>Request Pressure</strong>, <strong>Resource Saturation</strong>, and <strong>System Coupling</strong>, and assesses <strong>Observability Maturity</strong>.</li>
              <li>It computes a Performance Pressure Index (PPI) and identifies propagation paths and failure modes.</li>
              <li>Output: prioritized interventions, risk areas, and alignment with FinOps/SRE so you can act before incidents.</li>
            </Box>
            <Button
              variant="outlined"
              color="primary"
              href="https://diagnostic.kpi99.co"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ fontWeight: 600 }}
            >
              PPI Diagnostic at KPI99
            </Button>
          </Paper>

          {/* 2. System Cost Modeling — ICEA + Example Calculator */}
          <Paper variant="outlined" sx={sectionStyle}>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700, mb: 1 }}>
              System Cost Modeling
            </Typography>
            <Typography sx={{ color: 'text.primary', mb: 2 }}>
              <strong>ICEA (Infrastructure Cost &amp; Efficiency Analyzer)</strong> converts Spark cluster and executor configuration into efficiency scores, waste estimates, and recommended configurations. It produces evidence for sizing and cost decisions and optional PDF reports.
            </Typography>
            <Typography sx={{ color: 'text.primary', mb: 2 }}>
              <strong>How it works:</strong> Enter node and executor specs (cores, memory, cost, count) and workload (avg runtime, jobs/day). ICEA computes executor packing, utilization, waste, and recommended config; you get a live preview and can request a full report or expert analysis.
            </Typography>

            <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 600, mb: 2 }}>
              Example calculator (simplified)
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
              <TextField
                label="Nodes"
                type="number"
                size="small"
                value={nodes}
                onChange={(e) => setNodes(Number(e.target.value) || 0)}
                inputProps={{ min: 1, max: 10000 }}
              />
              <TextField
                label="Hourly cost per node (USD)"
                type="number"
                size="small"
                value={hourlyCost}
                onChange={(e) => setHourlyCost(Number(e.target.value) || 0)}
                inputProps={{ min: 0, step: 0.01 }}
              />
              <TextField
                label="Jobs per day"
                type="number"
                size="small"
                value={jobsPerDay}
                onChange={(e) => setJobsPerDay(Number(e.target.value) || 0)}
                inputProps={{ min: 0.1, step: 1 }}
              />
              <TextField
                label="Avg runtime (minutes)"
                type="number"
                size="small"
                value={avgRuntimeMin}
                onChange={(e) => setAvgRuntimeMin(Number(e.target.value) || 0)}
                inputProps={{ min: 0.1, step: 1 }}
              />
              <TextField
                label="Waste % (estimate)"
                type="number"
                size="small"
                value={wastePct}
                onChange={(e) => setWastePct(Number(e.target.value) || 0)}
                inputProps={{ min: 0, max: 100, step: 5 }}
              />
            </Box>
            <Table size="small" sx={{ maxWidth: 400, mb: 2 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Metric</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow><TableCell>Hourly cluster cost</TableCell><TableCell align="right">${hourlyCluster.toFixed(2)}</TableCell></TableRow>
                <TableRow><TableCell>Daily cost (usage)</TableCell><TableCell align="right">${dailyCost.toFixed(2)}</TableCell></TableRow>
                <TableRow><TableCell>Monthly cost</TableCell><TableCell align="right">${monthlyCost.toFixed(2)}</TableCell></TableRow>
                <TableRow><TableCell>Est. waste (monthly)</TableCell><TableCell align="right">${wasteMonthly.toFixed(2)}</TableCell></TableRow>
              </TableBody>
            </Table>
            <Typography variant="caption" display="block" color="text.secondary" sx={{ mb: 2 }}>
              Formula: daily cost = nodes × hourly_cost × (avg_runtime_min / 60) × jobs_per_day. Waste is directional; use ICEA for executor-level analysis.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              href="https://icea.kpi99.co"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ fontWeight: 600 }}
            >
              ICEA at KPI99
            </Button>
          </Paper>

          {/* 3. Performance Analysis Checklists */}
          <Paper variant="outlined" sx={sectionStyle}>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700, mb: 1 }}>
              Performance Analysis Checklists
            </Typography>
            <Typography sx={{ color: 'text.primary', mb: 2 }}>
              Engineering methodology I use for consistent, evidence-based performance work. Apply before launch, during capacity reviews, after incidents, and in cost reviews.
            </Typography>

            <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 600, mt: 2, mb: 1 }}>
              Pre-launch / change
            </Typography>
            <List dense disablePadding>
              {[
                'Baseline metrics and SLOs defined',
                'Load and stress tests run with target profile',
                'Pressure sources and propagation paths documented',
                'Failure modes and rollback criteria agreed',
                'Observability (metrics, traces, logs) in place',
              ].map((item, i) => (
                <ListItem key={i} disablePadding sx={{ py: 0.25 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <CheckBoxOutlineBlank sx={{ fontSize: 18, color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} primaryTypographyProps={{ fontSize: '0.95rem' }} />
                </ListItem>
              ))}
            </List>

            <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 600, mt: 2, mb: 1 }}>
              Capacity & scale
            </Typography>
            <List dense disablePadding>
              {[
                'Current utilization and saturation measured',
                'Growth and peak demand forecasted',
                'PPI or equivalent pressure index reviewed',
                'Cost-to-serve and efficiency trends tracked',
                'Scaling triggers and limits documented',
              ].map((item, i) => (
                <ListItem key={i} disablePadding sx={{ py: 0.25 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <CheckBoxOutlineBlank sx={{ fontSize: 18, color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} primaryTypographyProps={{ fontSize: '0.95rem' }} />
                </ListItem>
              ))}
            </List>

            <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 600, mt: 2, mb: 1 }}>
              Incident / post-mortem
            </Typography>
            <List dense disablePadding>
              {[
                'Timeline and symptom data collected',
                'Pressure propagation and root cause mapped',
                'Invariants that were violated identified',
                'Detection and response gaps documented',
                'Remediation and prevention actions prioritized',
              ].map((item, i) => (
                <ListItem key={i} disablePadding sx={{ py: 0.25 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <CheckBoxOutlineBlank sx={{ fontSize: 18, color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} primaryTypographyProps={{ fontSize: '0.95rem' }} />
                </ListItem>
              ))}
            </List>

            <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 600, mt: 2, mb: 1 }}>
              Cost / FinOps review
            </Typography>
            <List dense disablePadding>
              {[
                'Resource usage and cost attribution clear',
                'Waste and optimization levers identified',
                'Right-sizing and reservation options evaluated',
                'PPI or ICEA-style efficiency evidence used',
                'Actions tied to business and SRE goals',
              ].map((item, i) => (
                <ListItem key={i} disablePadding sx={{ py: 0.25 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <CheckBoxOutlineBlank sx={{ fontSize: 18, color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} primaryTypographyProps={{ fontSize: '0.95rem' }} />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* CTA */}
          <Paper variant="outlined" sx={{ ...sectionStyle, textAlign: 'center' }}>
            <Typography sx={{ color: 'text.primary', mb: 2 }}>
              These tools and checklists support the methodology behind PPI-F and ICEA. For reports, expert analysis, and implementation support, see KPI99.
            </Typography>
            <Link
              href="https://kpi99.co"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ fontWeight: 700 }}
            >
              KPI99
            </Link>
          </Paper>
        </Container>
      </Box>
    </motion.div>
  );
};

export default ResearchTools;
