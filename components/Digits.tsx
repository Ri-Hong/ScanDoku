// Digits.tsx
import React, { useState, useCallback, ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CellSize, BoardWidth } from './GlobalStyle';
import Digit from './Digit';

interface DigitsProps {
  setDigitInput: (value: number | null) => void;
}

export default function Digits({ setDigitInput }: DigitsProps): ReactElement {
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <View style={styles.digitContainer}>
      {digits.map((value) => (
        <Digit setDigitInput={setDigitInput} id={value} key={value} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  digitContainer: {
    flex: 1,
    flexDirection: 'row',
    width: BoardWidth - CellSize,
    paddingTop: 20,
  },
});
