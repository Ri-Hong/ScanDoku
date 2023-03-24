import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CellSize, BoardWidth } from './GlobalStyle';
import SudokuCell from './SudokuCell';

export default function SudokuBoard({ digitInput, sudoku }) {
  const [selectedCell, setSelectedCell] = useState(null);
  useEffect(() => {
    if (selectedCell != null) {
      const selectedCol = selectedRow % 10;
      const selectedRow = Math.floor(selectedRow/10);
      console.log(selectedCol, selectedRow, digitInput);

      sudoku[selectedRow][selectedCol].value = digitInput;
    }
  }, [digitInput]);

  console.log(digitInput);

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
    flexDirection: 'row',
    alignContent: 'flex-start',
  },
});
