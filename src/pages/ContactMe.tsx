import React from 'react';
import { Box, Typography, Container, Divider, IconButton, Tooltip } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { motion } from 'framer-motion';
import BackgroundPattern from '../components/BackgroundPattern';
import {
  GOLD, cardSx, pageBox, containerSx, pageTitleSx,
  bodyTextSx, fadeUp, inView, TEXT_MUTED,
} from '../styles/pageStyles';

const contacts = [
  { icon: <EmailIcon />, label: 'Email', value: 'ihsaland@gmail.com',          copy: 'ihsaland@gmail.com' },
  { icon: <LinkedInIcon />, label: 'LinkedIn', value: 'linkedin.com/in/isalandy', copy: 'linkedin.com/in/isalandy' },
  { icon: <GitHubIcon />, label: 'GitHub', value: 'github.com/ihsaland',         copy: 'github.com/ihsaland' },
];

const ContactMe: React.FC = () => {
  const handleCopy = (text: string) => navigator.clipboard.writeText(text);

  return (
    <motion.div {...fadeUp}>
      <Box sx={pageBox}>
        <BackgroundPattern />
        <Container maxWidth="sm" sx={containerSx}>

          <Typography sx={pageTitleSx}>Contact</Typography>

          <motion.div {...inView} transition={{ duration: 0.6 }}>
            <Box sx={{ ...cardSx, mt: 3 }}>

              {/* Avatar */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Box sx={{
                  p: '3px', borderRadius: '50%',
                  background: `conic-gradient(from 180deg, ${GOLD}, rgba(212,175,55,0.2), ${GOLD})`,
                }}>
                  <Box
                    component="img"
                    src="/images/animePic.jpeg"
                    alt="Ian Salandy"
                    sx={{
                      width: { xs: 110, sm: 130 },
                      height: { xs: 110, sm: 130 },
                      borderRadius: '50%',
                      objectFit: 'cover',
                      display: 'block',
                      border: '2px solid #07070f',
                    }}
                  />
                </Box>
              </Box>

              <Typography sx={{ color: '#ffffff', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.1rem' }, mb: 2 }}>
                Get in Touch
              </Typography>
              <Typography sx={{ ...bodyTextSx, mb: 3 }}>
                Reach out through any of the following channels.
              </Typography>

              {/* Contact rows */}
              {contacts.map(({ icon, label, value, copy }, i) => (
                <React.Fragment key={label}>
                  <Box sx={{ display: 'flex', alignItems: 'center', py: 1.5 }}>
                    <Box sx={{ color: GOLD, mr: 2, display: 'flex', alignItems: 'center' }}>{icon}</Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ color: TEXT_MUTED, fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase', mb: 0.25 }}>{label}</Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: { xs: '0.88rem', sm: '0.95rem' } }}>{value}</Typography>
                    </Box>
                    <Tooltip title={`Copy ${label}`}>
                      <IconButton
                        onClick={() => handleCopy(copy)}
                        size="small"
                        sx={{
                          color: TEXT_MUTED,
                          '&:hover': { color: GOLD, backgroundColor: 'rgba(212,175,55,0.1)' },
                          transition: 'all 0.18s ease',
                        }}
                      >
                        <ContentCopyIcon sx={{ fontSize: '0.95rem' }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  {i < contacts.length - 1 && (
                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />
                  )}
                </React.Fragment>
              ))}

              <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />

              {/* Phone riddle */}
              <Typography sx={{ color: GOLD, fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.06em', textTransform: 'uppercase', mb: 1.5, fontFamily: 'DS-DIGII, monospace' }}>
                Phone
              </Typography>
              <Typography sx={{ ...bodyTextSx, fontStyle: 'italic', whiteSpace: 'pre-line', mb: 0, lineHeight: 1.8 }}>
                {`Begin and end, the digits twin,\nA southern code lies deep within.\nMirror the start, then climb in line—\nSix, seven, eight, then nine.`}
              </Typography>
            </Box>
          </motion.div>

        </Container>
      </Box>
    </motion.div>
  );
};

export default ContactMe;
