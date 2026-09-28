import React, { useState } from 'react';
import { useStore, Semen } from '../store/useStore';
import { v4 as uuidv4 } from 'uuid';
import { Beaker, Plus, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ScreenReproducao() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Estoque de Sêmen');
  const [showAddForm, setShowAddForm] = useState(false);
  
  const semenInventory = useStore(state => state.semenInventory);
  const addSemen = useStore(state => state.addSemen);
  
  const [formData, setFormData] = useState({
    internal_id: '',
    supplier: '',
    full_name: '',
    short_name: '',
    naab_code: '',
    breed: 'Holandês',
    variety: '',
    origin_country: 'Brasil',
    semen_type: 'Convencional',
    notes: '',
    stock: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSemen = (e: React.FormEvent) => {
    e.preventDefault();
    const newSemen: Semen = {
      id: uuidv4(),
      internal_id: formData.internal_id || `SEM-${Math.floor(1000 + Math.random() * 9000)}`,
      supplier: formData.supplier,
      full_name: formData.full_name,
      short_name: formData.short_name,
      naab_code: formData.naab_code,
      breed: formData.breed,
      variety: formData.variety,
      origin_country: formData.origin_country,
      semen_type: formData.semen_type,
      notes: formData.notes,
      stock: parseInt(formData.stock) || 0
    };
    addSemen(newSemen);
    setShowAddForm(false);
    setFormData({ internal_id: '', supplier: '', full_name: '', short_name: '', naab_code: '', breed: 'Holandês', variety: '', origin_country: 'Brasil', semen_type: 'Convencional', notes: '', stock: '' });
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', margin: 0, color: 'var(--text)' }}>Reprodução</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>Gestão reprodutiva e estoque de sêmen</p>
        </div>
      </div>

      <div className="filter-tabs" style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', overflowX: 'auto' }}>
        {['Painel Geral', 'Estoque de Sêmen', 'Inseminações', 'Diagnóstico de Gestação', 'Partos'].map(t => (
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

      {activeTab === 'Estoque de Sêmen' && (
        <div className="card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Beaker size={18} /> Catálogo de Sêmen (Botijão)
            </h3>
            <button 
              onClick={() => setShowAddForm(true)}
              style={{ padding: '8px 16px', background: 'var(--green-primary)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}
            >
              <Plus size={16} /> Novo Lote
            </button>
          </div>

          {showAddForm && (
            <div style={{ padding: '20px', background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-light)' }}>
              <form onSubmit={handleAddSemen} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>ID Interno</label>
                  <input type="text" name="internal_id" value={formData.internal_id} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }} placeholder="Automático se vazio" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Apelido / Nome Curto *</label>
                  <input type="text" name="short_name" value={formData.short_name} onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Nome Completo</label>
                  <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Código NAAB *</label>
                  <input type="text" name="naab_code" value={formData.naab_code} onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Fornecedor</label>
                  <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Raça *</label>
                  <select name="breed" value={formData.breed} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', background: '#fff' }}>
                    <option value="Holandês">Holandês</option>
                    <option value="Jersey">Jersey</option>
                    <option value="Girolando">Girolando</option>
                    <option value="Nelore">Nelore</option>
                    <option value="Angus">Angus</option>
                    <option value="Outra">Outra</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Variedade</label>
                  <input type="text" name="variety" value={formData.variety} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>País de Origem</label>
                  <input type="text" name="origin_country" value={formData.origin_country} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Tipo de Sêmen *</label>
                  <select name="semen_type" value={formData.semen_type} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', background: '#fff' }}>
                    <option value="Convencional">Convencional</option>
                    <option value="Sexado Fêmea">Sexado Fêmea</option>
                    <option value="Sexado Macho">Sexado Macho</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Qtd. Doses *</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Observações</label>
                  <textarea name="notes" value={formData.notes} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }} />
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
                  <th>Touro</th>
                  <th>NAAB / Raça</th>
                  <th>Fornecedor</th>
                  <th>Tipo</th>
                  <th>Doses em Estoque</th>
                </tr>
              </thead>
              <tbody>
                {semenInventory.length === 0 ? (
                  <tr><td colSpan={5} style={{ textAlign: 'center', padding: '20px' }}>Nenhum lote de sêmen cadastrado.</td></tr>
                ) : (
                  semenInventory.map(s => (
                    <tr key={s.id}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{s.short_name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{s.full_name}</div>
                      </td>
                      <td>
                        <div>{s.naab_code}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{s.breed} {s.variety ? `- ${s.variety}` : ''}</div>
                      </td>
                      <td className="muted">{s.supplier || '-'}</td>
                      <td className="muted">{s.semen_type}</td>
                      <td>
                        <div style={{ display: 'inline-block', padding: '4px 12px', background: s.stock > 0 ? '#dcfce7' : '#fee2e2', color: s.stock > 0 ? '#166534' : '#991b1b', borderRadius: '20px', fontWeight: 600, fontSize: '13px' }}>
                          {s.stock} doses
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Inseminações' && (
        <div className="card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Beaker size={18} /> Lançar Nova Inseminação
            </h3>
          </div>

          <div style={{ padding: '24px' }}>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const animalId = formData.get('animal_id') as string;
              const semenId = formData.get('semen_id') as string;
              const inseminator = formData.get('inseminator') as string;
              const date = formData.get('date') as string;

              // Validate
              if (!animalId || !semenId || !date) {
                alert('Preencha os campos obrigatórios');
                return;
              }

              // Create event
              useStore.getState().addReproductionEvent({
                id: uuidv4(),
                animal_id: animalId,
                type: 'inseminacao',
                date: date,
                semen_id: semenId,
                inseminator: inseminator,
                created_at: new Date().toISOString()
              });

              // Deduct stock
              useStore.getState().updateSemenStock(semenId, -1);
              
              // Update animal status to Prenhe? No, we don't know if it's pregnant yet, but we can put "Inseminada". Wait, the status list only has "Lactante", "Seca", "Prenhe", "Apta", "Tratamento", "Recria". Let's update to "Apta" or leave it. Actually, "Inseminada" is a great status. Let's just use "Inseminada" and add it to the status list in Cadastro.
              useStore.getState().updateAnimal(animalId, { status: 'Inseminada' });
              
              alert('Inseminação lançada com sucesso! 1 dose descontada do estoque.');
              (e.target as HTMLFormElement).reset();
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Fêmea (Vaca/Novilha) *</label>
                  <select name="animal_id" required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: '#fff' }}>
                    <option value="">Selecione...</option>
                    {useStore.getState().animals.filter(a => a.sex === 'Fêmea').map(a => (
                      <option key={a.id} value={a.id}>{a.earring_number} {a.name ? `- ${a.name}` : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Sêmen Utilizado *</label>
                  <select name="semen_id" required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: '#fff' }}>
                    <option value="">Selecione do Estoque...</option>
                    {semenInventory.filter(s => s.stock > 0).map(s => (
                      <option key={s.id} value={s.id}>{s.short_name} ({s.stock} doses disp.)</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Data da Inseminação *</label>
                  <input type="date" name="date" required defaultValue={new Date().toISOString().split('T')[0]} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Inseminador</label>
                  <input type="text" name="inseminator" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} placeholder="Nome do profissional" />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" style={{ padding: '10px 24px', background: 'var(--green-primary)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Save size={18} /> Salvar Inseminação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'Diagnóstico de Gestação' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ margin: 0, fontSize: '16px' }}>Fêmeas Inseminadas Aguardando Diagnóstico</h3>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Fêmea</th>
                  <th>Última Inseminação</th>
                  <th>Dias desde Inseminação</th>
                  <th>Ações de Diagnóstico</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const inseminated = useStore.getState().animals.filter(a => a.status === 'Inseminada');
                  if (inseminated.length === 0) {
                    return <tr><td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>Nenhuma fêmea com status "Inseminada".</td></tr>;
                  }
                  return inseminated.map(cow => {
                    // Buscar último evento de inseminação para calcular dias
                    const events = useStore.getState().reproductionEvents.filter(e => e.animal_id === cow.id && e.type === 'inseminacao').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                    const lastEvent = events[0];
                    const days = lastEvent ? Math.floor((new Date().getTime() - new Date(lastEvent.date).getTime()) / (1000 * 3600 * 24)) : '?';
                    
                    return (
                      <tr key={cow.id}>
                        <td style={{ fontWeight: 600 }}>{cow.earring_number} {cow.name ? `- ${cow.name}` : ''}</td>
                        <td>{lastEvent ? new Date(lastEvent.date).toLocaleDateString('pt-BR') : 'Desconhecida'}</td>
                        <td>{days} dias</td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => {
                              useStore.getState().updateAnimal(cow.id, { status: 'Prenhe' });
                              useStore.getState().addReproductionEvent({
                                id: uuidv4(), animal_id: cow.id, type: 'diagnostico_gestacao', date: new Date().toISOString().split('T')[0], diagnosis_result: 'positiva', created_at: new Date().toISOString()
                              });
                              alert(`${cow.name || cow.earring_number} confirmada como Prenhe!`);
                            }} style={{ padding: '6px 12px', background: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>+ Positivo</button>
                            
                            <button onClick={() => {
                              useStore.getState().updateAnimal(cow.id, { status: 'Apta' });
                              useStore.getState().addReproductionEvent({
                                id: uuidv4(), animal_id: cow.id, type: 'diagnostico_gestacao', date: new Date().toISOString().split('T')[0], diagnosis_result: 'negativa', created_at: new Date().toISOString()
                              });
                              alert(`Diagnóstico negativo registrado para ${cow.name || cow.earring_number}. Retornou para Apta.`);
                            }} style={{ padding: '6px 12px', background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>- Negativo</button>
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

      {activeTab === 'Partos' && (
        <div className="card">
          <div className="card-header">
             <h3 style={{ margin: 0, fontSize: '16px' }}>Fêmeas Prenhes Aguardando Parto</h3>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Fêmea</th>
                  <th>Previsão de Parto (Baseado em 285 dias)</th>
                  <th>Sêmen / Pai</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const pregnant = useStore.getState().animals.filter(a => a.status === 'Prenhe');
                  if (pregnant.length === 0) {
                    return <tr><td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>Nenhuma fêmea com status "Prenhe".</td></tr>;
                  }
                  
                  return pregnant.map(cow => {
                    const events = useStore.getState().reproductionEvents.filter(e => e.animal_id === cow.id && e.type === 'inseminacao').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                    const lastInsemination = events[0];
                    
                    let expectedDate = 'Desconhecida';
                    let fatherName = 'Desconhecido';
                    
                    if (lastInsemination) {
                      const dateObj = new Date(lastInsemination.date);
                      dateObj.setDate(dateObj.getDate() + 285);
                      expectedDate = dateObj.toLocaleDateString('pt-BR');
                      
                      if (lastInsemination.semen_id) {
                        const s = semenInventory.find(sem => sem.id === lastInsemination.semen_id);
                        if (s) fatherName = s.short_name + ' (Sêmen)';
                      }
                    }

                    return (
                      <tr key={cow.id}>
                        <td style={{ fontWeight: 600 }}>{cow.earring_number} {cow.name ? `- ${cow.name}` : ''}</td>
                        <td>{expectedDate}</td>
                        <td className="muted">{fatherName}</td>
                        <td>
                          <button onClick={() => {
                              navigate('/rebanho/novo', { 
                                state: { 
                                  mother_id: cow.id, 
                                  father_id: lastInsemination?.semen_id || '', 
                                  father_type: lastInsemination?.semen_id ? 'semen' : 'bull',
                                  is_birth: true
                                }
                              });
                          }} style={{ padding: '6px 12px', background: 'var(--green-primary)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
                             🍼 Registrar Nascimento
                          </button>
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

      {activeTab !== 'Estoque de Sêmen' && activeTab !== 'Inseminações' && activeTab !== 'Diagnóstico de Gestação' && activeTab !== 'Partos' && (
        <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
          Módulo "{activeTab}" em desenvolvimento.
        </div>
      )}
    </div>
  );
}
