import React from 'react';
import {
  Box, Typography, Container, Button, Link,
  Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import { motion } from 'framer-motion';
import BackgroundPattern from '../components/BackgroundPattern';
import {
  GOLD, cardSx, pageBox, containerSx, pageTitleSx, pageSubtitleSx,
  sectionHeadingSx, bodyTextSx, goldOutlinedBtn, fadeUp, inView, TEXT_MUTED,
} from '../styles/pageStyles';

const PPI_F_URL = 'https://kpi99.co/en/ppi-framework.html';

const tableCellSx = {
  color: 'rgba(255,255,255,0.78)',
  borderColor: 'rgba(255,255,255,0.08)',
  fontSize: { xs: '0.82rem', sm: '0.88rem' },
};

const drivers = [
  { label: 'Request Pressure',      desc: 'Incoming load, traffic patterns, and demand intensity relative to capacity.' },
  { label: 'Resource Saturation',   desc: 'How fully CPU, memory, I/O, and network are utilized; proximity to hard limits.' },
  { label: 'System Coupling',       desc: 'Dependency depth, cascading failure risk, and tightness of integration between services.' },
  { label: 'Observability Maturity',desc: 'Ability to see and diagnose pressure in real time. Higher maturity lowers effective pressure.' },
];

const applications = [
  { label: 'Prioritise work',          desc: 'Focus on services or layers with the highest PPI first.' },
  { label: 'Compare before/after',     desc: 'Quantify the impact of architecture, capacity, or observability changes.' },
  { label: 'Align SRE and FinOps',     desc: 'Tie pressure reduction to SLOs and cost-to-serve; use PPI in capacity and cost reviews.' },
  { label: 'Risk communication',       desc: 'Report a single index to leadership so performance risk is understandable without deep technical detail.' },
];

const PPIFramework: React.FC = () => (
  <motion.div {...fadeUp}>
    <Box sx={pageBox}>
      <BackgroundPattern />
      <Container maxWidth="md" sx={containerSx}>

        {/* Hero */}
        <Typography sx={pageTitleSx}>PPI-F™</Typography>
        <Typography sx={{ ...pageSubtitleSx, fontStyle: 'italic' }}>
          Performance is pressure, not latency. A structured methodology for understanding how pressure propagates through distributed systems.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
          <Button
            variant="outlined"
            href={PPI_F_URL}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<OpenInNew sx={{ fontSize: '0.9rem' }} />}
            sx={goldOutlinedBtn}
          >
            Open PPI-F methodology at KPI99
          </Button>
        </Box>

        {/* What it measures */}
        <motion.div {...inView} transition={{ duration: 0.6 }}>
          <Box sx={cardSx}>
            <Typography sx={sectionHeadingSx}>What It Measures</Typography>
            <Typography sx={bodyTextSx}>
              The Performance Pressure Index (PPI) quantifies the combined stress on a system from three drivers and normalises by how well that stress is visible and controllable.
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5, mt: 2 }}>
              {drivers.map(({ label, desc }) => (
                <Box key={label} sx={{ p: { xs: 1.5, sm: 2 }, borderRadius: '10px', border: `0.5px solid ${GOLD}33`, backgroundColor: 'rgba(212,175,55,0.04)' }}>
                  <Typography sx={{ color: GOLD, fontWeight: 700, fontSize: '0.85rem', fontFamily: 'DS-DIGII, monospace', mb: 0.5 }}>{label}</Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.82rem', lineHeight: 1.55 }}>{desc}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Why */}
        <motion.div {...inView} transition={{ duration: 0.6, delay: 0.06 }}>
          <Box sx={cardSx}>
            <Typography sx={sectionHeadingSx}>Why Modern Systems Need It</Typography>
            <Typography sx={bodyTextSx}>
              Traditional metrics (latency, throughput, error rate) describe symptoms after the fact. In distributed, cloud-native, and multi-tenant systems:
            </Typography>
            <Box component="ul" sx={{ pl: 2.5, mb: 0, '& li': { color: 'rgba(255,255,255,0.75)', fontSize: { xs: '0.88rem', sm: '0.93rem' }, mb: 1, lineHeight: 1.65 } }}>
              <li>Pressure propagates across service boundaries before latency or errors spike.</li>
              <li>Resource contention and coupling create non-linear failure modes that are hard to predict without a structured model.</li>
              <li>Cost and reliability are tied to how well pressure is observed and managed — not just raw performance numbers.</li>
            </Box>
          </Box>
        </motion.div>

        {/* Formula */}
        <motion.div {...inView} transition={{ duration: 0.6, delay: 0.08 }}>
          <Box sx={cardSx}>
            <Typography sx={sectionHeadingSx}>Formula</Typography>
            <Typography sx={bodyTextSx}>
              PPI combines the three pressure drivers in the numerator and normalises by observability in the denominator — higher observability reduces effective pressure.
            </Typography>

            {/* Formula block */}
            <Box sx={{ border: `1px solid ${GOLD}55`, borderRadius: '12px', p: { xs: 2, sm: 3 }, mb: 3, backgroundColor: 'rgba(212,175,55,0.05)', textAlign: 'center' }}>
              <Typography sx={{ fontFamily: 'DS-DIGII, monospace', fontSize: { xs: '0.85rem', sm: '1rem' }, fontWeight: 700, color: GOLD, lineHeight: 1.6 }}>
                PPI = (Request Pressure × Resource Saturation × System Coupling)
              </Typography>
              <Typography sx={{ fontFamily: 'DS-DIGII, monospace', fontSize: { xs: '0.85rem', sm: '1rem' }, fontWeight: 700, color: GOLD }}>
                ÷ Observability Maturity
              </Typography>
            </Box>

            {/* Visual flow */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 1.5 }}>
              {['Request Pressure', 'Resource Saturation', 'System Coupling'].map((label, i) => (
                <React.Fragment key={label}>
                  <Box sx={{ textAlign: 'center', p: { xs: 1, sm: 1.5 }, border: `0.5px solid ${GOLD}44`, borderRadius: '8px', minWidth: { xs: 90, sm: 110 }, backgroundColor: 'rgba(212,175,55,0.04)' }}>
                    <Typography sx={{ color: TEXT_MUTED, fontSize: '0.72rem', lineHeight: 1.3 }}>{label}</Typography>
                  </Box>
                  {i < 2 && <Typography sx={{ color: GOLD, fontWeight: 700, fontSize: '1rem' }}>×</Typography>}
                </React.Fragment>
              ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
              <Typography sx={{ color: GOLD, fontWeight: 700, fontSize: '1rem' }}>÷</Typography>
              <Box sx={{ textAlign: 'center', p: { xs: 1, sm: 1.5 }, border: `0.5px solid rgba(80,200,120,0.4)`, borderRadius: '8px', minWidth: { xs: 110, sm: 130 }, backgroundColor: 'rgba(80,200,120,0.04)' }}>
                <Typography sx={{ color: 'rgba(80,200,120,0.85)', fontSize: '0.72rem' }}>Observability Maturity</Typography>
              </Box>
              <Typography sx={{ color: GOLD, fontWeight: 700, fontSize: '1rem' }}>→</Typography>
              <Box sx={{ textAlign: 'center', p: { xs: 1.25, sm: 1.75 }, border: `1px solid ${GOLD}`, borderRadius: '8px', backgroundColor: 'rgba(212,175,55,0.08)' }}>
                <Typography sx={{ color: GOLD, fontWeight: 700, fontFamily: 'DS-DIGII, monospace', fontSize: '1rem' }}>PPI</Typography>
              </Box>
            </Box>
          </Box>
        </motion.div>

        {/* Example */}
        <motion.div {...inView} transition={{ duration: 0.6, delay: 0.1 }}>
          <Box sx={cardSx}>
            <Typography sx={sectionHeadingSx}>Example: Computing PPI</Typography>
            <Typography sx={bodyTextSx}>
              Each factor is scored 1–10. Higher Request Pressure, Resource Saturation, or System Coupling raises PPI; higher Observability Maturity lowers it.
            </Typography>

            <Table size="small" sx={{ maxWidth: 420, mb: 2, '& .MuiTableCell-root': tableCellSx }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ ...tableCellSx, fontWeight: 700, color: '#fff' }}>Factor</TableCell>
                  <TableCell align="right" sx={{ ...tableCellSx, fontWeight: 700, color: '#fff' }}>Score (1–10)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[['Request Pressure', 6], ['Resource Saturation', 7], ['System Coupling', 5], ['Observability Maturity', 4]].map(([f, s]) => (
                  <TableRow key={f}><TableCell>{f}</TableCell><TableCell align="right">{s}</TableCell></TableRow>
                ))}
              </TableBody>
            </Table>

            <Box sx={{ display: 'inline-block', px: 2, py: 1, borderRadius: '8px', border: `0.5px solid ${GOLD}55`, backgroundColor: 'rgba(212,175,55,0.07)', mb: 2 }}>
              <Typography sx={{ fontFamily: 'DS-DIGII, monospace', color: GOLD, fontWeight: 700, fontSize: { xs: '0.88rem', sm: '0.95rem' } }}>
                PPI = (6 × 7 × 5) / 4 = 52.5
              </Typography>
            </Box>

            <Typography sx={{ ...bodyTextSx, mb: 2.5 }}>
              A high PPI (&gt; 30–50 depending on calibration) indicates elevated pressure and risk. Reducing any numerator factor — or improving observability — lowers PPI and risk.
            </Typography>

            {/* Scale bar */}
            <Typography sx={{ color: GOLD, fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.06em', textTransform: 'uppercase', mb: 1, fontFamily: 'DS-DIGII, monospace' }}>
              PPI scale
            </Typography>
            <Box sx={{ display: 'flex', width: '100%', height: 36, borderRadius: '8px', overflow: 'hidden', border: '0.5px solid rgba(255,255,255,0.1)' }}>
              {[
                { label: 'Low (0–20)',   bg: 'rgba(46,125,50,0.35)'  },
                { label: 'Medium (20–50)', bg: 'rgba(237,108,2,0.35)' },
                { label: 'High (50+)',   bg: 'rgba(211,47,47,0.35)'  },
              ].map(({ label, bg }) => (
                <Box key={label} sx={{ flex: 1, bgcolor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.72rem', fontWeight: 600 }}>{label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Engineering application */}
        <motion.div {...inView} transition={{ duration: 0.6, delay: 0.12 }}>
          <Box sx={cardSx}>
            <Typography sx={sectionHeadingSx}>Engineering Application</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
              {applications.map(({ label, desc }) => (
                <Box key={label} sx={{ p: { xs: 1.5, sm: 2 }, borderRadius: '10px', border: `0.5px solid rgba(255,255,255,0.1)`, backgroundColor: 'rgba(255,255,255,0.03)' }}>
                  <Typography sx={{ color: '#ffffff', fontWeight: 700, fontSize: '0.88rem', mb: 0.5 }}>{label}</Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', lineHeight: 1.55 }}>{desc}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* CTA */}
        <motion.div {...inView} transition={{ duration: 0.6, delay: 0.14 }}>
          <Box sx={{ ...cardSx, textAlign: 'center' }}>
            <Typography sx={{ ...bodyTextSx, mb: 2.5 }}>
              Apply PPI-F with KPI99 for prioritised interventions, risk mitigation plans, and alignment with FinOps and SRE.
            </Typography>
            <Button
              variant="outlined"
              href={PPI_F_URL}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNew sx={{ fontSize: '0.9rem' }} />}
              sx={goldOutlinedBtn}
            >
              Open PPI-F methodology at KPI99
            </Button>
            <br />
            <Link href={PPI_F_URL} target="_blank" rel="noopener noreferrer" underline="none"
              sx={{ color: TEXT_MUTED, fontSize: '0.8rem', mt: 1.5, display: 'inline-block', '&:hover': { color: GOLD } }}>
              PPI-F™ at KPI99
            </Link>
          </Box>
        </motion.div>

      </Container>
    </Box>
  </motion.div>
);

export default PPIFramework;
