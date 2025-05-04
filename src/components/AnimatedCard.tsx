import React from 'react';
import { Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface AnimatedCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color?: string;
  path: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title,
  description,
  icon,
  color = '#d32f2f',
  path,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(path)}
      style={{ cursor: 'pointer' }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: `2px solid ${color}`,
          borderRadius: 2,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: `0 8px 32px ${color}33`,
          },
        }}
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          style={{
            color: color,
            fontSize: '2.5rem',
            marginBottom: '1rem',
          }}
        >
          {icon}
        </motion.div>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            mb: 2,
            color: color,
            fontWeight: 700,
            letterSpacing: '0.5px',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#333333',
            lineHeight: 1.6,
            fontWeight: 600,
          }}
        >
          {description}
        </Typography>
      </Paper>
    </motion.div>
  );
};

export default AnimatedCard; 