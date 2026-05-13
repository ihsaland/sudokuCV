import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const LINES = [
  { type: 'cmd',    text: '$ pressure --describe ian-salandy' },
  { type: 'output', text: 'Systems Pressure Architect' },
  { type: 'output', text: 'Distributed systems · cost-to-serve · scale' },
  { type: 'output', text: 'Predicting and preventing failure before' },
  { type: 'output', text: 'it surfaces in production.' },
];

const DELAYS_MS = [700, 1300, 1700, 2100, 2500];

const TerminalIntro: React.FC = () => {
  const [visible, setVisible] = useState(0);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const timers = DELAYS_MS.map((d, i) =>
      window.setTimeout(() => setVisible(i + 1), d)
    );
    const blink = window.setInterval(() => setCursor((c) => !c), 530);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(blink);
    };
  }, []);

  return (
    <Box
      sx={{
        mt: 2.5,
        mb: 0.5,
        p: { xs: 1.5, sm: 2 },
        borderRadius: '8px',
        backgroundColor: 'rgba(0,0,0,0.55)',
        border: '0.5px solid rgba(255,255,255,0.1)',
        borderTop: '0.5px solid rgba(255,255,255,0.18)',
        backdropFilter: 'blur(12px)',
        textAlign: 'left',
        maxWidth: '560px',
        mx: 'auto',
        overflow: 'hidden',
      }}
    >
      {/* Toolbar dots */}
      <Box sx={{ display: 'flex', gap: 0.6, mb: 1.25 }}>
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
          <Box key={c} sx={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: c, opacity: 0.7 }} />
        ))}
      </Box>

      {LINES.slice(0, visible).map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.18 }}
        >
          <Typography
            sx={{
              fontFamily: 'DS-DIGII, monospace',
              fontSize: { xs: '0.82rem', sm: '0.9rem' },
              color: line.type === 'cmd' ? '#D4AF37' : 'rgba(255,255,255,0.72)',
              lineHeight: 1.85,
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {line.text}
            {i === visible - 1 && (
              <span style={{ opacity: cursor ? 1 : 0, color: '#D4AF37' }}>▋</span>
            )}
          </Typography>
        </motion.div>
      ))}

      {visible === 0 && (
        <Typography
          sx={{ fontFamily: 'DS-DIGII, monospace', fontSize: '0.75rem', color: '#D4AF37', lineHeight: 1.85 }}
        >
          <span style={{ opacity: cursor ? 1 : 0 }}>▋</span>
        </Typography>
      )}
    </Box>
  );
};

export default TerminalIntro;
