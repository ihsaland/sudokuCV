import React from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';

const WorkExperience: React.FC = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 800, mx: 'auto' }}>
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
          Work Experience
        </Typography>
        
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ 
              color: 'primary.main',
              fontWeight: 500,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
            }}
          >
            Principal Performance Architect
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{ 
              fontWeight: 500,
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            Salesforce | Atlanta, Georgia
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 2,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
            }}
          >
            Feb 2021 – Present
          </Typography>
          <Box 
            component="ul" 
            sx={{ 
              pl: 2,
              '& li': {
                mb: 1.5,
                color: 'text.secondary',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                '&::marker': {
                  color: 'primary.main',
                }
              }
            }}
          >
            <li>Spearheaded architectural design and execution of performance frameworks across core SaaS products including Platform Services, Globalization, Digital Wallet, and Data Cloud</li>
            <li>Directed JVM-level analysis of language definitions and motif sets to identify startup sequence inefficiencies and optimize application launch time</li>
            <li>Led system-wide capacity modeling and forecasting to accommodate scaling demands from Agentforce, UCP, and other high-volume services</li>
            <li>Architected and implemented cross-platform query optimization strategies for Trino, Oracle, and SDB, enhancing throughput and reducing latency</li>
            <li>Evaluated and refined ingestion, transformation, and pub/sub pipelines to improve resource efficiency and system responsiveness</li>
            <li>Conducted architectural performance reviews and provided technical leadership to engineering teams, establishing standards for profiling and tuning</li>
            <li>Championed developer enablement through VTO-led initiatives, including HackerRank training and internal performance engineering courses</li>
          </Box>
        </Box>

        <Divider sx={{ my: { xs: 2, sm: 3 } }} />

        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ 
              color: 'primary.main',
              fontWeight: 500,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
            }}
          >
            Principal Performance Architect
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{ 
              fontWeight: 500,
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            IBM | Atlanta, Georgia
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 2,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
            }}
          >
            Jul 2016 – Feb 2021
          </Typography>
          <Box 
            component="ul" 
            sx={{ 
              pl: 2,
              '& li': {
                mb: 1.5,
                color: 'text.secondary',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                '&::marker': {
                  color: 'primary.main',
                }
              }
            }}
          >
            <li>Led the architectural development of standardized performance engineering frameworks, integrating end-to-end PE solutions into CI/CD pipelines</li>
            <li>Designed and deployed scalable infrastructure performance models using machine learning for scenario-based workload simulations and predictive analysis</li>
            <li>Partnered cross-functionally with Product, Infrastructure, and Data Engineering teams to establish performance strategies that guided system design, deployment, and scaling decisions</li>
            <li>Created and institutionalized capacity management processes that enabled continuous delivery of high-performance system components</li>
            <li>Collaborated with software developers to architect performance-driven code enhancements, resulting in improved responsiveness and reduced resource consumption</li>
            <li>Diagnosed and resolved complex server performance issues, architecting solutions that removed bottlenecks and enhanced user experience across multiple product lines</li>
            <li>Served as a strategic technical advisor for performance architecture across multiple teams, aligning system health initiatives with long-term business and technical objectives</li>
          </Box>
        </Box>

        <Divider sx={{ my: { xs: 2, sm: 3 } }} />

        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ 
              color: 'primary.main',
              fontWeight: 500,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
            }}
          >
            Principal Performance Architect
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{ 
              fontWeight: 500,
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            Accenture | Greater Atlanta Area
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 2,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
            }}
          >
            Jan 2009 – Jul 2016
          </Typography>
          <Box 
            component="ul" 
            sx={{ 
              pl: 2,
              '& li': {
                mb: 1.5,
                color: 'text.secondary',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                '&::marker': {
                  color: 'primary.main',
                }
              }
            }}
          >
            <li>Delivered architectural leadership and performance engineering expertise for enterprise-scale financial platforms, including First Data Holdings</li>
            <li>Partnered with application and technical architecture teams to define and validate system performance across the full software lifecycle—unit, integration, UAT, and operational acceptance testing</li>
            <li>Led architectural validation and tuning strategies to support performance compliance with both technical and business requirements for real-time trading applications</li>
            <li>Managed global delivery of performance test solutions, overseeing teams responsible for scripting, scenario execution, test documentation, and results analysis</li>
            <li>Designed and implemented testing frameworks that ensured scalability, responsiveness, and reliability across complex, distributed systems</li>
            <li>Mentored junior engineers and technical staff on application performance principles, promoting knowledge sharing and adoption of best practices within cross-functional teams</li>
          </Box>
        </Box>

        <Divider sx={{ my: { xs: 2, sm: 3 } }} />

        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ 
              color: 'primary.main',
              fontWeight: 500,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
            }}
          >
            Performance Architect
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{ 
              fontWeight: 500,
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            IBM | Raleigh-Durham, NC
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 2,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
            }}
          >
            Apr 2005 – Jan 2009
          </Typography>
          <Box 
            component="ul" 
            sx={{ 
              pl: 2,
              '& li': {
                mb: 1.5,
                color: 'text.secondary',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                '&::marker': {
                  color: 'primary.main',
                }
              }
            }}
          >
            <li>Led architecture-aligned performance test planning and execution across assembly, product, and system phases in Agile SDLC environments</li>
            <li>Served as Subject Matter Expert in distributed performance testing, driving end-to-end strategy across test design, scripting, scenario execution, and results interpretation</li>
            <li>Evaluated and recommended optimal architectures, technologies, and system components to meet evolving scalability and throughput goals</li>
            <li>Developed reusable test frameworks to validate architectural choices, enabling performance-driven development practices across cross-functional teams</li>
            <li>Championed collaboration between architecture and QA teams to ensure that system designs aligned with performance objectives from inception through delivery</li>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default WorkExperience; 