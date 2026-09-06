import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Home,
  Bot,
  Stethoscope,
  Calendar,
  FileText,
  ShoppingBag,
  PackageCheck,
  Activity,
  Bell,
  Settings,
  Leaf,
  LogOut,
  User
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { currentUser } = useApp();
  const navigate = useNavigate();

  const mainNavItems = [
    { path: '/assistant', label: 'AI Health Assistant', icon: Bot },
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/doctors', label: 'Consult Doctor', icon: Stethoscope },
    { path: '/appointments', label: 'Appointments', icon: Calendar },
    { path: '/prescriptions', label: 'Prescriptions', icon: FileText },
    { path: '/medicines', label: 'Medicines', icon: ShoppingBag },
    { path: '/orders', label: 'Orders', icon: PackageCheck },
    { path: '/records', label: 'Health Records', icon: Activity },
    { path: '/notifications', label: 'Notifications', icon: Bell },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-stone-900/40 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[280px] flex-col border-r border-stone-200 bg-white transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Logo Area */}
        <div className="border-b border-stone-100 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-800 text-white shadow-md shadow-emerald-900/15">
              <Leaf className="h-5 w-5 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-stone-900">IP-SAKTI</span>
              </div>
              <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Health Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-1.5">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800'
                        : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`h-5 w-5 ${isActive ? 'text-emerald-700' : 'text-stone-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Bottom User Area */}
        <div className="border-t border-stone-100 p-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-50 cursor-pointer transition-colors" onClick={() => navigate('/settings')}>
              <img src={currentUser.avatar} alt={currentUser.name} className="h-10 w-10 rounded-full object-cover border border-stone-200" />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-bold text-stone-900">{currentUser.name}</div>
                <div className="truncate text-xs text-stone-500">View Profile</div>
              </div>
              <User className="w-4 h-4 text-stone-400" />
            </div>
            
            <button 
              onClick={() => navigate('/login')}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
