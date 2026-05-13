import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import BackgroundPattern from '../components/BackgroundPattern';
import {
  cardSx, pageBox, containerSx, pageTitleSx, sectionHeadingSx,
  bodyTextSx, fadeUp, inView, GOLD, TEXT_MUTED, TEXT_BODY,
} from '../styles/pageStyles';

const Education: React.FC = () => (
  <motion.div {...fadeUp}>
    <Box sx={pageBox}>
      <BackgroundPattern />
      <Container maxWidth="md" sx={containerSx}>

        <motion.div {...inView} transition={{ duration: 0.5 }}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography sx={pageTitleSx}>Education</Typography>
            <Box sx={{ height: '1px', width: 60, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, mx: 'auto', mt: 2 }} />
          </Box>
        </motion.div>

        {/* M.S. */}
        <motion.div {...inView} transition={{ duration: 0.5, delay: 0.1 }}>
          <Box sx={cardSx}>
            <Typography sx={{ ...sectionHeadingSx, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
              M.S. Computer Science
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600, fontSize: { xs: '0.9rem', sm: '0.95rem' }, mb: 0.5 }}>
              North Carolina State University
            </Typography>
            <Typography sx={{ color: TEXT_MUTED, fontSize: { xs: '0.78rem', sm: '0.82rem' }, mb: 2, fontFamily: 'DS-DIGII, monospace', letterSpacing: '0.04em' }}>
              2004 – 2006
            </Typography>
            <Typography sx={bodyTextSx}>
              Graduate-level systems engineering research with a focus on distributed computing, parallel architectures, and performance modeling. Thesis work involved workload characterization and resource allocation optimization for large-scale parallel systems — foundational to later capacity planning practice.
            </Typography>
            <Box component="ul" sx={{ pl: 2.5, m: 0, mt: 1.5, '& li': { ...bodyTextSx, mb: 0.75, '&::marker': { color: GOLD } } }}>
              <li>Advanced Distributed Systems & Fault Tolerance</li>
              <li>System Performance Analysis & Modeling</li>
              <li>Cloud & Parallel Computing Architectures</li>
              <li>Algorithm Design & Computational Complexity</li>
            </Box>
          </Box>
        </motion.div>

        {/* B.S. */}
        <motion.div {...inView} transition={{ duration: 0.5, delay: 0.15 }}>
          <Box sx={cardSx}>
            <Typography sx={{ ...sectionHeadingSx, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
              B.S. Computer Science
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600, fontSize: { xs: '0.9rem', sm: '0.95rem' }, mb: 0.5 }}>
              Morehouse College
            </Typography>
            <Typography sx={{ color: TEXT_MUTED, fontSize: { xs: '0.78rem', sm: '0.82rem' }, mb: 2, fontFamily: 'DS-DIGII, monospace', letterSpacing: '0.04em' }}>
              2000 – 2004
            </Typography>
            <Typography sx={bodyTextSx}>
              Foundation in computer science theory and applied systems programming. Developed strong problem-solving instincts through coursework emphasizing algorithmic thinking, operating systems internals, and network protocols — forming the technical base for a career in systems engineering.
            </Typography>
            <Box component="ul" sx={{ pl: 2.5, m: 0, mt: 1.5, '& li': { ...bodyTextSx, mb: 0.75, '&::marker': { color: GOLD } } }}>
              <li>Data Structures & Algorithms</li>
              <li>Operating Systems & Systems Programming</li>
              <li>Computer Networks & Protocols</li>
              <li>Software Engineering Principles</li>
            </Box>
          </Box>
        </motion.div>

      </Container>
    </Box>
  </motion.div>
);

export default Education;
