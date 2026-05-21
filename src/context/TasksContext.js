import React, { createContext, useContext, useState, useCallback } from 'react';

const TasksContext = createContext();

export function TasksProvider({ children }) {
  // Inicializamos con las 4 tareas de ejemplo para que veas tu diseño de inmediato
 // Cambia la línea del useState para que quede vacía:
const [tasks, setTasks] = useState([]);


  // 🛠️ FUNCIÓN CORREGIDA: Ahora guarda correctamente en el estado de tareas
  const addTask = useCallback((task) => {
    setTasks((prev) => [
      ...prev,
      { 
        id: Date.now().toString(), 
        ...task 
      }
    ]);
  }, []);

  // 🛠️ FUNCIÓN CORREGIDA: Para borrar tareas sin romper el sistema
  const removeTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  // 🛠️ FUNCIÓN ADICIONAL: Por si usas la edición de tareas
  const updateTask = useCallback((updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  }, []);

  return (
    <TasksContext.Provider value={{ tasks, addTask, removeTask, updateTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  return context || { tasks: [], addTask: () => {}, removeTask: () => {}, updateTask: () => {} };
}

