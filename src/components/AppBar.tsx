import React, { useState } from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Button,
  Box,
  Menu,
  MenuItem,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const GOLD = '#D4AF37';
const GOLD_DIM = 'rgba(212,175,55,0.12)';
const GOLD_BORDER = 'rgba(212,175,55,0.35)';

/** Pill-style nav button — gold-filled when active, ghost hover otherwise */
const navSx = (active: boolean) => ({
  color: active ? '#0a0a0a' : 'rgba(255,255,255,0.82)',
  fontWeight: 600,
  fontSize: { xs: '0.78rem', sm: '0.82rem', md: '0.875rem' },
  fontFamily: "'DS-DIGII', monospace",
  letterSpacing: '0.04em',
  minWidth: 0,
  px: { xs: 1, sm: 1.5 },
  py: 0.6,
  borderRadius: '20px',
  backgroundColor: active ? GOLD : 'transparent',
  transition: 'all 0.18s ease',
  '&:hover': {
    color: active ? '#0a0a0a' : GOLD,
    backgroundColor: active ? GOLD : GOLD_DIM,
  },
});

const moreMenuItems: { to: string; label: string }[] = [
  { to: '/frameworks',   label: 'Frameworks'   },
  { to: '/case-studies', label: 'Case Studies'  },
  { to: '/articles',     label: 'Articles'      },
  { to: '/research',     label: 'Research'      },
  { to: '/pressure-intelligence', label: 'Pressure Intelligence' },
];

const MORE_PATHS = moreMenuItems.map((m) => m.to);

const AppBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleItemClick = (to: string) => { navigate(to); handleClose(); };

  return (
    <MuiAppBar
      position="fixed"
      elevation={0}
      sx={{
        background: 'rgba(7,7,15,0.72)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: `0.5px solid ${GOLD_BORDER}`,
        boxShadow: '0 1px 24px rgba(0,0,0,0.45)',
        zIndex: (t) => t.zIndex.drawer + 1,
        overflow: 'visible',
      }}
    >
      <Toolbar
        sx={{
          px: { xs: 1.5, sm: 2.5 },
          minHeight: { xs: '54px', sm: '60px' },
          gap: 0,
        }}
      >

        {/* ── Brand mark ── */}
        <Typography
          component={Link}
          to="/"
          sx={{
            color: GOLD,
            fontWeight: 700,
            fontSize: { xs: '1rem', sm: '1.1rem' },
            letterSpacing: '0.14em',
            fontFamily: 'DS-DIGII, monospace',
            textDecoration: 'none',
            flexShrink: 0,
            width: { xs: 34, sm: 38 },
            height: { xs: 34, sm: 38 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `0.5px solid ${GOLD_BORDER}`,
            borderRadius: '8px',
            mr: { xs: 1.5, sm: 2.5 },
            transition: 'all 0.18s ease',
            '&:hover': {
              color: '#fff',
              borderColor: 'rgba(255,255,255,0.4)',
              backgroundColor: GOLD_DIM,
            },
          }}
        >
          IS
        </Typography>

        {/* ── Thin vertical rule ── */}
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            borderColor: 'rgba(255,255,255,0.1)',
            mr: { xs: 1, sm: 2 },
            my: 1.5,
          }}
        />

        {/* ── Left nav ── */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.25, sm: 0.5 } }}>
          <Button color="inherit" component={Link} to="/" sx={navSx(pathname === '/')}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about" sx={navSx(pathname === '/about')}>
            About
          </Button>

          {/* More dropdown */}
          <Button
            color="inherit"
            endIcon={
              <KeyboardArrowDownIcon
                sx={{
                  fontSize: '1rem !important',
                  transition: 'transform 0.18s ease',
                  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            }
            onClick={handleOpen}
            aria-controls={open ? 'more-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            sx={navSx(MORE_PATHS.includes(pathname))}
          >
            More
          </Button>

          <Menu
            id="more-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ 'aria-labelledby': 'more-button', disablePadding: true }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            slotProps={{ paper: { elevation: 0 } }}
            sx={{
              mt: 0.75,
              '& .MuiPaper-root': {
                backgroundColor: 'rgba(10,10,18,0.92)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: `0.5px solid ${GOLD_BORDER}`,
                borderRadius: '12px',
                minWidth: 160,
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                overflow: 'hidden',
              },
            }}
          >
            {moreMenuItems.map(({ to, label }, i) => (
              <React.Fragment key={to}>
                <MenuItem
                  onClick={() => handleItemClick(to)}
                  selected={pathname === to}
                  sx={{
                    color: pathname === to ? GOLD : 'rgba(255,255,255,0.82)',
                    fontFamily: 'DS-DIGII, monospace',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    letterSpacing: '0.04em',
                    py: 1.1,
                    px: 2,
                    transition: 'all 0.15s ease',
                    '&:hover': { backgroundColor: GOLD_DIM, color: GOLD },
                    '&.Mui-selected': { backgroundColor: 'rgba(212,175,55,0.08)' },
                    '&.Mui-selected:hover': { backgroundColor: GOLD_DIM },
                  }}
                >
                  {label}
                </MenuItem>
                {i < moreMenuItems.length - 1 && (
                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mx: 1.5, my: 0 }} />
                )}
              </React.Fragment>
            ))}
          </Menu>
        </Box>

        {/* ── Spacer ── */}
        <Box sx={{ flexGrow: 1 }} />

        {/* ── Right nav ── */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.25, sm: 0.5 } }}>
          <Button
            color="inherit"
            component={Link}
            to="/cv"
            sx={navSx(pathname === '/cv')}
          >
            {isMobile ? 'CV' : 'View CV'}
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/contact"
            sx={navSx(pathname === '/contact')}
          >
            Contact
          </Button>

          {/* CTA — secondary: Code Challenges */}
          <Button
            color="inherit"
            component={Link}
            to="/coding"
            sx={{
              display: { xs: 'none', md: 'flex' },
              ml: { md: 0.5 },
              color: 'rgba(255,255,255,0.55)',
              fontFamily: 'DS-DIGII, monospace',
              fontWeight: 600,
              fontSize: '0.76rem',
              letterSpacing: '0.04em',
              px: 1.5,
              py: 0.6,
              borderRadius: '20px',
              border: '0.5px solid rgba(255,255,255,0.12)',
              backgroundColor: 'transparent',
              transition: 'all 0.18s ease',
              '&:hover, &:active': {
                color: 'rgba(255,255,255,0.88)',
                borderColor: 'rgba(255,255,255,0.28)',
                backgroundColor: 'rgba(255,255,255,0.06)',
              },
              ...(pathname === '/coding' && {
                color: 'rgba(255,255,255,0.88)',
                borderColor: 'rgba(255,255,255,0.28)',
              }),
            }}
          >
            {'{ }'}
          </Button>

          {/* CTA — primary: Sudoku / Test Your Might */}
          <Button
            color="inherit"
            component={Link}
            to="/game"
            sx={{
              display: { xs: 'none', md: 'flex' },
              ml: { md: 0.5 },
              color: GOLD,
              fontFamily: 'DS-DIGII, monospace',
              fontWeight: 700,
              fontSize: '0.82rem',
              letterSpacing: '0.04em',
              px: 2,
              py: 0.65,
              borderRadius: '20px',
              border: `0.5px solid ${GOLD_BORDER}`,
              backgroundColor: 'rgba(212,175,55,0.06)',
              transition: 'all 0.18s ease',
              '&:hover, &:active': {
                color: '#0a0a0a',
                backgroundColor: GOLD,
                borderColor: GOLD,
                boxShadow: `0 0 18px rgba(212,175,55,0.35)`,
              },
              ...(pathname === '/game' && {
                color: '#0a0a0a',
                backgroundColor: GOLD,
                borderColor: GOLD,
              }),
            }}
          >
            Test Your Might
          </Button>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
