// src/components/HistoryView.js
import React from 'react';
import { Calendar, Trash2 } from 'lucide-react';
import { filterByPeriod } from '../utils/dateUtils';
import { calculateDuration } from '../utils/dateUtils';

function HistoryView({ tasksHistory, setTasksHistory, setShowHistory, startDate, setStartDate, endDate, setEndDate }) {
  const handleDeleteByPeriod = () => {
    const confirmed = window.confirm(`Tem certeza que deseja excluir todas as tarefas concluídas entre ${new Date(startDate).toLocaleDateString()} e ${new Date(endDate).toLocaleDateString()}?`);
    
    if (confirmed) {
      setTasksHistory(prevHistory => 
        prevHistory.filter(task => {
          const taskDate = new Date(task.completedAt);
          taskDate.setHours(0, 0, 0, 0);
          
          const start = new Date(startDate);
          start.setHours(0, 0, 0, 0);
          
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
          
          return taskDate < start || taskDate > end;
        })
      );
      alert('Tarefas do período selecionado foram excluídas com sucesso!');
    }
  };

  const filteredTasks = filterByPeriod(tasksHistory, startDate, endDate);

  return (
    <div className="report-container">
      <div className="report-header">
        <h2>Histórico de Tarefas</h2>
        <button 
          className="button secondary"
          onClick={() => setShowHistory(false)}
        >
          Voltar
        </button>
      </div>

      <div className="history-content">
      <div className="history-filters">
  <div className="date-controls">
    <div className="date-filter">
      <span className="date-label">De:</span>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="date-picker"
      />
    </div>
    <div className="date-filter">
      <span className="date-label">Até:</span>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="date-picker"
      />
    </div>
    <button 
      className="button delete-period"
      onClick={handleDeleteByPeriod}
    >
      <Trash2 className="icon" size={18} />
      Excluir Período
    </button>
  </div>
</div>

        <div className="history-cards">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <div key={task.id} className={`history-card priority-${task.priority}`}>
                <div className="history-card-header">
                  <span className="history-task-title">{task.description}</span>
                  <span className={`priority-badge ${task.priority}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                </div>
<div className="history-card-details">
  <p>Concluída por: {task.assignedTo}</p>
  <p>Em: {new Date(task.completedAt).toLocaleString()}</p>
  {task.startedAt && task.completedAt && (
    <p><strong>Tempo de execução:</strong> {calculateDuration(task.startedAt, task.completedAt)}</p>
  )}
  {task.completionNote && (
    <p className="history-note">
      <strong>Observação:</strong> {task.completionNote}
    </p>
  )}
</div>
              </div>
            ))
          ) : (
            <div className="empty-history">Nenhuma tarefa encontrada no período selecionado.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoryView;