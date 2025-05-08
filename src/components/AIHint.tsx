import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, CircularProgress } from '@mui/material';
import AIService from '../services/aiService';
import { trackEvent } from './GoogleAnalytics';

interface AIHintProps {
  board: number[][];
  difficulty: string;
}

const AIHint: React.FC<AIHintProps> = ({ board, difficulty }) => {
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleGetHint = async () => {
    setLoading(true);
    setError('');
    setHint('');

    try {
      const aiService = AIService.getInstance();
      const response = await aiService.getSudokuHint(board, difficulty);

      if (response.success && response.data) {
        setHint(response.data);
        trackEvent('hint_used', 'game', difficulty);
      } else {
        setError('Failed to get hint. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error getting hint:', err);
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
        Get AI Hint
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>AI-Powered Sudoku Hint</DialogTitle>
        <DialogContent>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : hint ? (
            <Typography>{hint}</Typography>
          ) : (
            <Typography>
              Click the button below to get a hint for your current puzzle.
              The AI will analyze your board and provide a helpful suggestion
              without giving away the solution.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          {!loading && !hint && (
            <Button onClick={handleGetHint} color="primary">
              Get Hint
            </Button>
          )}
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AIHint; 