# Gestão Pecuária - Visão Geral do Projeto

## Objetivo
Criar uma aplicação web completa para gerenciamento de uma propriedade rural com foco em gado leiteiro (com estrutura flexível para gado de corte). O sistema deve funcionar como um **prontuário digital individual** para o rebanho, reunindo todo o histórico de vida de cada animal, desde o nascimento até a saída da propriedade.

## Princípio Central
Cada animal possui uma **ficha individual permanente**. Todos os acontecimentos (reprodução, partos, saúde, vacinações, pesagens, produção e finanças) devem ser registrados como eventos e relacionados ao seu ID interno e inalterável.

## Stack Tecnológico
- **Frontend:** React, TypeScript, Vite.
- **Estilização e UI:** Tailwind CSS, Lucide Icons.
- **Backend / BaaS (Firebase):**
  - **Authentication:** Gerenciamento de usuários e níveis de acesso (admin, funcionário, veterinário).
  - **Cloud Firestore:** Banco de dados NoSQL para armazenar cadastros e o histórico de cada animal através de coleções e subcoleções.
  - **Cloud Storage:** Armazenamento de fotos (animais, exames, receitas).
  - **Hosting:** Hospedagem da aplicação web.

## UX / UI
A interface deve ser moderna, limpa, responsiva e otimizada para dispositivos móveis (prioridade *mobile-first* para uso em campo). A linguagem adotada na interface deve estar alinhada ao dia a dia da propriedade rural (ex: "Registrar bezerro" em vez de "Criar animal").
