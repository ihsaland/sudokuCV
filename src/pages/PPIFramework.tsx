import React from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Link,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { GetApp } from '@mui/icons-material';
import { motion } from 'framer-motion';
import BackgroundPattern from '../components/BackgroundPattern';

const PPIFramework: React.FC = () => {
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
            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700, mb: 0.5 }}>
              PPI-F
            </Typography>
            <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 600, mb: 2 }}>
              Performance Pressure Index Framework
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
              Performance is pressure, not latency. A structured methodology for understanding how pressure propagates through distributed systems.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                href="/PPI-F-Whitepaper.pdf"
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<GetApp />}
                sx={{ fontWeight: 700 }}
              >
                Download Whitepaper
              </Button>
            </Box>
          </Paper>

          {/* What it measures */}
          <Paper variant="outlined" sx={sectionStyle}>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700, mb: 2 }}>
              What It Measures
            </Typography>
            <Typography sx={{ color: 'text.primary', mb: 1.5 }}>
              The Performance Pressure Index (PPI) quantifies the combined stress on a system from three drivers and how well that stress is visible and controllable:
            </Typography>
            <Box component="ul" sx={{ pl: 2.5, '& li': { mb: 1, color: 'text.primary' } }}>
              <li><strong>Request Pressure</strong> — Incoming load, traffic patterns, and demand intensity relative to capacity.</li>
              <li><strong>Resource Saturation</strong> — How fully CPU, memory, I/O, and network are utilized; proximity to hard limits.</li>
              <li><strong>System Coupling</strong> — Dependency depth, cascading failure risk, and tightness of integration between services.</li>
              <li><strong>Observability Maturity</strong> — Ability to see and diagnose pressure in real time (metrics, traces, logs, SLOs). Higher maturity lowers effective pressure by enabling faster response.</li>
            </Box>
          </Paper>

          {/* Why modern systems need it */}
          <Paper variant="outlined" sx={sectionStyle}>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700, mb: 2 }}>
              Why Modern Systems Need It
            </Typography>
            <Typography sx={{ color: 'text.primary', mb: 1.5 }}>
              Traditional metrics (latency, throughput, error rate) describe symptoms after the fact. In distributed, cloud-native, and multi-tenant systems:
            </Typography>
            <Box component="ul" sx={{ pl: 2.5, '& li': { mb: 1, color: 'text.primary' } }}>
              <li>Pressure propagates across service boundaries before latency or errors spike.</li>
              <li>Resource contention and coupling create non-linear failure modes that are hard to predict without a structured model.</li>
              <li>Cost and reliability are tied to how well pressure is observed and managed—not just raw performance numbers.</li>
            </Box>
            <Typography sx={{ color: 'text.primary', mt: 2 }}>
              PPI-F provides a single, comparable index so teams can prioritize where to reduce pressure (architecture, capacity, observability) before incidents occur.
            </Typography>
          </Paper>

          {/* Formula & diagram */}
          <Paper variant="outlined" sx={sectionStyle}>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700, mb: 2 }}>
              Formula
            </Typography>
            <Typography sx={{ color: 'text.primary', mb: 2 }}>
              PPI combines the three pressure drivers in the numerator and normalizes by observability in the denominator (higher observability reduces effective pressure):
            </Typography>

            {/* Formula diagram */}
            <Box
              sx={{
                border: '2px solid',
                borderColor: 'primary.main',
                borderRadius: 2,
                p: 2,
                mb: 2,
                backgroundColor: 'rgba(25, 118, 210, 0.06)',
              }}
            >
              <Typography
                component="div"
                sx={{
                  fontFamily: 'monospace',
                  fontSize: { xs: '1rem', sm: '1.2rem' },
                  fontWeight: 700,
                  color: 'primary.main',
                  textAlign: 'center',
                }}
              >
                PPI = (Request Pressure × Resource Saturation × System Coupling) / Observability Maturity
              </Typography>
            </Box>

            {/* Visual diagram: numerator → denominator → PPI */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 2 }}>
              <Box sx={{ textAlign: 'center', p: 1.5, border: '1px solid', borderColor: 'warning.main', borderRadius: 1, minWidth: 100 }}>
                <Typography variant="caption" display="block" color="text.secondary">Request Pressure</Typography>
              </Box>
              <Typography sx={{ alignSelf: 'center', fontWeight: 700 }}>×</Typography>
              <Box sx={{ textAlign: 'center', p: 1.5, border: '1px solid', borderColor: 'warning.main', borderRadius: 1, minWidth: 100 }}>
                <Typography variant="caption" display="block" color="text.secondary">Resource Saturation</Typography>
              </Box>
              <Typography sx={{ alignSelf: 'center', fontWeight: 700 }}>×</Typography>
              <Box sx={{ textAlign: 'center', p: 1.5, border: '1px solid', borderColor: 'warning.main', borderRadius: 1, minWidth: 100 }}>
                <Typography variant="caption" display="block" color="text.secondary">System Coupling</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Typography sx={{ fontWeight: 700 }}>÷</Typography>
              <Box sx={{ textAlign: 'center', p: 1.5, border: '1px solid', borderColor: 'success.main', borderRadius: 1, minWidth: 120 }}>
                <Typography variant="caption" display="block" color="text.secondary">Observability Maturity</Typography>
              </Box>
              <Typography sx={{ fontWeight: 700 }}>→</Typography>
              <Box sx={{ textAlign: 'center', p: 1.5, border: '2px solid', borderColor: 'primary.main', borderRadius: 1 }}>
                <Typography variant="caption" display="block" color="primary.main" fontWeight={700}>PPI</Typography>
              </Box>
            </Box>
          </Paper>

          {/* Example section with scoring */}
          <Paper variant="outlined" sx={sectionStyle}>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700, mb: 2 }}>
              Example: Computing PPI
            </Typography>
            <Typography sx={{ color: 'text.primary', mb: 2 }}>
              Each factor is typically scored on a scale (e.g., 1–10). Higher values for Request Pressure, Resource Saturation, and System Coupling increase PPI; higher Observability Maturity decreases it. Example scale: 1 = low pressure / high maturity, 10 = high pressure / low maturity.
            </Typography>

            <Typography sx={{ color: 'text.primary', fontWeight: 600, mb: 1 }}>Scoring example</Typography>
            <Table size="small" sx={{ mb: 2, maxWidth: 400 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Factor</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>Score (1–10)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow><TableCell>Request Pressure</TableCell><TableCell align="right">6</TableCell></TableRow>
                <TableRow><TableCell>Resource Saturation</TableCell><TableCell align="right">7</TableCell></TableRow>
                <TableRow><TableCell>System Coupling</TableCell><TableCell align="right">5</TableCell></TableRow>
                <TableRow><TableCell>Observability Maturity</TableCell><TableCell align="right">4</TableCell></TableRow>
              </TableBody>
            </Table>
            <Box sx={{ p: 1.5, bgcolor: 'rgba(0,0,0,0.06)', borderRadius: 1, display: 'inline-block' }}>
              <Typography component="span" sx={{ fontFamily: 'monospace', fontWeight: 700 }}>
                PPI = (6 × 7 × 5) / 4 = 210 / 4 = 52.5
              </Typography>
            </Box>
            <Typography sx={{ color: 'text.secondary', mt: 2, fontSize: '0.95rem' }}>
              Interpretation: A high PPI (e.g., &gt; 30–50 depending on calibration) indicates elevated pressure and risk. Reducing request pressure, resource saturation, or coupling—or improving observability—lowers PPI and risk.
            </Typography>

            <Typography sx={{ color: 'text.primary', fontWeight: 600, mt: 2, mb: 1 }}>PPI scale (example bands)</Typography>
            <Box sx={{ display: 'flex', width: '100%', height: 32, borderRadius: 1, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ flex: 1, bgcolor: 'rgba(46, 125, 50, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600 }}>Low (0–20)</Typography>
              </Box>
              <Box sx={{ flex: 1, bgcolor: 'rgba(237, 108, 2, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600 }}>Medium (20–50)</Typography>
              </Box>
              <Box sx={{ flex: 1, bgcolor: 'rgba(211, 47, 47, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600 }}>High (50+)</Typography>
              </Box>
            </Box>
          </Paper>

          {/* Engineering application */}
          <Paper variant="outlined" sx={sectionStyle}>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700, mb: 2 }}>
              Engineering Application
            </Typography>
            <Typography sx={{ color: 'text.primary', mb: 1.5 }}>
              Teams can use PPI to:
            </Typography>
            <Box component="ul" sx={{ pl: 2.5, '& li': { mb: 1, color: 'text.primary' } }}>
              <li><strong>Prioritize work</strong> — Focus on services or layers with the highest PPI first.</li>
              <li><strong>Compare before/after</strong> — Measure PPI before and after capacity, architecture, or observability changes to quantify impact.</li>
              <li><strong>Align with SRE and FinOps</strong> — Tie pressure reduction to SLOs and cost-to-serve; use PPI in capacity and cost reviews.</li>
              <li><strong>Risk communication</strong> — Report a single index to leadership and product so performance risk is understandable without deep technical detail.</li>
            </Box>
          </Paper>

          {/* CTA + whitepaper + KPI99 */}
          <Paper variant="outlined" sx={{ ...sectionStyle, textAlign: 'center' }}>
            <Typography sx={{ color: 'text.primary', mb: 2 }}>
              Apply PPI-F with KPI99 for prioritized interventions, risk mitigation plans, and alignment with FinOps and SRE.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="/PPI-F-Whitepaper.pdf"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<GetApp />}
              sx={{ mr: 1, mb: 1, fontWeight: 700 }}
            >
              Download Whitepaper
            </Button>
            <Link
              href="https://kpi99.co/en/ppi-framework.html"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: 'inline-block', fontWeight: 700, mt: 1 }}
            >
              PPI-F™ at KPI99
            </Link>
          </Paper>
        </Container>
      </Box>
    </motion.div>
  );
};

export default PPIFramework;
