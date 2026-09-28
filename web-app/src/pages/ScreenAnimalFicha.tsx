import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ArrowLeft, Activity, Calendar, Scale, Milk, Tag, MapPin, Hash, BookOpen, Stethoscope, Baby } from 'lucide-react';
import { PiCow } from 'react-icons/pi';

export default function ScreenAnimalFicha() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const animal = useStore(state => state.animals.find(a => a.id === id));
  
  const [activeTab, setActiveTab] = useState('Identificação');

  if (!animal) {
    return (
      <div style={{ padding: 24 }}>
        <p>Animal não encontrado no banco local.</p>
        <button onClick={() => navigate('/rebanho')}>Voltar</button>
      </div>
    );
  }

  const TABS = ['Resumo', 'Identificação', 'Genealogia', 'Reprodução', 'Produção', 'Saúde', 'Timeline'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Lactante': return 'green';
      case 'Tratamento': return 'red';
      case 'Seca': return 'gray';
      case 'Prenhe': return 'blue';
      case 'Apta': return 'orange';
      default: return 'gray';
    }
  };

  const getBirthDate = () => {
    if (!animal.birth_date) return 'Não informada';
    return new Date(animal.birth_date).toLocaleDateString('pt-BR');
  };

  const getEntryDate = () => {
    if (!animal.entry_date) return 'Não informada';
    return new Date(animal.entry_date).toLocaleDateString('pt-BR');
  };

  const InfoCard = ({ icon: Icon, title, value }: any) => (
    <div style={{ display: 'flex', gap: '12px', padding: '12px 0', borderBottom: '1px solid var(--border-light)' }}>
      <div style={{ padding: '8px', background: 'var(--bg-primary)', borderRadius: '8px', height: 'fit-content' }}>
        <Icon size={18} color="var(--text-tertiary)" />
      </div>
      <div>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '2px' }}>{title}</div>
        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>{value || '-'}</div>
      </div>
    </div>
  );

  return (
    <div className="animal-ficha-container" style={{ padding: '0 0 24px 0' }}>
      {/* HEADER */}
      <div className="card" style={{ padding: '24px', marginBottom: '20px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        <button 
          onClick={() => navigate('/rebanho')}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '50%', marginTop: '4px' }}
        >
          <ArrowLeft size={20} color="var(--text)" />
        </button>
        
        <div style={{ width: '100px', height: '100px', background: '#f3f4f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <PiCow size={48} color="#9ca3af" />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <h1 style={{ margin: 0, fontSize: '24px', color: 'var(--text)' }}>
              {animal.name ? `${animal.name} (${animal.earring_number})` : animal.earring_number}
            </h1>
            <div className="rebanho-status" style={{ padding: '4px 12px', background: 'var(--bg-primary)' }}>
              <div className={`status-dot ${getStatusColor(animal.status)}`} />
              <span style={{ fontWeight: 600 }}>{animal.status}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '24px', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>
            <div><strong>ID:</strong> {animal.id_interno}</div>
            <div><strong>Brinco:</strong> {animal.earring_number}</div>
            <div><strong>Categoria:</strong> {animal.category}</div>
            <div><strong>Nascimento:</strong> {getBirthDate()}</div>
          </div>

          {/* Quick indicators */}
          <div style={{ display: 'flex', gap: '12px' }}>
             <div style={{ background: '#f0fdf4', padding: '8px 16px', borderRadius: '8px', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <Milk size={16} color="#16a34a" />
               <span style={{ fontSize: '13px', color: '#16a34a', fontWeight: 600 }}>Produção Atual: -- L</span>
             </div>
             <div style={{ background: '#eff6ff', padding: '8px 16px', borderRadius: '8px', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <Activity size={16} color="#2563eb" />
               <span style={{ fontSize: '13px', color: '#2563eb', fontWeight: 600 }}>Situação: {animal.status}</span>
             </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="filter-tabs" style={{ display: 'flex', gap: '12px', marginBottom: '20px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', overflowX: 'auto' }}>
        {TABS.map(t => (
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

      {/* TAB CONTENT */}
      {activeTab === 'Identificação' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--green-dark)' }}>
              <Tag size={18} /> Dados Principais
            </h3>
            
            <InfoCard icon={Hash} title="ID Interno" value={animal.id_interno} />
            <InfoCard icon={Tag} title="Nome" value={animal.name} />
            <InfoCard icon={Tag} title="Número do Brinco" value={animal.earring_number} />
            <InfoCard icon={Activity} title="RFID (Brinco Eletrônico)" value={animal.rfid} />
            <InfoCard icon={BookOpen} title="Observações / Marcas" value={animal.notes} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--green-dark)' }}>
                <PiCow size={20} /> Morfologia e Categoria
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                <InfoCard icon={Activity} title="Raça" value={animal.breed} />
                <InfoCard icon={Activity} title="Pelagem" value={animal.coat} />
                <InfoCard icon={Activity} title="Sexo" value={animal.sex} />
                <InfoCard icon={Activity} title="Categoria" value={animal.category} />
              </div>
            </div>

            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--green-dark)' }}>
                <MapPin size={18} /> Origem e Manejo
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                <InfoCard icon={Calendar} title="Nascimento" value={getBirthDate()} />
                <InfoCard icon={Calendar} title="Entrada na Fazenda" value={getEntryDate()} />
                <InfoCard icon={MapPin} title="Lote Atual" value={animal.batch} />
                <InfoCard icon={MapPin} title="Localização (Piquete)" value={animal.location} />
                <InfoCard icon={BookOpen} title="Origem" value={animal.origin} />
                <InfoCard icon={Scale} title="Peso Inicial" value={animal.summary?.last_weight ? `${animal.summary.last_weight} kg` : null} />
              </div>
            </div>
          </div>
          
        </div>
      )}

      {activeTab === 'Resumo' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '16px', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} color="var(--text-tertiary)" /> Últimos Eventos
            </h3>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Nenhum evento registrado na linha do tempo ainda.</div>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '16px', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Scale size={18} color="var(--text-tertiary)" /> Desempenho
            </h3>
            <div style={{ fontSize: '14px', color: 'var(--text)' }}>
              <strong>Peso mais recente:</strong> {animal.summary?.last_weight ? `${animal.summary.last_weight} kg` : 'Sem registros de pesagem'}
            </div>
          </div>
          
        </div>
      )}

      {activeTab === 'Genealogia' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', margin: '0 0 20px 0', color: 'var(--green-dark)' }}>Árvore Genealógica</h3>
            
            <div style={{ background: 'var(--bg-primary)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
              
              {/* Pai e Mãe */}
              <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', marginBottom: '30px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Pai</div>
                  {animal.father_id ? (() => {
                    if (animal.father_type === 'semen') {
                      const semen = useStore.getState().semenInventory.find(s => s.id === animal.father_id);
                      return semen ? (
                        <div style={{ padding: '8px 16px', background: '#e0f2fe', border: '1px solid #7dd3fc', borderRadius: '8px', fontWeight: 600, color: '#0369a1' }}>
                          🧪 {semen.short_name} (Sêmen)
                        </div>
                      ) : (
                        <div style={{ padding: '8px 16px', background: '#fff', border: '1px dashed var(--border)', borderRadius: '8px', color: 'var(--text-tertiary)' }}>Sêmen não encontrado</div>
                      );
                    } else {
                      const father = useStore.getState().animals.find(a => a.id === animal.father_id);
                      return father ? (
                        <button onClick={() => navigate(`/rebanho/${father.id}`)} style={{ padding: '8px 16px', background: '#fff', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                          {father.earring_number} {father.name ? `- ${father.name}` : ''}
                        </button>
                      ) : (
                        <div style={{ padding: '8px 16px', background: '#fff', border: '1px dashed var(--border)', borderRadius: '8px', color: 'var(--text-tertiary)' }}>Não encontrado</div>
                      );
                    }
                  })() : (
                    <div style={{ padding: '8px 16px', background: '#fff', border: '1px dashed var(--border)', borderRadius: '8px', color: 'var(--text-tertiary)' }}>Desconhecido</div>
                  )}
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Mãe</div>
                  {animal.mother_id ? (() => {
                    const mother = useStore.getState().animals.find(a => a.id === animal.mother_id);
                    return mother ? (
                      <button onClick={() => navigate(`/rebanho/${mother.id}`)} style={{ padding: '8px 16px', background: '#fff', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                        {mother.earring_number} {mother.name ? `- ${mother.name}` : ''}
                      </button>
                    ) : (
                      <div style={{ padding: '8px 16px', background: '#fff', border: '1px dashed var(--border)', borderRadius: '8px', color: 'var(--text-tertiary)' }}>Não encontrada</div>
                    );
                  })() : (
                    <div style={{ padding: '8px 16px', background: '#fff', border: '1px dashed var(--border)', borderRadius: '8px', color: 'var(--text-tertiary)' }}>Desconhecida</div>
                  )}
                </div>
              </div>

              {/* Animal Atual */}
              <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-15px', width: '2px', height: '15px', background: 'var(--border)' }}></div>
                <div style={{ padding: '10px 24px', background: 'var(--green-primary)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '16px' }}>
                  {animal.earring_number} {animal.name ? `- ${animal.name}` : ''}
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', margin: '0 0 20px 0', color: 'var(--green-dark)' }}>Descendentes</h3>
            
            {(() => {
              const children = useStore.getState().animals.filter(a => a.mother_id === animal.id || a.father_id === animal.id);
              if (children.length === 0) {
                return <div style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>Nenhum descendente registrado no sistema.</div>;
              }
              
              return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                  {children.map(child => (
                    <button 
                      key={child.id}
                      onClick={() => navigate(`/rebanho/${child.id}`)}
                      style={{ 
                        padding: '12px', background: '#fff', border: '1px solid var(--border)', 
                        borderRadius: '8px', cursor: 'pointer', textAlign: 'left',
                        display: 'flex', flexDirection: 'column', gap: '4px'
                      }}
                    >
                      <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text)' }}>
                        {child.earring_number} {child.name ? `- ${child.name}` : ''}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {child.sex} • {child.category}
                      </span>
                    </button>
                  ))}
                </div>
              );
            })()}
          </div>
          
        </div>
      )}

      {activeTab === 'Reprodução' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', margin: '0 0 20px 0', color: 'var(--green-dark)' }}>Histórico Reprodutivo</h3>
            
            {(() => {
              const events = useStore.getState().reproductionEvents.filter(e => e.animal_id === animal.id);
              
              if (events.length === 0) {
                return <div style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>Nenhum evento reprodutivo registrado.</div>;
              }

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {events.map(event => (
                    <div key={event.id} style={{ display: 'flex', gap: '16px', padding: '16px', border: '1px solid var(--border-light)', borderRadius: '8px', background: '#fafafa' }}>
                      <div style={{ padding: '12px', background: 'var(--green-light)', borderRadius: '50%', height: 'fit-content' }}>
                        <Activity size={20} color="var(--green-primary)" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text)', textTransform: 'capitalize' }}>
                            {event.type}
                          </span>
                          <span style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
                            {new Date(event.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        {event.type === 'inseminacao' && event.semen_id && (
                          <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                            <strong>Sêmen Utilizado:</strong> {(() => {
                              const semen = useStore.getState().semenInventory.find(s => s.id === event.semen_id);
                              return semen ? `${semen.short_name} (${semen.supplier})` : 'Desconhecido';
                            })()}
                            {event.inseminator && <><br/><strong>Inseminador:</strong> {event.inseminator}</>}
                          </div>
                        )}
                        {event.notes && (
                          <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '8px', fontStyle: 'italic' }}>
                            Obs: {event.notes}
                          </div>
                        )}
                        {event.type === 'parto' && event.calf_id && (
                          <div style={{ marginTop: '8px' }}>
                            <button onClick={() => navigate(`/rebanho/${event.calf_id}`)} style={{ padding: '6px 12px', background: 'var(--green-light)', color: 'var(--green-dark)', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              🍼 Ver Bezerro
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {activeTab === 'Saúde' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', margin: '0 0 20px 0', color: 'var(--green-dark)' }}>Prontuário e Histórico Sanitário</h3>
            
            {(() => {
              const events = useStore.getState().healthEvents.filter(e => e.animal_id === animal.id);
              
              if (events.length === 0) {
                return <div style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>Nenhum evento de saúde registrado para este animal.</div>;
              }

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {events.map(event => (
                    <div key={event.id} style={{ display: 'flex', gap: '16px', padding: '16px', border: '1px solid var(--border-light)', borderRadius: '8px', background: '#fafafa' }}>
                      <div style={{ padding: '12px', background: 'var(--green-light)', borderRadius: '50%', height: 'fit-content' }}>
                        <Stethoscope size={20} color="var(--green-primary)" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text)' }}>
                            {event.type}
                            <span style={{ marginLeft: '8px', padding: '2px 8px', fontSize: '11px', borderRadius: '12px', background: event.status === 'Concluído' ? '#dcfce7' : '#fef08a', color: event.status === 'Concluído' ? '#166534' : '#854d0e' }}>
                              {event.status}
                            </span>
                          </span>
                          <span style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
                            {new Date(event.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                          <strong>Descrição:</strong> {event.description}
                        </div>
                        {event.medicine_id && (
                          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                            <strong>Medicamento Utilizado:</strong> {(() => {
                              const med = useStore.getState().medicineInventory.find(m => m.id === event.medicine_id);
                              return med ? `${med.name} (${event.medicine_dose || 'Dose não inf.'})` : 'Desconhecido';
                            })()}
                          </div>
                        )}
                        {event.veterinarian && (
                          <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                            Responsável: {event.veterinarian}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {activeTab === 'Produção' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', margin: '0 0 20px 0', color: 'var(--green-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Milk size={18} /> Histórico de Ordenhas
            </h3>
            
            {(() => {
              const records = useStore.getState().milkRecords.filter(r => r.animal_id === animal.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
              
              if (records.length === 0) {
                return <div style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>Nenhum registro de produção de leite para este animal.</div>;
              }

              // Agrupar por data (simplificado)
              const totalVolume = records.reduce((acc, val) => acc + val.volume_liters, 0);
              const avgVolume = (totalVolume / records.length).toFixed(1);

              return (
                <div>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Produção Total (Registrada)</div>
                      <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text)' }}>{totalVolume.toFixed(1)} L</div>
                    </div>
                    <div style={{ width: '1px', background: 'var(--border-light)' }}></div>
                    <div>
                      <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Média por Pesagem</div>
                      <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text)' }}>{avgVolume} L</div>
                    </div>
                  </div>

                  <div className="table-container">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Data</th>
                          <th>Turno</th>
                          <th>Volume</th>
                        </tr>
                      </thead>
                      <tbody>
                        {records.map(r => (
                          <tr key={r.id}>
                            <td>{new Date(r.date).toLocaleDateString('pt-BR')}</td>
                            <td>{r.shift}</td>
                            <td style={{ fontWeight: 600, color: 'var(--green-dark)' }}>{r.volume_liters} L</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {activeTab === 'Timeline' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', margin: '0 0 20px 0', color: 'var(--green-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} /> Linha do Tempo da Vida
            </h3>
            
            {(() => {
              // Aggregate all events
              const allEvents: any[] = [];
              
              // 1. Birth
              if (animal.birth_date) {
                allEvents.push({
                  date: animal.birth_date,
                  title: 'Nascimento',
                  type: 'birth',
                  icon: <Baby size={16} />,
                  color: '#3b82f6',
                  bg: '#dbeafe',
                  desc: `Animal registrado no rebanho. Categoria: ${animal.category}`
                });
              }

              // 2. Reproduction events
              const repEvents = useStore.getState().reproductionEvents.filter(e => e.animal_id === animal.id);
              repEvents.forEach(e => {
                allEvents.push({
                  date: e.date,
                  title: e.type.charAt(0).toUpperCase() + e.type.slice(1).replace('_', ' '),
                  type: 'reproduction',
                  icon: <Activity size={16} />,
                  color: '#db2777',
                  bg: '#fce7f3',
                  desc: e.type === 'inseminacao' ? `Inseminação / Monta registrada.` : (e.type === 'parto' ? `Parto registrado.` : `Diagnóstico: ${e.diagnosis_result}`)
                });
              });

              // 3. Health events
              const healthEvents = useStore.getState().healthEvents.filter(e => e.animal_id === animal.id);
              healthEvents.forEach(e => {
                allEvents.push({
                  date: e.date,
                  title: `Saúde: ${e.type}`,
                  type: 'health',
                  icon: <Stethoscope size={16} />,
                  color: '#16a34a',
                  bg: '#dcfce7',
                  desc: e.description
                });
              });

              // 4. Milk records (group by month/year to avoid clutter)
              const milkRecords = useStore.getState().milkRecords.filter(r => r.animal_id === animal.id);
              if (milkRecords.length > 0) {
                const milkByMonth = milkRecords.reduce((acc: any, r) => {
                  const m = r.date.substring(0, 7);
                  if (!acc[m]) acc[m] = { vol: 0, count: 0 };
                  acc[m].vol += r.volume_liters;
                  acc[m].count++;
                  return acc;
                }, {});

                Object.keys(milkByMonth).forEach(m => {
                  allEvents.push({
                    date: `${m}-28`, // arbitrary day near end of month
                    title: `Produção de Leite (${m})`,
                    type: 'milk',
                    icon: <Milk size={16} />,
                    color: '#d97706',
                    bg: '#fef3c7',
                    desc: `${milkByMonth[m].count} ordenhas. Total: ${milkByMonth[m].vol.toFixed(1)} L`
                  });
                });
              }

              // Sort chronologically (newest first)
              allEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

              if (allEvents.length === 0) {
                return <div style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>Nenhum evento registrado.</div>;
              }

              return (
                <div style={{ position: 'relative', paddingLeft: '24px' }}>
                  {/* Vertical Line */}
                  <div style={{ position: 'absolute', left: '11px', top: '0', bottom: '0', width: '2px', background: 'var(--border-light)' }}></div>
                  
                  {allEvents.map((ev, i) => (
                    <div key={i} style={{ position: 'relative', marginBottom: '24px' }}>
                      {/* Timeline Dot */}
                      <div style={{ position: 'absolute', left: '-24px', top: '2px', width: '24px', height: '24px', borderRadius: '50%', background: ev.bg, color: ev.color, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>
                        {ev.icon}
                      </div>
                      
                      <div style={{ marginLeft: '16px', background: '#fafafa', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontWeight: 600, color: 'var(--text)' }}>{ev.title}</span>
                          <span style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontWeight: 500 }}>{new Date(ev.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{ev.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {activeTab !== 'Resumo' && activeTab !== 'Identificação' && activeTab !== 'Genealogia' && activeTab !== 'Reprodução' && activeTab !== 'Saúde' && activeTab !== 'Produção' && activeTab !== 'Timeline' && (
        <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
          Módulo "{activeTab}" em desenvolvimento (Fases posteriores).
        </div>
      )}
    </div>
  );
}
