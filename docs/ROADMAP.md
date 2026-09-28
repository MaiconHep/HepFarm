# Roadmap do Projeto

## 📁 Fase 0: Arquitetura e Planejamento (Concluída)
- [x] Inspecionar o workspace e código existente.
- [x] Verificar configuração do Firebase existente.
- [x] Criar documentos arquiteturais (`PROJECT.md`, `ARCHITECTURE.md`, `DATABASE.md`, `BUSINESS_RULES.md`, `ROADMAP.md`).

## 🏗️ Fase 1: Fundação do Projeto (Concluída)
- [x] Limpeza e configuração do React, TypeScript, Vite, e Tailwind CSS.
- [x] Setup do Firebase (Authentication, Firestore, Storage, Hosting).
- [x] Implementação da Autenticação de usuários (Preparado p/ emulador local).
- [x] Estruturação do layout base responsivo (Sidebar, Topbar) usando Lucide Icons.
- [x] Implementação de navegação base com React Router.
- [x] Configuração de PWA (Progressive Web App).
- [x] Configuração de regras básicas de segurança no Firestore.

## 🐮 Fase 2: Gestão de Animais (Concluída)
- [x] Formulário inteligente de cadastro de animais (conectado ao Firestore).
- [x] Listagem completa do rebanho em tempo real (onSnapshot).
- [x] Implementação da busca global (ID, brinco, nome, RFID).
- [x] Sistema de filtros combináveis na listagem (Status).
- [x] Construção da Ficha Individual do Animal (Cabeçalho com foto e principais indicadores).
- [x] Aba "Resumo" da ficha com visão geral.

## 🧬 Fase 3: Genealogia (Concluída)
- [x] Sistema de relacionamento Pai/Mãe no cadastro.
- [x] Aba "Genealogia" na ficha do animal.
- [x] Listagem de descendentes.
- [x] Visualização gráfica simples da árvore genealógica.

## 🤰 Fase 4: Reprodução
- [x] Cadastro de cios e inseminações.
- [x] Registro de diagnósticos de gestação e secagem.
- [x] Formulário inteligente de Parto.
- [x] Lógica de criação automática de bezerro após parto.
- [x] Cálculo automático de previsão de parto e atualização de status do animal.
- [x] Aba "Reprodução" na ficha do animal.

## 🥛 Fase 5: Produção de Leite
- [x] Registro de ordenhas (manhã, tarde, noite, qualidade).
- [ ] Gerenciamento de Lactações (entidade independente).
- [ ] Gráficos comparativos de produção e médias diárias.
- [x] Aba "Produção" e "Lactações" na ficha do animal.

## 🩺 Fase 6: Saúde e Medicamentos
- [x] Prontuário de eventos sanitários (doenças, lesões).
- [x] Cadastro de tratamentos e medicamentos.
- [x] Gestão de estoque e validade de medicamentos.
- [x] Registro de vacinas.
- [ ] Lógica de cálculo e bloqueio por período de carência (carne/leite).
- [ ] Aba "Saúde" na ficha do animal.

## ⚖️ Fase 7: Pesagens e Alimentação
- [ ] Registro de pesagens e ECC (Escore de Condição Corporal).
- [ ] Gráfico de evolução de peso e ganhos.
- [ ] Estrutura inicial de dieta e alimentação.
- [ ] Aba "Pesagens" e "Alimentação" na ficha.

## 💰 Fase 8: Financeiro do Animal
- [ ] Associação de custos (medicamentos, sêmen, veterinário) à ficha.
- [ ] Associação de receitas (venda de leite, bezerro).
- [ ] Aba "Financeiro" e cálculo do custo/lucro acumulado por animal.

## 📊 Fase 9: Dashboard e Timeline
- [x] Geração automática da Linha do Tempo (Timeline cronológica) na ficha do animal agregando todos os eventos.
- [x] Dashboard Geral da propriedade (Visão geral, totais por categoria).
- [x] Gráficos e indicadores da situação reprodutiva e produtiva geral.

## 📅 Fase 10: Agenda e Alertas
- [ ] Sistema de alertas na ficha e no dashboard (carência, vacinação próxima, parto próximo).
- [ ] Calendário/Agenda de eventos da fazenda baseada nas previsões e registros.

## 📈 Fase 11: Relatórios
- [ ] Geração de relatórios consolidados da propriedade.

## 🔐 Fase 12: Segurança, Testes e Polimento
- [ ] Refinamento das Firestore Security Rules (RBAC - admin, gerente, veterinário).
- [ ] Criação dos dados de demonstração ("Fazenda Modelo").
- [ ] Bateria de testes nos fluxos principais (desktop e mobile).
- [ ] Otimização de consultas, leitura e UX.
