import React, { useState } from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Button,
  Box,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const moreMenuItems: { to: string; label: string }[] = [
  { to: '/frameworks', label: 'Frameworks' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/articles', label: 'Articles' },
  { to: '/research', label: 'Research' },
  { to: '/consulting', label: 'Consulting' },
];

const AppBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const handleItemClick = (to: string) => {
    navigate(to);
    handleClose();
  };

  return (
    <MuiAppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '0.5px solid #ffffff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              color: '#ffffff',
              fontWeight: 700,
              fontSize: { xs: '0.8rem', sm: '0.875rem', md: '1rem' },
              minWidth: 0,
              px: { xs: 1, sm: 1.5 },
              '&:hover': { color: '#ffff00' },
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/about"
            sx={{
              color: '#ffffff',
              fontWeight: 700,
              fontSize: { xs: '0.8rem', sm: '0.875rem', md: '1rem' },
              minWidth: 0,
              px: { xs: 1, sm: 1.5 },
              '&:hover': { color: '#ffff00' },
            }}
          >
            About
          </Button>
          <Button
            color="inherit"
            endIcon={<KeyboardArrowDownIcon />}
            onClick={handleOpen}
            aria-controls={open ? 'more-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            sx={{
              color: '#ffffff',
              fontWeight: 700,
              fontSize: { xs: '0.8rem', sm: '0.875rem', md: '1rem' },
              minWidth: 0,
              px: { xs: 1, sm: 1.5 },
              '&:hover': { color: '#ffff00' },
            }}
          >
            More
          </Button>
          <Menu
            id="more-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ 'aria-labelledby': 'more-button' }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            sx={{
              '& .MuiPaper-root': {
                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                border: '0.5px solid rgba(255,255,255,0.3)',
              },
            }}
          >
            {moreMenuItems.map(({ to, label }) => (
              <MenuItem
                key={to}
                onClick={() => handleItemClick(to)}
                sx={{
                  color: '#ffffff',
                  fontWeight: 600,
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffff00' },
                }}
              >
                {label}
              </MenuItem>
            ))}
          </Menu>
          <Button
            color="inherit"
            component={Link}
            to="/cv"
            sx={{
              color: '#ffffff',
              fontWeight: 700,
              fontSize: { xs: '0.8rem', sm: '0.875rem', md: '1rem' },
              minWidth: 0,
              px: { xs: 1, sm: 1.5 },
              '&:hover': { color: '#ffff00' },
            }}
          >
            {isMobile ? 'CV' : 'View CV'}
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/contact"
            sx={{
              color: '#ffffff',
              fontWeight: 700,
              fontSize: { xs: '0.8rem', sm: '0.875rem', md: '1rem' },
              minWidth: 0,
              px: { xs: 1, sm: 1.5 },
              '&:hover': { color: '#ffff00' },
            }}
          >
            Contact
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/coding"
            sx={{
              color: '#ff0000',
              fontWeight: 700,
              fontSize: { xs: '0.8rem', sm: '0.875rem', md: '1rem' },
              minWidth: 0,
              px: { xs: 1, sm: 1.5 },
              '&:hover': { color: '#ffff00' },
              display: { xs: 'none', sm: 'block' },
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
