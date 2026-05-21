import { TasksProvider, useTasks } from './src/context/TasksContext';
import TaskListScreen from './src/screens/TaskListScreen';
import AssignTaskScreen from './src/screens/AssignTaskScreen';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import SidebarMenu from './src/components/SidebarMenu';
import AssignClassScreen from './src/screens/AssignClassScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import { COLORS } from './src/constants/theme';

import {
  createClassEntry,
  createRecessEntry,
  updateScheduleEntry,
} from './src/utils/schedule';

export default function App() {
  const [screen, setScreen] = useState('schedule'); 
  const [classes, setClasses] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // 🛠️ Importamos tanto el creador como el actualizador de tareas desde tu base de datos
  const { addTask, updateTask } = useTasks(); 

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  const goToSchedule = () => {
    setEditingItem(null);
    setScreen('schedule');
  };

  const goToAssign = (item = null) => {
    setEditingItem(item);
    setScreen('assign');
  };

  const handleFormSubmit = (formData) => {
    if (editingItem) {
      setClasses((prev) =>
        prev.map((entry) =>
          entry.id === editingItem.id
            ? updateScheduleEntry(entry, formData, formData.mode)
            : entry,
        ),
      );
    } else if (formData.mode === 'recess') {
      setClasses((prev) => [
        ...prev,
        createRecessEntry({
          startTime: formData.startTime,
          endTime: formData.endTime,
        }),
      ]);
    } else {
      setClasses((prev) => [...prev, createClassEntry(formData)]);
    }

    goToSchedule();
  };

  const handleDeleteClass = (id) => {
    setClasses((prev) => prev.filter((entry) => entry.id !== id));
  };

  const handleMenuItem = (itemId) => {
    closeDrawer();

    switch (itemId) {
      case 'clases':
        goToSchedule();
        break;
      case 'tareas':
        setScreen('tareas'); 
        break;
      case 'notificaciones':
        Alert.alert('Próximamente', 'Próximamente lo uniré a otras pantallas');
        break;
      case 'configuracion':
        Alert.alert('Próximamente', 'Próximamente lo uniré a otras pantallas');
        break;
      case 'cerrar':
        Alert.alert('Próximamente', 'Próximamente lo uniré a otras pantallas');
        break;
      default:
        break;
    }
  };

  const renderScreen = () => {
    if (screen === 'schedule') {
      return (
        <ScheduleScreen
          classes={classes}
          onMenuPress={openDrawer}
          onAssignPress={() => goToAssign()}
          onEditClass={(item) => goToAssign(item)}
          onDeleteClass={handleDeleteClass}
        />
      );
    }
    
    if (screen === 'assign') {
      return (
        <AssignClassScreen
          editingItem={editingItem}
          onMenuPress={openDrawer}
          onCancel={goToSchedule}
          onSubmit={handleFormSubmit}
        />
      );
    }

    if (screen === 'tareas') {
      return (
        <TaskListScreen 
          onMenuPress={openDrawer}
          onBack={goToSchedule}
          onAssignTaskPress={() => {
            setEditingItem(null); // Limpiamos la selección previa para crear desde cero
            setScreen('assignTask');
          }} 
          onEditTaskPress={(task) => {
            setEditingItem(task); // Almacenamos los datos del pendiente a modificar
            setScreen('assignTask');
          }}
        />
      );
    }

    if (screen === 'assignTask') {
      return (
        <AssignTaskScreen
          onMenuPress={openDrawer}
          onCancel={() => {
            setEditingItem(null);
            setScreen('tareas');
          }} 
          taskToEdit={editingItem} // 🛠️ Enviamos la tarea seleccionada al formulario
          onSubmit={(taskData) => {
            // 🛠️ Lógica inteligente: Si existía un elemento previo, lo edita; si no, lo crea
            if (editingItem && editingItem.id) {
              if (updateTask) {
                updateTask({ ...taskData, id: editingItem.id });
              }
            } else {
              if (addTask) {
                addTask(taskData); 
              }
            }
            setEditingItem(null); // Limpiamos la memoria tras guardar con éxito
            setScreen('tareas'); 
          }}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      
      {renderScreen()}

      <SidebarMenu
        visible={drawerOpen}
        onClose={closeDrawer}
        onItemPress={handleMenuItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
