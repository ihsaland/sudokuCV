import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import BackgroundPattern from '../components/BackgroundPattern';
import {
  GOLD, cardSx, pageBox, containerSx, pageTitleSx, pageSubtitleSx,
  sectionHeadingSx, bodyTextSx, fadeUp, inView,
} from '../styles/pageStyles';

const cases = [
  {
    title: 'Billions-of-events architectures',
    body: 'Defined scalability architecture for distributed data platforms at multi-billion annual event scale — encompassing partitioning strategy, backpressure handling, and consumer-group topology across Kafka and Spark.',
  },
  {
    title: 'Throughput & cost',
    body: 'System-level scaling strategies improving throughput by 35%; cost-to-serve modelling reducing infrastructure spend by ~$750K annually (25%) through executor right-sizing, partition tuning, and predictive scaling.',
  },
  {
    title: 'Predictive scaling & diagnostics',
    body: 'Workload models for 2×–10× growth scenarios; diagnostics frameworks, performance automation, and benchmarking / regression governance for release stability. Used to prevent incidents before they surface in production.',
  },
];

const CaseStudies: React.FC = () => (
  <motion.div {...fadeUp}>
    <Box sx={pageBox}>
      <BackgroundPattern />
      <Container maxWidth="md" sx={containerSx}>

        <Typography sx={pageTitleSx}>Case Studies</Typography>
        <Typography sx={pageSubtitleSx}>
          Selected architectural impact aligned with recent platform work: scale, throughput, cost, and predictive modelling.
        </Typography>

        {cases.map(({ title, body }, i) => (
          <motion.div key={title} {...inView} transition={{ duration: 0.55, delay: i * 0.08 }}>
            <Box sx={cardSx}>
              <Typography sx={sectionHeadingSx}>{title}</Typography>
              <Typography sx={{ ...bodyTextSx, mb: 0 }}>{body}</Typography>
            </Box>
          </motion.div>
        ))}

      </Container>
    </Box>
  </motion.div>
);

export default CaseStudies;
