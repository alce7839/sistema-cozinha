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

### Relatórios Avançados
- Estatísticas detalhadas de produtividade
- Métricas de tempo de execução
- Análise de desempenho por funcionário
- Recordes de tarefas mais rápidas e mais lentas
- Gráficos visuais de distribuição de tarefas

### Histórico Completo
- Histórico permanente de tarefas concluídas
- Filtros por período no histórico
- Possibilidade de excluir tarefas do histórico por período
- Detalhes de tempo de execução para cada tarefa

### Rastreamento de Tempo
- Registro automático do horário de início de tarefas
- Cálculo de tempo total de execução
- Estatísticas de tempo médio por prioridade
- Comparativos de eficiência entre funcionários

### Persistência de Dados
- Salvamento automático no localStorage
- Tarefas ativas removidas automaticamente após 24h
- Histórico mantido permanentemente

### Interface
- Design responsivo para desktop e dispositivos móveis
- Indicadores visuais de prioridade e status
- Layout intuitivo e amigável
- Gráficos e visualizações de dados

## Arquitetura
O projeto utiliza uma arquitetura modular, organizada em componentes reutilizáveis:
- Componentes separados para cada funcionalidade
- Utilitários para manipulação de dados e datas
- Separação entre visualização e lógica de negócio

## Tecnologias Utilizadas
- React.js
- JavaScript ES6+
- HTML5/CSS3
- Lucide React (ícones)
- LocalStorage API

## Como Usar
1. Clone o repositório
2. Instale as dependências: `npm install`
3. Execute: `npm start`
4. Acesse: `http://localhost:3000`

## Acesso ao Sistema
- **Administrador**:
  - Nome: qualquer nome
  - Senha: 123456
- **Funcionário**:
  - Nome: qualquer nome
  - Sem senha

## Próximas Etapas
- Sistema de categorias para tarefas
- Integração com backend para persistência em banco de dados
- Sistema de notificações para novas tarefas
- Aplicativo móvel complementar