import 'react-native-gesture-handler';
import React from 'react';
import RootStack from './navigation';
import { SocketProvider } from './context/SocketContext';

export default function App() {
  return (
    <SocketProvider>
      <RootStack />
    </SocketProvider>
  );
}
