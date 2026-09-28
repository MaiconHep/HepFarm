import React, { useState } from 'react';
import { Menu, Search, Plus, Bell, Tag, ShoppingCart, Milk, Package } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export function Topbar({ setSidebarOpen }: { setSidebarOpen: (o: boolean) => void }) {
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getTitle = () => {
    if (location.pathname === '/') return 'Visão Geral da Propriedade';
    if (location.pathname.startsWith('/rebanho')) return 'Gado de Leite';
    if (location.pathname.startsWith('/leite')) return 'Produção Leiteira';
    if (location.pathname.startsWith('/financeiro')) return 'Financeiro';
    if (location.pathname.startsWith('/estoque')) return 'Estoque';
    if (location.pathname.startsWith('/vendas')) return 'Vendas';
    return 'Painel';
  };

  const getSubtitle = () => {
    if (location.pathname === '/') {
      const today = new Date();
      return today.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
    if (location.pathname.startsWith('/rebanho')) return 'Rebanho e produção de leite';
    if (location.pathname.startsWith('/financeiro')) return 'Controle financeiro da propriedade';
    return '';
  };

  return (
    <>
      <header className="topbar">
        <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}>
          <Menu size={18} />
        </button>

        <div className="topbar-left">
          <div className="topbar-title">{getTitle()}</div>
          <div className="topbar-subtitle" style={{ textTransform: 'capitalize' }}>
            {getSubtitle()}
          </div>
        </div>

        <div className="topbar-search">
          <Search size={14} color="var(--text-tertiary)" />
          <input placeholder="Buscar movimentações..." />
        </div>

        <div className="topbar-actions">
          <button className="btn-primary" onClick={() => setModalOpen(true)}>
            <Plus size={15} />
            Novo Registro
          </button>
          <button className="icon-btn">
            <Bell size={16} />
          </button>
          <div className="avatar-btn">
            <div className="avatar-circle">RM</div>
            <div className="avatar-info">
              <p>Rafael Martins</p>
              <span>Proprietário</span>
            </div>
          </div>
        </div>
      </header>

      {/* Modal Novo Registro */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <div className="modal-head-title">Novo registro</div>
                <div className="modal-head-sub">O que você deseja lançar agora?</div>
              </div>
              <button className="modal-close-btn" onClick={() => setModalOpen(false)}>×</button>
            </div>
            <div className="modal-actions">
              <button className="modal-action-btn" onClick={() => { setModalOpen(false); navigate('/financeiro'); }}>
                <div className="modal-action-icon" style={{ background: '#d1fae5', color: '#16a34a' }}>
                  <Tag size={18} />
                </div>
                Registrar venda
              </button>
              <button className="modal-action-btn" onClick={() => { setModalOpen(false); navigate('/financeiro'); }}>
                <div className="modal-action-icon" style={{ background: '#fee2e2', color: '#ef4444' }}>
                  <ShoppingCart size={18} />
                </div>
                Registrar gasto
              </button>
              <button className="modal-action-btn" onClick={() => { setModalOpen(false); navigate('/leite'); }}>
                <div className="modal-action-icon" style={{ background: '#d1fae5', color: '#16a34a' }}>
                  <Milk size={18} />
                </div>
                Lançar produção de leite
              </button>
              <button className="modal-action-btn" onClick={() => { setModalOpen(false); navigate('/saude'); }}>
                <div className="modal-action-icon" style={{ background: '#fef3c7', color: '#f59e0b' }}>
                  <Package size={18} />
                </div>
                Lançar Saúde / Medicamento
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
