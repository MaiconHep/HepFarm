import React, { useState } from 'react';
import CustomSelect from '../components/CustomSelect';

export default function ScreenPedidos() {
  const [prodSelected, setProdSelected] = useState('nata');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const PEDIDOS = [
    { cliente: 'Mercado do Zé',     produto: 'Nata',     qtd: 10, entrega: 'Sexta-feira',   status: 'Em produção', statusType: 'orange' },
    { cliente: 'D. Terezinha',      produto: 'Manteiga', qtd: 5,  entrega: 'Retirada',       status: 'Em aberto',   statusType: 'blue' },
    { cliente: 'Padaria Trigo Bom', produto: 'Manteiga', qtd: 12, entrega: 'Entregue',       status: 'Entregue',    statusType: 'green' },
  ];

  return (
    <>
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 20 }}>
        <div className="kpi-card">
          <div className="kpi-label">Nata em estoque</div>
          <div className="kpi-value">18 un.</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Manteiga em estoque</div>
          <div className="kpi-value">24 un.</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Pedidos ativos</div>
          <div className="kpi-value">2</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="section-title" style={{ fontSize: 14 }}>Pedidos em Andamento</div>
            <div className="section-subtitle">Encomendas de clientes</div>
          </div>
          <button className="btn-primary" style={{ fontSize: 12 }} onClick={() => setIsModalOpen(true)}>
            + Novo Pedido
          </button>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Produto</th>
                <th>Qtd</th>
                <th>Entrega</th>
                <th className="right">Status</th>
              </tr>
            </thead>
            <tbody>
              {PEDIDOS.map(p => (
                <tr key={p.cliente}>
                  <td style={{ fontWeight: 600 }}>{p.cliente}</td>
                  <td className="muted">{p.produto}</td>
                  <td className="muted">{p.qtd}</td>
                  <td className="muted">{p.entrega}</td>
                  <td className="right">
                    <span className="badge" style={{
                      background: p.statusType === 'green' ? 'var(--green-light)' : p.statusType === 'orange' ? 'var(--orange-light)' : 'var(--blue-light)',
                      color: p.statusType === 'green' ? 'var(--green-dark)' : p.statusType === 'orange' ? '#92400e' : '#1e40af'
                    }}>{p.status}</span>
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
