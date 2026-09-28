# Banco de Dados (Cloud Firestore)

A estrutura de banco de dados no Firestore deve ser pensada para maximizar a performance e minimizar custos de leitura e escrita.

## Coleções Raiz (Root Collections)

- `users`
  - Informações dos usuários, permissões, função.
- `farms`
  - Dados gerais da propriedade, configurações, métricas consolidadas.
- `medications`, `vaccines`, `semen`, `bulls`, `feed_products`
  - Catálogos de referência globais da fazenda.
- `tasks`
  - Calendário, agenda e alertas globais, incluindo referência aos animais.

## Estrutura Principal: `animals` (Root Collection)
Contém os documentos principais de cada animal da propriedade.

**Documento `animals/{animalId}`:**
```json
{
  "id_interno": "string (permanente)",
  "name": "string",
  "earring_number": "string",
  "rfid": "string",
  "registration_number": "string",
  "breed": "string",
  "sex": "string (F|M)",
  "category": "string (Vaca, Novilha, Touro...)",
  "birth_date": "timestamp",
  "origin": "string",
  "entry_date": "timestamp",
  "exit_date": "timestamp",
  "exit_reason": "string",
  "coat": "string",
  "photo_url": "string",
  "current_batch": "string",
  "status": "string",
  "mother_id": "string (referência nula se não souber)",
  "father_id": "string (referência)",
  
  // Dados de resumo (desnormalizados para performance do dashboard)
  "summary": {
    "lactation_number": "number",
    "days_in_milk": "number",
    "current_production": "number",
    "last_weight": "number",
    "reproductive_status": "string (Prenhe, Vazia...)",
    "last_calving_date": "timestamp",
    "estimated_calving_date": "timestamp"
  },
  
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

## Subcoleções de `animals/{animalId}`
Histórico contínuo do animal.

1. **`reproductive_events`**: Cios, inseminações, diagnósticos de gestação, secagens.
2. **`births`**: Partos relacionados à matriz, com referência ao `animalId` do bezerro criado.
3. **`health_events`**: Problemas de saúde, mastite, problemas locomotores.
4. **`treatments`**: Tratamentos, medicamentos aplicados e período de carência.
5. **`vaccinations`**: Vacinas e reforços.
6. **`milk_records`**: Controle leiteiro (ordenhas, produção diária).
7. **`lactations`**: Agrupamento lógico, ciclos do período de lactação.
8. **`weights`**: Pesagens, histórico de evolução.
9. **`movements`**: Entrada, saída, troca de lote.
10. **`expenses`**: Transações financeiras atreladas ao animal (medicamentos, exames, venda).
