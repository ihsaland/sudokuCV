import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const CursorGlow: React.FC = () => {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        left: pos.x - 220,
        top: pos.y - 220,
        width: 440,
        height: 440,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(212,175,55,0.07) 0%, rgba(212,175,55,0.02) 45%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 9990,
        opacity: visible ? 1 : 0,
        transition: 'left 0.1s ease, top 0.1s ease, opacity 0.4s ease',
        display: { xs: 'none', md: 'block' },
      }}
    />
  );
};

export default CursorGlow;
