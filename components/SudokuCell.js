// SudokuCell.js
import React, { memo, useEffect } from 'react'

import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
// import { TouchableHighlight } from 'react-native-web';
import {
  CellSize,
  BoardWidth,
} from './GlobalStyle';



const SudokuCell = memo(({ cell, setSelectedCell, isSelected }) => {
  console.log("Cell Rerender", cell);
  // console.log("Cellval", cell.value);

  const getBorderStyle = () => {
    const borderStyles = [];
    const isThickLeftBorder = cell.col % 3 === 0;
    const isThickTopBorder = cell.row % 3 === 0;
    const isThickRightBorder = cell.col === 8;
    const isThickBottomBorder = cell.row === 8;
  
    if (isThickLeftBorder) borderStyles.push(styles.thickLeftBorder);
    if (isThickTopBorder) borderStyles.push(styles.thickTopBorder);
    if (isThickRightBorder) borderStyles.push(styles.thickRightBorder);
    if (isThickBottomBorder) borderStyles.push(styles.thickBottomBorder);
    return borderStyles;
  };

  const handlePress = () => {
    setSelectedCell(cell.row * 10 + cell.col);
    // console.log(":dd");
  }

  return (
    <View style={[styles.cell, ...getBorderStyle()]}>
      {!cell.readonly ? 
        <TouchableOpacity activeOpacity={1} onPress={handlePress} style={[styles.touchable, isSelected && styles.selected]}>
          <Text style={styles.text}>{cell.value}</Text>
        </TouchableOpacity> :
        <Text style={[styles.text, styles.readOnly]}>{cell.value}</Text>
      }

    </View>
  );
});

const styles = StyleSheet.create({
  touchable: {
    width: CellSize,
    height: CellSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'grey'
  },
  selected: {
    borderWidth: 3,
    borderColor: 'blue'
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: CellSize * 2 / 3,
  },
  readOnly: {
    fontWeight: 'bold'
  },
  thickLeftBorder: {
    borderLeftWidth: 3,
    borderLeftColor: 'black',
  },
  thickTopBorder: {
    borderTopWidth: 3,
    borderTopColor: 'black',
  },
  thickRightBorder: {
    borderRightWidth: 3,
    borderRightColor: 'black',
  },
  thickBottomBorder: {
    borderBottomWidth: 3,
    borderBottomColor: 'black',
  }
});

export default SudokuCell;
