// src/components/Header.js
import React from 'react';
import { User, BarChart, History } from 'lucide-react';

function Header({ userName, isAdmin, setShowNameInput, setIsAdmin, setShowReport, setShowHistory }) {
  return (
    <div className="header">
      <div className="user-info">
        <User className="icon" />
        <span>{userName} - {isAdmin ? 'Administrador' : 'Funcionário'}</span>
      </div>
      <div className="header-buttons">
        {isAdmin && (
          <>
            <button 
              className="button secondary"
              onClick={() => setShowReport(true)}
            >
              <BarChart className="icon" />
              Relatório
            </button>
            <button 
              className="button secondary"
              onClick={() => setShowHistory(true)}
            >
              <History className="icon" />
              Histórico
            </button>
          </>
        )}
        <button 
          className="button secondary" 
          onClick={() => setShowNameInput(true)}
        >
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
  );
}

export default Header;