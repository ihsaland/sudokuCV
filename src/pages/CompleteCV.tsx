import React from 'react';
import { Box, Typography, Paper, Grid, Container } from '@mui/material';
import { useUnlockedSections } from '../context/UnlockedSectionsContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CompleteCV: React.FC = () => {
  const { unlockedSections } = useUnlockedSections();
  const navigate = useNavigate();

  const sections = [
    {
      title: "Professional Summary",
      content: "Seasoned Performance Architect with a proven track record in software engineering, SaaS optimization, and enterprise-scale product development. Expertise spans performance tuning, capacity planning, system profiling, and architectural process improvement. Known for designing and leading strategic initiatives that elevate application performance, scalability, and operational efficiency across complex, distributed systems.",
      section: "professional-summary",
      difficulty: "Easy",
      path: "/professional-summary"
    },
    {
      title: "Education",
      content: "Bachelor's Degree in Computer Science from Morehouse College, Master's Degree from North Carolina State University",
      section: "education",
      difficulty: "Easy",
      path: "/education"
    },
    {
      title: "Work Experience",
      content: "Principal Performance Architect at Salesforce (2021-Present), IBM (2016-2021), Accenture (2009-2016), and IBM (2005-2009)",
      section: "work-experience",
      difficulty: "Medium",
      path: "/work-experience"
    },
    {
      title: "Skills",
      content: "Performance Engineering, System Architecture, JVM Tuning, Database Optimization, Machine Learning, Cloud Infrastructure",
      section: "skills",
      difficulty: "Hard",
      path: "/skills"
    },
    {
      title: "Projects",
      content: "Led development of enterprise performance frameworks, ML-powered performance modeling, and cross-platform query optimization strategies",
      section: "projects",
      difficulty: "Expert",
      path: "/projects"
    }
  ];

  const handleSectionClick = (path: string) => {
    navigate(path);
  };

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
                          },
                          cursor: unlockedSections.includes(section.section) ? 'pointer' : 'default'
                        }}
                        onClick={() => unlockedSections.includes(section.section) && handleSectionClick(section.path)}
                      >
                        {section.title}
                      </Typography>
                      {unlockedSections.includes(section.section) ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          whileHover={{ scale: 1.01 }}
                          onClick={() => handleSectionClick(section.path)}
                          style={{ cursor: 'pointer' }}
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