import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import React from 'react';
import App from './App';
import { TasksProvider } from './src/context/TasksContext'; // 👈 Importamos la base de datos de tareas

// 🛠️ Creamos el componente Raíz unificado que le da soporte a los Hooks de App.js
function Root() {
  return (
    <TasksProvider>
      <App />
    </TasksProvider>
  );
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => Root);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Root); // 👈 Registramos Root en lugar de App

