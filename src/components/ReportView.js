// src/components/ReportView.js
import React from 'react';
import { BarChart } from 'lucide-react';

function ReportView({ tasks, setShowReport }) {
  // Extrair lista de funcionários ativos
  const activeUsers = Array.from(new Set(tasks
    .filter(t => t.assignedTo || t.createdBy)
    .map(t => t.assignedTo || t.createdBy)
  ));

  return (
    <div className="report-container">
      <div className="report-header">
        <h2>Relatório de Produtividade</h2>
        <button 
          className="button secondary"
          onClick={() => setShowReport(false)}
        >
          Voltar
        </button>
      </div>
      
      <div className="report-grid">
        <div className="report-card">
          <h3>Total de Tarefas</h3>
          <div className="report-stats">
            <p>Pendentes: {tasks.filter(task => task.status === 'pendente').length}</p>
            <p>Em Execução: {tasks.filter(task => task.status === 'em_execucao').length}</p>
            <p>Concluídas: {tasks.filter(task => task.status === 'concluida').length}</p>
          </div>
        </div>

        <div className="report-card">
          <h3>Por Prioridade</h3>
          <div className="report-stats">
            <p>Alta: {tasks.filter(task => task.priority === 'alta').length}</p>
            <p>Normal: {tasks.filter(task => task.priority === 'normal').length}</p>
            <p>Baixa: {tasks.filter(task => task.priority === 'baixa').length}</p>
          </div>
        </div>

        <div className="report-card">
          <h3>Funcionários Ativos</h3>
          <div className="report-stats">
            {activeUsers.map(user => {
              const totalTasks = tasks.filter(t => 
                (t.assignedTo === user) || (t.createdBy === user)
              ).length;
              const completedTasks = tasks.filter(t => 
                t.status === 'concluida' && 
                (t.assignedTo === user || t.createdBy === user)
              ).length;
              
              return (
                <p key={user}>
                  {user}: {totalTasks} tarefas totais, {completedTasks} concluídas
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportView;