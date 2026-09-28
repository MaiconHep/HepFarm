import React from 'react';
import { Package, AlertTriangle } from 'lucide-react';

const ITEMS = [
  { nome: 'Ração concentrada',         qtd: '450 kg',     status: 'Normal',  statusType: 'green' },
  { nome: 'Vacina aftosa',             qtd: '12 doses',   status: 'Repor',   statusType: 'orange' },
  { nome: 'Detergente de ordenha',     qtd: '8 litros',   status: 'Normal',  statusType: 'green' },
  { nome: 'Doses de sêmen Girolando',  qtd: '6 doses',    status: 'Crítico', statusType: 'red' },
  { nome: 'Medicamentos veterinários', qtd: '2 itens',    status: 'Repor',   statusType: 'orange' },
];

export default function ScreenEstoque() {
  return (
    <>
      <div className="kpi-grid" style={{ marginBottom: 20 }}>
        <div className="kpi-card">
          <div className="kpi-icon green"><Package size={18} /></div>
          <div className="kpi-label">Itens cadastrados</div>
          <div className="kpi-value">32</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon orange"><AlertTriangle size={18} /></div>
          <div className="kpi-label">Pontos de reposição</div>
          <div className="kpi-value" style={{ color: 'var(--orange)' }}>4</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="section-title" style={{ fontSize: 14 }}>Itens em Estoque</div>
            <div className="section-subtitle">Insumos, medicamentos e materiais</div>
          </div>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantidade</th>
                <th className="right">Status</th>
              </tr>
            </thead>
            <tbody>
              {ITEMS.map(item => (
                <tr key={item.nome}>
                  <td style={{ fontWeight: 600 }}>{item.nome}</td>
                  <td className="muted">{item.qtd}</td>
                  <td className="right">
                    <span className="badge" style={{
                      background: item.statusType === 'green' ? 'var(--green-light)' : item.statusType === 'orange' ? 'var(--orange-light)' : 'var(--red-light)',
                      color: item.statusType === 'green' ? 'var(--green-dark)' : item.statusType === 'orange' ? '#92400e' : '#b91c1c'
                    }}>{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
