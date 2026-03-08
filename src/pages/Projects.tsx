import React from 'react';
import { Box, Paper, Typography, Grid, Card, CardContent } from '@mui/material';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Distributed Ingestion & Backend Infrastructure',
      description: 'Architected and optimized distributed ingestion pipelines and backend infrastructure processing billions of telemetry and billing events annually. Improved distributed query performance by 35% and reduced infrastructure cost exposure by 25% through telemetry-driven optimization.',
      technologies: ['Spark', 'Trino', 'Telemetry', 'High-Throughput', 'Multi-tenant'],
    },
    {
      title: 'Predictive Workload Modeling',
      description: 'Developed predictive workload modeling frameworks to forecast system scaling limits and infrastructure capacity requirements. Built predictive scaling models evaluating throughput limits and infrastructure needs for distributed enterprise data platforms.',
      technologies: ['Capacity Planning', 'Workload Modeling', 'Scaling', 'Forecasting'],
    },
    {
      title: 'Diagnostic & Observability Platforms',
      description: 'Built internal diagnostic platforms identifying performance regressions and architectural bottlenecks across distributed services. Developed automated profiling pipelines enabling rapid root-cause diagnostics for platform performance regressions.',
      technologies: ['Observability', 'Telemetry', 'Diagnostics', 'Regression Detection'],
    },
    {
      title: 'Kubernetes & Platform Reliability',
      description: 'Designed Kubernetes resource allocation strategies improving cluster utilization and platform reliability. Led cross-team architectural initiatives improving telemetry pipelines, observability systems, and platform diagnostics.',
      technologies: ['Kubernetes', 'AWS', 'EMR', 'EKS', 'Resource Optimization'],
    },
    {
      title: 'Selected Impact',
      description: 'Improved distributed data platform throughput by 35% through system-level performance optimization. Reduced infrastructure cost exposure by more than $750K annually. Enabled scalable processing of billions of distributed events across multi-tenant cloud platforms. Improved system reliability through predictive workload modeling and infrastructure diagnostics.',
      technologies: ['Throughput', 'Cost Optimization', 'Scale', 'Reliability'],
    },
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
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Projects; 