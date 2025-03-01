import React from 'react';
import { calculateDuration } from '../utils/dateUtils';
import { BarChart, Clock, TrendingUp, Users, Award, Timer } from 'lucide-react';

function ReportView({ tasks, tasksHistory = [], setShowReport }) {
  // Garantir que tasksHistory seja sempre um array
  const safeTasksHistory = Array.isArray(tasksHistory) ? tasksHistory : [];
  
  // Função para calcular estatísticas de tempo
  const calculateTimeStats = () => {
    // Filtra tarefas concluídas com startedAt e completedAt definidos
    const completedTasks = [...tasks, ...safeTasksHistory].filter(
      task => task.status === 'concluida' && task.startedAt && task.completedAt
    );
    
    if (completedTasks.length === 0) {
      return { fastest: null, slowest: null, average: null };
    }
    
    // Calcula a duração em minutos para cada tarefa
    const durations = completedTasks.map(task => {
      const start = new Date(task.startedAt);
      const end = new Date(task.completedAt);
      return {
        task: task,
        description: task.description,
        assignedTo: task.assignedTo,
        priority: task.priority,
        durationMs: end - start,
        durationFormatted: calculateDuration(task.startedAt, task.completedAt)
      };
    });
    
    // Encontra a mais rápida e mais lenta
    durations.sort((a, b) => a.durationMs - b.durationMs);
    const fastest = durations[0];
    const slowest = durations[durations.length - 1];
    
    // Calcula a média
    const totalDuration = durations.reduce((sum, item) => sum + item.durationMs, 0);
    const averageMs = totalDuration / durations.length;
    const averageFormatted = calculateDuration(
      new Date(0).toISOString(), 
      new Date(averageMs).toISOString()
    );
    
    // Estatísticas por prioridade
    const statsByPriority = {
      alta: { count: 0, totalMs: 0 },
      normal: { count: 0, totalMs: 0 },
      baixa: { count: 0, totalMs: 0 }
    };
    
    durations.forEach(item => {
      const priority = item.priority || 'normal';
      statsByPriority[priority].count++;
      statsByPriority[priority].totalMs += item.durationMs;
    });
    
    // Calcular médias por prioridade
    Object.keys(statsByPriority).forEach(priority => {
      const stats = statsByPriority[priority];
      if (stats.count > 0) {
        const avgMs = stats.totalMs / stats.count;
        stats.avgFormatted = calculateDuration(
          new Date(0).toISOString(),
          new Date(avgMs).toISOString()
        );
      } else {
        stats.avgFormatted = 'N/A';
      }
    });
    
    // Estatísticas de produtividade diária
    const tasksByDay = {};
    completedTasks.forEach(task => {
      const date = new Date(task.completedAt).toLocaleDateString();
      if (!tasksByDay[date]) {
        tasksByDay[date] = { count: 0, dates: [] };
      }
      tasksByDay[date].count++;
      tasksByDay[date].dates.push(task.completedAt);
    });
    
    const dailyStats = Object.keys(tasksByDay).map(date => ({
      date,
      count: tasksByDay[date].count,
      mostRecent: new Date(Math.max(...tasksByDay[date].dates.map(d => new Date(d))))
    })).sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return { 
      fastest, 
      slowest, 
      averageFormatted, 
      durations,
      statsByPriority,
      dailyStats,
      totalTasks: completedTasks.length
    };
  };
  
  const timeStats = calculateTimeStats();
  
  // Calcular estatísticas gerais
  const totalTasks = tasks.length + safeTasksHistory.length;
  const pendingTasks = tasks.filter(task => task.status === 'pendente').length;
  const inProgressTasks = tasks.filter(task => task.status === 'em_execucao').length;
  const completedTasksCount = tasks.filter(task => task.status === 'concluida').length + safeTasksHistory.length;
  
  // Cálculos de produtividade
  const completionRatio = totalTasks > 0 ? (completedTasksCount / totalTasks * 100).toFixed(1) : 0;
  
  // Atividade por usuário
  const userActivity = {};
  
  // Contar tarefas criadas por usuário
  [...tasks, ...safeTasksHistory].forEach(task => {
    if (task.createdBy) {
      if (!userActivity[task.createdBy]) {
        userActivity[task.createdBy] = { created: 0, completed: 0, inProgress: 0 };
      }
      userActivity[task.createdBy].created++;
    }
    
    if (task.assignedTo) {
      if (!userActivity[task.assignedTo]) {
        userActivity[task.assignedTo] = { created: 0, completed: 0, inProgress: 0 };
      }
      
      if (task.status === 'concluida') {
        userActivity[task.assignedTo].completed++;
      } else if (task.status === 'em_execucao') {
        userActivity[task.assignedTo].inProgress++;
      }
    }
  });
  
  return (
    <div className="report-container">
      <div className="report-header">
        <h2><BarChart className="icon" /> Relatório de Produtividade</h2>
        <button 
          className="button secondary"
          onClick={() => setShowReport(false)}
        >
          Voltar
        </button>
      </div>
      
      <div className="summary-stats">
        <div className="summary-item">
          <div className="summary-value">{totalTasks}</div>
          <div className="summary-label">Total de Tarefas</div>
        </div>
        <div className="summary-item">
          <div className="summary-value">{completedTasksCount}</div>
          <div className="summary-label">Tarefas Concluídas</div>
        </div>
        <div className="summary-item">
          <div className="summary-value">{inProgressTasks}</div>
          <div className="summary-label">Em Execução</div>
        </div>
        <div className="summary-item">
          <div className="summary-value">{pendingTasks}</div>
          <div className="summary-label">Pendentes</div>
        </div>
        <div className="summary-item">
          <div className="summary-value">{completionRatio}%</div>
          <div className="summary-label">Taxa de Conclusão</div>
        </div>
      </div>
      
      <div className="report-grid">
        <div className="report-card">
          <h3><Clock className="card-icon" /> Por Status</h3>
          <div className="report-stats">
            <div className="stat-bar-container">
              <div className="stat-label">Pendentes</div>
              <div className="stat-bar-wrapper">
                <div className="stat-bar pending" style={{ width: `${pendingTasks/totalTasks*100}%` }}></div>
                <span className="stat-value">{pendingTasks}</span>
              </div>
            </div>
            <div className="stat-bar-container">
              <div className="stat-label">Em Execução</div>
              <div className="stat-bar-wrapper">
                <div className="stat-bar progress" style={{ width: `${inProgressTasks/totalTasks*100}%` }}></div>
                <span className="stat-value">{inProgressTasks}</span>
              </div>
            </div>
            <div className="stat-bar-container">
              <div className="stat-label">Concluídas</div>
              <div className="stat-bar-wrapper">
                <div className="stat-bar completed" style={{ width: `${completedTasksCount/totalTasks*100}%` }}></div>
                <span className="stat-value">{completedTasksCount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="report-card">
          <h3><TrendingUp className="card-icon" /> Por Prioridade</h3>
          <div className="report-stats">
            <div className="stat-bar-container">
              <div className="stat-label">Alta</div>
              <div className="stat-bar-wrapper">
                <div className="stat-bar priority-alta" style={{ 
                  width: `${tasks.filter(task => task.priority === 'alta').length/totalTasks*100}%` 
                }}></div>
                <span className="stat-value">{tasks.filter(task => task.priority === 'alta').length}</span>
              </div>
            </div>
            <div className="stat-bar-container">
              <div className="stat-label">Normal</div>
              <div className="stat-bar-wrapper">
                <div className="stat-bar priority-normal" style={{ 
                  width: `${tasks.filter(task => task.priority === 'normal').length/totalTasks*100}%` 
                }}></div>
                <span className="stat-value">{tasks.filter(task => task.priority === 'normal').length}</span>
              </div>
            </div>
            <div className="stat-bar-container">
              <div className="stat-label">Baixa</div>
              <div className="stat-bar-wrapper">
                <div className="stat-bar priority-baixa" style={{ 
                  width: `${tasks.filter(task => task.priority === 'baixa').length/totalTasks*100}%` 
                }}></div>
                <span className="stat-value">{tasks.filter(task => task.priority === 'baixa').length}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="report-card full-width">
          <h3><Users className="card-icon" /> Desempenho da Equipe</h3>
          <div className="team-stats">
            {Object.entries(userActivity).map(([user, data]) => (
              <div key={user} className="team-member-stat">
                <div className="team-member-name">{user}</div>
                <div className="team-member-metrics">
                  <div className="metric">
                    <div className="metric-value">{data.created}</div>
                    <div className="metric-label">Criadas</div>
                  </div>
                  <div className="metric">
                    <div className="metric-value">{data.inProgress}</div>
                    <div className="metric-label">Em Execução</div>
                  </div>
                  <div className="metric">
                    <div className="metric-value">{data.completed}</div>
                    <div className="metric-label">Concluídas</div>
                  </div>
                  <div className="metric">
                    <div className="metric-value">
                      {data.created > 0 ? `${(data.completed/data.created*100).toFixed(0)}%` : '0%'}
                    </div>
                    <div className="metric-label">Conclusão</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="report-card">
          <h3><Timer className="card-icon" /> Tempo de Execução</h3>
          <div className="report-stats">
            {timeStats.fastest ? (
              <>
                <div className="stat-item">
                  <div className="stat-label">Tempo Médio:</div>
                  <div className="stat-detail">{timeStats.averageFormatted}</div>
                </div>
                <div className="stat-divider"></div>
                {Object.entries(timeStats.statsByPriority).map(([priority, stats]) => (
                  <div key={priority} className="stat-item">
                    <div className="stat-label">Média ({priority}):</div>
                    <div className="stat-detail">{stats.avgFormatted}</div>
                  </div>
                ))}
              </>
            ) : (
              <p className="no-data-message">Sem dados de tempo suficientes.</p>
            )}
          </div>
        </div>
        
        <div className="report-card">
          <h3><Award className="card-icon" /> Recordes</h3>
          <div className="report-stats">
            {timeStats.fastest ? (
              <>
                <div className="record-item fastest">
                  <div className="record-title">Mais Rápida</div>
                  <div className="record-value">{timeStats.fastest.durationFormatted}</div>
                  <div className="record-detail">"{timeStats.fastest.description}"</div>
                  <div className="record-user">por {timeStats.fastest.assignedTo}</div>
                </div>
                <div className="record-divider"></div>
                <div className="record-item slowest">
                  <div className="record-title">Mais Demorada</div>
                  <div className="record-value">{timeStats.slowest.durationFormatted}</div>
                  <div className="record-detail">"{timeStats.slowest.description}"</div>
                  <div className="record-user">por {timeStats.slowest.assignedTo}</div>
                </div>
              </>
            ) : (
              <p className="no-data-message">Sem dados de tempo suficientes.</p>
            )}
          </div>
        </div>
        
        <div className="report-card full-width">
          <h3>Produtividade Recente</h3>
          <div className="recent-productivity">
            {timeStats.dailyStats && timeStats.dailyStats.length > 0 ? (
              <div className="daily-stats">
                {timeStats.dailyStats.slice(0, 7).map((day, index) => (
                  <div key={index} className="daily-stat-item">
                    <div className="daily-date">{day.date}</div>
                    <div className="daily-count">
                      <div className="daily-bar" style={{ height: `${day.count * 10}px` }}></div>
                      <div className="daily-number">{day.count}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data-message">Sem dados de produtividade recentes.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportView;