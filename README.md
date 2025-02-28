# Sistema de Tarefas da Cozinha

Sistema de gerenciamento de tarefas para cozinha de restaurante desenvolvido em React.

## Funcionalidades

### Usuários e Autenticação
- Login separado para administrador (com senha) e funcionários
- Identificação de usuários em todas as ações
- Perfis com diferentes permissões

### Gerenciamento de Tarefas
- Criação de tarefas com descrição e observações
- Sistema de prioridades (Alta, Normal, Baixa) com cores diferenciadas
- Fluxo de status (Pendente → Em Execução → Concluída)
- Observações ao concluir tarefas
- Exclusão manual de tarefas pelo administrador

### Histórico e Relatórios
- Relatórios de produtividade com estatísticas
- Histórico permanente de tarefas concluídas
- Filtros por período no histórico
- Possibilidade de excluir tarefas do histórico por período

### Persistência de Dados
- Salvamento automático no localStorage
- Tarefas ativas removidas automaticamente após 24h
- Histórico mantido permanentemente

### Interface
- Design responsivo para desktop e dispositivos móveis
- Indicadores visuais de prioridade e status
- Layout intuitivo e amigável

## Tecnologias Utilizadas
- React.js
- JavaScript ES6+
- HTML5/CSS3
- Lucide React (ícones)
- LocalStorage API

## Arquitetura
O projeto utiliza uma arquitetura modular, organizada em componentes reutilizáveis:
- Componentes separados para cada funcionalidade
- Utilitários para manipulação de dados e datas
- Separação entre visualização e lógica de negócio

## Como Usar
1. Clone o repositório
2. Instale as dependências: `npm install`
3. Execute: `npm start`
4. Acesse: `http://localhost:3000`

## Acesso Administrador
- Login: qualquer nome
- Senha: 123456