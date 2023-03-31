// Game.js
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import SudokuBoard from "./SudokuBoard"
import Digits from "./Digits"

export default function Game({ game }) {
  const [sudoku, setSudoku] = useState(game);
  const [digitInput, setDigitInput] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);


  // Updates the selectedcell's value with the input
  const updateSudokuCell = (row, col, value) => { 
    const newSudoku = { ...sudoku };
    if (!isValid(row, col, value)) {
      newSudoku.rows[row].cols[col].isValid = false;
    } else {
      newSudoku.rows[row].cols[col].isValid = true;
    }
    newSudoku.rows[row].cols[col].value = value;
    setSudoku(newSudoku);
    setDigitInput(null);
  };

  // Checks if the value at the specified row and column conflicts 
  // with the current state of the board
  // Returns: true if there are no conflicts, false otherwise.
  const isValid = (row, col, input) => { 
    // Check row
    for (let i = 0; i < 9; i++) {
      if (sudoku.rows[row].cols[i].value === input && i !== col) {
        return false;
      }
    }


    // Check col
    for (let i = 0; i < 9; i++) {
      if (sudoku.rows[i].cols[col].value === input && i !== row) {
        return false;
      }
    }

    topLeftX = row - row % 3;
    topLeftY = col - col % 3;

    // Check 3x3 sub-grid
    for (let i = topLeftX; i < topLeftX + 3; i++) {
      for (let j = topLeftY; j < topLeftY + 3; j++) {
        if (sudoku.rows[i].cols[j].value === input && i !== row && j !== col) {
          return false;
        }
      }
    }
    
    return true;
  };

  useEffect(() => {
    if (selectedCell != null && digitInput != null) {
      const selectedCol = selectedCell % 10;
      const selectedRow = Math.floor(selectedCell / 10);
      updateSudokuCell(selectedRow, selectedCol, digitInput);
    }
    console.log(digitInput);
  }, [digitInput]);

  // console.log("Game rerender")
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello World!!!</Text>

      <SudokuBoard sudoku={sudoku} selectedCell={selectedCell} setSelectedCell={setSelectedCell}></SudokuBoard>
      <Digits setDigitInput={setDigitInput}></Digits>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
