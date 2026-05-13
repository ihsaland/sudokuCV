/**
 * Shared design tokens and sx presets.
 * Import from here instead of redeclaring per-page.
 */

// ── Colour tokens ────────────────────────────────────────────────────────────
export const GOLD        = '#D4AF37';
export const GOLD_DIM    = 'rgba(212,175,55,0.12)';
export const GOLD_BORDER = 'rgba(212,175,55,0.35)';
export const WHITE_HI    = 'rgba(255,255,255,0.18)';
export const WHITE_MID   = 'rgba(255,255,255,0.1)';
export const WHITE_LO    = 'rgba(255,255,255,0.06)';
export const TEXT_BODY   = 'rgba(255,255,255,0.78)';
export const TEXT_MUTED  = 'rgba(255,255,255,0.45)';

// ── Glass card surface ────────────────────────────────────────────────────────
export const glassSurface = {
  borderTop:    `0.5px solid ${WHITE_HI}`,
  borderLeft:   `0.5px solid ${WHITE_MID}`,
  borderRight:  `0.5px solid ${WHITE_LO}`,
  borderBottom: `0.5px solid ${WHITE_LO}`,
  borderRadius: '16px',
  backgroundColor: 'rgba(255,255,255,0.06)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), 0 8px 40px rgba(0,0,0,0.5)',
} as const;

/** Standard full-width card with hover gold accent. Spread into sx prop. */
export const cardSx = {
  ...glassSurface,
  p: { xs: 3, sm: 4 },
  mb: 3,
  transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
  '&:hover': {
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 20px 60px rgba(212,175,55,0.1)',
    borderTopColor: GOLD_BORDER,
  },
} as const;

// ── Page layout ───────────────────────────────────────────────────────────────
/** Outer Box for every page */
export const pageBox = {
  position: 'relative' as const,
  minHeight: '100vh',
  overflow: 'hidden',
};

/** Container sx — consistent zIndex + padding */
export const containerSx = {
  position: 'relative' as const,
  zIndex: 1,
  py: { xs: 5, sm: 7 },
  px: { xs: 2, sm: 3 },
};

// ── Typography presets ────────────────────────────────────────────────────────
/** Page-level H1 (used in hero area) */
export const pageTitleSx = {
  color: '#ffffff',
  fontWeight: 700,
  fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.6rem' },
  textAlign: 'center' as const,
  mb: 1,
  fontFamily: 'DS-DIGII, monospace',
  letterSpacing: '0.03em',
};

/** Subtitle below page title */
export const pageSubtitleSx = {
  color: TEXT_MUTED,
  fontSize: { xs: '0.9rem', sm: '1rem' },
  textAlign: 'center' as const,
  mb: 4,
  lineHeight: 1.65,
  maxWidth: 560,
  mx: 'auto',
};

/** Gold section heading inside a card */
export const sectionHeadingSx = {
  color: GOLD,
  fontWeight: 700,
  fontSize: { xs: '1rem', sm: '1.1rem' },
  mb: 1.5,
  fontFamily: 'DS-DIGII, monospace',
  letterSpacing: '0.04em',
};

/** Standard body copy */
export const bodyTextSx = {
  color: TEXT_BODY,
  fontSize: { xs: '0.9rem', sm: '0.95rem' },
  lineHeight: 1.75,
  mb: 1.5,
};

// ── Framer Motion helpers ─────────────────────────────────────────────────────
export const fadeUp = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};

export const inView = {
  initial: { y: 32, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, margin: '-60px' },
};

// ── Button presets ────────────────────────────────────────────────────────────
/** Gold outlined CTA */
export const goldOutlinedBtn = {
  color: GOLD,
  borderColor: GOLD_BORDER,
  fontSize: { xs: '0.9rem', sm: '0.95rem' },
  px: 3,
  py: 1.1,
  '&:hover': {
    color: '#ffffff',
    borderColor: GOLD,
    backgroundColor: GOLD_DIM,
  },
} as const;
