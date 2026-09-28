import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

// Páginas (Mantendo as referências originais por enquanto)
import ScreenDashboard from './pages/ScreenDashboard';
import ScreenRebanho from './pages/ScreenRebanho';
import ScreenCadastroRebanho from './pages/ScreenCadastroRebanho';
import ScreenLeite from './pages/ScreenLeite';
import ScreenFinanceiro from './pages/ScreenFinanceiro';
import ScreenEstoque from './pages/ScreenEstoque';
import ScreenPedidos from './pages/ScreenPedidos';
import ScreenReproducao from './pages/ScreenReproducao';
import ScreenSaude from './pages/ScreenSaude';

import ScreenAnimalFicha from './pages/ScreenAnimalFicha';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ScreenDashboard />} />
          <Route path="rebanho" element={<ScreenRebanho />} />
          <Route path="rebanho/novo" element={<ScreenCadastroRebanho />} />
          <Route path="rebanho/:id" element={<ScreenAnimalFicha />} />
          <Route path="reproducao" element={<ScreenReproducao />} />
          <Route path="saude" element={<ScreenSaude />} />
          <Route path="leite" element={<ScreenLeite />} />
          <Route path="financeiro" element={<ScreenFinanceiro />} />
          <Route path="estoque" element={<ScreenEstoque />} />
          <Route path="vendas" element={<ScreenPedidos />} />
          
          {/* Rota padrão para não quebrar links */}
          <Route path="*" element={<div>Em construção</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
