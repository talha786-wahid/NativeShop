import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from '@src/navigation/AppNavigator';
import {ThemeProvider} from '@src/styles/ThemeProvider';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default App;
