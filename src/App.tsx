import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import AppBar from './components/AppBar';
import Footer from './components/Footer';
import SudokuGame from './components/SudokuGame';
import ProfessionalSummary from './pages/ProfessionalSummary';
import Education from './pages/Education';
import WorkExperience from './pages/WorkExperience';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Home from './pages/Home';
import CompleteCV from './pages/CompleteCV';
import { UnlockedSectionsProvider } from './context/UnlockedSectionsContext';
import ProtectedRoute from './components/ProtectedRoute';

const theme = createTheme({
  typography: {
    fontFamily: 'TA-ModernTimes-RoundedExtraLight',
    h1: {
      fontSize: '3.5rem',
      color: '#ffffff',
      fontFamily: 'TA-ModernTimes-RoundedExtraLight',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      color: '#ffffff',
      fontFamily: 'TA-ModernTimes-RoundedExtraLight',
      fontWeight: 700,
    },
    h3: {
      fontSize: '2rem',
      color: '#ffffff',
      fontFamily: 'TA-ModernTimes-RoundedExtraLight',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.75rem',
      color: '#ffffff',
      fontFamily: 'TA-ModernTimes-RoundedExtraLight',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1.5rem',
      color: '#ffffff',
      fontFamily: 'TA-ModernTimes-RoundedExtraLight',
      fontWeight: 700,
    },
    h6: {
      fontSize: '1.25rem',
      color: '#ffffff',
      fontFamily: 'TA-ModernTimes-RoundedExtraLight',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
      color: '#000000',
      fontFamily: 'TA-ModernTimes-RoundedExtraLight',
      fontWeight: 700,
    },
    button: {
      fontSize: '1rem',
      textTransform: 'none',
      fontFamily: 'TA-ModernTimes-RoundedExtraLight',
      fontWeight: 700,
    },
  },
  palette: {
    primary: {
      main: '#000000',
      light: '#333333',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff0000',
      light: '#ff3333',
      dark: '#cc0000',
      contrastText: '#ffffff',
    },
    background: {
      default: 'transparent',
      paper: 'rgba(255, 255, 255, 0.9)',
    },
    text: {
      primary: '#000000',
      secondary: '#333333',
    },
    warning: {
      main: '#0000ff',
      light: '#3333ff',
      dark: '#0000cc',
      contrastText: '#ffffff',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@font-face': {
          fontFamily: 'TA-ModernTimes-RoundedExtraLight',
          src: `url('/fonts/TA-ModernTimes-RoundedExtraLight.otf') format('opentype')`,
          fontWeight: 'normal',
          fontStyle: 'normal',
          fontDisplay: 'swap',
        },
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
          overflow: 'hidden',
          fontFamily: 'TA-ModernTimes-RoundedExtraLight !important',
          fontSize: '1rem',
          fontWeight: 700,
          color: '#000000',
        },
        '#root': {
          height: '100%',
        },
        '& *': {
          fontFamily: 'TA-ModernTimes-RoundedExtraLight !important',
          fontWeight: 700,
        },
        '& .MuiTypography-root': {
          fontFamily: 'TA-ModernTimes-RoundedExtraLight !important',
          fontWeight: 700,
        },
        '& .MuiButton-root': {
          fontFamily: 'TA-ModernTimes-RoundedExtraLight !important',
          fontWeight: 700,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.1rem',
          fontWeight: 700,
          padding: '8px 24px',
          '&.MuiButton-contained': {
            backgroundColor: '#000000',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#333333',
            },
          },
          '&.MuiButton-outlined': {
            borderColor: '#ff0000',
            color: '#ff0000',
            '&:hover': {
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              borderColor: '#ff0000',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          '&.MuiPaper-elevation': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#000000',
        },
        h1: {
          color: '#000000',
        },
        h2: {
          color: '#000000',
        },
        h3: {
          color: '#000000',
        },
        h4: {
          color: '#000000',
        },
        h5: {
          color: '#000000',
        },
        h6: {
          color: '#000000',
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UnlockedSectionsProvider>
        <Router>
          <Box
            sx={{
              height: '100vh',
              width: '100vw',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'url(/sudokuCV/background.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'transparent',
                zIndex: -1,
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
              }}
            >
              <AppBar />
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  overflow: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/game" element={<SudokuGame />} />
                  <Route path="/cv" element={<CompleteCV />} />
                  <Route
                    path="/professional-summary"
                    element={
                      <ProtectedRoute section="professional-summary">
                        <ProfessionalSummary />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/education"
                    element={
                      <ProtectedRoute section="education">
                        <Education />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/work-experience"
                    element={
                      <ProtectedRoute section="work-experience">
                        <WorkExperience />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/skills"
                    element={
                      <ProtectedRoute section="skills">
                        <Skills />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/projects"
                    element={
                      <ProtectedRoute section="projects">
                        <Projects />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Box>
              <Footer />
            </Box>
          </Box>
        </Router>
      </UnlockedSectionsProvider>
    </ThemeProvider>
  );
};

export default App;
