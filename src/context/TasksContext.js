import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const TasksContext = createContext(undefined);

function createId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const addTask = useCallback((taskInput) => {
    const task = {
      id: createId(),
      title: taskInput.title.trim(),
      subject: taskInput.subject.trim(),
      description: taskInput.description.trim(),
      dueDate: taskInput.dueDate.trim(),
    };
    setTasks((prev) => [task, ...prev]);
  }, []);

  // --- NUEVA FUNCIÓN PARA ACTUALIZAR TAREAS ---
  const updateTask = useCallback((updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  }, []);

  const removeTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      tasks,
      addTask,
      updateTask, // La agregamos al valor del contexto
      removeTask,
    }),
    [tasks, addTask, updateTask, removeTask],
  );

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) {
    throw new Error('useTasks debe usarse dentro de TasksProvider');
  }
  return ctx;
}
