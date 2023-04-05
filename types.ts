// types.ts
export interface SudokuCol {
  row: number;
  col: number;
  value: number | null;
  selected: boolean;
  readonly: boolean;
  isValid: boolean;
}

export interface SudokuRow {
  index: number;
  cols: SudokuCol[];
}

export interface Sudoku {
  rows: SudokuRow[];
}

// types.ts
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Game: { game: Sudoku };
  PermissionsPage: undefined;
  Camera: undefined;

};

export type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Game'>;
