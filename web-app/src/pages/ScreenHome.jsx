import React from 'react';
import { useStore } from '../store/useStore';

export default function ScreenHome() {
  const { setActiveTab } = useStore();

  return (
    <div className="screen active">
      <div className="section-label" style={{ marginTop: 16 }}>Resumo de hoje</div>
      <div className="kpi-row">
        <div className="kpi"><div className="val">340 L</div><div className="lbl">Leite produzido</div><div className="delta">+4% vs ontem</div></div>
        <div className="kpi"><div className="val">128</div><div className="lbl">Animais no plantel</div><div className="delta">2 novos partos</div></div>
        <div className="kpi"><div className="val">R$ 3.180</div><div className="lbl">Saldo do mês</div><div className="delta">Receita &gt; Despesa</div></div>
        <div className="kpi"><div className="val">5</div><div className="lbl">Alertas ativos</div><div className="delta down">2 urgentes</div></div>
      </div>

      <div className="section-label">Alertas e lembretes</div>
      <div className="card">
        <div className="list-item">
          <div className="thumb"></div>
          <div className="li-main"><div className="li-title">Secagem prevista — Vaca 214</div><div className="li-sub">Iniciar em 3 dias</div></div>
          <span className="tag warn">Secagem</span>
        </div>
        <div className="list-item">
          <div className="thumb"></div>
          <div className="li-main"><div className="li-title">Parto previsto — Novilha 087</div><div className="li-sub">Em 12 dias</div></div>
          <span className="tag ok">Parto</span>
        </div>
        <div className="list-item">
          <div className="thumb"></div>
          <div className="li-main"><div className="li-title">Estoque baixo — Sêmen Girolando</div><div className="li-sub">6 doses restantes</div></div>
          <span className="tag warn">Estoque</span>
        </div>
      </div>

      <div className="section-label">Pedidos — nata e manteiga</div>
      <div className="card" style={{ padding: 0 }}>
        <div className="list-item" style={{ padding: '14px 16px' }}>
          <div className="thumb round"></div>
          <div className="li-main"><div className="li-title">Mercado do Zé</div><div className="li-sub">10 potes de nata · entrega sexta</div></div>
          <span className="tag warn">Em produção</span>
        </div>
        <div className="list-item" style={{ padding: '14px 16px' }}>
          <div className="thumb round"></div>
          <div className="li-main"><div className="li-title">D. Terezinha</div><div className="li-sub">5 un. de manteiga · retirada</div></div>
          <span className="tag">Em aberto</span>
        </div>
      </div>

      <div className="section-label">Acesso rápido</div>
      <div className="grid-mods">
        <div className="mod" onClick={() => setActiveTab('s-reproducao')}><div className="ic"></div><div className="t">Reprodução</div></div>
        <div className="mod"><div className="ic"></div><div className="t">Nutrição</div></div>
        <div className="mod"><div className="ic"></div><div className="t">Derivados</div></div>
        <div className="mod" onClick={() => setActiveTab('s-estoque')}><div className="ic"></div><div className="t">Estoque</div></div>
        <div className="mod"><div className="ic"></div><div className="t">Calendário</div></div>
        <div className="mod"><div className="ic"></div><div className="t">Relatórios</div></div>
      </div>
    </div>
  );
}
