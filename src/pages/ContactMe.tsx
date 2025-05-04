import React from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { motion } from 'framer-motion';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '8px',
  borderWidth: '0.5px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  }
}));

const ContactMe: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: { xs: 2, md: 4 }
      }}>
        <StyledPaper variant="outlined">
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            align="center"
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
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '4px',
                backgroundColor: 'primary.main',
                borderRadius: '2px',
              }
            }}
          >
            Contact Me
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderWidth: '0.5px',
                      },
                      '&:hover fieldset': {
                        borderWidth: '0.5px',
                      },
                      '&.Mui-focused fieldset': {
                        borderWidth: '0.5px',
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderWidth: '0.5px',
                      },
                      '&:hover fieldset': {
                        borderWidth: '0.5px',
                      },
                      '&.Mui-focused fieldset': {
                        borderWidth: '0.5px',
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={4}
                  variant="outlined"
                  margin="normal"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderWidth: '0.5px',
                      },
                      '&:hover fieldset': {
                        borderWidth: '0.5px',
                      },
                      '&.Mui-focused fieldset': {
                        borderWidth: '0.5px',
                      },
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{ 
                    mt: 2,
                    borderWidth: '0.5px',
                    '&:hover': {
                      borderWidth: '0.5px',
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    }
                  }}
                >
                  Send Message
                </Button>
              </form>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ mt: { xs: 4, md: 0 } }}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    color: 'primary.main',
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
                    color: 'text.secondary',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                  }}
                >
                  Feel free to reach out to me through any of the following channels:
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography 
                    variant="body1"
                    sx={{ 
                      color: 'text.secondary',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    }}
                  >
                    Email: ihsaland@gmail.com
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LinkedInIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography 
                    variant="body1"
                    sx={{ 
                      color: 'text.secondary',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    }}
                  >
                    LinkedIn: linkedin.com/in/ihsaland
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <GitHubIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography 
                    variant="body1"
                    sx={{ 
                      color: 'text.secondary',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    }}
                  >
                    GitHub: github.com/ihsaland
                  </Typography>
                </Box>

                <Divider sx={{ my: 4, borderWidth: '0.5px' }} />

                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    color: 'primary.main',
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
                    color: 'text.secondary',
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