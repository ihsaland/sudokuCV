import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, Dialog, DialogTitle, DialogContent, Button, IconButton, Link } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useUnlockedSections } from '../context/UnlockedSectionsContext';
import { cache } from '../utils/cache';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from './GoogleAnalytics';

interface Cell {
  value: number | null;
  isFixed: boolean;
  notes: number[];
}

type Board = Cell[][];

type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

interface GameState {
  board: Cell[][];
  solution: Cell[][];
  selectedCell: { row: number; col: number } | null;
  isComplete: boolean;
  difficulty: Difficulty;
}

const difficultyOrder: Difficulty[] = ['easy', 'medium', 'hard', 'expert'];

const isValidPlacement = (board: Board, row: number, col: number, num: number): boolean => {
  // Check row
  for (let i = 0; i < 9; i++) {
    if (board[row][i].value === num) return false;
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (board[i][col].value === num) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if (board[i][j].value === num) return false;
    }
  }

  return true;
};

const solveSudoku = (board: Board): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col].value === null) {
        for (let num = 1; num <= 9; num++) {
          if (isValidPlacement(board, row, col, num)) {
            board[row][col].value = num;
            if (solveSudoku(board)) {
              return true;
            }
            board[row][col].value = null;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const generateValidPuzzle = (difficulty: Difficulty): Board => {
  const newBoard = createEmptyBoard();
  
  // First, generate a solved board
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      // Shuffle numbers
      for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
      }
      
      for (const num of numbers) {
        if (isValidPlacement(newBoard, row, col, num)) {
          newBoard[row][col].value = num;
          if (solveSudoku(newBoard)) {
            break;
          }
          newBoard[row][col].value = null;
        }
      }
    }
  }

  // Now remove numbers based on difficulty
  const cellsToRemove = {
    easy: 30,
    medium: 40,
    hard: 50,
    expert: 60
  };

  let removedCells = 0;
  const positions = Array.from({ length: 81 }, (_, i) => i);
  // Shuffle positions
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  for (const pos of positions) {
    if (removedCells >= cellsToRemove[difficulty]) break;
    
    const row = Math.floor(pos / 9);
    const col = pos % 9;
    const temp = newBoard[row][col].value;
    newBoard[row][col].value = null;

    // Check if the puzzle still has a unique solution
    const boardCopy = JSON.parse(JSON.stringify(newBoard));
    if (solveSudoku(boardCopy)) {
      newBoard[row][col].isFixed = false;
      removedCells++;
    } else {
      newBoard[row][col].value = temp;
      newBoard[row][col].isFixed = true;
    }
  }

  return newBoard;
};

const CACHE_KEY = 'sudoku_game_state';

const createEmptyBoard = (): Board => {
  return Array(9).fill(null).map(() => 
    Array(9).fill(null).map(() => ({
      value: null,
      isFixed: false,
      notes: []
    }))
  );
};

const SudokuGame: React.FC = () => {
  const { unlockSection } = useUnlockedSections();
  const [gameState, setGameState] = useState<GameState>(() => {
    const emptyBoard = createEmptyBoard();
    return {
      board: emptyBoard,
      solution: createEmptyBoard(),
      selectedCell: null,
      isComplete: false,
      difficulty: 'easy'
    };
  });

  const [history, setHistory] = useState<Board[]>([]);
  const navigate = useNavigate();
  const [currentPuzzle, setCurrentPuzzle] = useState<number>(1);

  useEffect(() => {
    cache.set(CACHE_KEY, gameState);
  }, [gameState]);

  const generatePuzzle = (difficulty: Difficulty): Board => {
    return generateValidPuzzle(difficulty);
  };

  // Start with an easy puzzle when component mounts
  useEffect(() => {
    startNewGame('easy');
  }, []);

  const handleCellClick = (row: number, col: number) => {
    if (!gameState.board[row][col].isFixed) {
      setGameState(prev => ({
        ...prev,
        selectedCell: { row, col }
      }));
    }
  };

  const handleNumberInput = (num: number) => {
    if (gameState.selectedCell) {
      const { row, col } = gameState.selectedCell;
      const newBoard = [...gameState.board];
      
      setHistory(prev => [...prev, JSON.parse(JSON.stringify(gameState.board))]);
      
      newBoard[row][col] = {
        ...newBoard[row][col],
        value: num
      };

      setGameState(prev => ({
        ...prev,
        board: newBoard
      }));
    }
  };

  const handleDelete = () => {
    if (gameState.selectedCell) {
      const { row, col } = gameState.selectedCell;
      const newBoard = [...gameState.board];
      
      setHistory(prev => [...prev, JSON.parse(JSON.stringify(gameState.board))]);
      
      newBoard[row][col] = {
        ...newBoard[row][col],
        value: null
      };

      setGameState(prev => ({
        ...prev,
        board: newBoard
      }));
    }
  };

  const handleUndo = () => {
    if (history.length === 0) return;

    const previousBoard = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    
    setGameState(prev => ({
      ...prev,
      board: previousBoard
    }));
  };

  const checkCompletion = () => {
    // First check if all cells are filled
    const isComplete = gameState.board.every(row => 
      row.every(cell => cell.value !== null)
    );

    if (isComplete) {
      console.log('All cells filled, checking solution...');
      // Verify the solution is correct
      const isCorrect = gameState.board.every((row, rowIndex) => 
        row.every((cell, colIndex) => {
          if (cell.value === null) return false;
          
          // Temporarily remove the value to check if it's valid
          const temp = cell.value;
          cell.value = null;
          const isValid = isValidPlacement(gameState.board, rowIndex, colIndex, temp);
          cell.value = temp;
          
          return isValid;
        })
      );

      console.log('Solution check result:', isCorrect);
      console.log('Current difficulty:', gameState.difficulty);
      console.log('Current completion state:', gameState.isComplete);

      if (isCorrect && !gameState.isComplete) {
        console.log('Puzzle completed correctly, unlocking sections...');
        // Track puzzle completion
        trackEvent('puzzle_complete', 'game', gameState.difficulty, currentPuzzle);

        // Set completion state
        setGameState(prev => ({
          ...prev,
          isComplete: true
        }));

        // Unlock sections based on current difficulty
        if (gameState.difficulty === 'easy') {
          console.log('Unlocking easy sections...');
          unlockSection('professional-summary');
          unlockSection('education');
          trackEvent('section_unlock', 'cv', 'professional-summary,education', 1);
        } else if (gameState.difficulty === 'medium') {
          console.log('Unlocking medium sections...');
          unlockSection('work-experience');
          trackEvent('section_unlock', 'cv', 'work-experience', 2);
        } else if (gameState.difficulty === 'hard') {
          console.log('Unlocking hard sections...');
          unlockSection('skills');
          trackEvent('section_unlock', 'cv', 'skills', 3);
        } else if (gameState.difficulty === 'expert') {
          console.log('Unlocking expert sections...');
          unlockSection('projects');
          trackEvent('section_unlock', 'cv', 'projects', 4);
        }

        // Progress to next difficulty level
        const currentIndex = difficultyOrder.indexOf(gameState.difficulty);
        if (currentIndex < difficultyOrder.length - 1) {
          const nextDifficulty = difficultyOrder[currentIndex + 1];
          console.log('Progressing to next difficulty:', nextDifficulty);
          // Update current puzzle number
          setCurrentPuzzle(currentIndex + 2);
          // Track difficulty change
          trackEvent('difficulty_change', 'game', nextDifficulty, currentIndex + 2);
          // Set new difficulty after a short delay
          setTimeout(() => {
            setDifficulty(nextDifficulty);
          }, 2000);
        }
      }
    }
  };

  const handleNextPuzzle = () => {
    const currentIndex = difficultyOrder.indexOf(gameState.difficulty);
    if (currentIndex < difficultyOrder.length - 1) {
      const nextDifficulty = difficultyOrder[currentIndex + 1];
      setCurrentPuzzle(currentIndex + 2);
      setDifficulty(nextDifficulty);
    } else {
      navigate('/cv');
    }
  };

  const setDifficulty = (difficulty: Difficulty): void => {
    const board = generatePuzzle(difficulty);
    const solution = JSON.parse(JSON.stringify(board));
    solveSudoku(solution);
    
    setGameState(prev => ({
      ...prev,
      board,
      solution,
      difficulty,
      selectedCell: null,
      isComplete: false
    }));

    // Clear history when starting a new puzzle
    setHistory([]);
  };

  useEffect(() => {
    checkCompletion();
  }, [gameState.board]);

  // Add keyboard event handler
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '9') {
        handleNumberInput(parseInt(e.key));
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        handleDelete();
      } else if (e.key === 'z' && e.ctrlKey) {
        handleUndo();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.selectedCell]);

  const getCellHighlight = (row: number, col: number) => {
    if (!gameState.selectedCell) return 'white';
    
    const selectedRow = gameState.selectedCell.row;
    const selectedCol = gameState.selectedCell.col;
    
    if (row === selectedRow && col === selectedCol) {
      return '#e3f2fd';
    }
    
    return 'white';
  };

  const getCellColor = (row: number, col: number) => {
    const cell = gameState.board[row][col];
    if (cell.isFixed) return '#f0f0f0';
    
    if (cell.value !== null) {
      const temp = cell.value;
      cell.value = null;
      const isValid = isValidPlacement(gameState.board, row, col, temp);
      cell.value = temp;
      
      if (!isValid) {
        return '#ffebee';
      }
    }
    
    return getCellHighlight(row, col);
  };

  const startNewGame = (difficulty: Difficulty) => {
    const board = generatePuzzle(difficulty);
    const solution = JSON.parse(JSON.stringify(board));
    solveSudoku(solution);
    
    setGameState({
      board,
      solution,
      difficulty,
      selectedCell: null,
      isComplete: false
    });
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      gap: 2,
      position: 'relative',
      minHeight: '100vh',
      padding: { xs: 2, sm: 4 },
      background: 'none',
      transition: 'background 0.5s ease-in-out',
      width: '100%',
      maxWidth: '100vw',
      overflow: 'auto'
    }}>
      {gameState.isComplete && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            zIndex: 1000,
            animation: 'fadeIn 0.5s ease-in-out'
          }}
        >
          <Paper
            elevation={24}
            sx={{
              p: { xs: 2, sm: 4 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: 2,
              maxWidth: '90%',
              width: { xs: '90%', sm: '400px' }
            }}
          >
            <Typography 
              variant="h3" 
              sx={{ 
                color: 'text.primary',
                textAlign: 'center',
                mb: 2,
                fontWeight: 600,
                animation: 'pulse 1s infinite',
                fontSize: { xs: '1.5rem', sm: '2rem' }
              }}
            >
              Puzzle Complete
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'text.secondary',
                textAlign: 'center',
                mb: 4,
                fontSize: { xs: '1rem', sm: '1.25rem' }
              }}
            >
              Unlocking new sections...
            </Typography>
            <Box
              sx={{
                width: { xs: 40, sm: 60 },
                height: { xs: 40, sm: 60 },
                borderRadius: '50%',
                border: '3px solid',
                borderColor: 'primary.main',
                borderTopColor: 'transparent',
                animation: 'spin 1s linear infinite'
              }}
            />
          </Paper>
        </Box>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '100%' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            position: 'relative',
            width: '100%',
            maxWidth: '100%',
            pb: 4
          }}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ width: '100%', maxWidth: '100%' }}
          >
            <Paper
              elevation={3}
              sx={{
                p: { xs: 1, sm: 3 },
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(5px)',
                border: '0.5px solid #ffffff',
                borderRadius: '8px',
                maxWidth: { xs: '100%', sm: '600px' },
                margin: '0 auto',
                width: '100%'
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ color: '#ffffff', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                  Difficulty: {gameState.difficulty.charAt(0).toUpperCase() + gameState.difficulty.slice(1)}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: { xs: 1, sm: 3 },
                  maxWidth: '600px',
                  margin: '0 auto',
                  backgroundColor: 'transparent',
                  width: '100%'
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: { xs: 0.5, sm: 2 }, maxWidth: '600px', margin: '0 auto', width: '100%' }}>
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(9, 1fr)',
                          gap: '1px',
                          backgroundColor: '#000',
                          border: '2px solid #000',
                          '& > div:nth-child(3n)': {
                            borderRight: '2px solid #000',
                          },
                          '& > div:nth-child(9n)': {
                            borderRight: 'none',
                          },
                          '& > div:nth-child(n+19):nth-child(-n+27), & > div:nth-child(n+46):nth-child(-n+54)': {
                            borderBottom: '2px solid #000',
                          },
                          width: '100%',
                          aspectRatio: '1'
                        }}
                      >
                        {gameState.board.map((row, rowIndex) => (
                          row.map((cell, colIndex) => (
                            <Box
                              key={`${rowIndex}-${colIndex}`}
                              sx={{
                                aspectRatio: '1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: getCellColor(rowIndex, colIndex),
                                border: '1px solid #ccc',
                                cursor: cell.isFixed ? 'default' : 'pointer',
                                position: 'relative',
                                '&:hover': {
                                  backgroundColor: '#f5f5f5',
                                },
                              }}
                              onClick={() => handleCellClick(rowIndex, colIndex)}
                            >
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 'bold',
                                  color: cell.isFixed ? 'text.primary' : 'primary.main',
                                  opacity: cell.value ? 1 : 0,
                                  fontSize: { xs: '0.75rem', sm: '1.25rem' },
                                }}
                              >
                                {cell.value}
                              </Typography>
                            </Box>
                          ))
                        ))}
                      </Box>
                    </Paper>

                    {/* Add number pad and controls */}
                    <Box sx={{ 
                      mt: 2, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      gap: 1, 
                      maxWidth: '600px', 
                      margin: '0 auto',
                      width: '100%',
                    }}>
                      <Box sx={{ 
                        display: 'flex', 
                        gap: 1,
                        width: '100%',
                        justifyContent: 'center',
                      }}>
                        <IconButton 
                          onClick={handleUndo} 
                          disabled={history.length === 0}
                          title="Undo (Ctrl+Z)"
                          sx={{ 
                            p: { xs: 0.5, sm: 1 },
                            '& .MuiSvgIcon-root': {
                              fontSize: { xs: '1.25rem', sm: '1.5rem' }
                            }
                          }}
                        >
                          <UndoIcon />
                        </IconButton>
                        <IconButton 
                          onClick={handleDelete} 
                          disabled={!gameState.selectedCell}
                          title="Delete (Backspace/Delete)"
                          sx={{ 
                            p: { xs: 0.5, sm: 1 },
                            '& .MuiSvgIcon-root': {
                              fontSize: { xs: '1.25rem', sm: '1.5rem' }
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                      <Box sx={{ 
                        display: 'flex', 
                        gap: 1,
                        width: '100%',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                      }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                          <Button
                            key={num}
                            variant="contained"
                            onClick={() => handleNumberInput(num)}
                            sx={{ 
                              minWidth: { xs: '28px', sm: '40px' },
                              height: { xs: '28px', sm: '40px' },
                              fontSize: { xs: '0.75rem', sm: '0.875rem' },
                              p: 0,
                            }}
                          >
                            {num}
                          </Button>
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ 
                  mt: 4,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 1, sm: 2 },
                  width: '100%',
                  justifyContent: 'center',
                }}>
                  {gameState.isComplete && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleNextPuzzle}
                      sx={{ 
                        width: { xs: '100%', sm: 'auto' },
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                      }}
                    >
                      {currentPuzzle < 5 ? 'Next Puzzle' : 'View Complete CV'}
                    </Button>
                  )}
                </Box>
              </Box>
            </Paper>
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
};

// Add these keyframes at the top of the file, after the imports
const keyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

// Add the keyframes to the document
const style = document.createElement('style');
style.textContent = keyframes;
document.head.appendChild(style);

export default SudokuGame; 