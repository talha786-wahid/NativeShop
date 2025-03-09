import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from '@src/navigation/AppNavigator';
import {ThemeProvider} from '@src/styles/ThemeProvider';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <AppNavigator />
        <Toast />
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
