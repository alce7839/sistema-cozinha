import React, { useState, useEffect } from 'react';
import { Clock, PlayCircle, CheckCircle, Trash2, Plus, User } from 'lucide-react';
import './KitchenTasks.css';

function KitchenTasks() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [newTask, setNewTask] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const ADMIN_PASSWORD = '123456'; // Você pode mudar esta senha
  const [taskPriority, setTaskPriority] = useState('normal');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      description: 'Preparar molho para massas',
      status: 'pendente',
      priority: 'normal', 
      createdAt: new Date().toISOString(),
      completedAt: null,
      createdBy: 'Chef João',
      assignedTo: null
    },
    {
      id: 2,
      description: 'Cortar legumes',
      status: 'em_execucao',
      priority: 'alta', 
      createdAt: new Date().toISOString(),
      completedAt: null,
      createdBy: 'Chef Maria',
      assignedTo: 'Carlos'
    }
  ]);

  // Verifica tarefas antigas a cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTasks(prevTasks =>
        prevTasks.filter(task => {
          if (task.status === 'concluida' && task.completedAt) {
            const completedDate = new Date(task.completedAt);
            const hoursDiff = (now - completedDate) / (1000 * 60 * 60);
            return hoursDiff < 24;
          }
          return true;
        })
      );
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  const handleNameSubmit = () => {
    if (!userName.trim()) return;

    if (isAdmin) {
      if (password === ADMIN_PASSWORD) {
        setShowNameInput(false);
      } else {
        alert('Senha de administrador incorreta!');
        return;
      }
    } else {
      setShowNameInput(false);
    }
  };

  const addTask = () => {
    if (newTask.trim() === '' || !userName.trim()) return;

    const task = {
      id: Date.now(),
      description: newTask,
      status: 'pendente',
      priority: taskPriority,
      createdAt: new Date().toISOString(),
      completedAt: null,
      createdBy: userName,
      assignedTo: null
    };

    setTasks([...tasks, task]);
    setNewTask('');
    setTaskPriority('normal');
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: newStatus,
          completedAt: newStatus === 'concluida' ? new Date().toISOString() : task.completedAt,
          assignedTo: newStatus === 'em_execucao' ? userName : task.assignedTo
        };
      }
      return task;
    }));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getTimeRemaining = (completedAt) => {
    if (!completedAt) return null;

    const completedDate = new Date(completedAt);
    const now = new Date();
    const diffHours = 24 - (now - completedDate) / (1000 * 60 * 60);

    if (diffHours <= 0) return 'Será removida em breve';
    if (diffHours < 1) return `Será removida em ${Math.round(diffHours * 60)} minutos`;
    return `Será removida em ${Math.round(diffHours)} horas`;
  };

  // Tela de login
  if (showNameInput) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h2>{isAdmin ? 'Nome do Administrador' : 'Nome do Funcionário'}</h2>
          <input
            type="text"
            placeholder="Digite seu nome..."
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="input"
          />
          {isAdmin && (
            <input
              type="password"
              placeholder="Senha do administrador..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          )}
          <button
            onClick={handleNameSubmit}
            disabled={!userName.trim()}
            className="button primary"
          >
            Continuar
          </button>
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="button secondary"
          >
            Alterar para modo {isAdmin ? 'Funcionário' : 'Administrador'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <div className="user-info">
          <User className="icon" />
          <span>{userName} - {isAdmin ? 'Administrador' : 'Funcionário'}</span>
        </div>
        <div className="header-buttons">
          <button className="button secondary" onClick={() => setShowNameInput(true)}>
            Trocar Usuário
          </button>
          <button
            className="button secondary"
            onClick={() => {
              setIsAdmin(!isAdmin);
              setShowNameInput(true);
            }}
          >
            Trocar Modo
          </button>
        </div>
      </div>

      {isAdmin && (
        <div className="add-task">
          <div className="task-inputs">
            <input
              type="text"
              placeholder="Nova tarefa..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
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
          </div>
          <button onClick={addTask} className="button primary">
            <Plus className="icon" />
            Adicionar
          </button>
        </div>
      )}

      <div className="tasks-grid">
        {['pendente', 'em_execucao', 'concluida'].map(statusFilter => (
          <div key={statusFilter} className="task-column">
            <h3 className="column-title">
              {statusFilter.replace('_', ' ').toUpperCase()}
            </h3>
            {tasks
              .filter(task => task.status === statusFilter)
              .map(task => (
                <div key={task.id} className={`task-card priority-${task.priority}`}>
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
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KitchenTasks;