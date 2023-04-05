// Digit.tsx

import React, { useState, useCallback, ReactElement } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CellSize, BoardWidth, BorderWidth } from './GlobalStyle';

interface DigitProps {
  setDigitInput: (value: number | null) => void;
  id: number;
}

export default function Digit({ setDigitInput, id }: DigitProps): ReactElement {
  const handleDigitPress = () => {
    setDigitInput(id);
    // console.log(id, "dddd");
  };

  return (
    <TouchableOpacity style={styles.cell} onPress={handleDigitPress}>
      <Text style={styles.text}>{id}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    width: CellSize,
    height: CellSize,
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: CellSize * 2 / 3,
  },
});
