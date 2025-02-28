// src/components/Login.js
import React from 'react';

function Login({ userName, setUserName, password, setPassword, isAdmin, setIsAdmin, handleNameSubmit, ADMIN_PASSWORD }) {
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

export default Login;