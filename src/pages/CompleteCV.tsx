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
      content: "Principal / Staff-level software engineer with 15+ years designing and optimizing large-scale distributed systems, high-throughput data platforms, and backend infrastructure. Deep expertise in performance engineering, distributed compute platforms, and infrastructure scalability for systems processing billions of events annually.",
      section: "professional-summary",
      difficulty: "Easy",
      path: "/professional-summary"
    },
    {
      title: "Education",
      content: "B.S. Computer Science from Morehouse College, M.S. Computer Science from North Carolina State University",
      section: "education",
      difficulty: "Medium",
      path: "/education"
    },
    {
      title: "Work Experience",
      content: "Principal Performance Engineer / Acting Principal Architect — Cloud Data Platform (2021–Present). Principal Performance and Capacity Engineer — Distributed Enterprise Platforms (2016–2021). Lead Performance Engineer — Enterprise Application Platforms (2009–2016).",
      section: "work-experience",
      difficulty: "Hard",
      path: "/work-experience"
    },
    {
      title: "Skills",
      content: "Distributed systems architecture, Spark/Trino, AWS/Kubernetes, performance engineering, capacity planning, JVM optimization, telemetry & observability. Languages: Java, Python, SQL.",
      section: "skills",
      difficulty: "Advanced",
      path: "/skills"
    },
    {
      title: "Projects",
      content: "Distributed ingestion pipelines, Spark/Trino analytics workflows, predictive workload modeling, diagnostic platforms, Kubernetes resource strategies. 35% query performance improvement; $750K+ annual cost exposure reduction.",
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
                        ? 'rgba(0, 0, 0, 0.6)'
                        : 'rgba(0, 0, 0, 0.5)',
                      backdropFilter: 'blur(8px)',
                      borderWidth: '0.5px',
                      borderColor: unlockedSections.includes(section.section)
                        ? '#ffffff'
                        : 'rgba(255, 255, 255, 0.5)',
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
                          : 'rgba(255, 255, 255, 0.5)',
                        backgroundColor: unlockedSections.includes(section.section)
                          ? 'rgba(0, 0, 0, 0.7)'
                          : 'rgba(0, 0, 0, 0.6)'
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
                          opacity: unlockedSections.includes(section.section) ? 1 : 0.95,
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
                              opacity: 1
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
                              opacity: 0.95,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                opacity: 1,
                                textShadow: '2px 2px 4px rgba(255,255,255,0.2)'
                              }
                            }}
                          >
                            {section.title === "Education" ? "Complete the Medium Sudoku puzzle to unlock this section." :
                             section.title === "Work Experience" ? "Complete the Hard Sudoku puzzle to unlock this section." :
                             section.title === "Skills" ? "Complete the Advanced Sudoku puzzle to unlock this section." :
                             section.title === "Projects" ? "Complete the Expert Sudoku puzzle to unlock this section." :
                             `Complete the ${section.difficulty} Sudoku puzzle to unlock this section.`}
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