import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { AppShell } from './components/common/AppShell';

// Auth & Roles
import { RoleSelectorLogin } from './components/auth/RoleSelectorLogin';

// Patient Views
import { PatientDashboard } from './components/patient/PatientDashboard';
import { AISahayakChat } from './components/patient/AISahayakChat';
import { DoctorDiscovery } from './components/patient/DoctorDiscovery';
import { AppointmentsView } from './components/patient/AppointmentsView';
import { PrescriptionsView } from './components/patient/PrescriptionsView';
import { MedicinesMarketplace } from './components/patient/MedicinesMarketplace';
import { OrdersView } from './components/patient/OrdersView';
import { DoshaAssessmentView } from './components/patient/DoshaAssessmentView';
import { HealthDiaryView } from './components/patient/HealthDiaryView';
import { HealthProfileView } from './components/patient/HealthProfileView';
import { NearbyCareView } from './components/patient/NearbyCareView';
import { HerbsLibraryView } from './components/patient/HerbsLibraryView';
import { DietLifestyleView } from './components/patient/DietLifestyleView';
import { MedicineVerificationView } from './components/patient/MedicineVerificationView';

// Doctor & Pharmacy
import { DoctorDashboard } from './components/doctor/DoctorDashboard';
import { PharmacyDashboard } from './components/pharmacy/PharmacyDashboard';

// Modals & Overlays
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { RoleSwitchModal } from './components/common/RoleSwitchModal';
import { SourceChainModal } from './components/common/SourceChainModal';
import { ToastContainer } from './components/common/ToastContainer';

const AppContent: React.FC = () => {
  return (
    <>
      <Routes>
        {/* Workspace Login / Role Selection Landing */}
        <Route path="/" element={<RoleSelectorLogin />} />

        {/* Patient Sub-ecosystem */}
        <Route
          path="/patient"
          element={
            <AppShell>
              <PatientDashboard />
            </AppShell>
          }
        />
        <Route
          path="/patient/ai-chat"
          element={
            <AppShell>
              <AISahayakChat />
            </AppShell>
          }
        />
        <Route
          path="/patient/doctors"
          element={
            <AppShell>
              <DoctorDiscovery />
            </AppShell>
          }
        />
        <Route
          path="/patient/appointments"
          element={
            <AppShell>
              <AppointmentsView />
            </AppShell>
          }
        />
        <Route
          path="/patient/prescriptions"
          element={
            <AppShell>
              <PrescriptionsView />
            </AppShell>
          }
        />
        <Route
          path="/patient/medicines"
          element={
            <AppShell>
              <MedicinesMarketplace />
            </AppShell>
          }
        />
        <Route
          path="/patient/orders"
          element={
            <AppShell>
              <OrdersView />
            </AppShell>
          }
        />
        <Route
          path="/patient/dosha"
          element={
            <AppShell>
              <DoshaAssessmentView />
            </AppShell>
          }
        />
        <Route
          path="/patient/diary"
          element={
            <AppShell>
              <HealthDiaryView />
            </AppShell>
          }
        />
        <Route
          path="/patient/profile"
          element={
            <AppShell>
              <HealthProfileView />
            </AppShell>
          }
        />
        <Route
          path="/patient/nearby"
          element={
            <AppShell>
              <NearbyCareView />
            </AppShell>
          }
        />
        <Route
          path="/patient/hospitals"
          element={
            <AppShell>
              <NearbyCareView />
            </AppShell>
          }
        />
        <Route
          path="/patient/herbs"
          element={
            <AppShell>
              <HerbsLibraryView />
            </AppShell>
          }
        />
        <Route
          path="/patient/diet"
          element={
            <AppShell>
              <DietLifestyleView />
            </AppShell>
          }
        />
        <Route
          path="/patient/verify"
          element={
            <AppShell>
              <MedicineVerificationView />
            </AppShell>
          }
        />

        {/* Doctor Sub-ecosystem */}
        <Route
          path="/doctor"
          element={
            <AppShell>
              <DoctorDashboard />
            </AppShell>
          }
        />
        <Route
          path="/doctor/*"
          element={
            <AppShell>
              <DoctorDashboard />
            </AppShell>
          }
        />

        {/* Pharmacy Sub-ecosystem */}
        <Route
          path="/pharmacy"
          element={
            <AppShell>
              <PharmacyDashboard />
            </AppShell>
          }
        />
        <Route
          path="/pharmacy/*"
          element={
            <AppShell>
              <PharmacyDashboard />
            </AppShell>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Modals & Notifications */}
      <GlobalSearchModal />
      <NotificationDrawer />
      <RoleSwitchModal />
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
