# Regras de Negócio e Cálculos

## 1. Cálculo de Previsão de Parto
- **Regra Base:** Após diagnóstico positivo de gestação ou cálculo provisório após inseminação, a previsão de parto deve ser calculada somando **280 dias** à data da inseminação efetiva.
- *Nota:* O tempo exato pode variar por raça. O sistema deve permitir configurar essa média nas definições da fazenda, mas o padrão será 280.

## 2. Cálculo de Idade
- **Regra:** Idade é baseada na diferença entre a Data de Nascimento e a Data Atual (ou a data de morte/venda).
- Deve ser exibida de maneira legível: "3 anos, 2 meses", "45 dias".

## 3. Período de Carência (Leite e Carne)
- **Restrição Crucial:** O sistema *nunca* deve inferir ou chutar um período de carência. Esses dados devem ser explicitamente cadastrados no perfil do medicamento e confirmados no momento da aplicação do tratamento.
- **Cálculo da Data de Liberação:** `Data de Término do Tratamento + Período de Carência (em dias)`.
- **Alerta:** Se a data atual for menor que a data de liberação, o animal é marcado com status crítico no sistema: "Animal em Carência" (leite descartado/impróprio para consumo ou venda de carne bloqueada).

## 4. Criação Automática de Descendentes
- **Fluxo de Parto:** Ao registrar um parto que resulte em filhote vivo (normal, auxiliado, cesariana), o sistema deve oferecer ao usuário a opção de "Criar bezerro/bezerra agora".
- **Preenchimento Prévio:** Se o usuário concordar, o formulário de cadastro abre pré-preenchido: `mãe = animalAtual.id`, `pai = touro_da_inseminacao_relacionada.id`, `data de nascimento = data do parto`, `sexo` (puxado do registro do parto).

## 5. Exclusão de Registros e Animais
- **Princípio de não-destruição:** O sistema não deve utilizar exclusão física (`delete`) para animais que possuam vínculos importantes (inseminações, partos, tratamentos, filhos registrados).
- **Soft Delete / Arquivamento:** Implementar exclusão lógica (`status = 'arquivado'` ou `is_deleted = true`).
- Se o usuário tentar excluir (hard delete) um animal com dependências, exibir um erro explicando a estrutura histórica e recomendar alteração de status para "Descartado", "Vendido" ou "Morto".

## 6. Dias em Lactação (DEL)
- **Cálculo:** Diferença entre a Data de Início da Lactação atual (normalmente atrelada ao último parto) e a Data Atual.
- A contagem encerra no dia que ocorre a *Secagem* do animal.

## 7. Status do Animal
O status do animal é derivado de sua idade, sexo, fase produtiva e reprodutiva. Mudanças de status são disparadas por eventos (inseminação, diagnóstico, secagem, parto, movimentação de saída). Exemplos de status:
- Lactante, Seca, Prenhe, Novilha, Bezerra, Touro, Vendido, Morto.
