import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Box, Paper, Typography, Button, IconButton, Tooltip } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate } from 'react-router-dom';
import { useUnlockedSections } from '../context/UnlockedSectionsContext';
import { cache } from '../utils/cache';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '../utils/googleAnalytics';
import { Difficulty } from '../types/sudoku';

// ── Types ────────────────────────────────────────────────────────────────────

interface Cell {
  value: number | null;
  isFixed: boolean;
  notes: number[];
}

type Board = Cell[][];

interface GameState {
  board: Board;
  solution: Board;
  selectedCell: { row: number; col: number } | null;
  isComplete: boolean;
  difficulty: Difficulty;
  puzzleNumber: number;
  elapsedSeconds: number;
  mistakes: number;
  hintsRemaining: number;
}

// ── Constants ────────────────────────────────────────────────────────────────

const DIFFICULTY_ORDER: Difficulty[] = ['easy', 'medium', 'hard', 'advanced', 'expert'];
const MAX_MISTAKES = 3;
const MAX_HINTS = 3;

const CLUE_COUNTS: Record<Difficulty, number> = {
  easy: 36, medium: 32, hard: 28, advanced: 26, expert: 24,
};

const UNLOCKS: Record<Difficulty, string> = {
  easy:     'professional-summary',
  medium:   'education',
  hard:     'work-experience',
  advanced: 'skills',
  expert:   'projects',
};

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy:     'Stable',
  medium:   'Elevated',
  hard:     'Critical',
  advanced: 'Cascade',
  expert:   'Meltdown',
};

const CV_SECTION_NAMES: Record<string, string> = {
  'professional-summary': 'Professional Summary',
  'education':            'Education',
  'work-experience':      'Work Experience',
  'skills':               'Skills',
  'projects':             'Projects',
};

const SECTION_REVEALS: Record<string, { headline: string; sub: string }> = {
  'professional-summary': {
    headline: 'Systems Pressure Architect',
    sub:      '15+ years defining and scaling distributed systems at enterprise scale',
  },
  'education': {
    headline: 'Education Unlocked',
    sub:      'The academic foundations behind pressure-aware systems thinking',
  },
  'work-experience': {
    headline: 'Work Experience Unlocked',
    sub:      'Salesforce · IBM · Accenture — distributed systems under real pressure',
  },
  'skills': {
    headline: 'Skills Unlocked',
    sub:      'The full technical stack behind cost-to-serve and pressure analysis',
  },
  'projects': {
    headline: 'Projects Unlocked',
    sub:      'PPI-F™ · KPI99 · ICEA — built and deployed in production',
  },
};

const CACHE_KEY = 'sudoku_game_state_v2';
const TUTORIAL_KEY = 'sudoku_tutorial_seen';

// ── Pure helpers ─────────────────────────────────────────────────────────────

const createEmptyBoard = (): Board =>
  Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => ({ value: null, isFixed: false, notes: [] }))
  );

const deepCopy = (board: Board): Board =>
  board.map(row => row.map(cell => ({ ...cell, notes: [...cell.notes] })));

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const isValidPlacement = (board: Board, row: number, col: number, num: number): boolean => {
  for (let i = 0; i < 9; i++) {
    if (i !== col && board[row][i].value === num) return false;
    if (i !== row && board[i][col].value === num) return false;
  }
  const br = Math.floor(row / 3) * 3;
  const bc = Math.floor(col / 3) * 3;
  for (let r = br; r < br + 3; r++)
    for (let c = bc; c < bc + 3; c++)
      if ((r !== row || c !== col) && board[r][c].value === num) return false;
  return true;
};

const fillBoard = (board: Board): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col].value === null) {
        for (const num of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
          if (isValidPlacement(board, row, col, num)) {
            board[row][col].value = num;
            if (fillBoard(board)) return true;
            board[row][col].value = null;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const countSolutions = (board: Board, limit = 2): number => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col].value === null) {
        let count = 0;
        for (let num = 1; num <= 9; num++) {
          if (isValidPlacement(board, row, col, num)) {
            board[row][col].value = num;
            count += countSolutions(board, limit - count);
            board[row][col].value = null;
            if (count >= limit) return count;
          }
        }
        return count;
      }
    }
  }
  return 1;
};

const buildPuzzle = (difficulty: Difficulty): { board: Board; solution: Board } => {
  const solution = createEmptyBoard();
  fillBoard(solution);

  const board = deepCopy(solution);
  board.forEach(row => row.forEach(cell => { cell.isFixed = true; }));

  const target = CLUE_COUNTS[difficulty];
  let remaining = 81;

  for (const pos of shuffle(Array.from({ length: 81 }, (_, i) => i))) {
    if (remaining <= target) break;
    const r = Math.floor(pos / 9);
    const c = pos % 9;
    const saved = board[r][c].value!;
    board[r][c].value = null;
    board[r][c].isFixed = false;
    const unique = difficulty === 'advanced' || difficulty === 'expert'
      ? countSolutions(deepCopy(board)) >= 1
      : countSolutions(deepCopy(board)) === 1;
    if (!unique) {
      board[r][c].value = saved;
      board[r][c].isFixed = true;
    } else {
      remaining--;
    }
  }

  const sol = deepCopy(solution);
  sol.forEach(row => row.forEach(cell => { cell.isFixed = true; }));
  return { board, solution: sol };
};

const isPuzzleSolved = (board: Board, solution: Board): boolean =>
  board.every((row, r) =>
    row.every((cell, c) => cell.value !== null && cell.value === solution[r][c].value)
  );

const formatTime = (seconds: number): string =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

// ── Component ────────────────────────────────────────────────────────────────

const initialState = (): GameState => {
  const cached = cache.get<GameState>(CACHE_KEY);
  if (cached && !cached.isComplete && cached.board.some(row => row.some(c => c.isFixed))) {
    return {
      ...cached,
      elapsedSeconds:  cached.elapsedSeconds  ?? 0,
      mistakes:        cached.mistakes        ?? 0,
      hintsRemaining:  cached.hintsRemaining  ?? MAX_HINTS,
    };
  }
  const { board, solution } = buildPuzzle('easy');
  return { board, solution, selectedCell: null, isComplete: false, difficulty: 'easy', puzzleNumber: 1, elapsedSeconds: 0, mistakes: 0, hintsRemaining: MAX_HINTS };
};

const SudokuGame: React.FC = () => {
  const { unlockSection, unlockedSections } = useUnlockedSections();
  const navigate = useNavigate();

  const [gameState, setGameState]       = useState<GameState>(initialState);
  const [history, setHistory]           = useState<Board[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCompletion, setShowCompletion]   = useState(false);
  const [showFailure, setShowFailure]         = useState(false);
  const [showSolution, setShowSolution]       = useState(false);
  const [boardFlash, setBoardFlash]           = useState(false);
  const [notesMode, setNotesMode]             = useState(false);
  const [showCheckResult, setShowCheckResult] = useState(false);
  const [shakingCell, setShakingCell]         = useState<{ row: number; col: number } | null>(null);
  const [showHowToPlay, setShowHowToPlay]     = useState(() => !sessionStorage.getItem(TUTORIAL_KEY));
  const [showDebug, setShowDebug]             = useState(false);
  const isDevelopment = process.env.NODE_ENV === 'development';

  // ── Refs ───────────────────────────────────────────────────────────────────
  const timerEnabledRef   = useRef(!gameState.isComplete);
  const failureDismissedRef = useRef(false);
  const checkTimerRef     = useRef<number | null>(null);
  const prevMistakesRef   = useRef(gameState.mistakes);
  const preGenRef         = useRef<{ difficulty: Difficulty; data: { board: Board; solution: Board } } | null>(null);
  const preGenInProgress  = useRef(false);
  const completionRef     = useRef({ gameState, isTransitioning, unlockSection, startPuzzle: (_d: Difficulty, _n: number) => {} });

  // ── Persistence ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isTransitioning) cache.set(CACHE_KEY, gameState);
  }, [gameState, isTransitioning]);

  // ── Timer ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    timerEnabledRef.current = !gameState.isComplete && !isTransitioning;
  }, [gameState.isComplete, isTransitioning]);

  useEffect(() => {
    const onBlur  = () => { timerEnabledRef.current = false; };
    const onFocus = () => {
      const { gameState: gs, isTransitioning: t } = completionRef.current;
      if (!gs.isComplete && !t) timerEnabledRef.current = true;
    };
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);
    return () => { window.removeEventListener('blur', onBlur); window.removeEventListener('focus', onFocus); };
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (timerEnabledRef.current)
        setGameState(prev => ({ ...prev, elapsedSeconds: prev.elapsedSeconds + 1 }));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // ── Failure detection ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!failureDismissedRef.current && gameState.mistakes >= MAX_MISTAKES && !gameState.isComplete) {
      timerEnabledRef.current = false;
      setShowSolution(true);
      const t = window.setTimeout(() => {
        setShowSolution(false);
        setShowFailure(true);
      }, 1800);
      return () => clearTimeout(t);
    }
  }, [gameState.mistakes, gameState.isComplete]);

  // ── Shake on wrong placement ───────────────────────────────────────────────
  useEffect(() => {
    if (gameState.mistakes > prevMistakesRef.current) {
      prevMistakesRef.current = gameState.mistakes;
      if (gameState.selectedCell) {
        setShakingCell(gameState.selectedCell);
        const t = setTimeout(() => setShakingCell(null), 450);
        return () => clearTimeout(t);
      }
    } else {
      prevMistakesRef.current = gameState.mistakes;
    }
  }, [gameState.mistakes, gameState.selectedCell]);

  // ── Background pre-generation ──────────────────────────────────────────────
  const preGenerateNext = useCallback((difficulty: Difficulty) => {
    if (preGenInProgress.current) return;
    preGenInProgress.current = true;
    preGenRef.current = null;
    const run = () => {
      preGenRef.current = { difficulty, data: buildPuzzle(difficulty) };
      preGenInProgress.current = false;
    };
    if ('requestIdleCallback' in window) {
      // @ts-ignore
      window.requestIdleCallback(run, { timeout: 5000 });
    } else {
      setTimeout(run, 100);
    }
  }, []);

  // ── Game actions ───────────────────────────────────────────────────────────

  const startPuzzle = useCallback((difficulty: Difficulty, puzzleNumber: number) => {
    const available = preGenRef.current?.difficulty === difficulty ? preGenRef.current.data : buildPuzzle(difficulty);
    preGenRef.current = null;
    setHistory([]);
    setShowFailure(false);
    setShowSolution(false);
    setShowCheckResult(false);
    failureDismissedRef.current = false;
    timerEnabledRef.current = true;
    setGameState({ ...available, selectedCell: null, isComplete: false, difficulty, puzzleNumber, elapsedSeconds: 0, mistakes: 0, hintsRemaining: MAX_HINTS });
    // Pre-generate next difficulty
    const nextIdx = Math.min(DIFFICULTY_ORDER.indexOf(difficulty) + 1, DIFFICULTY_ORDER.length - 1);
    preGenerateNext(DIFFICULTY_ORDER[nextIdx]);
  }, [preGenerateNext]);

  // Keep completionRef up-to-date
  completionRef.current = { gameState, isTransitioning, unlockSection, startPuzzle };

  const isAvailable = (d: Difficulty): boolean => {
    const idx = DIFFICULTY_ORDER.indexOf(d);
    return idx === 0 || unlockedSections.includes(UNLOCKS[DIFFICULTY_ORDER[idx - 1]]);
  };

  const handleCellClick = useCallback((row: number, col: number) => {
    setGameState(prev => ({ ...prev, selectedCell: { row, col } }));
  }, []);

  const handleNumberInput = useCallback((num: number) => {
    setGameState(prev => {
      if (!prev.selectedCell) return prev;
      if (prev.mistakes >= MAX_MISTAKES) return prev;
      const { row, col } = prev.selectedCell;
      if (prev.board[row][col].isFixed) return prev;
      setHistory(h => [...h, deepCopy(prev.board)]);

      if (notesMode) {
        const board = prev.board.map((r, ri) =>
          ri !== row ? r : r.map((c, ci) => {
            if (ci !== col) return c;
            const notes = c.notes.includes(num)
              ? c.notes.filter(n => n !== num)
              : [...c.notes, num].sort((a, b) => a - b);
            return { ...c, value: null, notes };
          })
        );
        return { ...prev, board };
      }

      const isCorrect = num === prev.solution[row][col].value;
      const board = prev.board.map((r, ri) =>
        r.map((c, ci) => {
          if (ri === row && ci === col) return { ...c, value: num, notes: [] };
          const peer = ri === row || ci === col ||
            (Math.floor(ri / 3) === Math.floor(row / 3) && Math.floor(ci / 3) === Math.floor(col / 3));
          return peer ? { ...c, notes: c.notes.filter(n => n !== num) } : c;
        })
      );
      return { ...prev, board, mistakes: isCorrect ? prev.mistakes : prev.mistakes + 1 };
    });
  }, [notesMode]);

  const handleDelete = useCallback(() => {
    setGameState(prev => {
      if (!prev.selectedCell) return prev;
      const { row, col } = prev.selectedCell;
      if (prev.board[row][col].isFixed) return prev;
      setHistory(h => [...h, deepCopy(prev.board)]);
      const board = prev.board.map((r, ri) =>
        ri === row ? r.map((c, ci) => ci === col ? { ...c, value: null, notes: [] } : c) : r
      );
      return { ...prev, board };
    });
  }, []);

  const handleUndo = useCallback(() => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setGameState(gs => ({ ...gs, board: prev }));
  }, [history]);

  const handleCheck = useCallback(() => {
    if (checkTimerRef.current) clearTimeout(checkTimerRef.current);
    setShowCheckResult(true);
    checkTimerRef.current = window.setTimeout(() => setShowCheckResult(false), 3000);
  }, []);

  const handleHint = useCallback(() => {
    setGameState(prev => {
      if (prev.hintsRemaining <= 0) return prev;
      const empty: { row: number; col: number }[] = [];
      prev.board.forEach((row, ri) => row.forEach((cell, ci) => {
        if (!cell.isFixed && cell.value === null) empty.push({ row: ri, col: ci });
      }));
      if (empty.length === 0) return prev;
      const { row, col } = empty[Math.floor(Math.random() * empty.length)];
      const val = prev.solution[row][col].value!;
      setHistory(h => [...h, deepCopy(prev.board)]);
      const board = prev.board.map((r, ri) =>
        r.map((c, ci) => {
          if (ri === row && ci === col) return { ...c, value: val, notes: [] };
          const peer = ri === row || ci === col ||
            (Math.floor(ri / 3) === Math.floor(row / 3) && Math.floor(ci / 3) === Math.floor(col / 3));
          return peer ? { ...c, notes: c.notes.filter(n => n !== val) } : c;
        })
      );
      return { ...prev, board, hintsRemaining: prev.hintsRemaining - 1, selectedCell: { row, col } };
    });
  }, []);

  const handleAutoFill = useCallback(() => {
    setGameState(prev => {
      setHistory(h => [...h, deepCopy(prev.board)]);
      const board = prev.board.map((row, ri) =>
        row.map((cell, ci) => {
          if (cell.isFixed || cell.value !== null) return cell;
          const notes: number[] = [];
          for (let n = 1; n <= 9; n++)
            if (isValidPlacement(prev.board, ri, ci, n)) notes.push(n);
          return { ...cell, notes };
        })
      );
      return { ...prev, board };
    });
  }, []);

  const dismissTutorial = () => {
    sessionStorage.setItem(TUTORIAL_KEY, '1');
    setShowHowToPlay(false);
  };

  // ── Keyboard support ───────────────────────────────────────────────────────
  const actionsRef = useRef({ handleNumberInput, handleDelete, handleUndo, setGameState });
  actionsRef.current = { handleNumberInput, handleDelete, handleUndo, setGameState };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const { handleNumberInput: onNum, handleDelete: onDel, handleUndo: onUndo, setGameState: sg } = actionsRef.current;
      if (e.key >= '1' && e.key <= '9') { onNum(parseInt(e.key, 10)); return; }
      if (e.key === 'Backspace' || e.key === 'Delete') { onDel(); return; }
      if (e.key === 'z' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); onUndo(); return; }
      if (e.key.startsWith('Arrow')) {
        e.preventDefault();
        sg(prev => {
          if (!prev.selectedCell) return prev;
          const { row, col } = prev.selectedCell;
          let nr = row, nc = col;
          if (e.key === 'ArrowUp')    nr = Math.max(0, row - 1);
          if (e.key === 'ArrowDown')  nr = Math.min(8, row + 1);
          if (e.key === 'ArrowLeft')  nc = Math.max(0, col - 1);
          if (e.key === 'ArrowRight') nc = Math.min(8, col + 1);
          if (nr === row && nc === col) return prev;
          return { ...prev, selectedCell: { row: nr, col: nc } };
        });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ── Completion detection ───────────────────────────────────────────────────
  useEffect(() => {
    const { gameState: gs, isTransitioning: busy, unlockSection: ul, startPuzzle: sp } = completionRef.current;
    if (busy || gs.isComplete || gs.mistakes >= MAX_MISTAKES) return;
    if (!isPuzzleSolved(gs.board, gs.solution)) return;

    trackEvent('puzzle_complete', 'game', gs.difficulty, gs.puzzleNumber);
    ul(UNLOCKS[gs.difficulty]);

    const idx      = DIFFICULTY_ORDER.indexOf(gs.difficulty);
    const isLast   = idx === DIFFICULTY_ORDER.length - 1;
    const nextDiff = isLast ? 'expert' : DIFFICULTY_ORDER[idx + 1];
    const nextNum  = gs.puzzleNumber + 1;

    setGameState(prev => ({ ...prev, isComplete: true }));
    setBoardFlash(true);

    const t1 = window.setTimeout(() => {
      setBoardFlash(false);
      setIsTransitioning(true);
      setShowCompletion(true);
      const t2 = window.setTimeout(() => {
        setShowCompletion(false);
        setIsTransitioning(false);
        sp(nextDiff, nextNum);
      }, 2400);
      return () => clearTimeout(t2);
    }, 500);

    return () => clearTimeout(t1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.board]);

  // Trigger initial pre-gen on mount
  useEffect(() => {
    preGenerateNext('medium');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Derived state ──────────────────────────────────────────────────────────
  const digitCounts = useMemo(() => {
    const counts = new Array(10).fill(0);
    gameState.board.forEach(row => row.forEach(cell => { if (cell.value) counts[cell.value]++; }));
    return counts;
  }, [gameState.board]);

  // ── Cell background ────────────────────────────────────────────────────────
  const getCellBg = (row: number, col: number): string => {
    const cell = gameState.board[row][col];
    const sc   = gameState.selectedCell;

    if (boardFlash) return cell.isFixed ? '#c8e6c9' : '#e8f5e9';

    if (showSolution) {
      if (cell.isFixed) return '#f0f0f0';
      const correct = gameState.solution[row][col].value;
      if (cell.value === correct) return '#e8f5e9';
      if (cell.value !== null)    return '#ffebee';
      return '#fff8e1';
    }

    if (showCheckResult && !cell.isFixed && cell.value !== null)
      return cell.value === gameState.solution[row][col].value ? '#e8f5e9' : '#ffebee';

    if (cell.isFixed) return '#f0f0f0';

    if (cell.value !== null) {
      const val   = cell.value;
      const board = gameState.board;
      let conflict = false;
      for (let i = 0; i < 9 && !conflict; i++) {
        if (i !== col && board[row][i].value === val) conflict = true;
        if (i !== row && board[i][col].value === val) conflict = true;
      }
      const br = Math.floor(row / 3) * 3, bc = Math.floor(col / 3) * 3;
      for (let r = br; r < br + 3 && !conflict; r++)
        for (let c = bc; c < bc + 3 && !conflict; c++)
          if ((r !== row || c !== col) && board[r][c].value === val) conflict = true;
      if (conflict) return '#ffebee';
    }

    if (!sc) return '#ffffff';
    const { row: sr, col: scol } = sc;
    const selVal = gameState.board[sr][scol].value;

    if (row === sr && col === scol) return '#dbeafe';
    if (selVal !== null && cell.value === selVal) return '#fef9e7';
    if (row === sr || col === scol) return '#eff6ff';
    if (Math.floor(row / 3) === Math.floor(sr / 3) && Math.floor(col / 3) === Math.floor(scol / 3)) return '#f5f9fd';
    return '#ffffff';
  };

  // ── Labels ─────────────────────────────────────────────────────────────────
  const levelLabel = () => {
    const d = gameState.difficulty;
    if (d === 'expert' && gameState.puzzleNumber > 5) return 'Meltdown — Free Play';
    return `${DIFFICULTY_LABELS[d]} — ${CV_SECTION_NAMES[UNLOCKS[d]]}`;
  };

  // ── Debug ──────────────────────────────────────────────────────────────────
  const debugUnlock = (difficulty: Difficulty) => {
    if (!isDevelopment) return;
    const idx = DIFFICULTY_ORDER.indexOf(difficulty);
    unlockSection(UNLOCKS[difficulty]);
    trackEvent('puzzle_complete', 'game', difficulty, idx + 1);
    startPuzzle(idx < DIFFICULTY_ORDER.length - 1 ? DIFFICULTY_ORDER[idx + 1] : 'expert', idx + 2);
  };

  const isLastDifficulty = DIFFICULTY_ORDER.indexOf(gameState.difficulty) === DIFFICULTY_ORDER.length - 1;
  const sectionReveal    = SECTION_REVEALS[UNLOCKS[gameState.difficulty]];

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', px: { xs: 1.5, sm: 4 }, py: { xs: 3, sm: 6 }, position: 'relative' }}>

      {/* ── Debug panel ── */}
      {isDevelopment && (
        <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1200, display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', gap: 1 }}>
          <Button variant="contained" color="secondary" size="small" onClick={() => setShowDebug(p => !p)}>
            {showDebug ? 'Hide' : 'Debug'}
          </Button>
          {showDebug && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, backgroundColor: 'rgba(0,0,0,0.92)', p: 2, borderRadius: 1 }}>
              <Typography variant="body2" sx={{ color: 'white', mb: 0.5 }}>Unlock &amp; progress</Typography>
              {DIFFICULTY_ORDER.map(d => (
                <Button key={d} variant="contained" size="small" onClick={() => debugUnlock(d)}
                  sx={{ backgroundColor: gameState.difficulty === d ? 'primary.main' : 'grey.700' }}>
                  {d}
                </Button>
              ))}
            </Box>
          )}
        </Box>
      )}

      {/* ── How to Play overlay ── */}
      <AnimatePresence>
        {showHowToPlay && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }} style={{ position: 'fixed', inset: 0, zIndex: 1300 }}>
            <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(6px)' }}>
              <Paper elevation={24} sx={{ p: { xs: 3, sm: 4 }, maxWidth: '92%', width: { xs: '92%', sm: '420px' }, borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.99)' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>How to Play</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5 }}>
                  Solve all 5 levels to unlock the complete CV.
                </Typography>
                <Box component="ul" sx={{ pl: 2.5, m: 0, '& li': { mb: 1.25, fontSize: { xs: '0.85rem', sm: '0.9rem' }, lineHeight: 1.55 } }}>
                  <li>Fill every row, column and 3×3 box with <strong>1–9</strong>, no repeats</li>
                  <li>Select a cell, then tap a number or press <strong>1–9</strong> on your keyboard</li>
                  <li><strong>Arrow keys</strong> navigate the board</li>
                  <li><strong>Notes</strong> (✏) lets you annotate candidate numbers per cell</li>
                  <li><strong>Auto-fill</strong> populates all valid candidates across the board</li>
                  <li><strong>Hints</strong> reveal one correct cell — you get {MAX_HINTS} per puzzle</li>
                  <li><strong>{MAX_MISTAKES} pressure points</strong> end the puzzle — think before you place</li>
                </Box>
                <Button variant="contained" fullWidth onClick={dismissTutorial}
                  sx={{ mt: 2.5, fontWeight: 600, fontSize: '0.95rem' }}>
                  Start Playing
                </Button>
              </Paper>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Failure overlay ── */}
      <AnimatePresence>
        {showFailure && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }} style={{ position: 'fixed', inset: 0, zIndex: 1100 }}>
            <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.88)' }}>
              <Paper elevation={24} sx={{ p: { xs: 3, sm: 5 }, textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.98)', borderRadius: '16px', maxWidth: '90%', width: { xs: '90%', sm: '380px' } }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.4rem', sm: '1.8rem' }, color: '#c62828' }}>
                  System Overload
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 0.5, fontSize: { xs: '0.88rem', sm: '0.95rem' } }}>
                  {MAX_MISTAKES} pressure points — cascade failure
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 3, fontSize: { xs: '0.78rem', sm: '0.85rem' } }}>
                  Time: {formatTime(gameState.elapsedSeconds)}
                </Typography>
                <Button variant="contained" color="error" onClick={() => startPuzzle(gameState.difficulty, gameState.puzzleNumber)} sx={{ px: 3.5, fontWeight: 600 }}>
                  Restart Level
                </Button>
              </Paper>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Completion overlay ── */}
      <AnimatePresence>
        {showCompletion && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }} style={{ position: 'fixed', inset: 0, zIndex: 1100 }}>
            <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.88)' }}>
              <Paper elevation={24} sx={{ p: { xs: 3, sm: 5 }, textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.98)', borderRadius: '16px', maxWidth: '90%', width: { xs: '90%', sm: '400px' } }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.75, fontSize: { xs: '1.35rem', sm: '1.7rem' } }}>
                  Pressure Released
                </Typography>
                <Typography sx={{ fontWeight: 700, color: '#1565c0', fontSize: { xs: '1rem', sm: '1.15rem' }, mb: 0.5 }}>
                  {sectionReveal?.headline}
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: { xs: '0.82rem', sm: '0.9rem' }, mb: 2 }}>
                  {sectionReveal?.sub}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2.5, mb: 2.5 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#1565c0' }}>{formatTime(gameState.elapsedSeconds)}</Typography>
                    <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Time</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: gameState.mistakes > 0 ? '#e65100' : '#2e7d32' }}>{gameState.mistakes}/{MAX_MISTAKES}</Typography>
                    <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Pressure</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#D4AF37' }}>{MAX_HINTS - gameState.hintsRemaining}/{MAX_HINTS}</Typography>
                    <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Hints</Typography>
                  </Box>
                </Box>
                <Button size="small" variant="outlined" onClick={() => navigate(`/${UNLOCKS[gameState.difficulty]}`)}
                  sx={{ fontSize: '0.78rem', borderColor: '#1565c0', color: '#1565c0', mr: 1, textTransform: 'none' }}>
                  Read it now →
                </Button>
                <Box sx={{ width: 28, height: 28, borderRadius: '50%', mx: 'auto', mt: 1.5, border: '2.5px solid #D4AF37', borderTopColor: 'transparent', animation: 'spin 0.75s linear infinite' }} />
              </Paper>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Game card ── */}
      <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ width: '100%', maxWidth: 520 }}>
        <Paper elevation={3} sx={{ p: { xs: 1.5, sm: 3 }, backgroundColor: 'rgba(255,255,255,0.97)', borderRadius: '12px', mx: 'auto' }}>

          {/* Header row */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, flexWrap: 'wrap', gap: 0.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Typography sx={{ color: 'text.secondary', fontSize: { xs: '0.72rem', sm: '0.82rem' }, fontWeight: 500 }}>
                {levelLabel()}
              </Typography>
              <Tooltip title="How to play" placement="top">
                <IconButton onClick={() => setShowHowToPlay(true)} size="small" sx={{ p: 0.25, color: 'text.disabled' }}>
                  <HelpOutlineIcon sx={{ fontSize: '0.95rem' }} />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
              {/* Timer */}
              <Typography sx={{ fontSize: { xs: '0.72rem', sm: '0.8rem' }, color: 'text.secondary', fontVariantNumeric: 'tabular-nums' }}>
                ⏱ {formatTime(gameState.elapsedSeconds)}
              </Typography>
              {/* Pressure gauge */}
              <Tooltip title={`Pressure: ${gameState.mistakes}/${MAX_MISTAKES} mistakes`} placement="top">
                <Box sx={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary', mr: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>P</Typography>
                  {[0, 1, 2].map(i => (
                    <Box key={i} sx={{
                      width: { xs: 9, sm: 11 }, height: { xs: 13, sm: 15 }, borderRadius: '3px',
                      border: '1px solid rgba(0,0,0,0.12)',
                      backgroundColor: gameState.mistakes > i
                        ? i === 2 ? '#c62828' : i === 1 ? '#e65100' : '#f9a825'
                        : 'rgba(0,0,0,0.06)',
                      transition: 'background-color 0.25s ease',
                    }} />
                  ))}
                </Box>
              </Tooltip>
              {/* Hint tokens */}
              <Tooltip title={`Hints remaining: ${gameState.hintsRemaining}/${MAX_HINTS}`} placement="top">
                <Box sx={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary', mr: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>H</Typography>
                  {[0, 1, 2].map(i => (
                    <Box key={i} sx={{
                      width: 7, height: 7, borderRadius: '50%',
                      backgroundColor: i < gameState.hintsRemaining ? '#D4AF37' : 'rgba(0,0,0,0.1)',
                      transition: 'background-color 0.2s ease',
                    }} />
                  ))}
                </Box>
              </Tooltip>
            </Box>
          </Box>

          {/* Progress strip */}
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 1.25, alignItems: 'center' }}>
            {DIFFICULTY_ORDER.map(d => {
              const unlocked = unlockedSections.includes(UNLOCKS[d]);
              const current  = d === gameState.difficulty;
              return (
                <Tooltip key={d} title={`${DIFFICULTY_LABELS[d]} — ${CV_SECTION_NAMES[UNLOCKS[d]]}`} placement="top">
                  <Box sx={{
                    width:  current ? 11 : 8,
                    height: current ? 11 : 8,
                    borderRadius: '50%',
                    border: !unlocked && current ? '2px solid #D4AF37' : 'none',
                    backgroundColor: unlocked ? '#D4AF37' : current ? 'transparent' : 'rgba(0,0,0,0.1)',
                    boxShadow: unlocked ? '0 0 5px rgba(212,175,55,0.55)' : 'none',
                    transition: 'all 0.35s ease',
                  }} />
                </Tooltip>
              );
            })}
          </Box>

          {/* Difficulty selector */}
          <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
            {DIFFICULTY_ORDER.map(d => {
              const avail  = isAvailable(d);
              const active = d === gameState.difficulty;
              const section = CV_SECTION_NAMES[UNLOCKS[d]];
              return (
                <Tooltip key={d} title={avail ? `Unlock: ${section}` : `Complete ${DIFFICULTY_LABELS[DIFFICULTY_ORDER[DIFFICULTY_ORDER.indexOf(d) - 1]]} to unlock`} placement="top">
                  <span>
                    <Button size="small" disabled={!avail}
                      onClick={() => startPuzzle(d, DIFFICULTY_ORDER.indexOf(d) + 1)}
                      sx={{
                        minWidth: 0, px: { xs: 0.9, sm: 1.4 }, py: 0.2,
                        fontSize: { xs: '0.62rem', sm: '0.7rem' },
                        textTransform: 'capitalize', lineHeight: 1.6, borderRadius: '20px', border: '1px solid',
                        backgroundColor: active ? '#1565c0' : 'transparent',
                        color: active ? '#fff' : avail ? '#1565c0' : '#bbb',
                        borderColor: active ? '#1565c0' : avail ? 'rgba(21,101,192,0.35)' : '#e0e0e0',
                        '&:hover': avail && !active ? { backgroundColor: '#e3f2fd', borderColor: '#1565c0' } : {},
                        '&.Mui-disabled': { color: '#bbb !important', borderColor: '#e0e0e0 !important' },
                      }}>
                      {!avail && '🔒 '}{DIFFICULTY_LABELS[d]}
                    </Button>
                  </span>
                </Tooltip>
              );
            })}
          </Box>

          {/* Grid */}
          <Box sx={{
            display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)',
            gap: '1px', backgroundColor: '#000',
            border: '2px solid #000', borderRadius: '4px',
            overflow: 'hidden', aspectRatio: '1', width: '100%',
            animation: boardFlash ? 'board-flash 0.5s ease' : 'none',
            '& > div:nth-child(3n):not(:nth-child(9n))': { borderRight: '2px solid #000' },
            '& > div:nth-child(n+19):nth-child(-n+27)':  { borderBottom: '2px solid #000' },
            '& > div:nth-child(n+46):nth-child(-n+54)':  { borderBottom: '2px solid #000' },
          }}>
            {gameState.board.map((row, ri) =>
              row.map((cell, ci) => {
                const isShaking = shakingCell?.row === ri && shakingCell?.col === ci;
                const showSol   = showSolution && !cell.isFixed;
                const solVal    = gameState.solution[ri][ci].value;
                return (
                  <Box key={`${ri}-${ci}`} onClick={() => handleCellClick(ri, ci)}
                    sx={{
                      aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backgroundColor: getCellBg(ri, ci),
                      cursor: cell.isFixed ? 'default' : 'pointer',
                      userSelect: 'none', transition: 'background-color 0.08s ease',
                      position: 'relative', overflow: 'hidden',
                      animation: isShaking ? 'cell-shake 0.42s ease' : 'none',
                      '&:hover': !cell.isFixed ? { backgroundColor: '#bfdbfe' } : {},
                    }}>
                    {showSol ? (
                      <Typography sx={{
                        fontWeight: 500,
                        fontSize: { xs: '0.72rem', sm: '1.1rem' }, lineHeight: 1,
                        color: cell.value === solVal ? '#2e7d32'
                          : cell.value !== null ? '#c62828'
                          : 'rgba(0,0,0,0.32)',
                      }}>
                        {solVal}
                      </Typography>
                    ) : cell.value !== null ? (
                      <Typography sx={{
                        fontWeight: cell.isFixed ? 700 : 500,
                        color: cell.isFixed ? '#111' : '#1565c0',
                        fontSize: { xs: '0.72rem', sm: '1.1rem' }, lineHeight: 1,
                      }}>
                        {cell.value}
                      </Typography>
                    ) : cell.notes.length > 0 ? (
                      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', width: '100%', height: '100%', alignItems: 'center', justifyItems: 'center', p: '1px' }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                          <Box key={n} component="span" sx={{ fontSize: { xs: '0.4rem', sm: '0.46rem' }, lineHeight: 1, fontWeight: 600, color: cell.notes.includes(n) ? '#5c85c0' : 'transparent', userSelect: 'none' }}>
                            {n}
                          </Box>
                        ))}
                      </Box>
                    ) : null}
                  </Box>
                );
              })
            )}
          </Box>

          {/* Controls */}
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1.25 }}>

            {/* Tool row */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.6, alignItems: 'center', flexWrap: 'wrap' }}>
              <Tooltip title="Undo (Ctrl+Z)" placement="top">
                <span>
                  <IconButton onClick={handleUndo} disabled={history.length === 0} aria-label="Undo" size="small"
                    sx={{ border: '1px solid rgba(0,0,0,0.15)', borderRadius: '8px', p: 0.75 }}>
                    <UndoIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Erase (Backspace)" placement="top">
                <span>
                  <IconButton onClick={handleDelete} disabled={!gameState.selectedCell} aria-label="Erase" size="small"
                    sx={{ border: '1px solid rgba(0,0,0,0.15)', borderRadius: '8px', p: 0.75 }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title={notesMode ? 'Notes ON — numbers annotate candidates' : 'Notes OFF — numbers fill cells'} placement="top">
                <Button onClick={() => setNotesMode(p => !p)} size="small" variant={notesMode ? 'contained' : 'outlined'}
                  startIcon={<EditIcon sx={{ fontSize: '0.9rem !important' }} />}
                  sx={{ fontSize: { xs: '0.68rem', sm: '0.73rem' }, px: 1.1, py: 0.45, textTransform: 'none', minWidth: 0, backgroundColor: notesMode ? '#1565c0' : 'transparent', borderColor: '#1565c0', color: notesMode ? '#fff' : '#1565c0', '&:hover': { backgroundColor: notesMode ? '#1976d2' : '#e3f2fd' } }}>
                  Notes
                </Button>
              </Tooltip>
              <Tooltip title="Fill all valid candidates as notes" placement="top">
                <Button onClick={handleAutoFill} size="small" variant="outlined"
                  sx={{ fontSize: { xs: '0.68rem', sm: '0.73rem' }, px: 1.1, py: 0.45, textTransform: 'none', minWidth: 0, borderColor: '#5c6bc0', color: '#5c6bc0', '&:hover': { backgroundColor: '#e8eaf6', borderColor: '#5c6bc0' } }}>
                  Auto-fill
                </Button>
              </Tooltip>
              <Tooltip title="Highlight wrong cells for 3 s" placement="top">
                <Button onClick={handleCheck} size="small" variant="outlined"
                  startIcon={<CheckIcon sx={{ fontSize: '0.9rem !important' }} />}
                  sx={{ fontSize: { xs: '0.68rem', sm: '0.73rem' }, px: 1.1, py: 0.45, textTransform: 'none', minWidth: 0, borderColor: '#388e3c', color: '#388e3c', '&:hover': { backgroundColor: '#e8f5e9', borderColor: '#388e3c' } }}>
                  Check
                </Button>
              </Tooltip>
              <Tooltip title={gameState.hintsRemaining > 0 ? `Reveal one cell (${gameState.hintsRemaining} left)` : 'No hints remaining'} placement="top">
                <span>
                  <Button onClick={handleHint} size="small" variant="outlined" disabled={gameState.hintsRemaining <= 0}
                    sx={{ fontSize: { xs: '0.68rem', sm: '0.73rem' }, px: 1.1, py: 0.45, textTransform: 'none', minWidth: 0, borderColor: '#D4AF37', color: '#b8962e', '&:hover': { backgroundColor: '#fffde7', borderColor: '#D4AF37' }, '&.Mui-disabled': { borderColor: '#e0e0e0 !important', color: '#bbb !important' } }}>
                    Hint ({gameState.hintsRemaining})
                  </Button>
                </span>
              </Tooltip>
            </Box>

            {/* Number pad */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 0.3, sm: 0.75 } }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => {
                const done = digitCounts[num] >= 9;
                return (
                  <Button key={num} aria-label={`Number ${num}`} onClick={() => handleNumberInput(num)}
                    sx={{
                      minWidth: { xs: 30, sm: 46 }, height: { xs: 30, sm: 46 }, p: 0,
                      fontSize: { xs: '0.85rem', sm: '1.1rem' }, fontWeight: 700, borderRadius: '8px',
                      backgroundColor: done ? '#e0e0e0' : notesMode ? '#5c85c0' : '#1565c0',
                      color: done ? '#9e9e9e' : '#fff',
                      opacity: done ? 0.55 : 1,
                      '&:hover': { backgroundColor: done ? '#e0e0e0' : notesMode ? '#6b95d0' : '#1976d2' },
                    }}>
                    {num}
                  </Button>
                );
              })}
            </Box>

            {/* Bottom actions */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Button variant="outlined" size="small"
                onClick={() => startPuzzle(gameState.difficulty, gameState.puzzleNumber)}
                sx={{ fontSize: { xs: '0.75rem', sm: '0.82rem' }, textTransform: 'none', borderColor: 'rgba(0,0,0,0.18)', color: 'text.secondary', '&:hover': { borderColor: 'rgba(0,0,0,0.35)' } }}>
                New Puzzle
              </Button>
              {gameState.isComplete && !isTransitioning && (
                <Button variant="contained"
                  onClick={() => isLastDifficulty ? navigate('/cv') : startPuzzle(DIFFICULTY_ORDER[DIFFICULTY_ORDER.indexOf(gameState.difficulty) + 1], gameState.puzzleNumber + 1)}
                  sx={{ fontSize: { xs: '0.82rem', sm: '0.92rem' }, px: 2.5 }}>
                  {isLastDifficulty ? 'View Complete CV' : 'Next Level'}
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default SudokuGame;
