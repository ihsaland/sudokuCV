import React from 'react';
import { Box, Paper, Typography, Grid, Card, CardContent } from '@mui/material';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Scalability Architecture — Billions of Events',
      description: 'Defined scalability architecture for distributed data platforms processing billions of events annually. Designed system-level scaling across compute, storage, and query layers, improving throughput by 35%.',
      technologies: ['Spark', 'Kafka', 'Distributed systems', 'High throughput'],
    },
    {
      title: 'Cost-to-Serve & Efficiency Modeling',
      description: 'Developed cost-to-serve models that reduced infrastructure cost by 25% (~$750K annually). Combined telemetry-driven analysis with capacity and efficiency modeling.',
      technologies: ['Cost-to-serve', 'AWS', 'Capacity planning'],
    },
    {
      title: 'Predictive Workload Modeling (2x–10x Growth)',
      description: 'Built predictive workload models forecasting system behavior under 2x–10x growth scenarios — enabling proactive scaling and failure prevention.',
      technologies: ['Workload modeling', 'Forecasting', 'Scaling'],
    },
    {
      title: 'Diagnostics, Automation & Governance',
      description: 'Established performance diagnostics frameworks for cross-system bottleneck identification; designed performance automation for large-scale validation; led benchmarking and regression governance across releases.',
      technologies: ['Diagnostics', 'Automation', 'Benchmarking', 'Governance'],
    },
    {
      title: 'Leadership & Executive Communication',
      description: 'Presented system risk, scaling constraints, and architectural recommendations to senior leadership. Cross-team architecture leadership on platform stability and investment decisions.',
      technologies: ['Architecture', 'Risk modeling', 'Leadership'],
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto' }}>
      <Paper 
        variant="outlined"
        sx={{ 
          p: { xs: 2, sm: 4 },
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
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
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Projects; 