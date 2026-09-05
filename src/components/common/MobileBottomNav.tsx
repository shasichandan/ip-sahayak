import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Home,
  Bot,
  FileText,
  Calendar,
  ShoppingBag,
  Sparkles,
  Users,
  PackageCheck,
  Layers,
  ShieldCheck
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { role } = useApp();

  const patientTabs = [
    { path: '/patient/dashboard', label: 'Home', icon: Home },
    { path: '/patient/ai', label: 'AI Sahayak', icon: Bot, isHighlighted: true },
    { path: '/patient/prescriptions', label: 'Prescriptions', icon: FileText },
    { path: '/patient/appointments', label: 'Care', icon: Calendar },
    { path: '/patient/medicines', label: 'Store', icon: ShoppingBag }
  ];

  const doctorTabs = [
    { path: '/doctor/dashboard', label: 'Dashboard', icon: Home },
    { path: '/doctor/copilot', label: 'AI Copilot', icon: Sparkles, isHighlighted: true },
    { path: '/doctor/patients', label: 'Patients', icon: Users },
    { path: '/doctor/prescriptions', label: 'Prescribe', icon: FileText }
  ];

  const pharmacyTabs = [
    { path: '/pharmacy/dashboard', label: 'Dashboard', icon: Home },
    { path: '/pharmacy/orders', label: 'Orders', icon: PackageCheck, isHighlighted: true },
    { path: '/pharmacy/inventory', label: 'Stock', icon: Layers },
    { path: '/pharmacy/verification', label: 'Verify', icon: ShieldCheck }
  ];

  const tabs = role === 'doctor' ? doctorTabs : role === 'pharmacy' ? pharmacyTabs : patientTabs;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200/80 px-2 py-1.5 shadow-lg safe-area-bottom">
      <div className="flex items-center justify-around">
        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={idx}
              to={tab.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative ${
                  isActive
                    ? 'text-emerald-800 font-bold'
                    : 'text-stone-500 hover:text-stone-800'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1 rounded-xl transition-colors ${
                      tab.isHighlighted && !isActive
                        ? 'bg-emerald-50 text-emerald-800'
                        : tab.isHighlighted && isActive
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : isActive
                        ? 'bg-emerald-100/60 text-emerald-900'
                        : ''
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[56px] text-center">
                    {tab.label}
                  </span>
                  {isActive && !tab.isHighlighted && (
                    <span className="w-1 h-1 rounded-full bg-emerald-600 mt-0.5" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
