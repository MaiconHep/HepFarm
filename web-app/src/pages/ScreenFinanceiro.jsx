import React from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, ChevronRight } from 'lucide-react';

const TRANSACOES = [
  { data: '26 set. 2026', cat: 'Venda',   desc: 'Leite entregue — Cooperativa Vale', valor: +4820 },
  { data: '25 set. 2026', cat: 'Compra',  desc: 'Ração para gado leiteiro',           valor: -1280 },
  { data: '24 set. 2026', cat: 'Aviário', desc: 'Compra de ração — Lote 09',          valor: -860  },
  { data: '22 set. 2026', cat: 'Venda',   desc: 'Venda de novilha',                   valor: +3750 },
  { data: '20 set. 2026', cat: 'Despesa', desc: 'Manutenção do resfriador',           valor: -390  },
];

function fmt(v) {
  return `R$ ${Math.abs(v).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
}

export default function ScreenFinanceiro() {
  return (
    <>
      <div className="kpi-grid" style={{ marginBottom: 20 }}>
        <div className="kpi-card">
          <div className="kpi-icon green"><TrendingUp size={18} /></div>
          <div className="kpi-label">Receitas do Mês</div>
          <div className="kpi-value" style={{ color: 'var(--green-primary)' }}>R$ 32.480,00</div>
          <div className="kpi-delta up"><ArrowUpRight size={13} /> 12,4% <span>vs. mês anterior</span></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon red"><TrendingDown size={18} /></div>
          <div className="kpi-label">Despesas do Mês</div>
          <div className="kpi-value" style={{ color: 'var(--red)' }}>R$ 18.750,00</div>
          <div className="kpi-delta down"><TrendingDown size={13} /> R$ 2.340 <span>esta semana</span></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon orange"><TrendingUp size={18} /></div>
          <div className="kpi-label">Saldo Operacional</div>
          <div className="kpi-value">R$ 13.730,00</div>
          <div className="kpi-delta up"><ArrowUpRight size={13} /> Margem <span>de 42,3%</span></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon blue"><ArrowUpRight size={18} /></div>
          <div className="kpi-label">A Receber</div>
          <div className="kpi-value">R$ 4.180,00</div>
          <div className="kpi-delta" style={{ color: 'var(--text-secondary)' }}>Laticínio Vale Verde</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="section-title" style={{ fontSize: 14 }}>Todas as Movimentações</div>
            <div className="section-subtitle">Entradas e saídas de setembro</div>
          </div>
          <button className="section-action">Ver relatório <ChevronRight size={14} /></button>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Categoria</th>
                <th>Descrição</th>
                <th className="right">Valor</th>
              </tr>
            </thead>
            <tbody>
              {TRANSACOES.map((m, i) => (
                <tr key={i}>
                  <td className="muted">{m.data}</td>
                  <td><span className={`badge ${m.cat.toLowerCase().replace('á','a')}`}>{m.cat}</span></td>
                  <td>{m.desc}</td>
                  <td className={`right ${m.valor > 0 ? 'positive' : 'negative'}`}>
                    {m.valor > 0 ? '+' : '−'} {fmt(m.valor)}
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
