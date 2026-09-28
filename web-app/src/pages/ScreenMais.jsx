import React from 'react';
import { useStore } from '../store/useStore';

export default function ScreenMais() {
  const { setActiveTab } = useStore();

  return (
    <div className="screen active">
      <div className="screen-title">Mais módulos</div>
      <div className="screen-sub">Demais áreas do sistema</div>
      <div className="grid-mods">
        <div className="mod" onClick={() => setActiveTab('s-reproducao')}><div className="ic"></div><div className="t">Reprodução</div></div>
        <div className="mod"><div className="ic"></div><div className="t">Calendário</div></div>
        <div className="mod"><div className="ic"></div><div className="t">Nutrição</div></div>
        <div className="mod" onClick={() => setActiveTab('s-pedidos')}><div className="ic"></div><div className="t">Pedidos</div></div>
        <div className="mod" onClick={() => setActiveTab('s-estoque')}><div className="ic"></div><div className="t">Estoque</div></div>
        <div className="mod"><div className="ic"></div><div className="t">Clientes</div></div>
        <div className="mod"><div className="ic"></div><div className="t">Relatórios</div></div>
        <div className="mod"><div className="ic"></div><div className="t">Configurações</div></div>
        <div className="mod" onClick={() => setActiveTab('s-sobre')}>
          <div className="ic" style={{ background: 'var(--accent)', color: '#0e1412', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>i</div>
          <div className="t">Sobre o App</div>
        </div>
        <div className="mod"><div className="ic"></div><div className="t">Ajuda</div></div>
      </div>
    </div>
  );
}
