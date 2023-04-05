// SudokuBoard.tsx
import React, { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CellSize, BoardWidth } from "./GlobalStyle";
import SudokuCell from "./SudokuCell";

interface SudokuBoardProps {
  sudoku: {
    rows: {
      index: number;
      cols: {
        row: number;
        col: number;
        value: number | null;
        selected: boolean;
        readonly: boolean;
        isValid: boolean;
      }[];
    }[];
  };
  selectedCell: number | null;
  setSelectedCell: (cellIndex: number | null) => void;
}

export default function SudokuBoard({ sudoku, selectedCell, setSelectedCell }: SudokuBoardProps): ReactElement {
  return (
    <View style={styles.board}>
      {sudoku.rows.map((row) => (
        <View style={styles.row} key={row.index}>
          {row.cols.map((col) => (
            <SudokuCell
              key={col.col}
              cell={col}
              setSelectedCell={setSelectedCell}
              isSelected={col.row * 10 + col.col === selectedCell}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    width: BoardWidth - CellSize,
    height: BoardWidth - CellSize,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignContent: "flex-start",
  },
});
