import React, { useState } from 'react';
import { useStore, MilkRecord } from '../store/useStore';
import { v4 as uuidv4 } from 'uuid';
import { Milk, Save, Activity, Droplet } from 'lucide-react';

export default function ScreenLeite() {
  const [activeTab, setActiveTab] = useState('Lançamento em Lote');
  const animals = useStore(state => state.animals);
  const lactatingCows = animals.filter(a => a.status === 'Lactante');
  
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [shift, setShift] = useState<'Manhã' | 'Tarde' | 'Noite' | 'Total Diário'>('Manhã');
  
  // State for batch entry { [animal_id]: volume }
  const [batchVolumes, setBatchVolumes] = useState<{ [key: string]: string }>({});

  const handleBatchChange = (id: string, value: string) => {
    setBatchVolumes(prev => ({ ...prev, [id]: value }));
  };

  const handleSaveBatch = () => {
    const recordsToSave: MilkRecord[] = [];
    const timestamp = new Date().toISOString();
    
    Object.keys(batchVolumes).forEach(animal_id => {
      const vol = parseFloat(batchVolumes[animal_id]);
      if (vol > 0) {
        recordsToSave.push({
          id: uuidv4(),
          animal_id,
          date,
          shift,
          volume_liters: vol,
          created_at: timestamp
        });
      }
    });

    if (recordsToSave.length === 0) {
      alert('Nenhum volume válido informado.');
      return;
    }

    recordsToSave.forEach(r => useStore.getState().addMilkRecord(r));
    alert(`${recordsToSave.length} ordenhas registradas com sucesso!`);
    setBatchVolumes({});
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', margin: 0, color: 'var(--text)' }}>Produção de Leite</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>Controle leiteiro e gestão de ordenhas</p>
        </div>
      </div>

      <div className="filter-tabs" style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', overflowX: 'auto' }}>
        {['Painel Geral', 'Lançamento em Lote', 'Histórico', 'Secagem'].map(t => (
          <button
            key={t}
            className={`filter-tab ${activeTab === t ? 'active' : ''}`}
            onClick={() => setActiveTab(t)}
            style={{ fontSize: '14px', whiteSpace: 'nowrap' }}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === 'Lançamento em Lote' && (
        <div className="card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Milk size={18} /> Lançar Ordenha Coletiva
            </h3>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <input 
                type="date" 
                value={date} 
                onChange={e => setDate(e.target.value)}
                style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }}
              />
              <select 
                value={shift} 
                onChange={e => setShift(e.target.value as any)}
                style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', background: '#fff' }}
              >
                <option value="Manhã">Turno: Manhã</option>
                <option value="Tarde">Turno: Tarde</option>
                <option value="Noite">Turno: Noite</option>
                <option value="Total Diário">Total Diário (1 ordenha)</option>
              </select>
            </div>
          </div>
          
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Fêmea (Lactante)</th>
                  <th>Lote</th>
                  <th>Última Pesagem</th>
                  <th>Volume (Litros)</th>
                </tr>
              </thead>
              <tbody>
                {lactatingCows.length === 0 ? (
                  <tr><td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>Não há vacas lactantes no rebanho.</td></tr>
                ) : (
                  lactatingCows.map(cow => {
                    const records = useStore.getState().milkRecords.filter(r => r.animal_id === cow.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                    const lastRecord = records[0];
                    
                    return (
                      <tr key={cow.id}>
                        <td style={{ fontWeight: 600 }}>{cow.earring_number} {cow.name ? `- ${cow.name}` : ''}</td>
                        <td className="muted">{cow.batch || '-'}</td>
                        <td className="muted">
                          {lastRecord ? `${lastRecord.volume_liters} L (${new Date(lastRecord.date).toLocaleDateString('pt-BR')})` : 'Sem registros'}
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                              type="number"
                              step="0.1"
                              placeholder="0.0"
                              value={batchVolumes[cow.id] || ''}
                              onChange={(e) => handleBatchChange(cow.id, e.target.value)}
                              style={{ width: '80px', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', textAlign: 'right' }}
                            />
                            <span style={{ color: 'var(--text-tertiary)', fontSize: '13px' }}>L</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          
          {lactatingCows.length > 0 && (
            <div style={{ padding: '20px', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px' }}>
              <div style={{ color: 'var(--text-secondary)' }}>
                <strong>Total do Lote:</strong> {Object.values(batchVolumes).reduce((acc, val) => acc + (parseFloat(val) || 0), 0).toFixed(1)} Litros
              </div>
              <button 
                onClick={handleSaveBatch}
                style={{ padding: '10px 24px', background: 'var(--green-primary)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}
              >
                <Save size={18} /> Salvar Ordenha
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'Histórico' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ margin: 0, fontSize: '16px' }}>Últimas Ordenhas Lançadas</h3>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Turno</th>
                  <th>Fêmea</th>
                  <th>Volume</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const records = useStore.getState().milkRecords.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 100); // last 100
                  if (records.length === 0) return <tr><td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>Nenhum registro.</td></tr>;
                  
                  return records.map(r => {
                    const animal = useStore.getState().animals.find(a => a.id === r.animal_id);
                    return (
                      <tr key={r.id}>
                        <td>{new Date(r.date).toLocaleDateString('pt-BR')}</td>
                        <td>{r.shift}</td>
                        <td style={{ fontWeight: 600 }}>{animal ? `${animal.earring_number} - ${animal.name}` : 'Desconhecida'}</td>
                        <td>
                          <div style={{ display: 'inline-block', padding: '4px 12px', background: '#dcfce7', color: '#166534', borderRadius: '20px', fontWeight: 600, fontSize: '13px' }}>
                            {r.volume_liters} L
                          </div>
                        </td>
                      </tr>
                    );
                  });
                })()}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab !== 'Lançamento em Lote' && activeTab !== 'Histórico' && (
        <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
          Módulo "{activeTab}" em desenvolvimento.
        </div>
      )}
    </div>
  );
}
