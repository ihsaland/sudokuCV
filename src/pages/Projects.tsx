import React from 'react';
import { Box, Paper, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Enterprise Performance Framework',
      description: 'Led the development of standardized performance engineering frameworks across core SaaS products, integrating end-to-end PE solutions into CI/CD pipelines. Improved system responsiveness by 40% and reduced resource consumption.',
      technologies: ['Performance Engineering', 'CI/CD', 'System Architecture', 'JVM Tuning'],
      link: '#'
    },
    {
      title: 'ML-Powered Performance Modeling',
      description: 'Designed and deployed scalable infrastructure performance models using machine learning for scenario-based workload simulations and predictive analysis. Enabled accurate capacity forecasting and proactive scaling.',
      technologies: ['Machine Learning', 'Performance Modeling', 'Capacity Planning', 'Cloud Infrastructure'],
      link: '#'
    },
    {
      title: 'Cross-Platform Query Optimization',
      description: 'Architected and implemented query optimization strategies for Trino, Oracle, and SDB, enhancing throughput and reducing latency. Improved query performance by 60% across distributed systems.',
      technologies: ['Database Optimization', 'Query Tuning', 'Distributed Systems', 'Performance Testing'],
      link: '#'
    },
    {
      title: 'Real-Time Trading Platform',
      description: 'Led architectural validation and tuning strategies for real-time trading applications, ensuring performance compliance with technical and business requirements. Achieved sub-millisecond latency.',
      technologies: ['Low-latency Optimization', 'System Architecture', 'Performance Testing', 'Real-time Systems'],
      link: '#'
    },
    {
      title: 'Developer Enablement Program',
      description: 'Championed developer enablement through VTO-led initiatives, including HackerRank training and internal performance engineering courses. Established standards for profiling and tuning.',
      technologies: ['Technical Training', 'Performance Best Practices', 'Developer Tools', 'Knowledge Sharing'],
      link: '#'
    },
    {
      title: 'Global Performance Testing Framework',
      description: 'Managed global delivery of performance test solutions, overseeing teams responsible for scripting, scenario execution, and results analysis. Standardized testing practices across distributed teams.',
      technologies: ['Performance Testing', 'Test Automation', 'Global Delivery', 'Quality Assurance'],
      link: '#'
    }
  ];

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto' }}>
      <Paper 
        variant="outlined"
        sx={{ 
          p: { xs: 2, sm: 4 },
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
          }
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            color: 'primary.main',
            fontWeight: 600,
            mb: 3,
            position: 'relative',
            fontSize: { xs: '1.75rem', sm: '2rem' },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: 0,
              width: '60px',
              height: '4px',
              backgroundColor: 'primary.main',
              borderRadius: '2px',
            }
          }}
        >
          Projects
        </Typography>
        
        <Grid container spacing={2}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} lg={4} key={project.title}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ 
                      color: 'primary.main',
                      fontWeight: 500,
                      fontSize: { xs: '1rem', sm: '1.25rem' },
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary" 
                    paragraph
                    sx={{ 
                      lineHeight: 1.8,
                      mb: 2,
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    }}
                  >
                    {project.description}
                  </Typography>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 1,
                      '& .MuiTypography-root': {
                        backgroundColor: 'rgba(25, 118, 210, 0.1)',
                        color: 'primary.main',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                      }
                    }}
                  >
                    {project.technologies.map((tech) => (
                      <Typography
                        key={tech}
                        variant="caption"
                      >
                        {tech}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    color="primary"
                    sx={{ 
                      fontWeight: 500,
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      }
                    }}
                  >
                    View Project
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Projects; 