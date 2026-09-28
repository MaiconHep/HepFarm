import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Semen {
  id: string; // Id interno uuid
  internal_id: string; // Id interno visível
  supplier: string; // Fornecedor
  full_name: string; // Nome completo
  short_name: string; // Apelido/nome curto
  naab_code: string; // Código NAAB
  breed: string; // Raça
  variety: string; // Variedade
  origin_country: string; // País de origem
  semen_type: string; // Tipo de sêmen (Convencional, Sexado Fêmea, Sexado Macho)
  notes: string; // Observações
  stock: number; // Doses disponíveis
}

export interface ReproductionEvent {
  id: string;
  animal_id: string; // Vaca
  type: 'cio' | 'inseminacao' | 'diagnostico_gestacao' | 'parto';
  date: string;
  semen_id?: string; // Se for inseminação
  inseminator?: string; // Nome de quem inseminou
  diagnosis_result?: 'positiva' | 'negativa' | 'inconclusiva';
  calf_id?: string; // Se for parto e gerou bezerro
  notes?: string;
  created_at: string;
}

export interface Medicine {
  id: string;
  name: string; // Nome do medicamento/vacina
  active_ingredient?: string; // Princípio ativo
  type: 'Vacina' | 'Antibiótico' | 'Antiparasitário' | 'Anti-inflamatório' | 'Outro';
  stock: number; // Quantidade
  unit: 'Doses' | 'ml' | 'Comprimidos' | 'Caixas';
  withdrawal_meat_days?: number; // Carência carne
  withdrawal_milk_days?: number; // Carência leite
  expiration_date?: string; // Validade
}

export interface HealthEvent {
  id: string;
  animal_id: string;
  type: 'Vacinação' | 'Tratamento' | 'Exame' | 'Enfermidade' | 'Manejo';
  date: string;
  description: string;
  medicine_id?: string;
  medicine_dose?: string;
  veterinarian?: string;
  status: 'Concluído' | 'Em Andamento';
  created_at: string;
}

export interface MilkRecord {
  id: string;
  animal_id: string;
  date: string;
  shift: 'Manhã' | 'Tarde' | 'Noite' | 'Total Diário';
  volume_liters: number;
  created_at: string;
}

export interface Lactation {
  id: string;
  animal_id: string;
  start_date: string;
  end_date: string | null;
  expected_end_date: string | null;
  total_volume: number; // Atualizado conforme lançamentos
  status: 'Em Andamento' | 'Encerrada';
}

export interface Animal {
  id: string; // uuid interno do sistema
  id_interno: string; // Ex: VAC-0025 (Gerado ou customizado pelo usuário)
  name: string;
  earring_number: string;
  rfid: string;
  birth_date: string | null;
  sex: string;
  breed: string;
  coat: string; // Pelagem
  category: string;
  status: string;
  photo_url: string;
  entry_date: string | null;
  origin: string;
  batch: string; // Lote
  location: string; // Localização
  notes: string; // Observações
  mother_id?: string;
  father_id?: string;
  father_type?: 'bull' | 'semen'; // Diferencia se o pai é do rebanho ou de catálogo
  created_at: string;
  updated_at: string;
  summary: {
    last_weight: number | null;
  };
}

interface AppState {
  animals: Animal[];
  semenInventory: Semen[];
  reproductionEvents: ReproductionEvent[];
  medicineInventory: Medicine[];
  healthEvents: HealthEvent[];
  milkRecords: MilkRecord[];
  lactations: Lactation[];
  
  addAnimal: (animal: Animal) => void;
  updateAnimal: (id: string, animal: Partial<Animal>) => void;
  deleteAnimal: (id: string) => void;
  addSemen: (semen: Semen) => void;
  updateSemenStock: (id: string, quantity: number) => void;
  addReproductionEvent: (event: ReproductionEvent) => void;
  addMedicine: (medicine: Medicine) => void;
  updateMedicineStock: (id: string, quantity: number) => void;
  addHealthEvent: (event: HealthEvent) => void;
  addMilkRecord: (record: MilkRecord) => void;
  startLactation: (lactation: Lactation) => void;
  endLactation: (id: string, end_date: string) => void;
  
  loadDemoData: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      animals: [],
      semenInventory: [],
      reproductionEvents: [],
      medicineInventory: [],
      healthEvents: [],
      milkRecords: [],
      lactations: [],
      
      addAnimal: (animal) => set((state) => ({ 
        animals: [...state.animals, animal] 
      })),
      
      updateAnimal: (id, updatedData) => set((state) => ({
        animals: state.animals.map(a => a.id === id ? { ...a, ...updatedData, updated_at: new Date().toISOString() } : a)
      })),
      
      deleteAnimal: (id) => set((state) => ({
        animals: state.animals.filter(a => a.id !== id)
      })),

      addSemen: (semen) => set((state) => ({
        semenInventory: [...state.semenInventory, semen]
      })),

      updateSemenStock: (id, quantity) => set((state) => ({
        semenInventory: state.semenInventory.map(s => s.id === id ? { ...s, stock: s.stock + quantity } : s)
      })),

      addReproductionEvent: (event) => set((state) => ({
        reproductionEvents: [...state.reproductionEvents, event]
      })),

      addMedicine: (medicine) => set((state) => ({
        medicineInventory: [...state.medicineInventory, medicine]
      })),

      updateMedicineStock: (id, quantity) => set((state) => ({
        medicineInventory: state.medicineInventory.map(m => m.id === id ? { ...m, stock: m.stock + quantity } : m)
      })),

      addHealthEvent: (event) => set((state) => ({
        healthEvents: [...state.healthEvents, event]
      })),

      addMilkRecord: (record) => set((state) => {
        // Also update total volume of current lactation
        const currentLact = state.lactations.find(l => l.animal_id === record.animal_id && l.status === 'Em Andamento');
        
        return {
          milkRecords: [...state.milkRecords, record],
          lactations: currentLact 
            ? state.lactations.map(l => l.id === currentLact.id ? { ...l, total_volume: l.total_volume + record.volume_liters } : l)
            : state.lactations
        };
      }),
      
      startLactation: (lactation) => set((state) => {
        // Encerra qualquer lactação anterior
        const updatedLacts = state.lactations.map(l => 
          (l.animal_id === lactation.animal_id && l.status === 'Em Andamento') 
            ? { ...l, status: 'Encerrada', end_date: lactation.start_date } as Lactation
            : l
        );
        return { lactations: [...updatedLacts, lactation] };
      }),
      
      endLactation: (id, end_date) => set((state) => ({
        lactations: state.lactations.map(l => l.id === id ? { ...l, status: 'Encerrada', end_date } : l)
      })),
      
      loadDemoData: () => set(() => {
        const now = new Date().toISOString();
        const baseProps = { 
          category: 'Vaca', status: 'Seca', sex: 'Fêmea', breed: 'Holandesa', 
          coat: 'Preta e Branca', created_at: now, updated_at: now, 
          entry_date: now, origin: 'Fazenda Modelo', batch: '', location: '', notes: '', summary: { last_weight: 450 } 
        };

        // Avós Maternos
        const avoMaterno = { ...baseProps, id: 'avo-mat', id_interno: 'TOU-001', name: 'Imperador', earring_number: '1001', rfid: '', sex: 'Macho', category: 'Touro', birth_date: '2015-01-10' };
        const avoMaterna = { ...baseProps, id: 'ava-mat', id_interno: 'VAC-001', name: 'Rainha', earring_number: '2001', rfid: '', birth_date: '2016-05-20' };

        // Avós Paternos
        const avoPaterno = { ...baseProps, id: 'avo-pat', id_interno: 'TOU-002', name: 'Soberano', earring_number: '1002', rfid: '', sex: 'Macho', category: 'Touro', birth_date: '2014-11-12' };
        const avoPaterna = { ...baseProps, id: 'ava-pat', id_interno: 'VAC-002', name: 'Duquesa', earring_number: '2002', rfid: '', birth_date: '2017-02-15' };

        // Pai e Mãe
        const pai = { ...baseProps, id: 'pai', id_interno: 'TOU-003', name: 'Apollo', earring_number: '1003', rfid: '', sex: 'Macho', category: 'Touro', birth_date: '2019-03-10', father_id: 'avo-pat', mother_id: 'ava-pat' };
        const mae = { ...baseProps, id: 'mae', id_interno: 'VAC-003', name: 'Estrela', earring_number: '2003', rfid: '', birth_date: '2020-04-18', father_id: 'avo-mat', mother_id: 'ava-mat' };

        // Animal Principal (Mimosa)
        const mimosa = { ...baseProps, id: 'mimosa', id_interno: 'VAC-004', name: 'Mimosa', earring_number: '2004', rfid: '982000123456789', status: 'Lactante', birth_date: '2022-03-15', father_id: 'pai', mother_id: 'mae' };

        // Filha (Bezerra)
        const bezerra = { ...baseProps, id: 'bezerra', id_interno: 'BEZ-001', name: 'Princesa', earring_number: '2005', rfid: '', category: 'Bezerra', status: 'Recria', birth_date: '2024-08-01', father_id: 'pai', mother_id: 'mimosa' };

        const semenDemo: Semen[] = [
          { id: 'sem-1', internal_id: 'SEM-001', supplier: 'Alta Genetics', full_name: 'Fabuloso da Silva', short_name: 'Fabuloso', naab_code: '011HO12345', breed: 'Holandês', variety: 'Preto e Branco', origin_country: 'Brasil', semen_type: 'Sexado Fêmea', notes: 'Excelente conformação', stock: 10 },
          { id: 'sem-2', internal_id: 'SEM-002', supplier: 'CRV Lagoa', full_name: 'Batalhador Supremo', short_name: 'Batalhador', naab_code: '029GI98765', breed: 'Girolando', variety: '5/8', origin_country: 'Brasil', semen_type: 'Convencional', notes: '', stock: 5 }
        ];

        const medDemo: Medicine[] = [
          { id: 'med-1', name: 'Ocitocina Forte', type: 'Outro', stock: 50, unit: 'ml', withdrawal_milk_days: 0, withdrawal_meat_days: 0 },
          { id: 'med-2', name: 'Vacina Aftosa', type: 'Vacina', stock: 100, unit: 'Doses', withdrawal_milk_days: 0, withdrawal_meat_days: 0 },
          { id: 'med-3', name: 'Antibiótico C', type: 'Antibiótico', stock: 20, unit: 'ml', withdrawal_milk_days: 5, withdrawal_meat_days: 28 },
        ];

        return { 
          animals: [avoMaterno, avoMaterna, avoPaterno, avoPaterna, pai, mae, mimosa, bezerra],
          semenInventory: semenDemo,
          medicineInventory: medDemo
        };
      }),
    }),
    {
      name: 'hepfarm-storage', // Nome da key no LocalStorage
    }
  )
);
