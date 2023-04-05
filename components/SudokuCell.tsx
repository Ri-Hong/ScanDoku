// SudokuCell.tsx
import React, { ReactElement, memo } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CellSize, BoardWidth } from './GlobalStyle';

interface SudokuCellProps {
  cell: {
    row: number;
    col: number;
    value: number | null;
    selected: boolean;
    readonly: boolean;
    isValid: boolean;
  };
  setSelectedCell: (cellIndex: number | null) => void;
  isSelected: boolean;
}

const SudokuCell = memo(({ cell, setSelectedCell, isSelected }: SudokuCellProps): ReactElement => {
  console.log("Cell Rerender", cell);

  // Checks if the cell is on the border and returns the appropriate style
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

  // Checks if the value in the cell is invalid and returns the appropriate style
  const getInvalidStyle = () => {
    const invalidStyles = [];
    if (!cell.isValid) {
      invalidStyles.push(styles.invalid);
      console.log("INVALID")
    }
    return invalidStyles;
  };

  const handlePress = () => {
    setSelectedCell(cell.row * 10 + cell.col);
  }

  return (
    <View style={[styles.cell, ...getBorderStyle()]}>
      {!cell.readonly ? 
        <TouchableOpacity activeOpacity={1} onPress={handlePress} style={[styles.touchable, isSelected && styles.selected]}>
          <Text style={[styles.text, ...getInvalidStyle()]}>{cell.value}</Text>
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
    borderColor: 'grey',
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
  },
  invalid: {
    color: 'red'
  }
});

export default SudokuCell;
