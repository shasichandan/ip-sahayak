import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { MobileBottomNav } from './MobileBottomNav';
import { GlobalSearchModal } from './GlobalSearchModal';
import { SourceChainModal } from './SourceChainModal';
import { ToastContainer } from './ToastContainer';

export const AppShell: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50/60 flex flex-col font-sans text-stone-900">
      {/* Global Sidebar (Desktop persistent, Mobile drawer) */}
      <Sidebar
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col lg:pl-64 transition-all">
        {/* Top Navbar */}
        <TopNavbar onToggleMobileMenu={() => setIsMobileMenuOpen(true)} />

        {/* Page Content Container */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto pb-24 lg:pb-12">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Modals & Overlays */}
      <GlobalSearchModal />
      <SourceChainModal />
      <ToastContainer />
    </div>
  );
};
