
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

  // src/utils/dateUtils.js - Adicione esta função
export const calculateDuration = (startDateString, endDateString) => {
  const start = new Date(startDateString);
  const end = new Date(endDateString);
  
  const diffMs = end - start;
  const diffSeconds = Math.floor(diffMs / 1000);
  
  if (diffSeconds < 60) {
    return `${diffSeconds} segundos`;
  }
  
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) {
    const remainingSeconds = diffSeconds % 60;
    return `${diffMinutes} min ${remainingSeconds} seg`;
  }
  
  const diffHours = Math.floor(diffMinutes / 60);
  const remainingMinutes = diffMinutes % 60;
  
  if (diffHours < 24) {
    return `${diffHours}h ${remainingMinutes}min`;
  }
  
  const diffDays = Math.floor(diffHours / 24);
  const remainingHours = diffHours % 24;
  
  return `${diffDays}d ${remainingHours}h ${remainingMinutes}min`;
};