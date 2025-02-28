// src/utils/localStorage.js
export const loadTasks = () => {
    try {
      const savedTasks = localStorage.getItem('kitchenTasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
      return [];
    }
  };
  
  export const saveTasks = (tasks) => {
    try {
      localStorage.setItem('kitchenTasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Erro ao salvar tarefas:', error);
    }
  };
  
  export const loadTasksHistory = () => {
    try {
      const savedHistory = localStorage.getItem('kitchenTasksHistory');
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
      return [];
    }
  };
  
  export const saveTasksHistory = (history) => {
    try {
      localStorage.setItem('kitchenTasksHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Erro ao salvar histórico:', error);
    }
  };