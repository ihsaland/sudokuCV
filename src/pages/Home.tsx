import React, { useState } from 'react';
import { Box, Typography, Container, Button, Link } from '@mui/material';
import { PlayArrow, GetApp, LockOutlined, ArrowForward, OpenInNew } from '@mui/icons-material';
import BackgroundPattern from '../components/BackgroundPattern';
import TypewriterText from '../components/TypewriterText';
import TerminalIntro from '../components/TerminalIntro';
import SkillConstellation from '../components/SkillConstellation';
import AnimatedCounter from '../components/AnimatedCounter';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GOLD, inView as inViewBase } from '../styles/pageStyles';

const exploreItems = [
  { to: '/frameworks',    label: 'Frameworks',   desc: 'Methodologies & engineering principles' },
  { to: '/case-studies',  label: 'Case Studies', desc: 'Real-world system optimisations' },
  { to: '/articles',      label: 'Articles',     desc: 'Architecture insights & thought leadership' },
  { to: '/research',      label: 'Research',     desc: 'PPI diagnostic tools & cost modelling' },
  { to: '/pressure-intelligence', label: 'Pressure Intelligence', desc: 'Advisory via KPI99 & PPI-F™' },
  { to: '/ppi-framework', label: 'PPI-F™',       desc: 'Performance Pressure Index methodology' },
];

const stats = [
  { value: 750, prefix: '$', suffix: 'K+', label: 'annual infrastructure savings' },
  { value: 35,  prefix: '',  suffix: '%',  label: 'throughput improvement' },
  { value: null, display: 'Bn+',           label: 'events architected' },
];

const articles = [
  { title: 'The next AI wave is likely to reward economic intelligence, not just model intelligence', url: 'https://www.linkedin.com/pulse/next-ai-wave-likely-reward-economic-intelligence-just-ian-salandy-yu81e/', date: 'May 2026' },
  { title: 'The Illusion of Infinite Compute: Mapping Spark Resource Allocation to Real Cloud Hardware', url: 'https://www.linkedin.com/pulse/illusion-infinite-compute-mapping-spark-resource-real-ian-salandy-aixbe/', date: 'May 2026' },
  { title: "The Most Dangerous Code in Production Isn't the Code You Use", url: 'https://www.linkedin.com/pulse/most-dangerous-code-production-isnt-you-use-ian-salandy-xtswe/', date: 'Apr 2026' },
  { title: 'Why Systems Fail at Scale (And How to See It Before It Happens)', url: 'https://www.linkedin.com/pulse/why-systems-fail-scale-how-see-before-happens-ian-salandy-fp4ve/', date: 'Apr 2026' },
];

// ── Card tilt ──────────────────────────────────────────────────────────────
const useTilt = (intensity = 5) => {
  const [t, setT] = useState({ x: 0, y: 0, on: false });
  return {
    onMouseMove: (e: React.MouseEvent) => {
      const r = e.currentTarget.getBoundingClientRect();
      setT({ x: ((e.clientX - r.left) / r.width - 0.5) * intensity, y: ((e.clientY - r.top) / r.height - 0.5) * -intensity, on: true });
    },
    onMouseLeave: () => setT({ x: 0, y: 0, on: false }),
    style: {
      transform: `perspective(1200px) rotateX(${t.y}deg) rotateY(${t.x}deg)`,
      transition: t.on ? 'transform 0.08s linear' : 'transform 0.55s cubic-bezier(0.23,1,0.32,1)',
      willChange: 'transform' as const,
    },
  };
};

// ── Shared glass card surface ──────────────────────────────────────────────
const cardSx = {
  p: { xs: 3.5, sm: 5 },
  borderTop:    '0.5px solid rgba(255,255,255,0.18)',
  borderLeft:   '0.5px solid rgba(255,255,255,0.1)',
  borderRight:  '0.5px solid rgba(255,255,255,0.06)',
  borderBottom: '0.5px solid rgba(255,255,255,0.06)',
  borderRadius: '16px',
  backgroundColor: 'rgba(255,255,255,0.06)',
  backdropFilter: 'blur(20px)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), 0 8px 40px rgba(0,0,0,0.5)',
  maxWidth: '860px',
  margin: '0 auto',
  mb: 6,
  '&:hover': {
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 20px 60px rgba(212,175,55,0.1)',
    borderTopColor: 'rgba(212,175,55,0.4)',
  },
  transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
};

// Alias so local spread syntax keeps working
const inView = inViewBase;

// ─────────────────────────────────────────────────────────────────────────────

const Home: React.FC = () => {
  const navigate = useNavigate();
  const tiltStats   = useTilt();
  const tiltWriting = useTilt();
  const tiltExplore = useTilt(3);
  const tiltSudoku  = useTilt();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <Box sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
        px: { xs: 2, sm: 4 },
        pt: { xs: 8, sm: 12 },
      }}>
        <BackgroundPattern />
        <Container maxWidth="lg">

          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.15 }}>
            <Box sx={{ maxWidth: '740px', mx: 'auto', mb: 10, textAlign: 'center' }}>

              {/* Avatar */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, position: 'relative' }}>
                <Box sx={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%,-50%)',
                  width: { xs: 185, sm: 225 }, height: { xs: 185, sm: 225 },
                  borderRadius: '50%',
                  animation: 'avatar-glow 3.5s ease-in-out infinite',
                  pointerEvents: 'none',
                }} />
                <Box sx={{
                  p: '3px', borderRadius: '50%',
                  background: `conic-gradient(from 180deg, ${GOLD}, rgba(212,175,55,0.2), ${GOLD})`,
                  position: 'relative', zIndex: 1,
                }}>
                  <Box
                    component="img"
                    src="/images/animePic.jpeg"
                    alt="Ian Salandy"
                    sx={{
                      width: { xs: 150, sm: 190 },
                      height: { xs: 150, sm: 190 },
                      borderRadius: '50%',
                      objectFit: 'cover',
                      display: 'block',
                      border: '2px solid #07070f',
                    }}
                  />
                </Box>
              </Box>

              {/* Name — typewriter */}
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2.4rem', sm: '3.8rem', md: '4.6rem' },
                  letterSpacing: '0.03em',
                  lineHeight: 1.1,
                  background: 'linear-gradient(160deg, #ffffff 40%, rgba(255,255,255,0.65) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                <TypewriterText text="Ian Salandy" delay={0.3} charDelay={0.07} />
              </Typography>

              {/* Role separator */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mt: 2, mb: 2 }}>
                <Box sx={{ height: '1px', width: 52, background: `linear-gradient(90deg, transparent, rgba(212,175,55,0.55))` }} />
                <Typography sx={{
                  color: GOLD, fontWeight: 600,
                  fontSize: { xs: '0.9rem', sm: '1.05rem', md: '1.15rem' },
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontFamily: 'DS-DIGII, monospace',
                }}>
                  Systems Pressure Architect
                </Typography>
                <Box sx={{ height: '1px', width: 52, background: `linear-gradient(90deg, rgba(212,175,55,0.55), transparent)` }} />
              </Box>

              <Typography sx={{
                color: 'rgba(255,255,255,0.45)',
                fontSize: { xs: '0.85rem', sm: '0.95rem' },
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
              }}>
                Distributed Systems · Performance · Reliability
              </Typography>

              {/* Terminal */}
              <TerminalIntro />

              {/* Skill constellation */}
              <SkillConstellation />

              {/* CTAs */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5, justifyContent: 'center', mt: 4.5 }}>
                <Button
                  variant="contained"
                  href="/Ian_Salandy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<GetApp />}
                  sx={{
                    fontSize: { xs: '0.95rem', sm: '1rem' },
                    px: { xs: 3, sm: 3.5 }, py: 1.4,
                    backgroundColor: '#111111',
                    color: '#ffffff',
                    border: '0.5px solid rgba(255,255,255,0.3)',
                    '&:hover, &:active': { backgroundColor: '#222222', borderColor: 'rgba(255,255,255,0.6)' },
                  }}
                >
                  Download Resume
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/cv')}
                  sx={{
                    fontSize: { xs: '0.95rem', sm: '1rem' },
                    px: { xs: 3, sm: 3.5 }, py: 1.4,
                    color: GOLD,
                    borderColor: `rgba(212,175,55,0.6)`,
                    '&:hover, &:active': { color: '#ffffff', borderColor: GOLD, backgroundColor: 'rgba(212,175,55,0.08)' },
                  }}
                >
                  View CV
                </Button>
              </Box>
            </Box>
          </motion.div>

          {/* ── Impact Stats ───────────────────────────────────────────────── */}
          <motion.div {...inView} transition={{ duration: 0.6 }}>
            <Box sx={cardSx} style={tiltStats.style} onMouseMove={tiltStats.onMouseMove} onMouseLeave={tiltStats.onMouseLeave}>
              <Typography variant="h4" sx={{
                color: '#ffffff', fontWeight: 700,
                fontSize: { xs: '1.3rem', sm: '1.6rem' },
                textAlign: 'center', mb: 4, letterSpacing: '0.04em',
              }}>
                Platform Impact
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 3 }}>
                {stats.map(({ value, prefix, suffix, display, label }) => (
                  <Box key={label} sx={{
                    textAlign: 'center',
                    p: { xs: 2, sm: 3 },
                    borderRadius: '12px',
                    border: '0.5px solid rgba(212,175,55,0.25)',
                    backgroundColor: 'rgba(212,175,55,0.04)',
                  }}>
                    <Typography sx={{
                      color: GOLD, fontWeight: 700,
                      fontFamily: 'DS-DIGII, monospace',
                      fontSize: { xs: '2rem', sm: '2.6rem', md: '3rem' },
                      lineHeight: 1,
                      textShadow: `0 0 24px rgba(212,175,55,0.45)`,
                    }}>
                      {value !== null && value !== undefined
                        ? <AnimatedCounter value={value as number} prefix={prefix} suffix={suffix} />
                        : display}
                    </Typography>
                    <Typography sx={{
                      color: 'rgba(255,255,255,0.6)',
                      fontSize: { xs: '0.8rem', sm: '0.88rem' },
                      mt: 1, lineHeight: 1.4,
                    }}>
                      {label}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Typography sx={{
                color: 'rgba(255,255,255,0.45)',
                fontSize: { xs: '0.82rem', sm: '0.88rem' },
                textAlign: 'center', mt: 3, fontStyle: 'italic',
              }}>
                Predictive scaling & failure prevention through workload modelling
              </Typography>
            </Box>
          </motion.div>

          {/* ── Latest Writing ─────────────────────────────────────────────── */}
          <motion.div {...inView} transition={{ duration: 0.6, delay: 0.05 }}>
            <Box
              sx={{ ...cardSx, p: { xs: 3, sm: 4.5 } }}
              style={tiltWriting.style}
              onMouseMove={tiltWriting.onMouseMove}
              onMouseLeave={tiltWriting.onMouseLeave}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography sx={{
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: { xs: '0.75rem', sm: '0.8rem' },
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                }}>
                  Latest Writing
                </Typography>
                <Link
                  component="button"
                  onClick={() => navigate('/articles')}
                  sx={{ color: GOLD, fontSize: '0.85rem', cursor: 'pointer', background: 'none', border: 'none', p: 0, '&:hover': { color: '#ffffff' } }}
                >
                  View all →
                </Link>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {articles.map(({ title, url, date }, i) => (
                  <Link key={url} href={url} target="_blank" rel="noopener noreferrer" underline="none">
                    <Box sx={{
                      py: 2,
                      borderBottom: i < articles.length - 1 ? '0.5px solid rgba(255,255,255,0.07)' : 'none',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2,
                      '&:hover .at': { color: GOLD },
                      '&:hover .ai': { color: GOLD },
                    }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography className="at" sx={{
                          color: '#ffffff', fontWeight: 600,
                          fontSize: { xs: '0.9rem', sm: '1rem' },
                          lineHeight: 1.5, transition: 'color 0.15s ease',
                        }}>
                          {title}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: { xs: '0.78rem', sm: '0.82rem' }, mt: 0.5 }}>
                          {date} · LinkedIn
                        </Typography>
                      </Box>
                      <OpenInNew className="ai" sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '1rem', flexShrink: 0, mt: '3px', transition: 'color 0.15s ease' }} />
                    </Box>
                  </Link>
                ))}
              </Box>
            </Box>
          </motion.div>

          {/* ── Explore ────────────────────────────────────────────────────── */}
          <motion.div {...inView} transition={{ duration: 0.6, delay: 0.05 }}>
            <Box
              sx={{ maxWidth: '860px', mx: 'auto', mb: 6 }}
              style={tiltExplore.style}
              onMouseMove={tiltExplore.onMouseMove}
              onMouseLeave={tiltExplore.onMouseLeave}
            >
              <Typography sx={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: { xs: '0.75rem', sm: '0.8rem' },
                textAlign: 'center', letterSpacing: '0.14em', textTransform: 'uppercase', mb: 3,
              }}>
                Explore
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
                {exploreItems.map(({ to, label, desc }) => (
                  <Box
                    key={to}
                    onClick={() => navigate(to)}
                    sx={{
                      p: { xs: 2, sm: 2.5 },
                      borderRadius: '12px',
                      borderTop:    '0.5px solid rgba(255,255,255,0.15)',
                      borderLeft:   '0.5px solid rgba(255,255,255,0.08)',
                      borderRight:  '0.5px solid rgba(255,255,255,0.04)',
                      borderBottom: '0.5px solid rgba(255,255,255,0.04)',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      backdropFilter: 'blur(16px)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderTopColor: `rgba(212,175,55,0.5)`,
                        backgroundColor: 'rgba(212,175,55,0.07)',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.75 }}>
                      <Typography sx={{
                        color: '#ffffff', fontWeight: 700,
                        fontSize: { xs: '0.92rem', sm: '1rem' },
                        fontFamily: 'DS-DIGII, monospace',
                      }}>
                        {label}
                      </Typography>
                      <ArrowForward sx={{ color: GOLD, fontSize: '1rem', mt: '2px', flexShrink: 0 }} />
                    </Box>
                    <Typography sx={{
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: { xs: '0.78rem', sm: '0.84rem' },
                      lineHeight: 1.5,
                    }}>
                      {desc}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </motion.div>

          {/* ── Sudoku unlock ──────────────────────────────────────────────── */}
          <motion.div {...inView} transition={{ duration: 0.6, delay: 0.05 }}>
            <Box
              sx={{
                maxWidth: '860px', mx: 'auto', mb: 8,
                p: { xs: 4, sm: 6 },
                borderRadius: '16px',
                borderTop:    `0.5px solid rgba(212,175,55,0.5)`,
                borderLeft:   `0.5px solid rgba(212,175,55,0.25)`,
                borderRight:  `0.5px solid rgba(212,175,55,0.15)`,
                borderBottom: `0.5px solid rgba(212,175,55,0.15)`,
                backgroundColor: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
                boxShadow: `inset 0 1px 0 rgba(212,175,55,0.12), 0 8px 40px rgba(0,0,0,0.5)`,
                textAlign: 'center',
                transition: 'box-shadow 0.25s ease',
                '&:hover': { boxShadow: `inset 0 1px 0 rgba(212,175,55,0.2), 0 20px 60px rgba(212,175,55,0.15)` },
              }}
              style={tiltSudoku.style}
              onMouseMove={tiltSudoku.onMouseMove}
              onMouseLeave={tiltSudoku.onMouseLeave}
            >
              <LockOutlined sx={{ color: GOLD, fontSize: { xs: '2.2rem', sm: '2.8rem' }, mb: 2 }} />
              <Typography variant="h5" sx={{
                color: '#ffffff', fontWeight: 700,
                fontSize: { xs: '1.3rem', sm: '1.6rem' }, mb: 1.5,
              }}>
                The CV is locked
              </Typography>
              <Typography sx={{
                color: 'rgba(255,255,255,0.65)',
                fontSize: { xs: '0.95rem', sm: '1.05rem' },
                maxWidth: '520px', mx: 'auto', mb: 3.5, lineHeight: 1.7,
              }}>
                Solve Sudoku puzzles at increasing difficulty to unlock detailed CV sections. Curious minds get more.
              </Typography>
              <Button
                variant="outlined"
                onClick={() => navigate('/game')}
                startIcon={<PlayArrow />}
                sx={{
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                  px: { xs: 3, sm: 4 }, py: 1.4,
                  color: GOLD,
                  borderColor: `rgba(212,175,55,0.6)`,
                  '&:hover': { color: '#ffffff', borderColor: GOLD, backgroundColor: 'rgba(212,175,55,0.08)' },
                }}
              >
                Unlock the CV
              </Button>
            </Box>
          </motion.div>

        </Container>
      </Box>
    </motion.div>
  );
};

export default Home;
