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

type Difficulty = 'easy' | 'medium' | 'hard' | 'advanced' | 'expert';

interface GameState {
  board: Cell[][];
  solution: Cell[][];
  selectedCell: { row: number; col: number } | null;
  isComplete: boolean;
  difficulty: Difficulty;
}

const difficultyOrder: Difficulty[] = ['easy', 'medium', 'hard', 'advanced', 'expert'];

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
    advanced: 55,
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
    // Try to load cached state first
    const cachedState = cache.get(CACHE_KEY);
    if (cachedState) {
      console.log('Loading cached game state:', cachedState);
      return cachedState;
    }
    
    // Initialize with empty board if no cache
    console.log('Initializing new game state');
    const emptyBoard = createEmptyBoard();
    return {
      board: emptyBoard,
      solution: emptyBoard,
      selectedCell: null,
      isComplete: false,
      difficulty: 'easy' as Difficulty
    };
  });

  const [history, setHistory] = useState<Board[]>([]);
  const navigate = useNavigate();
  const [currentPuzzle, setCurrentPuzzle] = useState<number>(() => {
    // Try to load cached puzzle number
    const cachedPuzzle = localStorage.getItem('current_puzzle');
    if (cachedPuzzle) {
      console.log('Loading cached puzzle number:', cachedPuzzle);
      return parseInt(cachedPuzzle, 10);
    }
    return 1;
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Cache current puzzle number
  useEffect(() => {
    console.log('Caching current puzzle number:', currentPuzzle);
    localStorage.setItem('current_puzzle', currentPuzzle.toString());
  }, [currentPuzzle]);

  // Cache game state changes
  useEffect(() => {
    if (!isTransitioning) {
      console.log('Caching game state:', gameState);
      cache.set(CACHE_KEY, gameState);
    }
  }, [gameState, isTransitioning]);

  // Start with the appropriate puzzle when component mounts
  useEffect(() => {
    console.log('Component mounted, starting with difficulty:', gameState.difficulty);
    const board = generatePuzzle(gameState.difficulty);
    const solution = JSON.parse(JSON.stringify(board));
    solveSudoku(solution);
    
    setGameState(prev => ({
      ...prev,
      board,
      solution,
      selectedCell: null,
      isComplete: false
    }));
  }, []);

  // Add keyboard event handler for desktop
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

  const generatePuzzle = (difficulty: Difficulty): Board => {
    return generateValidPuzzle(difficulty);
  };

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

  const progressToNextDifficulty = (currentDifficulty: Difficulty) => {
    const currentIndex = difficultyOrder.indexOf(currentDifficulty);
    if (currentIndex < difficultyOrder.length - 1) {
      const nextDifficulty = difficultyOrder[currentIndex + 1];
      console.log('Progressing to next difficulty:', nextDifficulty);
      
      // Generate new puzzle for next difficulty
      const newBoard = generatePuzzle(nextDifficulty);
      const newSolution = JSON.parse(JSON.stringify(newBoard));
      solveSudoku(newSolution);
      
      // Update current puzzle number
      const nextPuzzleNumber = currentIndex + 2;
      console.log('Setting next puzzle number:', nextPuzzleNumber);
      setCurrentPuzzle(nextPuzzleNumber);
      
      // Track difficulty change
      trackEvent('difficulty_change', 'game', nextDifficulty, nextPuzzleNumber);
      
      // Set transitioning state and show completion
      setIsTransitioning(true);
      setShowCompletion(true);
      
      // Update game state with new difficulty and puzzle
      setGameState(prev => ({
        ...prev,
        isComplete: true,
        difficulty: nextDifficulty,
        board: newBoard,
        solution: newSolution,
        selectedCell: null
      }));

      // Clear history for the new puzzle
      setHistory([]);
      
      // Cache the new game state
      const newGameState = {
        board: newBoard,
        solution: newSolution,
        selectedCell: null,
        isComplete: true,
        difficulty: nextDifficulty
      };
      cache.set(CACHE_KEY, newGameState);
      
      // Hide completion overlay and reset states after delay
      setTimeout(() => {
        setShowCompletion(false);
        setIsTransitioning(false);
        setGameState(prev => ({
          ...prev,
          isComplete: false
        }));
      }, 2000);
      
      return true;
    } else if (currentDifficulty === 'expert' && currentPuzzle === 5) {
      // Only enter free play mode after completing the expert level puzzle
      console.log('Entering free play mode after completing expert level');
      
      // Generate new expert puzzle
      const newBoard = generatePuzzle('expert');
      const newSolution = JSON.parse(JSON.stringify(newBoard));
      solveSudoku(newSolution);
      
      // Set transitioning state and show completion
      setIsTransitioning(true);
      setShowCompletion(true);
      
      // Update game state for free play
      setGameState(prev => ({
        ...prev,
        isComplete: true,
        difficulty: 'expert',
        board: newBoard,
        solution: newSolution,
        selectedCell: null
      }));

      // Clear history for the new puzzle
      setHistory([]);
      
      // Cache the new game state
      const newGameState = {
        board: newBoard,
        solution: newSolution,
        selectedCell: null,
        isComplete: true,
        difficulty: 'expert'
      };
      cache.set(CACHE_KEY, newGameState);
      
      // Hide completion overlay and reset states after delay
      setTimeout(() => {
        setShowCompletion(false);
        setIsTransitioning(false);
        setGameState(prev => ({
          ...prev,
          isComplete: false
        }));
      }, 2000);
      
      return true;
    }
    return false;
  };

  const checkCompletion = () => {
    if (isTransitioning) return;

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
      console.log('Current puzzle number:', currentPuzzle);

      if (isCorrect && !gameState.isComplete) {
        console.log('Puzzle completed correctly, unlocking sections...');
        
        // Track puzzle completion
        trackEvent('puzzle_complete', 'game', gameState.difficulty, currentPuzzle);

        // Unlock sections based on current difficulty
        switch (gameState.difficulty) {
          case 'easy':
            console.log('Unlocking professional summary...');
            unlockSection('professional-summary');
            trackEvent('section_unlock', 'cv', 'professional-summary', 1);
            break;
          case 'medium':
            console.log('Unlocking education...');
            unlockSection('education');
            trackEvent('section_unlock', 'cv', 'education', 2);
            break;
          case 'hard':
            console.log('Unlocking work experience...');
            unlockSection('work-experience');
            trackEvent('section_unlock', 'cv', 'work-experience', 3);
            break;
          case 'advanced':
            console.log('Unlocking skills...');
            unlockSection('skills');
            trackEvent('section_unlock', 'cv', 'skills', 4);
            break;
          case 'expert':
            console.log('Unlocking projects...');
            unlockSection('projects');
            trackEvent('section_unlock', 'cv', 'projects', 5);
            break;
        }

        // Handle progression based on current state
        if (gameState.difficulty === 'expert' && currentPuzzle === 5) {
          console.log('Completing expert level, entering free play mode');
          // Generate new expert puzzle for free play
          const newBoard = generatePuzzle('expert');
          const newSolution = JSON.parse(JSON.stringify(newBoard));
          solveSudoku(newSolution);
          
          // Set transitioning state and show completion
          setIsTransitioning(true);
          setShowCompletion(true);
          
          // Update game state for free play
          setGameState(prev => ({
            ...prev,
            isComplete: true,
            difficulty: 'expert',
            board: newBoard,
            solution: newSolution,
            selectedCell: null
          }));

          // Clear history for the new puzzle
          setHistory([]);
          
          // Cache the new game state
          const newGameState = {
            board: newBoard,
            solution: newSolution,
            selectedCell: null,
            isComplete: true,
            difficulty: 'expert'
          };
          cache.set(CACHE_KEY, newGameState);
          
          // Hide completion overlay and reset states after delay
          setTimeout(() => {
            setShowCompletion(false);
            setIsTransitioning(false);
            setGameState(prev => ({
              ...prev,
              isComplete: false
            }));
          }, 2000);
        } else {
          // Try to progress to next difficulty
          const hasProgressed = progressToNextDifficulty(gameState.difficulty);
          
          if (!hasProgressed) {
            // If we're at the last difficulty, just set completion state
            console.log('Reached final difficulty level');
            setGameState(prev => ({
              ...prev,
              isComplete: true
            }));
          }
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
    console.log('Setting new difficulty:', difficulty);
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
    console.log('Starting new game with difficulty:', difficulty);
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

  // Debug function to test progression
  const testProgression = (difficulty: Difficulty) => {
    console.log('Testing progression for difficulty:', difficulty);
    
    // Track puzzle completion
    trackEvent('puzzle_complete', 'game', difficulty, currentPuzzle);

    // Unlock sections based on difficulty
    switch (difficulty) {
      case 'easy':
        console.log('Unlocking professional summary...');
        unlockSection('professional-summary');
        trackEvent('section_unlock', 'cv', 'professional-summary', 1);
        break;
      case 'medium':
        console.log('Unlocking education...');
        unlockSection('education');
        trackEvent('section_unlock', 'cv', 'education', 2);
        break;
      case 'hard':
        console.log('Unlocking work experience...');
        unlockSection('work-experience');
        trackEvent('section_unlock', 'cv', 'work-experience', 3);
        break;
      case 'advanced':
        console.log('Unlocking skills...');
        unlockSection('skills');
        trackEvent('section_unlock', 'cv', 'skills', 4);
        break;
      case 'expert':
        console.log('Unlocking projects...');
        unlockSection('projects');
        trackEvent('section_unlock', 'cv', 'projects', 5);
        break;
    }

    // Handle progression based on difficulty
    if (difficulty === 'expert' && currentPuzzle === 5) {
      console.log('Completing expert level, entering free play mode');
      // Generate new expert puzzle for free play
      const newBoard = generatePuzzle('expert');
      const newSolution = JSON.parse(JSON.stringify(newBoard));
      solveSudoku(newSolution);
      
      // Set transitioning state and show completion
      setIsTransitioning(true);
      setShowCompletion(true);
      
      // Update game state for free play
      setGameState(prev => ({
        ...prev,
        isComplete: true,
        difficulty: 'expert',
        board: newBoard,
        solution: newSolution,
        selectedCell: null
      }));

      // Clear history for the new puzzle
      setHistory([]);
      
      // Cache the new game state
      const newGameState = {
        board: newBoard,
        solution: newSolution,
        selectedCell: null,
        isComplete: true,
        difficulty: 'expert'
      };
      cache.set(CACHE_KEY, newGameState);
      
      // Hide completion overlay and reset states after delay
      setTimeout(() => {
        setShowCompletion(false);
        setIsTransitioning(false);
        setGameState(prev => ({
          ...prev,
          isComplete: false
        }));
      }, 2000);
    } else {
      // Progress to next difficulty
      const hasProgressed = progressToNextDifficulty(difficulty);
      if (!hasProgressed) {
        console.log('Reached final difficulty level');
        setGameState(prev => ({
          ...prev,
          isComplete: true
        }));
      }
    }
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
      {/* Debug Controls - Only visible in development mode */}
      {isDevelopment && (
        <Box sx={{ 
          position: 'fixed', 
          bottom: 16, 
          right: 16, 
          zIndex: 1000,
          display: { xs: 'none', sm: 'flex' },
          flexDirection: 'column',
          gap: 1
        }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowDebug(!showDebug)}
            sx={{ minWidth: 'auto', p: 1 }}
          >
            {showDebug ? 'Hide Debug' : 'Show Debug'}
          </Button>
          
          {showDebug && (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              p: 2,
              borderRadius: 1
            }}>
              <Typography variant="body2" sx={{ color: 'white', mb: 1 }}>
                Test Progression
              </Typography>
              {difficultyOrder.map((diff) => (
                <Button
                  key={diff}
                  variant="contained"
                  size="small"
                  onClick={() => testProgression(diff)}
                  sx={{ 
                    backgroundColor: gameState.difficulty === diff ? 'primary.main' : 'grey.700',
                    '&:hover': {
                      backgroundColor: gameState.difficulty === diff ? 'primary.dark' : 'grey.600'
                    }
                  }}
                >
                  Test {diff}
                </Button>
              ))}
            </Box>
          )}
        </Box>
      )}

      <AnimatePresence>
        {showCompletion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
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
                zIndex: 1000
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
                  variant="h4" 
                  sx={{ 
                    color: 'text.primary',
                    textAlign: 'center',
                    mb: 2,
                    fontWeight: 500,
                    fontSize: { xs: '1.5rem', sm: '2rem' }
                  }}
                >
                  Puzzle Complete
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'text.secondary',
                    textAlign: 'center',
                    mb: 3,
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}
                >
                  {currentPuzzle > 5 ? 'CV Unlocked: Free Play' : 'Unlocking new sections...'}
                </Typography>
                <Box
                  sx={{
                    width: { xs: 32, sm: 40 },
                    height: { xs: 32, sm: 40 },
                    borderRadius: '50%',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    borderTopColor: 'transparent',
                    animation: 'spin 1s linear infinite'
                  }}
                />
              </Paper>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
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
                  {(() => {
                    switch (gameState.difficulty) {
                      case 'easy':
                        return 'Level 1 (Easy): Professional Summary';
                      case 'medium':
                        return 'Level 2 (Medium): Education';
                      case 'hard':
                        return 'Level 3 (Hard): Work Experience';
                      case 'advanced':
                        return 'Level 4 (Advanced): Skills';
                      case 'expert':
                        return currentPuzzle > 5 ? 'CV Unlocked: Free Play' : 'Level 5 (Expert): Projects';
                      default:
                        return `Level ${currentPuzzle} (${gameState.difficulty.charAt(0).toUpperCase() + gameState.difficulty.slice(1)})`;
                    }
                  })()}
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

                    {/* Number Pad - Optimized for mobile */}
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
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          Difficulty: {gameState.difficulty.charAt(0).toUpperCase() + gameState.difficulty.slice(1)}
        </Typography>
      </Box>
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