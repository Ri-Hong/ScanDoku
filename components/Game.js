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
    newSudoku.rows[row].cols[col].value = value;
    setSudoku(newSudoku);
    setDigitInput(null);
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
