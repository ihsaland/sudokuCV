import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Link } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const bottomThreshold = documentHeight - windowHeight - 100; // 100px from bottom

      setIsNearBottom(scrollPosition >= bottomThreshold);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const windowHeight = window.innerHeight;
      const mouseY = e.clientY;
      const bottomThreshold = windowHeight - 100; // 100px from bottom

      setIsVisible(mouseY >= bottomThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      {(isVisible || isNearBottom) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            component="footer"
            sx={{
              py: 1,
              px: 2,
              mt: 'auto',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(5px)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
            }}
          >
            <Container maxWidth="lg">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                  <motion.div variants={itemVariants}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#ffffff',
                        fontSize: { xs: '0.8rem', sm: '0.9rem' },
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      Email:{' '}
                      <Link
                        href="mailto:ihsaland@gmail.com"
                        sx={{
                          color: '#ffffff',
                          textDecoration: 'none',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderBottom: '1px solid rgba(255, 255, 255, 0.8)',
                            textShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
                          }
                        }}
                      >
                        ihsaland@gmail.com
                      </Link>
                    </Typography>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#ffffff',
                        fontSize: { xs: '0.8rem', sm: '0.9rem' },
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
                        whiteSpace: 'pre-line',
                        lineHeight: 1.4
                      }}
                    >
                      {`Begin and end, the digits twin,
A southern code lies deep within.
Mirror the start, then climb in line—
Six, seven, eight, then nine.`}
                    </Typography>
                  </motion.div>
                </Box>
              </motion.div>
            </Container>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Footer; 