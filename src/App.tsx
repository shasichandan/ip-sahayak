import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppShell } from './components/common/AppShell';

// Core SIH26045 IP-SAKTI Sahayak Features
import { AIAssistant } from './components/features/AIAssistant';
import { FormulationAnalysisView } from './components/features/FormulationAnalysisView';
import { IPRegimeAnalysisView } from './components/features/IPRegimeAnalysisView';
import { TKDLCheckView } from './components/features/TKDLCheckView';
import { DrugClassificationView } from './components/features/DrugClassificationView';
import { ABSComplianceView } from './components/features/ABSComplianceView';
import { SourceExplorerView } from './components/features/SourceExplorerView';
import { ReportsView } from './components/features/ReportsView';

// Existing Functional Features (Preserved 100%)
import { MainDashboard } from './components/dashboard/MainDashboard';
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
        {/* PRIMARY LANDING EXPERIENCE: AI CHATBOT FIRST */}
        <Route path="/" element={<Navigate to="/chatbot" replace />} />
        <Route path="/login" element={<Navigate to="/chatbot" replace />} />
        <Route path="/chatbot" element={<AppShell><AIAssistant /></AppShell>} />
        <Route path="/assistant" element={<Navigate to="/chatbot" replace />} />

        {/* SIH26045 Dedicated Analysis & Research Routes */}
        <Route path="/formulation-analysis" element={<AppShell><FormulationAnalysisView /></AppShell>} />
        <Route path="/regimes" element={<AppShell><IPRegimeAnalysisView /></AppShell>} />
        <Route path="/tkdl" element={<AppShell><TKDLCheckView /></AppShell>} />
        <Route path="/prior-art" element={<AppShell><TKDLCheckView /></AppShell>} />
        <Route path="/drug-classification" element={<AppShell><DrugClassificationView /></AppShell>} />
        <Route path="/abs-compliance" element={<AppShell><ABSComplianceView /></AppShell>} />
        <Route path="/sources" element={<AppShell><SourceExplorerView /></AppShell>} />
        <Route path="/reports" element={<AppShell><ReportsView /></AppShell>} />

        {/* Existing Functional Views (Clinical & Health Hub) */}
        <Route path="/dashboard" element={<AppShell><MainDashboard /></AppShell>} />
        <Route path="/doctors" element={<AppShell><DoctorConsultation /></AppShell>} />
        <Route path="/appointments" element={<AppShell><AppointmentsView /></AppShell>} />
        <Route path="/prescriptions" element={<AppShell><PrescriptionsView /></AppShell>} />
        <Route path="/medicines" element={<AppShell><Medicines /></AppShell>} />
        <Route path="/orders" element={<AppShell><OrdersView /></AppShell>} />
        <Route path="/records" element={<AppShell><HealthRecords /></AppShell>} />

        {/* System Settings & Help */}
        <Route path="/settings" element={<AppShell><div className="p-8 max-w-4xl mx-auto bg-white rounded-2xl border border-stone-200">
          <h2 className="text-xl font-bold text-stone-900 mb-2">User & Organization Settings</h2>
          <p className="text-xs text-stone-500">Configure AYUSH manufacturer license, preferred legal jurisdiction, and API keys for CSIR-TKDL and IPO databases.</p>
        </div></AppShell>} />
        
        <Route path="/help" element={<AppShell><div className="p-8 max-w-4xl mx-auto bg-white rounded-2xl border border-stone-200 space-y-4">
          <h2 className="text-xl font-bold text-stone-900">Regulatory Help & Statutory Guidelines</h2>
          <p className="text-xs text-stone-600">IP-SAKTI Sahayak assists Ayurvedic manufacturers, IP attorneys, researchers, and startups in navigating intellectual property rights, traditional knowledge defenses, and regulatory licensing under the Ministry of AYUSH, Government of India.</p>
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-medium">
            Contact Support: help@ip-sakti.gov.in • Toll Free AYUSH IP Helpline: 1800-11-22-33
          </div>
        </div></AppShell>} />

        <Route path="*" element={<Navigate to="/chatbot" replace />} />
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
