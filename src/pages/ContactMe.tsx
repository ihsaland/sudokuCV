import React from 'react';
import { Box, Typography, Grid, Paper, Divider, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { motion } from 'framer-motion';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(2),
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(5px)',
  borderRadius: '8px',
  borderWidth: '0.5px',
  borderColor: '#ffffff',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  }
}));

const ContactMe: React.FC = () => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ 
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: { xs: 2, md: 4 },
        pt: { xs: 8, sm: 10 }
      }}>
        <StyledPaper variant="outlined">
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{
              color: '#ffffff',
              fontWeight: 600,
              mb: 3,
              position: 'relative',
              fontSize: { xs: '1.75rem', sm: '2rem' },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '4px',
                backgroundColor: '#ffffff',
                borderRadius: '2px',
              }
            }}
          >
            Contact Me
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Box>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    color: '#ffffff',
                    fontWeight: 500,
                    mb: 2,
                    fontSize: { xs: '1.1rem', sm: '1.25rem' },
                  }}
                >
                  Get in Touch
                </Typography>
                <Typography 
                  variant="body1" 
                  paragraph
                  sx={{ 
                    color: '#ffffff',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                  }}
                >
                  Feel free to reach out to me through any of the following channels:
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon sx={{ mr: 2, color: '#ffffff' }} />
                  <Typography 
                    variant="body1"
                    sx={{ 
                      color: '#ffffff',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      flex: 1
                    }}
                  >
                    Email: ihsaland@gmail.com
                  </Typography>
                  <Tooltip title="Copy email">
                    <IconButton 
                      onClick={() => handleCopy('ihsaland@gmail.com')}
                      size="small"
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)',
                        padding: '4px',
                        '&:hover': {
                          color: '#ffff00',
                          transform: 'scale(1.1)',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <ContentCopyIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </Tooltip>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LinkedInIcon sx={{ mr: 2, color: '#ffffff' }} />
                  <Typography 
                    variant="body1"
                    sx={{ 
                      color: '#ffffff',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      flex: 1
                    }}
                  >
                    LinkedIn: linkedin.com/in/isalandy
                  </Typography>
                  <Tooltip title="Copy LinkedIn URL">
                    <IconButton 
                      onClick={() => handleCopy('linkedin.com/in/isalandy')}
                      size="small"
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)',
                        padding: '4px',
                        '&:hover': {
                          color: '#ffff00',
                          transform: 'scale(1.1)',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <ContentCopyIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </Tooltip>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <GitHubIcon sx={{ mr: 2, color: '#ffffff' }} />
                  <Typography 
                    variant="body1"
                    sx={{ 
                      color: '#ffffff',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      flex: 1
                    }}
                  >
                    GitHub: github.com/ihsaland
                  </Typography>
                  <Tooltip title="Copy GitHub URL">
                    <IconButton 
                      onClick={() => handleCopy('github.com/ihsaland')}
                      size="small"
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)',
                        padding: '4px',
                        '&:hover': {
                          color: '#ffff00',
                          transform: 'scale(1.1)',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <ContentCopyIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Divider sx={{ my: 4, borderWidth: '0.5px', borderColor: '#ffffff' }} />

                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    color: '#ffffff',
                    fontWeight: 500,
                    mb: 2,
                    fontSize: { xs: '1.1rem', sm: '1.25rem' },
                  }}
                >
                  Phone:
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    whiteSpace: 'pre-line',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                    color: '#ffffff',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                  }}
                >
                  {`Begin and end, the digits twin,
A southern code lies deep within.
Mirror the start, then climb in line—
Six, seven, eight, then nine.`}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </StyledPaper>
      </Box>
    </motion.div>
  );
};

export default ContactMe; 