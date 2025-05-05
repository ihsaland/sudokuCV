import React from 'react';
import { Box, Typography, Paper, Grid, Container } from '@mui/material';
import { useUnlockedSections } from '../context/UnlockedSectionsContext';
import { motion } from 'framer-motion';

const CompleteCV: React.FC = () => {
  const { unlockedSections } = useUnlockedSections();

  const sections = [
    {
      title: "Professional Summary",
      content: "Experienced software engineer with a strong background in full-stack development, specializing in React and Node.js. Proven track record of delivering high-quality, scalable applications while maintaining clean code and best practices.",
      section: "professional-summary",
      difficulty: "Easy"
    },
    {
      title: "Education",
      content: "Bachelor's Degree in Computer Science from XYZ University",
      section: "education",
      difficulty: "Easy"
    },
    {
      title: "Work Experience",
      content: "Software Engineer at ABC Corp (2020-2023)",
      section: "work-experience",
      difficulty: "Medium"
    },
    {
      title: "Skills",
      content: "React, TypeScript, Node.js, Python",
      section: "skills",
      difficulty: "Hard"
    },
    {
      title: "Projects",
      content: "Built a full-stack e-commerce platform with React and Node.js",
      section: "projects",
      difficulty: "Expert"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3}>
            {sections.map((section, index) => (
              <Grid item xs={12} md={6} key={section.title}>
                <motion.div variants={itemVariants}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 3,
                      height: '100%',
                      backgroundColor: unlockedSections.includes(section.section)
                        ? 'rgba(0, 0, 0, 0.3)'
                        : 'rgba(0, 0, 0, 0.2)',
                      backdropFilter: 'blur(5px)',
                      borderWidth: '0.5px',
                      borderColor: unlockedSections.includes(section.section)
                        ? '#ffffff'
                        : 'rgba(255, 255, 255, 0.3)',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: unlockedSections.includes(section.section)
                          ? 'translateY(-5px)'
                          : 'none',
                        boxShadow: unlockedSections.includes(section.section)
                          ? '0 4px 8px rgba(0,0,0,0.2)'
                          : 'none',
                        borderColor: unlockedSections.includes(section.section)
                          ? '#ffff00'
                          : 'rgba(255, 255, 255, 0.3)',
                        backgroundColor: unlockedSections.includes(section.section)
                          ? 'rgba(0, 0, 0, 0.4)'
                          : 'rgba(0, 0, 0, 0.25)'
                      }
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                          color: '#ffffff',
                          opacity: unlockedSections.includes(section.section) ? 1 : 0.7,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            opacity: 1,
                            textShadow: '2px 2px 4px rgba(255,255,255,0.2)'
                          }
                        }}
                      >
                        {section.title}
                      </Typography>
                      {unlockedSections.includes(section.section) ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          whileHover={{ scale: 1.01 }}
                        >
                          <Typography 
                            variant="body1"
                            sx={{
                              color: '#ffffff',
                              opacity: 0.9
                            }}
                          >
                            {section.content}
                          </Typography>
                        </motion.div>
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              color: '#ffffff',
                              opacity: 0.7,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                opacity: 1,
                                textShadow: '2px 2px 4px rgba(255,255,255,0.2)'
                              }
                            }}
                          >
                            Complete the {section.difficulty} Sudoku puzzle to unlock this section.
                          </Typography>
                        </motion.div>
                      )}
                    </motion.div>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default CompleteCV; 