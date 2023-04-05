// Game.tsx
import React, { useState, useEffect, ReactElement } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import SudokuBoard from './SudokuBoard';
import Digits from './Digits';
import { Sudoku } from '../types'

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

interface GameProps {
  route: RouteProp<RootStackParamList, 'Game'>;
  navigation: StackNavigationProp<RootStackParamList, 'Game'>;
}

export default function Game({ route, navigation }: GameProps): ReactElement {
  const { game } = route.params;
  const [sudoku, setSudoku] = useState<Sudoku>(game);
  const [digitInput, setDigitInput] = useState<number | null>(null);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  const updateSudokuCell = (row: number, col: number, value: number | null) => {
    const newSudoku = { ...sudoku };
    if (!isValid(row, col, value)) {
      newSudoku.rows[row].cols[col].isValid = false;
    } else {
      newSudoku.rows[row].cols[col].isValid = true;
    }
    newSudoku.rows[row].cols[col] = { ...newSudoku.rows[row].cols[col], value }; // create new object with updated value
    setSudoku(newSudoku);
    setDigitInput(null);
  };

  const isValid = (row: number, col: number, input: number | null) => {
    for (let i = 0; i < 9; i++) {
      if (sudoku.rows[row].cols[i].value === input && i !== col) {
        return false;
      }
    }

    for (let i = 0; i < 9; i++) {
      if (sudoku.rows[i].cols[col].value === input && i !== row) {
        return false;
      }
    }

    const topLeftX = row - (row % 3);
    const topLeftY = col - (col % 3);

    for (let i = topLeftX; i < topLeftX + 3; i++) {
      for (let j = topLeftY; j < topLeftY + 3; j++) {
        if (sudoku.rows[i].cols[j].value === input && (i !== row || j !== col)) {
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
  }, [digitInput, selectedCell]);

  console.log(digitInput)
  return (
    <View style={styles.container}>
      <Text>Hello World!!!</Text>
      <SudokuBoard sudoku={sudoku} selectedCell={selectedCell} setSelectedCell={setSelectedCell} />
      <Digits setDigitInput={setDigitInput} />
      <StatusBar style="auto" />
    </View>
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
