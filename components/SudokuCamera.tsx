// import { NavigationContainer } from '@react-navigation/native';
// import React, { useEffect, useState } from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { PermissionsPage } from './PermissionsPage';
// // import { CameraPage } from './CameraPage';
// import type { Routes } from '../Routes';
// import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';

// const Stack = createNativeStackNavigator<Routes>();

// export function App(): React.ReactElement | null {
//   const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();

//   useEffect(() => {
//     Camera.getCameraPermissionStatus().then(setCameraPermission);
//   }, []);

//   console.log(`Re-rendering Navigator. Camera: ${cameraPermission} `);

//   if (cameraPermission == null) {
//     // still loading
//     return null;
//   }

//   const showPermissionsPage = cameraPermission !== 'authorized' || microphonePermission === 'not-determined';
//   return (
//     <PermissionsPage></PermissionsPage>
//   );
// }