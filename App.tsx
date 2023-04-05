// App.tsx
import React, { useState, useMemo, useEffect, ReactElement } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import generator from "sudoku";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Game from "./components/Game"
import { PermissionsPage } from "./components/PermissionsPage"
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';

import { RootStackParamList } from './types';

interface SudokuCol {
  row: number;
  col: number;
  value: number | null;
  selected: boolean;
  readonly: boolean;
  isValid: boolean;
}

interface SudokuRow {
  index: number;
  cols: SudokuCol[];
}

interface Sudoku {
  rows: SudokuRow[];
}


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): ReactElement | null {

  function generateSudoku(): Sudoku {
    /*
      {rows: [{index: 0, cols: [{row: 0, col: 0, value: 1, selected, false, readonly: true, isInvalid}, ...]}, ...]}
    */ 
    const raw = generator.makepuzzle()
    const result: Sudoku = {rows: []}
  
    for (let i=0; i<9; i++) {
      const row: SudokuRow = {cols: [], index: i}
      for (let j=0; j<9; j++) {
        const value = raw[i*9+j];
        const col: SudokuCol = {
          row: i,
          col: j,
          value: value,
          selected: false,
          readonly: value !== null,
          isValid: true
        };
        row.cols.push(col);
      }
      result.rows.push(row);
    }
    return result;
  }

  const sudoku: Sudoku = useMemo(() => generateSudoku(), []);

  // CAMERA -------------------------------------------
  const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();

  useEffect(() => {
    (async () => {
      if (cameraPermission === undefined) {
        const permissionStatus = await Camera.getCameraPermissionStatus();
        setCameraPermission(permissionStatus);
        console.log(`Camera permission set to ${permissionStatus}`);
      }
    })();
  }, [cameraPermission]);

  console.log(`Re-rendering Navigator. Camera: ${cameraPermission} `);

  // if (cameraPermission == null) {
  //   // still loading
  //   console.log("CAnera perm null")
  //   return null;
  // }
  // CAMERA -------------------------------------------


  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            // headerShown: false,
            // statusBarStyle: 'dark',
            animationTypeForReplace: 'push',
          }}
          initialRouteName="Game">
          <Stack.Screen
            name="Game"
            component={Game}
            initialParams={{ game: sudoku } as { game: Sudoku }}
            />
            {/* <Stack.Screen
            name="Camera"
            component={Camera}
            /> */}
            <Stack.Screen name="PermissionsPage" component={PermissionsPage} />
            {/* <Stack.Screen name="CameraPage" component={CameraPage} /> */}
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dodgerblue'
  },
});
