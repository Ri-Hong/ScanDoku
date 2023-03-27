import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { CellSize, BoardWidth } from "./GlobalStyle";
import SudokuCell from "./SudokuCell";

export default function SudokuBoard({ digitInput, sudoku }) {
  const [selectedCell, setSelectedCell] = useState(null);
  useEffect(() => {
    if (selectedCell != null) {
      const selectedCol = selectedCell % 10;
      const selectedRow = Math.floor(selectedCell / 10);
      console.log(`${selectedCol} ${selectedRow} ${digitInput}`);
      console.log(sudoku.rows[selectedRow].cols[selectedCol].value);
      sudoku.rows[selectedRow].cols[selectedCol].value = digitInput;
      console.log(sudoku.rows[selectedRow].cols[selectedCol].value);
    }
  }, [digitInput]);


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
              digitInput={digitInput}
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
