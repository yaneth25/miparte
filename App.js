import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TasksProvider } from './src/context/TasksContext';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <TasksProvider>
          <StatusBar style="dark" />
          <RootNavigator />
        </TasksProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
