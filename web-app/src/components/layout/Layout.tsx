import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="main-wrapper">
        <Topbar setSidebarOpen={setSidebarOpen} />
        
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
