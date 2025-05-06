import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { trackEvent } from '../components/GoogleAnalytics';

const TestGA: React.FC = () => {
  useEffect(() => {
    // Log the measurement ID (for debugging)
    console.log('GA Measurement ID:', import.meta.env.VITE_GA_MEASUREMENT_ID);
  }, []);

  const handleTestEvent = () => {
    trackEvent('test_button_click', 'test', 'Test button clicked', 1);
  };

  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Google Analytics Test Page
      </Typography>
      <Typography variant="body1" gutterBottom>
        Check the browser console for debug logs
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleTestEvent}
        sx={{ mt: 2 }}
      >
        Test Event
      </Button>
    </Box>
  );
};

export default TestGA; 