import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import AppBar from './components/AppBar';
import Footer from './components/Footer';
import { UnlockedSectionsProvider } from './context/UnlockedSectionsContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import GoogleAnalytics from './components/GoogleAnalytics';
import SEO from './components/SEO';
import CursorGlow from './components/CursorGlow';
import ScrollProgress from './components/ScrollProgress';
import GrainOverlay from './components/GrainOverlay';
import SudokuHint from './components/SudokuHint';

// ── Lazy-loaded pages ────────────────────────────────────────────────────────
const Home               = React.lazy(() => import('./pages/Home'));
const About              = React.lazy(() => import('./pages/About'));
const Frameworks         = React.lazy(() => import('./pages/Frameworks'));
const CaseStudies        = React.lazy(() => import('./pages/CaseStudies'));
const Articles           = React.lazy(() => import('./pages/Articles'));
const ResearchTools      = React.lazy(() => import('./pages/ResearchTools'));
const PressureIntelligence = React.lazy(() => import('./pages/Consulting'));
const SudokuGame         = React.lazy(() => import('./components/SudokuGame'));
const CompleteCV         = React.lazy(() => import('./pages/CompleteCV'));
const ContactMe          = React.lazy(() => import('./pages/ContactMe'));
const TestGA             = React.lazy(() => import('./pages/TestGA'));
const ProfessionalSummary = React.lazy(() => import('./pages/ProfessionalSummary'));
const Education          = React.lazy(() => import('./pages/Education'));
const WorkExperience     = React.lazy(() => import('./pages/WorkExperience'));
const Skills             = React.lazy(() => import('./pages/Skills'));
const Projects           = React.lazy(() => import('./pages/Projects'));
const CodingProblem      = React.lazy(() => import('./components/CodingProblem'));
const PPIFramework       = React.lazy(() => import('./pages/PPIFramework'));
const PrintableResume    = React.lazy(() => import('./pages/PrintableResume'));

// ── Page loading fallback ────────────────────────────────────────────────────
const PageLoader: React.FC = () => (
  <Box sx={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    minHeight: '60vh',
  }}>
    <Box sx={{
      width: 36, height: 36, borderRadius: '50%',
      border: '2px solid rgba(212,175,55,0.15)',
      borderTopColor: '#D4AF37',
      animation: 'spin 0.75s linear infinite',
    }} />
  </Box>
);

// ────────────────────────────────────────────────────────────────────────────

const BODY_FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, sans-serif";

const theme = createTheme({
  typography: {
    fontFamily: BODY_FONT,
    h1: { fontSize: '3.5rem', color: '#ffffff', fontFamily: 'DS-DIGII', fontWeight: 700 },
    h2: { fontSize: '2.5rem', color: '#ffffff', fontFamily: 'DS-DIGII', fontWeight: 700 },
    h3: { fontSize: '2rem',   color: '#ffffff', fontFamily: 'DS-DIGII', fontWeight: 700 },
    h4: { fontSize: '1.75rem',color: '#ffffff', fontFamily: 'DS-DIGII', fontWeight: 700 },
    h5: { fontSize: '1.5rem', color: '#ffffff', fontFamily: 'DS-DIGII', fontWeight: 700 },
    h6: { fontSize: '1.25rem',color: '#ffffff', fontFamily: 'DS-DIGII', fontWeight: 700 },
    body1: { fontSize: '1rem',    color: '#ffffff', fontFamily: BODY_FONT, fontWeight: 400 },
    body2: { fontSize: '0.875rem',color: 'rgba(255,255,255,0.85)', fontFamily: BODY_FONT, fontWeight: 400 },
    button: { fontSize: '1rem', textTransform: 'none', fontFamily: 'DS-DIGII', fontWeight: 700 },
  },
  palette: {
    primary:    { main: '#000000', light: '#333333', dark: '#000000', contrastText: '#ffffff' },
    secondary:  { main: '#ff0000', light: '#ff3333', dark: '#cc0000', contrastText: '#ffffff' },
    background: { default: 'transparent', paper: 'rgba(255,255,255,0.98)' },
    text:       { primary: '#000000', secondary: '#333333' },
    warning:    { main: '#0000ff', light: '#3333ff', dark: '#0000cc', contrastText: '#ffffff' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@font-face': {
          fontFamily: 'DS-DIGII',
          src: `url('/fonts/DS-DIGII.TTF') format('truetype')`,
          fontWeight: 'normal',
          fontStyle: 'normal',
          fontDisplay: 'swap',
        },
        html: { height: '100%' },
        body: {
          height: '100%',
          fontFamily: BODY_FONT,
          fontSize: '1rem',
          fontWeight: 400,
          color: '#ffffff',
          backgroundColor: '#07070f',
        },
        '#root': { height: '100%', display: 'flex', flexDirection: 'column' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.1rem',
          fontWeight: 700,
          padding: '8px 24px',
          '&.MuiButton-contained': {
            backgroundColor: '#000000', color: '#ffffff',
            '&:hover': { backgroundColor: '#333333' },
          },
          '&.MuiButton-outlined': {
            borderColor: '#ff0000', borderWidth: '0.5px', color: '#ff0000',
            '&:hover': { backgroundColor: 'rgba(255,0,0,0.1)', borderColor: '#ff0000', borderWidth: '0.5px' },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255,255,255,0.98)',
          '&.MuiPaper-elevation': { boxShadow: '0px 1px 2px rgba(0,0,0,0.2)' },
          '&.MuiPaper-outlined':  { borderWidth: '0.5px' },
        },
      },
    },
    MuiDivider:      { styleOverrides: { root: { borderWidth: '0.5px' } } },
    MuiTableCell:    { styleOverrides: { root: { borderWidth: '0.5px' } } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline':            { borderWidth: '0.5px' },
          '&:hover .MuiOutlinedInput-notchedOutline':      { borderWidth: '0.5px' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline':{ borderWidth: '0.5px' },
        },
      },
    },
  },
});

const App: React.FC = () => (
  <HelmetProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <UnlockedSectionsProvider>
          <Router>
            <GoogleAnalytics />
            <SEO />
            <CursorGlow />
            <ScrollProgress />
            <GrainOverlay />
            <SudokuHint />
            <Box sx={{
              minHeight: '100vh', display: 'flex', flexDirection: 'column',
              pt: { xs: '56px', sm: '64px' },
              position: 'relative', width: '100%', overflow: 'hidden',
            }}>
              <AppBar />
              <Box sx={{ flex: 1, width: '100%', overflow: 'auto', pb: 4, position: 'relative', display: 'flex', flexDirection: 'column' }}>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/"              element={<Home />} />
                    <Route path="/about"         element={<About />} />
                    <Route path="/frameworks"    element={<Frameworks />} />
                    <Route path="/case-studies"  element={<CaseStudies />} />
                    <Route path="/articles"      element={<Articles />} />
                    <Route path="/research"      element={<ResearchTools />} />
                    <Route path="/consulting"    element={<PressureIntelligence />} />
                    <Route path="/pressure-intelligence" element={<PressureIntelligence />} />
                    <Route path="/game"          element={<SudokuGame />} />
                    <Route path="/cv"            element={<CompleteCV />} />
                    <Route path="/contact"       element={<ContactMe />} />
                    <Route path="/test-ga"       element={<TestGA />} />
                    <Route path="/coding"        element={<CodingProblem />} />
                    <Route path="/ppi-framework" element={<PPIFramework />} />
                    <Route path="/professional-summary" element={<ProtectedRoute section="professional-summary"><ProfessionalSummary /></ProtectedRoute>} />
                    <Route path="/education"     element={<ProtectedRoute section="education"><Education /></ProtectedRoute>} />
                    <Route path="/work-experience" element={<ProtectedRoute section="work-experience"><WorkExperience /></ProtectedRoute>} />
                    <Route path="/skills"        element={<ProtectedRoute section="skills"><Skills /></ProtectedRoute>} />
                    <Route path="/projects"      element={<ProtectedRoute section="projects"><Projects /></ProtectedRoute>} />
                    <Route path="/resume"        element={<PrintableResume />} />
                    <Route path="*"              element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </Box>
              <Footer />
            </Box>
          </Router>
        </UnlockedSectionsProvider>
      </AuthProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
