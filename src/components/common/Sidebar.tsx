import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Home,
  Bot,
  Stethoscope,
  Calendar,
  FileText,
  ShoppingBag,
  PackageCheck,
  User,
  Activity,
  BookOpen,
  Apple,
  MapPin,
  ShieldCheck,
  Building2,
  Users,
  Settings,
  Scale,
  BookmarkCheck,
  Store,
  Layers,
  Truck,
  HeartPulse,
  Leaf
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { role, t, currentUser } = useApp();
  const navigate = useNavigate();

  // Navigation schema per role
  const patientNavSections = [
    {
      label: 'HOME',
      items: [
        { path: '/patient/dashboard', label: t('dashboard'), icon: Home }
      ]
    },
    {
      label: 'AI & CARE',
      items: [
        { path: '/patient/ai', label: t('aiSahayak'), icon: Bot, badge: 'AI' },
        { path: '/patient/doctors', label: t('findVaidya'), icon: Stethoscope },
        { path: '/patient/appointments', label: t('appointments'), icon: Calendar }
      ]
    },
    {
      label: 'MEDICINES',
      items: [
        { path: '/patient/prescriptions', label: t('myPrescriptions'), icon: FileText },
        { path: '/patient/medicines', label: t('myMedicines'), icon: ShoppingBag },
        { path: '/patient/orders', label: t('myOrders'), icon: PackageCheck }
      ]
    },
    {
      label: 'MY HEALTH',
      items: [
        { path: '/patient/health', label: t('healthProfile'), icon: User },
        { path: '/patient/dosha', label: t('doshaPrakriti'), icon: Activity },
        { path: '/patient/diary', label: t('healthDiary'), icon: HeartPulse }
      ]
    },
    {
      label: 'AYURVEDA',
      items: [
        { path: '/patient/herbs', label: t('herbsFormulations'), icon: Leaf },
        { path: '/patient/library', label: t('ayurvedaLibrary'), icon: BookOpen },
        { path: '/patient/diet', label: t('dietLifestyle'), icon: Apple }
      ]
    },
    {
      label: 'NEARBY & TRUST',
      items: [
        { path: '/patient/pharmacies', label: 'Pharmacies', icon: Store },
        { path: '/patient/hospitals', label: 'Hospitals', icon: Building2 },
        { path: '/patient/verify', label: t('verifyMedicine'), icon: ShieldCheck, badge: 'AYUSH' }
      ]
    },
    {
      label: 'IPR & SYSTEM',
      items: [
        { path: '/ipr/assessment', label: 'Product IPR Wizard', icon: Scale },
        { path: '/community', label: 'Community', icon: Users },
        { path: '/saved-answers', label: 'Saved AI Answers', icon: BookmarkCheck }
      ]
    }
  ];

  const doctorNavSections = [
    {
      label: 'CLINICAL CORE',
      items: [
        { path: '/doctor/dashboard', label: 'Vaidya Dashboard', icon: Home },
        { path: '/doctor/copilot', label: 'Doctor AI Copilot', icon: Sparkles, badge: 'Smart RAG' },
        { path: '/doctor/patients', label: 'Patient Queue', icon: User },
        { path: '/doctor/appointments', label: 'Consultations', icon: Calendar },
        { path: '/doctor/prescriptions', label: 'Prescription Builder', icon: FileText }
      ]
    },
    {
      label: 'EVIDENCE & NETWORK',
      items: [
        { path: '/doctor/knowledge', label: 'Clinical Knowledge', icon: BookOpen },
        { path: '/doctor/referrals', label: 'Referral Network', icon: Stethoscope },
        { path: '/ipr/assessment', label: 'Formulation Assessment', icon: Scale }
      ]
    },
    {
      label: 'COMMUNITY & SYSTEM',
      items: [
        { path: '/community', label: 'Vaidya Forum', icon: Users },
        { path: '/settings', label: 'Practice Settings', icon: Settings }
      ]
    }
  ];

  const pharmacyNavSections = [
    {
      label: 'DISPENSARY OPERATIONS',
      items: [
        { path: '/pharmacy/dashboard', label: 'Pharmacy Dashboard', icon: Home },
        { path: '/pharmacy/orders', label: 'Live Orders & Rx', icon: PackageCheck, badge: 'Active' },
        { path: '/pharmacy/inventory', label: 'Stock & Inventory', icon: Layers },
        { path: '/pharmacy/verification', label: 'Batch Verification', icon: ShieldCheck }
      ]
    },
    {
      label: 'LOGISTICS & COMPLIANCE',
      items: [
        { path: '/pharmacy/deliveries', label: 'Delivery Tracking', icon: Truck },
        { path: '/ipr/regulations', label: 'AYUSH Rule 158B', icon: Scale },
        { path: '/settings', label: 'Pharmacy Settings', icon: Settings }
      ]
    }
  ];

  const sections =
    role === 'doctor'
      ? doctorNavSections
      : role === 'pharmacy'
      ? pharmacyNavSections
      : patientNavSections;

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-stone-900/50 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-stone-200/80 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-stone-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shadow-md shadow-emerald-900/10 shrink-0">
            <Leaf className="w-5 h-5 text-emerald-300" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-stone-900 tracking-tight text-sm">IP-SAKTI</span>
              <span className="font-bold text-emerald-800 text-xs px-1.5 py-0.2 bg-emerald-100/70 rounded-md">
                SAHAYAK
              </span>
            </div>
            <p className="text-[10px] text-stone-500 truncate font-medium mt-0.5">
              Digital Ayurveda Ecosystem
            </p>
          </div>
        </div>

        {/* Role Context Bar */}
        <div className="px-4 py-2 bg-stone-50/80 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                role === 'patient' ? 'bg-emerald-600' : role === 'doctor' ? 'bg-blue-600' : 'bg-amber-600'
              }`}
            />
            <span className="text-[11px] font-semibold text-stone-700 capitalize">
              {role === 'patient' ? 'Patient Portal' : role === 'doctor' ? 'Vaidya Copilot' : 'Pharmacy Portal'}
            </span>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="text-[10px] font-medium text-emerald-800 hover:text-emerald-950 underline"
          >
            Change
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
          {sections.map((section, sIdx) => (
            <div key={sIdx}>
              <div className="px-3 text-[10px] uppercase font-bold tracking-wider text-stone-600 mb-1.5">
                {section.label}
              </div>
              <div className="space-y-0.5">
                {section.items.map((item, iIdx) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={iIdx}
                      to={item.path}
                      onClick={onCloseMobile}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-200/80 shadow-2xs'
                            : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Icon
                              className={`w-4 h-4 shrink-0 transition-colors ${
                                isActive ? 'text-emerald-800' : 'text-stone-400 group-hover:text-stone-600'
                              }`}
                            />
                            <span className="truncate">{item.label}</span>
                          </div>
                          {item.badge && (
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
                                isActive
                                  ? 'bg-emerald-800 text-white'
                                  : 'bg-emerald-100 text-emerald-800 group-hover:bg-emerald-200'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Card & Settings */}
        <div className="p-3 border-t border-stone-100 bg-stone-50/50">
          <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white border border-stone-200/80">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-lg object-cover border border-stone-200 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-stone-900 truncate">{currentUser.name}</p>
                <p className="text-[10px] text-stone-500 truncate">{currentUser.location}</p>
              </div>
            </div>
            <NavLink
              to="/settings"
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};
