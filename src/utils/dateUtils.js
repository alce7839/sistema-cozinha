// src/utils/dateUtils.js
export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };
  
  export const getTimeRemaining = (completedAt) => {
    if (!completedAt) return null;
    
    const completedDate = new Date(completedAt);
    const now = new Date();
    const diffHours = 24 - (now - completedDate) / (1000 * 60 * 60);
    
    if (diffHours <= 0) return 'Será removida em breve';
    if (diffHours < 1) return `Será removida em ${Math.round(diffHours * 60)} minutos`;
    return `Será removida em ${Math.round(diffHours)} horas`;
  };
  
  export const filterByPeriod = (tasks, startDate, endDate) => {
    if (!tasks || !tasks.length) return [];
    
    return tasks.filter(task => {
      if (!task.completedAt) return false;
  
      const taskDate = new Date(task.completedAt);
      taskDate.setHours(0, 0, 0, 0);
  
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
  
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
  
      return taskDate >= start && taskDate <= end;
    }).sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  };