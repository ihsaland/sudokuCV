import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, CircularProgress, TextField } from '@mui/material';
import AIService from '../services/aiService';
import { trackEvent } from './GoogleAnalytics';

interface AICVAssistantProps {
  cvContent: string;
}

const AICVAssistant: React.FC<AICVAssistantProps> = ({ cvContent }) => {
  const [open, setOpen] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');
  const [questions, setQuestions] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'analysis' | 'questions'>('analysis');

  const handleAnalyze = async () => {
    setLoading(true);
    setError('');
    setAnalysis('');

    try {
      const aiService = AIService.getInstance();
      const response = await aiService.analyzeCV(cvContent);

      if (response.success && response.data) {
        setAnalysis(response.data);
        trackEvent('cv_analyzed', 'cv', 'analysis');
      } else {
        setError('Failed to analyze CV. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error analyzing CV:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQuestions = async () => {
    setLoading(true);
    setError('');
    setQuestions('');

    try {
      const aiService = AIService.getInstance();
      const response = await aiService.generateInterviewQuestions(cvContent);

      if (response.success && response.data) {
        setQuestions(response.data);
        trackEvent('questions_generated', 'cv', 'interview');
      } else {
        setError('Failed to generate questions. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error generating questions:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ mt: 2 }}
      >
        AI CV Assistant
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>AI CV Assistant</DialogTitle>
        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Button
              onClick={() => setActiveTab('analysis')}
              color={activeTab === 'analysis' ? 'primary' : 'inherit'}
            >
              CV Analysis
            </Button>
            <Button
              onClick={() => setActiveTab('questions')}
              color={activeTab === 'questions' ? 'primary' : 'inherit'}
            >
              Interview Questions
            </Button>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : activeTab === 'analysis' ? (
            <>
              {analysis ? (
                <Typography>{analysis}</Typography>
              ) : (
                <Box>
                  <Typography gutterBottom>
                    Get AI-powered analysis of your CV with specific suggestions for improvement.
                  </Typography>
                  <Button onClick={handleAnalyze} color="primary">
                    Analyze CV
                  </Button>
                </Box>
              )}
            </>
          ) : (
            <>
              {questions ? (
                <Typography>{questions}</Typography>
              ) : (
                <Box>
                  <Typography gutterBottom>
                    Generate personalized interview questions based on your CV content.
                  </Typography>
                  <Button onClick={handleGenerateQuestions} color="primary">
                    Generate Questions
                  </Button>
                </Box>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AICVAssistant; 