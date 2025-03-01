// src/components/KitchenTasks.js
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, PlayCircle, CheckCircle, Trash2, Plus, User, BarChart, History } from 'lucide-react';
import './KitchenTasks.css';

// Importando utilitários
import { getTimeRemaining } from '../utils/dateUtils';
import { loadTasks, saveTasks, loadTasksHistory, saveTasksHistory } from '../utils/localStorage';

// Importando componentes
import Login from './Login';
import Header from './Header';
import TaskForm from './TaskForm';
import TasksList from './TasksList';
import ReportView from './ReportView';
import HistoryView from './HistoryView';

function KitchenTasks() {
  // Estados
  const [isAdmin, setIsAdmin] = useState(true);
  const [newTask, setNewTask] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const [taskPriority, setTaskPriority] = useState('normal');
  const [taskObservation, setTaskObservation] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [startDate, setStartDate] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [tasks, setTasks] = useState(loadTasks);
  const [tasksHistory, setTasksHistory] = useState(loadTasksHistory);

  const ADMIN_PASSWORD = '123456';

  // UseEffects
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    saveTasksHistory(tasksHistory);
  }, [tasksHistory]);

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

  // Funções
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
      observation: taskObservation,
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
    setTaskObservation('');
  };

 // src/components/KitchenTasks.js
const updateTaskStatus = (taskId, newStatus) => {
  if (newStatus === 'em_execucao') {
    // Quando a tarefa é iniciada, registra o horário de início
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: newStatus,
          startedAt: new Date().toISOString(),
          assignedTo: userName
        };
      }
      return task;
    }));
  } else if (newStatus === 'concluida') {
    // Quando a tarefa é concluída
    const note = window.prompt('Adicione uma observação sobre a conclusão da tarefa:');
    if (note === null) return;

    const taskToComplete = tasks.find(task => task.id === taskId);
    if (taskToComplete) {
      const completedTask = {
        ...taskToComplete,
        status: newStatus,
        completedAt: new Date().toISOString(),
        assignedTo: taskToComplete.assignedTo || userName,
        completionNote: note
      };

      // Adiciona ao histórico
      setTasksHistory(prev => [...prev, completedTask]);
      
      // Atualiza a lista de tarefas ativas
      setTasks(tasks.map(task => 
        task.id === taskId ? completedTask : task
      ));
    }
  } else {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: newStatus,
          assignedTo: newStatus === 'em_execucao' ? userName : task.assignedTo
        };
      }
      return task;
    }));
  }
};

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Renderização condicional - Login
  if (showNameInput) {
    return (
      <Login 
        userName={userName}
        setUserName={setUserName}
        password={password}
        setPassword={setPassword}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        handleNameSubmit={handleNameSubmit}
        ADMIN_PASSWORD={ADMIN_PASSWORD}
      />
    );
  }

  // Renderização condicional - Relatório
  if (showReport && isAdmin) {
    return (
      <ReportView 
        tasks={tasks}
        tasksHistory={tasksHistory} 
        setShowReport={setShowReport}
      />
    );
  }

  // Renderização condicional - Histórico
  if (showHistory && isAdmin) {
    return (
      <HistoryView 
        tasksHistory={tasksHistory}
        setTasksHistory={setTasksHistory}
        setShowHistory={setShowHistory}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
    );
  }

  // Renderização principal
  return (
    <div className="container">
      <Header 
        userName={userName}
        isAdmin={isAdmin}
        setShowNameInput={setShowNameInput}
        setIsAdmin={setIsAdmin}
        setShowReport={setShowReport}
        setShowHistory={setShowHistory}
      />

      {isAdmin && (
        <TaskForm 
          newTask={newTask}
          setNewTask={setNewTask}
          taskPriority={taskPriority}
          setTaskPriority={setTaskPriority}
          taskObservation={taskObservation}
          setTaskObservation={setTaskObservation}
          addTask={addTask}
        />
      )}

      <TasksList 
        tasks={tasks}
        isAdmin={isAdmin}
        userName={userName}
        deleteTask={deleteTask}
        updateTaskStatus={updateTaskStatus}
        getTimeRemaining={getTimeRemaining}
      />
    </div>
  );
}

export default KitchenTasks;