import React from 'react';
import { Box, Paper, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Infrastructure Engineering Initiative',
      description: 'Led the development of a scalable infrastructure system that improved system resilience and reduced operational costs by 30%.',
      technologies: ['Salesforce', 'Cloud Infrastructure', 'DevOps', 'CI/CD'],
      link: '#'
    },
    {
      title: 'Financial Operations Optimization',
      description: 'Implemented a comprehensive FinOps strategy that optimized resource allocation and reduced cloud spending by 25%.',
      technologies: ['FinOps', 'Cost Optimization', 'Resource Management', 'Cloud Computing'],
      link: '#'
    },
    {
      title: 'System Architecture Redesign',
      description: 'Architected and implemented a new system design that improved scalability and reduced maintenance costs.',
      technologies: ['System Architecture', 'Cloud Computing', 'Infrastructure as Code', 'DevOps'],
      link: '#'
    }
  ];

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto' }}>
      <Paper 
        elevation={3} 
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