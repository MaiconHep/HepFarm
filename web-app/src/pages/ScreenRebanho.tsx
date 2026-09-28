import React, { useState } from 'react';
import { Milk, TrendingUp, Heart, ArrowUpRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function ScreenRebanho() {
  const [filter, setFilter] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Lê do LocalStorage via Zustand persist
  const rebanho = useStore(state => state.animals);
  
  const navigate = useNavigate();

  const filtered = rebanho.filter(a => {
    const matchesFilter = filter === 'Todas' || a.status === filter || (filter === 'Lactante' && a.status === 'Lactante');
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      (a.earring_number && a.earring_number.toLowerCase().includes(searchLower)) ||
      (a.name && a.name.toLowerCase().includes(searchLower)) ||
      (a.id_interno && a.id_interno.toLowerCase().includes(searchLower));
    
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Lactante': return 'green';
      case 'Tratamento': return 'red';
      case 'Seca': return 'gray';
      case 'Prenhe': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <>
      {/* KPIs (Ainda estáticos por enquanto) */}
      <div className="kpi-grid" style={{ marginBottom: 20 }}>
        <div className="kpi-card">
          <div className="kpi-icon green"><Milk size={18} /></div>
          <div className="kpi-label">Produção de hoje</div>
          <div className="kpi-value">1.284 L</div>
          <div className="kpi-delta up"><ArrowUpRight size={13} /> 2,1% <span>vs. ontem</span></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon green"><TrendingUp size={18} /></div>
          <div className="kpi-label">Vacas em lactação</div>
          <div className="kpi-value">{rebanho.filter(a => a.status === 'Lactante').length}</div>
          <div className="kpi-delta" style={{ color: 'var(--text-secondary)' }}>de {rebanho.length} cabeças no rebanho</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon orange"><TrendingUp size={18} /></div>
          <div className="kpi-label">Média por vaca</div>
          <div className="kpi-value">22,5 L</div>
          <div className="kpi-delta" style={{ color: 'var(--text-secondary)' }}>Meta: 24 L/dia</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon red"><Heart size={18} /></div>
          <div className="kpi-label">Em tratamento</div>
          <div className="kpi-value">{rebanho.filter(a => a.status === 'Tratamento').length}</div>
          <div className="kpi-delta down">Leite descartado: 0 L</div>
        </div>
      </div>

      {/* Tabela Rebanho */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="section-title" style={{ fontSize: 14 }}>Rebanho</div>
            <div className="section-subtitle">{filtered.length} animais cadastrados localmente</div>
          </div>
          <div className="filter-tabs" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <input 
              type="text" 
              placeholder="Buscar por brinco, nome ou ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '13px', minWidth: '200px' }}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              {['Todas', 'Lactante', 'Seca', 'Prenhe', 'Tratamento'].map(f => (
                <button
                  key={f}
                  className={`filter-tab ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => {
                useStore.getState().loadDemoData();
                alert('Árvore Genealógica de demonstração (Mimosa) carregada com sucesso!');
              }}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid var(--border)',
                background: '#fff',
                color: 'var(--text)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              🔄 Carregar Teste
            </button>

            <button 
              onClick={() => navigate('/rebanho/novo')}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                background: 'var(--green-primary)',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              + Adicionar Animal
            </button>
          </div>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Brinco</th>
                <th>Nome</th>
                <th>Raça</th>
                <th>Categoria</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '20px' }}>Nenhum animal cadastrado localmente.</td></tr>
              ) : (
                filtered.map(a => (
                  <tr key={a.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/rebanho/${a.id}`)}>
                    <td style={{ fontWeight: 700 }}>{a.earring_number}</td>
                    <td>{a.name || '-'}</td>
                    <td className="muted">{a.breed}</td>
                    <td className="muted">{a.category}</td>
                    <td>
                      <div className="rebanho-status">
                        <div className={`status-dot ${getStatusColor(a.status)}`} />
                        <span>{a.status}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
