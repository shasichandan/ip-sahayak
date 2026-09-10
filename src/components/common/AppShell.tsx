import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { MobileBottomNav } from './MobileBottomNav';
import { GlobalSearchModal } from './GlobalSearchModal';
import { SourceChainModal } from './SourceChainModal';
import { ToastContainer } from './ToastContainer';
import { BackButton } from './BackButton';

interface AppShellProps {
  children?: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Global Sidebar (Desktop persistent, Mobile drawer) */}
      <Sidebar
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col lg:pl-[280px] transition-all duration-300 ease-in-out">
        {/* Top Navbar */}
        <TopNavbar onToggleMobileMenu={() => setIsMobileMenuOpen(true)} />

        {/* Page Content Container */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 w-full mx-auto pb-24 lg:pb-12 max-w-[1440px]">
          <BackButton />
          {children ?? <Outlet />}
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
