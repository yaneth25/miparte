import React, { useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus } from 'lucide-react-native';
import { AppHeader } from '../components/AppHeader';
import { TaskCard } from '../components/TaskCard';
import { COLORS, RADIUS, SPACING } from '../constants/theme';
import { useTasks } from '../context/TasksContext';

// 🛠️ Añadimos 'onAssignTaskPress' y usamos 'onMenuPress' en lugar de un modal local duplicado
export default function TaskListScreen({ onMenuPress, onBack, onAssignTaskPress, onEditTaskPress }) {

  const { tasks, removeTask } = useTasks();
  const isEmpty = tasks.length === 0;

  // 🛠️ Cambiamos la función para que use la navegación nativa por estado
  const goToForm = () => {
    if (onAssignTaskPress) {
      onAssignTaskPress();
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.inner}>
        <AppHeader
          titlePill={isEmpty ? null : 'SECCIÓN DE TAREAS'}
          onMenuPress={onMenuPress} // 🛠️ Conectado directamente al menú lateral unificado de App.js
          showListAdd={!isEmpty}
          onAddPress={goToForm}
        />

        {isEmpty ? (
          <View style={styles.emptyWrap}>
            <View style={styles.emptyBubble}>
              <Text style={styles.emptyBubbleText}>
                PARECE QUE NO TIENES NINGUNA TAREA ASIGNADA
              </Text>
            </View>
            <Text style={styles.assignHint}>ASIGNAR UNA TAREA</Text>
            <Pressable
              onPress={goToForm}
              style={({ pressed }) => [styles.fab, pressed && styles.pressed]}
            >
              <Plus size={34} color={COLORS.text || '#000000'} strokeWidth={2.5} />
            </Pressable>
          </View>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TaskCard 
                task={item} 
                onDelete={removeTask} 
                // 🛠️ CONEXIÓN PARA EDITAR CORREGIDA:
                onEdit={(task) => {
                  if (onEditTaskPress) {
                    onEditTaskPress(task);
                  }
                }}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

// Conserva tu objeto 'styles' abajo tal como lo tienes originalmente...


const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  inner: {
    flex: 1,
    paddingHorizontal: SPACING.screenHorizontal,
    paddingTop: 8,
  },
  // --- ESTILOS DEL MENÚ ACTUALIZADOS ---
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sideMenu: {
    width: '60%',
    height: '100%',
    backgroundColor: '#E8D9C0', // Color crema de la imagen
    paddingTop: 60,
    paddingHorizontal: 20,
    borderRightWidth: 1,
    borderColor: '#D1C4AC',
  },
  menuHeader: {
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#888',
    paddingBottom: 10,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  menuOptions: {
    gap: 25,
  },
  menuItem: {
    paddingVertical: 5,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#444',
    letterSpacing: 0.5,
  },
  // --- RESTO DE ESTILOS ---
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 48,
  },
  emptyBubble: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.pill,
    paddingVertical: 28,
    paddingHorizontal: 22,
    width: '100%',
  },
  emptyBubbleText: {
    color: COLORS.text,
    fontWeight: '800',
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  assignHint: {
    marginTop: 28,
    color: COLORS.mutedText,
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  fab: {
    marginTop: 22,
    width: 72,
    height: 72,
    borderRadius: RADIUS.fab,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingTop: 20,
    paddingBottom: 32,
  },
  pressed: {
    opacity: 0.85,
  },
});
