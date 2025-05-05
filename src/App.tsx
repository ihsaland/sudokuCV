import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import './App.css';
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
import ContactMe from './pages/ContactMe';
import { UnlockedSectionsProvider } from './context/UnlockedSectionsContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const theme = createTheme({
  typography: {
    fontFamily: 'DS-DIGII',
    h1: {
      fontSize: '3.5rem',
      color: '#ffffff',
      fontFamily: 'DS-DIGII',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      color: '#ffffff',
      fontFamily: 'DS-DIGII',
      fontWeight: 700,
    },
    h3: {
      fontSize: '2rem',
      color: '#ffffff',
      fontFamily: 'DS-DIGII',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.75rem',
      color: '#ffffff',
      fontFamily: 'DS-DIGII',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1.5rem',
      color: '#ffffff',
      fontFamily: 'DS-DIGII',
      fontWeight: 700,
    },
    h6: {
      fontSize: '1.25rem',
      color: '#ffffff',
      fontFamily: 'DS-DIGII',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
      color: '#000000',
      fontFamily: 'DS-DIGII',
      fontWeight: 700,
    },
    button: {
      fontSize: '1rem',
      textTransform: 'none',
      fontFamily: 'DS-DIGII',
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
          fontFamily: 'DS-DIGII',
          src: `url('/fonts/DS-DIGII.TTF') format('truetype')`,
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
          fontFamily: 'DS-DIGII !important',
          fontSize: '1rem',
          fontWeight: 700,
          color: '#000000',
        },
        '#root': {
          height: '100%',
        },
        '& *': {
          fontFamily: 'DS-DIGII !important',
          fontWeight: 700,
        },
        '& .MuiTypography-root': {
          fontFamily: 'DS-DIGII !important',
          fontWeight: 700,
        },
        '& .MuiButton-root': {
          fontFamily: 'DS-DIGII !important',
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
            borderWidth: '0.5px',
            color: '#ff0000',
            '&:hover': {
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              borderColor: '#ff0000',
              borderWidth: '0.5px',
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
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
          },
          '&.MuiPaper-outlined': {
            borderWidth: '0.5px',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderWidth: '0.5px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderWidth: '0.5px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: '0.5px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderWidth: '0.5px',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: '0.5px',
          },
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <UnlockedSectionsProvider>
          <Router>
            <Box sx={{ 
              minHeight: '100vh', 
              display: 'flex', 
              flexDirection: 'column',
              pt: { xs: '56px', sm: '64px' },
              overflow: 'auto'
            }}>
              <AppBar />
              <Box sx={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/game" element={<SudokuGame />} />
                  <Route path="/cv" element={<CompleteCV />} />
                  <Route path="/contact" element={<ContactMe />} />
                  <Route path="/professional-summary" element={<ProtectedRoute section="professional-summary"><ProfessionalSummary /></ProtectedRoute>} />
                  <Route path="/education" element={<ProtectedRoute section="education"><Education /></ProtectedRoute>} />
                  <Route path="/work-experience" element={<ProtectedRoute section="work-experience"><WorkExperience /></ProtectedRoute>} />
                  <Route path="/skills" element={<ProtectedRoute section="skills"><Skills /></ProtectedRoute>} />
                  <Route path="/projects" element={<ProtectedRoute section="projects"><Projects /></ProtectedRoute>} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Box>
              <Footer />
            </Box>
          </Router>
        </UnlockedSectionsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

