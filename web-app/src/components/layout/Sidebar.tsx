import React, { useState } from 'react';
import { 
  LayoutDashboard, ShoppingCart, Package, LineChart,
  Milk, Bird, Tag, Settings, LogOut, ChevronRight, Leaf
} from 'lucide-react';
import { PiCow } from 'react-icons/pi';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { id: '/', label: 'Painel', icon: LayoutDashboard },
  {
    id: '/pecuaria',
    label: 'Pecuária',
    icon: PiCow,
    children: [
      { id: '/rebanho', label: 'Rebanho' },
      { id: '/reproducao', label: 'Reprodução' },
      { id: '/leite', label: 'Produção de Leite' },
      { id: '/saude', label: 'Saúde & Vacinas' },
      { id: '/estoque', label: 'Estoque', soon: true },
      { id: '/financeiro', label: 'Financeiro' },
    ]
  },
  {
    id: '/avicultura',
    label: 'Avicultura',
    icon: Bird,
    children: [
      { id: '/aviario', label: 'Manejo de Lotes', soon: true },
      { id: '/aviario/estoque', label: 'Estoque', soon: true },
      { id: '/aviario/financeiro', label: 'Financeiro', soon: true },
    ]
  },
  { id: '/vendas', label: 'Vendas', icon: Tag, soon: true },
];

export function Sidebar({ open, setOpen }: { open: boolean; setOpen: (o: boolean) => void }) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({ '/pecuaria': true });
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname;

  const toggleMenu = (id: string) => {
    setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${open ? 'show' : ''}`}
        onClick={() => setOpen(false)}
      />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <Leaf size={18} color="#fff" strokeWidth={2.5} />
          </div>
          <div className="sidebar-logo-text">
            <h2>HepFarm</h2>
            <p>Gestão da propriedade</p>
          </div>
        </div>

        <div className="sidebar-nav">
          <div className="sidebar-section-label">Menu Principal</div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            
            if (item.children) {
              const isOpen = openMenus[item.id];
              const isChildActive = item.children.some(child => activeTab.startsWith(child.id));
              
              return (
                <div key={item.id} className="sidebar-group">
                  <button
                    className={`sidebar-item ${isChildActive && !isOpen ? 'active-parent' : ''}`}
                    onClick={() => toggleMenu(item.id)}
                  >
                    <Icon size={17} />
                    {item.label}
                    <ChevronRight 
                      size={16} 
                      className="sidebar-chevron"
                      style={{ 
                        marginLeft: 'auto', 
                        transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s',
                        opacity: 0.6
                      }} 
                    />
                  </button>
                  
                  <div className={`sidebar-subnav ${isOpen ? 'open' : ''}`}>
                    {item.children.map(child => (
                      <button
                        key={child.id}
                        className={`sidebar-item sub-item ${activeTab === child.id ? 'active' : ''}`}
                        onClick={() => !child.soon && handleNavigate(child.id)}
                        style={child.soon ? { opacity: 0.7, cursor: 'default' } : {}}
                      >
                        {child.label}
                        {child.soon && <span className="badge-em-breve">Em breve</span>}
                      </button>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <button
                key={item.id}
                className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => !item.soon && handleNavigate(item.id)}
                style={item.soon ? { opacity: 0.7, cursor: 'default' } : {}}
              >
                <Icon size={17} />
                {item.label}
                {item.soon && <span className="badge-em-breve">Em breve</span>}
              </button>
            );
          })}
        </div>

        <div className="sidebar-footer">
          <button className="sidebar-item" onClick={() => handleNavigate('/configuracoes')}>
            <Settings size={17} />
            Configurações
          </button>
          <button className="sidebar-item" style={{ color: '#fca5a5' }}>
            <LogOut size={17} />
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}
