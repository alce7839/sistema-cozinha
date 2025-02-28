// src/components/TaskForm.js
import React from 'react';
import { Plus } from 'lucide-react';

function TaskForm({ newTask, setNewTask, taskPriority, setTaskPriority, taskObservation, setTaskObservation, addTask }) {
  return (
    <div className="add-task">
      <div className="task-inputs">
        <input
          type="text"
          placeholder="Nova tarefa..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="input"
        />
        <select 
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
          className="priority-select"
        >
          <option value="baixa">Baixa Prioridade</option>
          <option value="normal">Prioridade Normal</option>
          <option value="alta">Alta Prioridade</option>
        </select>
        <textarea
          placeholder="Observações (opcional)..."
          value={taskObservation}
          onChange={(e) => setTaskObservation(e.target.value)}
          className="observation-input"
          rows="2"
        />
      </div>
      <button onClick={addTask} className="button primary">
        <Plus className="icon" />
        Adicionar
      </button>
    </div>
  );
}

export default TaskForm;