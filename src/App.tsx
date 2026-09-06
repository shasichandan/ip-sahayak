import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppShell } from './components/common/AppShell';

// Features
import { MainDashboard } from './components/dashboard/MainDashboard';
import { AIAssistant } from './components/features/AIAssistant';
import { DoctorConsultation } from './components/features/DoctorConsultation';
import { AppointmentsView } from './components/features/AppointmentsView';
import { PrescriptionsView } from './components/features/PrescriptionsView';
import { Medicines } from './components/features/Medicines';
import { OrdersView } from './components/features/OrdersView';
import { HealthRecords } from './components/features/HealthRecords';

// Modals & Overlays
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { SourceChainModal } from './components/common/SourceChainModal';
import { ToastContainer } from './components/common/ToastContainer';

const AppContent: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Navigate to="/dashboard" replace />} />
        
        <Route path="/dashboard" element={<AppShell><MainDashboard /></AppShell>} />
        <Route path="/assistant" element={<AppShell><AIAssistant /></AppShell>} />
        <Route path="/doctors" element={<AppShell><DoctorConsultation /></AppShell>} />
        <Route path="/appointments" element={<AppShell><AppointmentsView /></AppShell>} />
        <Route path="/prescriptions" element={<AppShell><PrescriptionsView /></AppShell>} />
        <Route path="/medicines" element={<AppShell><Medicines /></AppShell>} />
        <Route path="/orders" element={<AppShell><OrdersView /></AppShell>} />
        <Route path="/records" element={<AppShell><HealthRecords /></AppShell>} />
        
        {/* Placeholder settings/notifications */}
        <Route path="/settings" element={<AppShell><div className="p-8">Settings View</div></AppShell>} />
        <Route path="/notifications" element={<AppShell><div className="p-8">Notifications View</div></AppShell>} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      <GlobalSearchModal />
      <NotificationDrawer />
      <SourceChainModal />
      <ToastContainer />
    </>
  );
};

export default function App() {
  return (
    <HashRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </HashRouter>
  );
}
