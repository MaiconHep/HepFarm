import React from 'react';
import { Users, Droplet, Stethoscope, Baby, Activity, AlertCircle, Calendar } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

export default function ScreenDashboard() {
  const animals = useStore(state => state.animals);
  const milkRecords = useStore(state => state.milkRecords);
  const healthEvents = useStore(state => state.healthEvents);
  const repEvents = useStore(state => state.reproductionEvents);
  const navigate = useNavigate();

  // KPIs
  const totalAnimals = animals.length;
  const lactating = animals.filter(a => a.status === 'Lactante').length;
  const pregnant = animals.filter(a => a.status === 'Prenhe').length;
  const calves = animals.filter(a => a.category === 'Bezerra' || a.category === 'Bezerro').length;
  
  // Milk Production Today
  const todayStr = new Date().toISOString().split('T')[0];
  const milkToday = milkRecords
    .filter(r => r.date === todayStr)
    .reduce((acc, val) => acc + val.volume_liters, 0);

  // Active Health Events
  const sick = healthEvents.filter(e => e.status === 'Em Andamento').length;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', margin: 0, color: 'var(--text)' }}>Visão Geral da Propriedade</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>Indicadores gerais e resumo do rebanho</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        
        <div className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', background: '#e0e7ff', color: '#4f46e5', borderRadius: '12px' }}>
            <Users size={24} />
          </div>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontWeight: 600 }}>Total do Rebanho</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text)' }}>{totalAnimals}</div>
          </div>
        </div>

        <div className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }} onClick={() => navigate('/leite')}>
          <div style={{ padding: '12px', background: '#dcfce7', color: '#16a34a', borderRadius: '12px' }}>
            <Droplet size={24} />
          </div>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontWeight: 600 }}>Leite Hoje</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text)' }}>{milkToday.toFixed(1)} L</div>
          </div>
        </div>

        <div className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }} onClick={() => navigate('/reproducao')}>
          <div style={{ padding: '12px', background: '#fce7f3', color: '#db2777', borderRadius: '12px' }}>
            <Activity size={24} />
          </div>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontWeight: 600 }}>Fêmeas Prenhes</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text)' }}>{pregnant}</div>
          </div>
        </div>

        <div className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', background: '#fef3c7', color: '#d97706', borderRadius: '12px' }}>
            <Baby size={24} />
          </div>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontWeight: 600 }}>Bezerras(os)</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text)' }}>{calves}</div>
          </div>
        </div>

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        
        <div className="card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} /> Resumo Produtivo
            </h3>
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Fêmeas em Lactação</span>
              <span style={{ fontWeight: 600 }}>{lactating}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Fêmeas Secas</span>
              <span style={{ fontWeight: 600 }}>{animals.filter(a => a.category === 'Vaca' && a.status !== 'Lactante').length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Novilhas (Recria)</span>
              <span style={{ fontWeight: 600 }}>{animals.filter(a => a.category === 'Novilha').length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Touros/Rufiões</span>
              <span style={{ fontWeight: 600 }}>{animals.filter(a => a.category === 'Touro' || a.category === 'Rufião').length}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: sick > 0 ? '#ef4444' : 'var(--text)' }}>
              <Stethoscope size={18} /> Atenção Sanitária
            </h3>
          </div>
          <div style={{ padding: '20px' }}>
            {sick === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-tertiary)' }}>
                Nenhum animal em tratamento. Ótimo!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={18} /> {sick} evento(s) de saúde em andamento
                </div>
                {healthEvents.filter(e => e.status === 'Em Andamento').map(e => {
                  const a = animals.find(an => an.id === e.animal_id);
                  return (
                    <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                      <div>
                        <div style={{ fontWeight: 600 }}>{a?.earring_number} {a?.name ? `- ${a.name}` : ''}</div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{e.description}</div>
                      </div>
                      <button onClick={() => navigate(`/rebanho/${e.animal_id}`)} style={{ padding: '6px 12px', background: '#fff', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>
                        Ver Ficha
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
