export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface Cell {
  value: number | null;
  isFixed: boolean;
  notes: number[];
}

export type Board = Cell[][];

export interface GameState {
  board: Board;
  difficulty: Difficulty;
  selectedCell: [number, number] | null;
  mistakes: number;
  isComplete: boolean;
  unlockedSections: number[];
}

export interface CVSection {
  id: number;
  title: string;
  content: string;
  difficulty: Difficulty;
  isUnlocked: boolean;
} 