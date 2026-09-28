import React, { useState } from 'react';
import { useStore, Medicine } from '../store/useStore';
import { v4 as uuidv4 } from 'uuid';
import { Stethoscope, Plus, Save, X, Pill, Syringe } from 'lucide-react';

export default function ScreenSaude() {
  const [activeTab, setActiveTab] = useState('Medicamentos e Vacinas');
  const [showAddForm, setShowAddForm] = useState(false);
  
  const medicineInventory = useStore(state => state.medicineInventory);
  const addMedicine = useStore(state => state.addMedicine);
  
  const [formData, setFormData] = useState({
    name: '',
    active_ingredient: '',
    type: 'Vacina',
    stock: '',
    unit: 'Doses',
    withdrawal_meat_days: '0',
    withdrawal_milk_days: '0',
    expiration_date: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    const newMed: Medicine = {
      id: uuidv4(),
      name: formData.name,
      active_ingredient: formData.active_ingredient,
      type: formData.type as any,
      stock: parseInt(formData.stock) || 0,
      unit: formData.unit as any,
      withdrawal_meat_days: parseInt(formData.withdrawal_meat_days) || 0,
      withdrawal_milk_days: parseInt(formData.withdrawal_milk_days) || 0,
      expiration_date: formData.expiration_date
    };
    addMedicine(newMed);
    setShowAddForm(false);
    setFormData({ name: '', active_ingredient: '', type: 'Vacina', stock: '', unit: 'Doses', withdrawal_meat_days: '0', withdrawal_milk_days: '0', expiration_date: '' });
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', margin: 0, color: 'var(--text)' }}>Saúde e Medicamentos</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>Estoque veterinário, vacinações e prontuários</p>
        </div>
      </div>

      <div className="filter-tabs" style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', overflowX: 'auto' }}>
        {['Painel Geral', 'Medicamentos e Vacinas', 'Vacinações e Manejos', 'Prontuário (Doenças/Lesões)'].map(t => (
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

      {activeTab === 'Medicamentos e Vacinas' && (
        <div className="card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Pill size={18} /> Estoque Farmácia
            </h3>
            <button 
              onClick={() => setShowAddForm(true)}
              style={{ padding: '8px 16px', background: 'var(--green-primary)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}
            >
              <Plus size={16} /> Novo Item
            </button>
          </div>

          {showAddForm && (
            <div style={{ padding: '20px', background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-light)' }}>
              <form onSubmit={handleAddMedicine} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Nome (Produto) *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Princípio Ativo</label>
                  <input type="text" name="active_ingredient" value={formData.active_ingredient} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Tipo *</label>
                  <select name="type" value={formData.type} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', background: '#fff' }}>
                    <option value="Vacina">Vacina</option>
                    <option value="Antibiótico">Antibiótico</option>
                    <option value="Antiparasitário">Antiparasitário</option>
                    <option value="Anti-inflamatório">Anti-inflamatório</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Qtd. Estoque *</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} required style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }} />
                    <select name="unit" value={formData.unit} onChange={handleChange} style={{ width: '100px', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', background: '#fff' }}>
                      <option value="Doses">Doses</option>
                      <option value="ml">ml</option>
                      <option value="Comprimidos">Comps.</option>
                      <option value="Caixas">Caixas</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Carência Leite (Dias)</label>
                  <input type="number" name="withdrawal_milk_days" value={formData.withdrawal_milk_days} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Carência Carne (Dias)</label>
                  <input type="number" name="withdrawal_meat_days" value={formData.withdrawal_meat_days} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Data de Validade</label>
                  <input type="date" name="expiration_date" value={formData.expiration_date} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }} />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', gridColumn: '1 / -1', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setShowAddForm(false)} style={{ padding: '8px 16px', background: '#fff', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}>Cancelar</button>
                  <button type="submit" style={{ padding: '8px 24px', background: 'var(--green-primary)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Salvar</button>
                </div>
              </form>
            </div>
          )}

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Tipo</th>
                  <th>Estoque</th>
                  <th>Carência (Leite / Carne)</th>
                  <th>Validade</th>
                </tr>
              </thead>
              <tbody>
                {medicineInventory.length === 0 ? (
                  <tr><td colSpan={5} style={{ textAlign: 'center', padding: '20px' }}>Nenhum item cadastrado na farmácia.</td></tr>
                ) : (
                  medicineInventory.map(m => (
                    <tr key={m.id}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{m.name}</div>
                        {m.active_ingredient && <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{m.active_ingredient}</div>}
                      </td>
                      <td className="muted">{m.type}</td>
                      <td>
                        <div style={{ display: 'inline-block', padding: '4px 12px', background: m.stock > 0 ? '#dcfce7' : '#fee2e2', color: m.stock > 0 ? '#166534' : '#991b1b', borderRadius: '20px', fontWeight: 600, fontSize: '13px' }}>
                          {m.stock} {m.unit}
                        </div>
                      </td>
                      <td className="muted">
                        {m.withdrawal_milk_days || 0} dias / {m.withdrawal_meat_days || 0} dias
                      </td>
                      <td className="muted">{m.expiration_date ? new Date(m.expiration_date).toLocaleDateString('pt-BR') : '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Prontuário (Doenças/Lesões)' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ margin: 0, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Stethoscope size={18} /> Lançar Tratamento Médico
            </h3>
          </div>
          
          <div style={{ padding: '24px' }}>
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget);
              const animal_id = form.get('animal_id') as string;
              const medicine_id = form.get('medicine_id') as string;
              const type = form.get('type') as any;
              
              useStore.getState().addHealthEvent({
                id: uuidv4(),
                animal_id,
                type,
                date: form.get('date') as string,
                description: form.get('description') as string,
                medicine_id: medicine_id || undefined,
                medicine_dose: form.get('medicine_dose') as string,
                veterinarian: form.get('veterinarian') as string,
                status: form.get('status') as any,
                created_at: new Date().toISOString()
              });
              
              if (medicine_id) {
                const dose = parseFloat(form.get('medicine_dose') as string) || 1;
                useStore.getState().updateMedicineStock(medicine_id, -dose);
              }
              
              alert('Evento de saúde registrado no prontuário do animal!');
              (e.target as HTMLFormElement).reset();
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Animal *</label>
                  <select name="animal_id" required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: '#fff' }}>
                    <option value="">Selecione...</option>
                    {useStore.getState().animals.map(a => (
                      <option key={a.id} value={a.id}>{a.earring_number} {a.name ? `- ${a.name}` : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Tipo de Evento *</label>
                  <select name="type" required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: '#fff' }}>
                    <option value="Tratamento">Tratamento</option>
                    <option value="Vacinação">Vacinação</option>
                    <option value="Enfermidade">Doença / Enfermidade</option>
                    <option value="Exame">Exame</option>
                    <option value="Manejo">Manejo</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Data *</label>
                  <input type="date" name="date" required defaultValue={new Date().toISOString().split('T')[0]} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Status *</label>
                  <select name="status" required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: '#fff' }}>
                    <option value="Em Andamento">Em Andamento</option>
                    <option value="Concluído">Concluído</option>
                  </select>
                </div>
                
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Descrição / Diagnóstico *</label>
                  <input type="text" name="description" required placeholder="Ex: Casqueamento, Tratamento de mastite, etc" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} />
                </div>

                <div style={{ gridColumn: '1 / -1', background: 'var(--bg-primary)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: 'var(--text)' }}>Uso de Medicamento (Opcional)</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Medicamento da Farmácia</label>
                      <select name="medicine_id" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: '#fff' }}>
                        <option value="">Nenhum</option>
                        {medicineInventory.filter(m => m.stock > 0).map(m => (
                          <option key={m.id} value={m.id}>{m.name} ({m.stock} {m.unit} disponíveis)</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Dose Administrada</label>
                      <input type="text" name="medicine_dose" placeholder="Ex: 5 ml" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Veterinário Responsável</label>
                      <input type="text" name="veterinarian" placeholder="Nome / CRMV" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" style={{ padding: '10px 24px', background: 'var(--green-primary)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Save size={18} /> Salvar no Prontuário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeTab !== 'Medicamentos e Vacinas' && activeTab !== 'Prontuário (Doenças/Lesões)' && (
        <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
          Módulo "{activeTab}" em desenvolvimento.
        </div>
      )}
    </div>
  );
}
