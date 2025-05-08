import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import AICVAssistant from './AICVAssistant';

const ProfessionalSummary: React.FC = () => {
  const [summary, setSummary] = React.useState('');

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Professional Summary
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
        sx={{ mb: 2 }}
      />
      <AICVAssistant cvContent={summary} />
    </Box>
  );
};

export default ProfessionalSummary; 