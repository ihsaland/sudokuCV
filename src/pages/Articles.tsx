import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import { motion } from 'framer-motion';
import BackgroundPattern from '../components/BackgroundPattern';
import {
  GOLD, GOLD_BORDER, cardSx, pageBox, containerSx, pageTitleSx, pageSubtitleSx,
  bodyTextSx, fadeUp, inView, TEXT_MUTED,
} from '../styles/pageStyles';

const published = [
  {
    title: 'The next AI wave is likely to reward economic intelligence, not just model intelligence',
    url: 'https://www.linkedin.com/pulse/next-ai-wave-likely-reward-economic-intelligence-just-ian-salandy-yu81e/',
    source: 'LinkedIn', date: 'May 2026',
    summary: 'The market is shifting from AI capability to AI efficiency. Companies that survive AI economics at scale will be those that apply classical distributed systems thinking — queuing theory, resource contention, execution efficiency — to token spend and inference routing.',
  },
  {
    title: 'The Illusion of Infinite Compute: Mapping Spark Resource Allocation to Real Cloud Hardware',
    url: 'https://www.linkedin.com/pulse/illusion-infinite-compute-mapping-spark-resource-real-ian-salandy-aixbe/',
    source: 'LinkedIn', date: 'May 2026',
    summary: 'Spark resources are abstractions, not infrastructure. Teams that misconfigure executors as isolated compute units fail to account for shared physical resources like CPU caches and memory bandwidth — and pay for it at scale.',
  },
  {
    title: "The Most Dangerous Code in Production Isn't the Code You Use",
    url: 'https://www.linkedin.com/pulse/most-dangerous-code-production-isnt-you-use-ian-salandy-xtswe/',
    source: 'LinkedIn', date: 'Apr 2026',
    summary: 'Dormant, rarely-executed code is untested against current infrastructure and workload conditions. When it eventually runs — through edge cases or fallback paths — it fails unpredictably because it was never designed for modern system pressures.',
  },
  {
    title: 'Why Systems Fail at Scale (And How to See It Before It Happens)',
    url: 'https://www.linkedin.com/pulse/why-systems-fail-scale-how-see-before-happens-ian-salandy-fp4ve/',
    source: 'LinkedIn', date: 'Apr 2026',
    summary: 'Distributed systems collapse not from lack of resources but from mounting pressure across interconnected components that goes undetected. Cost is an early warning signal — and organisations that assess systems dynamically find the breaking points before production does.',
  },
  {
    title: 'PPI-F™ — Performance Pressure Index Framework',
    url: 'https://kpi99.co/en/ppi-framework.html',
    source: 'KPI99', date: null,
    summary: 'A structured methodology for understanding how pressure propagates through distributed systems — pressure sources, propagation paths, system invariants, failure modes, and optimisation levers.',
  },
];

const forthcoming = [
  { title: 'Where Distributed Systems Fail at Scale',    desc: 'Pressure propagation and failure modes.' },
  { title: 'The Hidden Cost of Cloud Abstraction',        desc: 'Trade-offs and cost-to-serve visibility.' },
  { title: 'Performance Engineering in AI Infrastructure', desc: 'Scaling and efficiency for ML workloads.' },
];

const Articles: React.FC = () => (
  <motion.div {...fadeUp}>
    <Box sx={pageBox}>
      <BackgroundPattern />
      <Container maxWidth="md" sx={containerSx}>

        <Typography sx={pageTitleSx}>Articles</Typography>
        <Typography sx={pageSubtitleSx}>
          Architecture insights and thought leadership on distributed systems and performance engineering.
        </Typography>

        {/* Published */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 5 }}>
          {published.map(({ title, url, source, date, summary }, i) => (
            <motion.div key={url} {...inView} transition={{ duration: 0.55, delay: i * 0.06 }}>
              <Link href={url} target="_blank" rel="noopener noreferrer" underline="none">
                <Box sx={{
                  ...cardSx, mb: 0, cursor: 'pointer',
                  '&:hover': {
                    borderTopColor: GOLD,
                    backgroundColor: 'rgba(212,175,55,0.06)',
                    boxShadow: '0 12px 40px rgba(212,175,55,0.12)',
                  },
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
                    <Typography sx={{ color: '#ffffff', fontWeight: 700, fontSize: { xs: '0.95rem', sm: '1.05rem' }, lineHeight: 1.45 }}>
                      {title}
                    </Typography>
                    <OpenInNew sx={{ color: GOLD, fontSize: '0.9rem', flexShrink: 0, mt: '3px' }} />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5, alignItems: 'center' }}>
                    <Box sx={{ px: 1, py: 0.25, borderRadius: '4px', border: `0.5px solid ${GOLD_BORDER}`, color: GOLD, fontSize: '0.7rem', letterSpacing: '0.04em' }}>
                      {source}
                    </Box>
                    {date && <Typography sx={{ color: TEXT_MUTED, fontSize: '0.78rem' }}>{date}</Typography>}
                  </Box>
                  <Typography sx={{ ...bodyTextSx, mb: 0, fontSize: { xs: '0.87rem', sm: '0.92rem' } }}>
                    {summary}
                  </Typography>
                </Box>
              </Link>
            </motion.div>
          ))}
        </Box>

        {/* Forthcoming */}
        <Typography sx={{ color: TEXT_MUTED, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', mb: 2 }}>
          Forthcoming
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {forthcoming.map(({ title, desc }) => (
            <Box key={title} sx={{
              p: { xs: 2, sm: 2.5 },
              borderRadius: '12px',
              border: '0.5px solid rgba(255,255,255,0.08)',
              backgroundColor: 'rgba(255,255,255,0.03)',
              opacity: 0.6,
            }}>
              <Typography sx={{ color: '#ffffff', fontWeight: 600, fontSize: { xs: '0.88rem', sm: '0.95rem' } }}>{title}</Typography>
              <Typography sx={{ color: TEXT_MUTED, fontSize: { xs: '0.8rem', sm: '0.85rem' }, mt: 0.5 }}>{desc}</Typography>
            </Box>
          ))}
        </Box>

      </Container>
    </Box>
  </motion.div>
);

export default Articles;
