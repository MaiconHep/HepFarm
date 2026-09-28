# Arquitetura e Decisões Técnicas

## Frontend
- **React + TypeScript + Vite:** Escolha para garantir tipagem forte, agilidade no build e um ecossistema sólido para aplicações SPA.
- **Tailwind CSS:** Utilizado para criar interfaces customizadas e responsivas de forma rápida, sem arquivos CSS inchados.
- **State Management:** Será utilizado estado local (React Context) ou Zustand para gerenciamento de estado global da aplicação (ex: dados da fazenda atual, cache de animal visualizado, dados de autenticação).
- **Roteamento:** React Router DOM para navegação (Dashboard, Ficha do Animal, Listagens, Configurações).

## Backend / Banco de Dados
A escolha do Firebase permite um desenvolvimento serverless ágil, ideal para o escopo do projeto. O uso do Firestore (NoSQL) requer atenção ao modelo de dados, priorizando leitura rápida em contraposição a consultas pesadas em tempo de execução.

### Padrão de Eventos Históricos
Conforme recomendado pelas práticas do Firestore para dados que crescem de forma contínua:
- O documento do `animal` conterá apenas os dados mutáveis mais importantes (status, localização, pesagem mais recente, lactação atual, produção mais recente, resumo reprodutivo).
- Todos os registros históricos (pesagens, ordenhas, partos, inseminações, tratamentos) serão estruturados como **subcoleções** sob o documento de cada animal.
- **Motivo:** O limite de 1MB por documento no Firestore impede colocar o histórico como array. Além disso, as subcoleções permitem que as consultas tragam apenas os eventos necessários sem sobrecarregar a leitura do animal.

## Linha do Tempo (Timeline)
O sistema exige uma funcionalidade central de *Timeline*. A linha do tempo será consumida de duas formas:
1. Agrupando eventos históricos (buscando nas subcoleções e combinando/ordenando no frontend).
2. Tendo uma subcoleção `timeline_events` no animal que serve como índice (indexa um resumo do evento: "Parto", "Doença", etc., para rápida recuperação).
Decisão: Utilizar agregação local no frontend puxando dados das subcoleções específicas, pois a quantidade de registros para um único animal não exigirá paginação massiva, mantendo consistência entre módulos sem duplicação desnecessária de escrita.

## Segurança
- Regras estritas do Cloud Firestore bloqueando acesso anônimo.
- Custom claims ou coleção `user_roles` para garantir perfis de acesso: `admin`, `gerente`, `funcionario`, `veterinario`, `leitura`.
