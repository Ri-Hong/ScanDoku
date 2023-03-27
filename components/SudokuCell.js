import React, { memo, useEffect } from 'react'

import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
// import { TouchableHighlight } from 'react-native-web';
import {
  CellSize,
  BoardWidth,
  BorderWidth,
} from './GlobalStyle';

const SudokuCell = ({ cell, setSelectedCell, isSelected, digitInput }) => {
  console.log("Cell Rerender", cell);

  useEffect(() => {
  }, [cell.value]);

  const handlePress = () => {
    setSelectedCell(cell.row * 10 + cell.col);
    // console.log(":dd");
  }

  return (
    <View style={styles.cell}>
      {!cell.readonly ? 
        <TouchableOpacity activeOpacity={1} onPress={handlePress} style={[styles.touchable, isSelected && styles.selected]}>
          <Text style={styles.text}>{cell.value}</Text>
        </TouchableOpacity> :
        <Text style={[styles.text, styles.readOnly]}>{cell.value}</Text>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  touchable: {
    width: CellSize,
    height: CellSize,
    borderWidth: 3,
    borderColor: 'red',
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
  }
});

export default memo(SudokuCell);
