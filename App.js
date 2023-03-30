// App.js
import React, { useState, useMemo, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import generator from "sudoku";

import Game from "./components/Game"


export default function App() {

  function generateSudoku() {
    /*
      {rows: [{index: 0, cols: [{row: 0, col: 0, value: 1, selected, false, readonly: true}, ...]}, ...]}
    */ 
    const raw = generator.makepuzzle()
    const result = {rows: []}
  
    for (let i=0; i<9; i++) {
      const row = {cols: [], index: i}
      for (let j=0; j<9; j++) {
        const value = raw[i*9+j];
        const col = {
          row: i,
          col: j,
          value: value,
          selected: false,
          readonly: value !== null
        };
        row.cols.push(col);
      }
      result.rows.push(row);
    }
    return result;
  }

  const sudoku = useMemo(() => generateSudoku(), []);

  return (
    <SafeAreaView style={styles.container}>
      
      <Game game={sudoku}></Game>

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
