import React from 'react';
import { Typography, Box, Container, Chip } from '@mui/material';
import { useUnlockedSections } from '../context/UnlockedSectionsContext';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  GOLD, GOLD_DIM, GOLD_BORDER,
  TEXT_BODY, TEXT_MUTED,
  pageBox, containerSx, pageTitleSx, pageSubtitleSx,
} from '../styles/pageStyles';

// ── Difficulty colour palette ─────────────────────────────────────────────────
const DIFF_PALETTE: Record<string, { color: string; bg: string; border: string; label: string }> = {
  Easy:     { color: '#4ade80', bg: 'rgba(74,222,128,0.08)',  border: 'rgba(74,222,128,0.30)',  label: 'Baseline' },
  Medium:   { color: '#60a5fa', bg: 'rgba(96,165,250,0.08)',  border: 'rgba(96,165,250,0.30)',  label: 'Elevated' },
  Hard:     { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.30)',  label: 'Critical' },
  Advanced: { color: '#f97316', bg: 'rgba(249,115,22,0.08)',  border: 'rgba(249,115,22,0.30)',  label: 'Cascade'  },
  Expert:   { color: '#ef4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.30)',   label: 'Meltdown' },
};

// ── Lock messages ─────────────────────────────────────────────────────────────
const LOCK_MSG: Record<string, string> = {
  Education:            'Complete the Elevated (Medium) challenge to unlock this section.',
  'Work Experience':    'Complete the Critical (Hard) challenge to unlock this section.',
  Skills:               'Complete the Cascade (Advanced) challenge to unlock this section.',
  Projects:             'Complete the Meltdown (Expert) challenge to unlock this section.',
};

// ── Section data ──────────────────────────────────────────────────────────────
const sections = [
  {
    title: 'Professional Summary',
    content: 'Systems Pressure Architect with 15+ years defining and scaling distributed systems for high-throughput data platforms. Capacity planning, cost-to-serve modeling, and system-level performance engineering across multi-billion event workloads.',
    section: 'professional-summary',
    difficulty: 'Easy',
    path: '/professional-summary',
    icon: '◈',
  },
  {
    title: 'Education',
    content: 'B.S. Computer Science · Morehouse College. M.S. Computer Science · North Carolina State University. Distributed computing, parallel architectures, performance modeling.',
    section: 'education',
    difficulty: 'Medium',
    path: '/education',
    icon: '◎',
  },
  {
    title: 'Work Experience',
    content: 'Salesforce — Acting Principal Architect / Staff Performance Engineer (2021–Present). IBM — Principal Performance & Capacity Engineer (2016–2021). Accenture — Lead Performance Engineer (2009–2016).',
    section: 'work-experience',
    difficulty: 'Hard',
    path: '/work-experience',
    icon: '◆',
  },
  {
    title: 'Skills',
    content: 'Distributed systems design, scalability strategy, cost-to-serve modeling, performance engineering & diagnostics. Spark, Trino/Presto, Kafka, Kubernetes, AWS (EMR, EKS). Java, Python, SQL.',
    section: 'skills',
    difficulty: 'Advanced',
    path: '/skills',
    icon: '◉',
  },
  {
    title: 'Projects',
    content: 'Billions-of-events architectures; 35% throughput improvement; ~$750K annual cost reduction via efficiency modeling; predictive 2×–10× growth modeling; diagnostics, automation, and regression governance.',
    section: 'projects',
    difficulty: 'Expert',
    path: '/projects',
    icon: '⬡',
  },
];

// ── Animation variants ────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { y: 40, opacity: 0, scale: 0.97 },
  visible: {
    y: 0, opacity: 1, scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Card component ────────────────────────────────────────────────────────────
interface CardProps {
  sec: typeof sections[0];
  unlocked: boolean;
  onNavigate: (path: string) => void;
  prefersReducedMotion: boolean | null;
}

const CVCard: React.FC<CardProps> = ({ sec, unlocked, onNavigate, prefersReducedMotion }) => {
  const pal = DIFF_PALETTE[sec.difficulty];
  const lockMsg = LOCK_MSG[sec.title] ?? `Complete the ${sec.difficulty} challenge to unlock this section.`;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={unlocked && !prefersReducedMotion ? { y: -6, scale: 1.015 } : {}}
      transition={{ duration: 0.22 }}
      style={{ height: '100%' }}
    >
      <Box
        onClick={() => unlocked && onNavigate(sec.path)}
        sx={{
          position: 'relative',
          height: '100%',
          minHeight: 200,
          borderRadius: '18px',
          overflow: 'hidden',
          cursor: unlocked ? 'pointer' : 'default',
          background: unlocked
            ? `linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)`
            : 'rgba(255,255,255,0.035)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `0.5px solid ${unlocked ? pal.border : 'rgba(255,255,255,0.08)'}`,
          boxShadow: unlocked
            ? `0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 0px ${pal.color}`
            : '0 4px 24px rgba(0,0,0,0.35)',
          transition: 'all 0.28s ease',
          '&:hover': unlocked ? {
            borderColor: pal.color,
            boxShadow: `0 8px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12), 0 0 24px ${pal.bg.replace('0.08', '0.25')}`,
          } : {},
          p: { xs: 2.5, sm: 3 },
        }}
      >
        {/* Glow orb — top-right corner */}
        {unlocked && (
          <Box
            sx={{
              position: 'absolute',
              top: -30,
              right: -30,
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${pal.color}22 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Header row */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
          {/* Icon + title */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: '1.1rem',
                color: unlocked ? pal.color : 'rgba(255,255,255,0.2)',
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              {sec.icon}
            </Typography>
            <Typography
              sx={{
                color: unlocked ? '#ffffff' : 'rgba(255,255,255,0.35)',
                fontWeight: 700,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                fontFamily: 'DS-DIGII, monospace',
                letterSpacing: '0.04em',
                lineHeight: 1.25,
              }}
            >
              {sec.title}
            </Typography>
          </Box>

          {/* Difficulty badge */}
          <Chip
            label={pal.label}
            size="small"
            sx={{
              ml: 1,
              flexShrink: 0,
              height: 22,
              fontSize: '0.65rem',
              fontFamily: 'DS-DIGII, monospace',
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: unlocked ? pal.color : 'rgba(255,255,255,0.22)',
              backgroundColor: unlocked ? pal.bg : 'rgba(255,255,255,0.04)',
              border: `0.5px solid ${unlocked ? pal.border : 'rgba(255,255,255,0.08)'}`,
              '& .MuiChip-label': { px: 1 },
            }}
          />
        </Box>

        {/* Thin accent rule */}
        <Box
          sx={{
            height: '1px',
            background: unlocked
              ? `linear-gradient(90deg, ${pal.color}55, transparent)`
              : 'rgba(255,255,255,0.06)',
            mb: 2,
          }}
        />

        {/* Body */}
        {unlocked ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <Typography
              sx={{
                color: TEXT_BODY,
                fontSize: { xs: '0.82rem', sm: '0.88rem' },
                lineHeight: 1.72,
                mb: 2.5,
              }}
            >
              {sec.content}
            </Typography>

            {/* CTA row */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography
                sx={{
                  color: pal.color,
                  fontSize: '0.75rem',
                  fontFamily: 'DS-DIGII, monospace',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                }}
              >
                View Full Section
              </Typography>
              <ArrowForwardIcon sx={{ fontSize: '0.85rem', color: pal.color }} />
            </Box>
          </motion.div>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2, mt: 0.5 }}>
            <LockIcon
              sx={{
                fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.2)',
                mt: '2px',
                flexShrink: 0,
              }}
            />
            <Typography
              sx={{
                color: TEXT_MUTED,
                fontSize: { xs: '0.82rem', sm: '0.86rem' },
                lineHeight: 1.68,
                fontStyle: 'italic',
              }}
            >
              {lockMsg}
            </Typography>
          </Box>
        )}
      </Box>
    </motion.div>
  );
};

// ── Progress bar ──────────────────────────────────────────────────────────────
const ProgressBar: React.FC<{ unlocked: number; total: number }> = ({ unlocked, total }) => {
  const pct = (unlocked / total) * 100;
  return (
    <Box sx={{ mb: { xs: 4, sm: 5 }, maxWidth: 480, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
        <Typography sx={{ color: TEXT_MUTED, fontSize: '0.72rem', fontFamily: 'DS-DIGII, monospace', letterSpacing: '0.06em' }}>
          SECTIONS UNLOCKED
        </Typography>
        <Typography sx={{ color: GOLD, fontSize: '0.72rem', fontFamily: 'DS-DIGII, monospace', fontWeight: 700 }}>
          {unlocked} / {total}
        </Typography>
      </Box>
      <Box
        sx={{
          height: 4,
          borderRadius: 2,
          background: 'rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${GOLD}, #f0c040)`,
            borderRadius: 2,
            boxShadow: `0 0 8px rgba(212,175,55,0.5)`,
          }}
        />
      </Box>
    </Box>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────
const CompleteCV: React.FC = () => {
  const { unlockedSections } = useUnlockedSections();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const unlockedCount = sections.filter((s) => unlockedSections.includes(s.section)).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <Box sx={pageBox}>
        <Container maxWidth="lg" sx={containerSx}>

          {/* Page heading */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Typography sx={{ ...pageTitleSx, mb: 0.75 }}>
              Complete CV
            </Typography>
            <Typography
              sx={{
                ...pageSubtitleSx,
                mb: 1.5,
              }}
            >
              Unlock sections by completing Sudoku challenges. Each difficulty tier reveals
              deeper signal about distributed systems under pressure.
            </Typography>

            {/* Thin gold rule */}
            <Box
              sx={{
                width: 60,
                height: '1.5px',
                background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                mx: 'auto',
                mb: { xs: 4, sm: 5 },
              }}
            />
          </motion.div>

          {/* Progress */}
          <ProgressBar unlocked={unlockedCount} total={sections.length} />

          {/* Card grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Full-width first card */}
            <Box sx={{ mb: 2.5 }}>
              <CVCard
                sec={sections[0]}
                unlocked={unlockedSections.includes(sections[0].section)}
                onNavigate={navigate}
                prefersReducedMotion={prefersReducedMotion}
              />
            </Box>

            {/* 2-col grid for remaining cards */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 2.5,
              }}
            >
              {sections.slice(1).map((sec) => (
                <CVCard
                  key={sec.section}
                  sec={sec}
                  unlocked={unlockedSections.includes(sec.section)}
                  onNavigate={navigate}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </Box>
          </motion.div>

          {/* Footer hint */}
          {unlockedCount < sections.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Typography
                sx={{
                  color: TEXT_MUTED,
                  fontSize: '0.78rem',
                  textAlign: 'center',
                  mt: { xs: 4, sm: 5 },
                  fontFamily: 'DS-DIGII, monospace',
                  letterSpacing: '0.05em',
                }}
              >
                ← Play Sudoku to unlock remaining sections
              </Typography>
            </motion.div>
          )}

        </Container>
      </Box>
    </motion.div>
  );
};

export default CompleteCV;
