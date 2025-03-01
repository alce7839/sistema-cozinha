// src/components/TaskCard.js
import React from 'react';
import { Clock, PlayCircle, CheckCircle, Trash2 } from 'lucide-react';
import { calculateDuration } from '../utils/dateUtils';

function TaskCard({ task, isAdmin, userName, deleteTask, updateTaskStatus, getTimeRemaining }) {
  return (
    <div className={`task-card priority-${task.priority}`}>
      <div className="task-content">
        <div className="task-header">
          {task.status === 'pendente' && <Clock className="status-icon pending" />}
          {task.status === 'em_execucao' && <PlayCircle className="status-icon progress" />}
          {task.status === 'concluida' && <CheckCircle className="status-icon done" />}
          <span className="task-description">{task.description}</span>
          <span className={`priority-badge ${task.priority}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
        </div>
        
        <div className="task-info">
  <p>Criada por: {task.createdBy}</p>
  <p>Em: {new Date(task.createdAt).toLocaleString()}</p>
  
  {task.observation && (
    <p className="task-observation">
      <strong>Observações:</strong> {task.observation}
    </p>
  )}
  
  {task.status === 'em_execucao' && task.startedAt && (
    <p className="task-started">
      <strong>Iniciada em:</strong> {new Date(task.startedAt).toLocaleString()}
    </p>
  )}
  
  {task.status === 'concluida' && task.completionNote && (
    <p className="task-completion-note">
      <strong>Observação de conclusão:</strong> {task.completionNote}
    </p>
  )}
  
  {task.status === 'concluida' && task.startedAt && task.completedAt && (
    <p className="task-duration">
      <strong>Tempo de execução:</strong> {calculateDuration(task.startedAt, task.completedAt)}
    </p>
  )}
  
  {task.assignedTo && (
    <p className="task-assigned">
      {task.status === 'em_execucao' ? 
        <span className="in-progress">Em execução por: {task.assignedTo}</span> :
        `Concluída por: ${task.assignedTo}`
      }
    </p>
  )}
  
  {task.status === 'concluida' && (
    <p className="time-remaining">{getTimeRemaining(task.completedAt)}</p>
  )}
</div>
      </div>
      <div className="task-actions">
        {isAdmin && (
          <button
            onClick={() => deleteTask(task.id)}
            className="button icon-button delete"
          >
            <Trash2 className="icon" />
          </button>
        )}
        {task.status === 'pendente' && !isAdmin && (
          <button
            onClick={() => updateTaskStatus(task.id, 'em_execucao')}
            className="button secondary"
          >
            Iniciar
          </button>
        )}
        {task.status === 'em_execucao' && !isAdmin && task.assignedTo === userName && (
          <button
            onClick={() => updateTaskStatus(task.id, 'concluida')}
            className="button primary"
          >
            Concluir
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskCard;