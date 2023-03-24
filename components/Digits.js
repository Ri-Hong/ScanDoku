import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CellSize, BoardWidth } from './GlobalStyle';
import Digit from './Digit';

export default function Digits({ setDigitInput }) {
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <View style={styles.digitContainer}>
      {digits.map((value) => (
        <Digit setDigitInput={setDigitInput} id={value} key={value}></Digit>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  digitContainer: {
    flex: 1,
    flexDirection: 'row',
    width: BoardWidth - CellSize,
    paddingTop: 20
  }
});
