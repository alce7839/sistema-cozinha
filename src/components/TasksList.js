// src/components/TasksList.js
import React from 'react';
import TaskCard from './TaskCard';

function TasksList({ tasks, isAdmin, userName, deleteTask, updateTaskStatus, getTimeRemaining }) {
  return (
    <div className="tasks-grid">
      {['pendente', 'em_execucao', 'concluida'].map(statusFilter => (
        <div key={statusFilter} className="task-column">
          <h3 className="column-title">
            {statusFilter.replace('_', ' ').toUpperCase()}
          </h3>
          {tasks
            .filter(task => task.status === statusFilter)
            .map(task => (
              <TaskCard 
                key={task.id}
                task={task}
                isAdmin={isAdmin}
                userName={userName}
                deleteTask={deleteTask}
                updateTaskStatus={updateTaskStatus}
                getTimeRemaining={getTimeRemaining}
              />
            ))}
        </div>
      ))}
    </div>
  );
}

export default TasksList;