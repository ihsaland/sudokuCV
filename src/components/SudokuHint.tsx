import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { LockOutlined, Close, ArrowForward } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { GOLD } from '../styles/pageStyles';

const DISMISSED_KEY = 'sudoku_hint_dismissed';

const SudokuHint: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    // Only show on home, only if not already dismissed this session
    if (pathname !== '/' && pathname !== '') return;
    if (sessionStorage.getItem(DISMISSED_KEY)) return;

    // Delay appearance so it doesn't compete with the hero animation
    const t = setTimeout(() => setVisible(true), 3200);
    return () => clearTimeout(t);
  }, [pathname]);

  const dismiss = () => {
    sessionStorage.setItem(DISMISSED_KEY, '1');
    setVisible(false);
  };

  const go = () => {
    dismiss();
    navigate('/game');
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          style={{
            position: 'fixed',
            bottom: 28,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1100,
            width: 'calc(100vw - 32px)',
            maxWidth: 420,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'stretch', sm: 'center' },
              gap: { xs: 1, sm: 2 },
              px: { xs: 2, sm: 2.5 },
              py: { xs: 1.5, sm: 1.5 },
              borderRadius: { xs: '16px', sm: '40px' },
              background: 'rgba(10,10,18,0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `0.5px solid rgba(212,175,55,0.4)`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.08)`,
            }}
          >
            {/* Top row on mobile: icon + text + dismiss */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
              {/* Pulsing lock icon */}
              <Box sx={{ position: 'relative', flexShrink: 0 }}>
                <Box sx={{
                  position: 'absolute', inset: -6, borderRadius: '50%',
                  border: `1px solid rgba(212,175,55,0.35)`,
                  animation: 'hint-pulse 2s ease-in-out infinite',
                }} />
                <LockOutlined sx={{ color: GOLD, fontSize: '1.1rem' }} />
              </Box>

              <Typography sx={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                fontWeight: 500,
                flex: 1,
                lineHeight: 1.4,
              }}>
                The full CV is locked behind Sudoku
              </Typography>

              {/* Dismiss — top-right on mobile */}
              <IconButton
                onClick={dismiss}
                size="small"
                sx={{
                  color: 'rgba(255,255,255,0.3)',
                  p: 0.25, flexShrink: 0,
                  display: { xs: 'flex', sm: 'none' },
                  '&:hover': { color: 'rgba(255,255,255,0.7)', background: 'none' },
                }}
              >
                <Close sx={{ fontSize: '0.85rem' }} />
              </IconButton>
            </Box>

            {/* Bottom row on mobile: CTA + desktop dismiss */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { sm: 1.5 } }}>
              {/* Divider — desktop only */}
              <Box sx={{
                display: { xs: 'none', sm: 'block' },
                width: '0.5px',
                alignSelf: 'stretch',
                background: 'rgba(212,175,55,0.25)',
              }} />

              {/* CTA */}
              <Box
                onClick={go}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 0.5,
                  cursor: 'pointer', flexShrink: 0,
                  color: GOLD, fontWeight: 700,
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  borderTop: { xs: `0.5px solid rgba(212,175,55,0.2)`, sm: 'none' },
                  pt: { xs: 1, sm: 0 },
                  '&:hover, &:active': { color: '#fff' },
                  transition: 'color 0.15s ease',
                }}
              >
                Unlock it <ArrowForward sx={{ fontSize: '0.85rem' }} />
              </Box>

              {/* Dismiss — desktop only */}
              <IconButton
                onClick={dismiss}
                size="small"
                sx={{
                  color: 'rgba(255,255,255,0.3)',
                  p: 0.25,
                  display: { xs: 'none', sm: 'flex' },
                  '&:hover': { color: 'rgba(255,255,255,0.7)', background: 'none' },
                }}
              >
                <Close sx={{ fontSize: '0.85rem' }} />
              </IconButton>
            </Box>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SudokuHint;
