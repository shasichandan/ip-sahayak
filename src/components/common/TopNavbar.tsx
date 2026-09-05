import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Globe,
  MapPin,
  Bell,
  User,
  ChevronDown,
  ShoppingBag,
  Sparkles,
  Menu,
  Check,
  RefreshCw,
  LogOut,
  Shield
} from 'lucide-react';
import { LanguageCode } from '../../types';
import { RoleSwitchModal } from './RoleSwitchModal';
import { NotificationDrawer } from './NotificationDrawer';

interface TopNavbarProps {
  onToggleMobileMenu: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onToggleMobileMenu }) => {
  const {
    role,
    currentUser,
    language,
    setLanguage,
    t,
    cart,
    notifications,
    setIsSearchOpen
  } = useApp();

  const navigate = useNavigate();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const languages: { code: LanguageCode; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' }
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-6 py-2.5 transition-all">
        <div className="flex items-center justify-between gap-3">
          {/* Left: Mobile hamburger & Search bar */}
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors"
              aria-label="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Omnibar search button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2.5 w-full bg-stone-100/80 hover:bg-stone-100 border border-stone-200/60 rounded-xl px-3.5 py-2 text-xs text-stone-500 transition-all text-left group shadow-2xs"
            >
              <Search className="w-4 h-4 text-emerald-700 shrink-0 group-hover:text-emerald-800" />
              <span className="truncate flex-1">{t('searchPlaceholder')}</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-stone-400 bg-white rounded-md border border-stone-200 shadow-2xs">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Location selector */}
            <div className="hidden md:flex items-center gap-1.5 text-xs text-stone-600 px-2.5 py-1.5 rounded-lg bg-stone-50 border border-stone-200/60">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span className="font-medium truncate max-w-[120px]">Bengaluru, KA</span>
            </div>

            {/* Prominent Multilingual Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 text-xs font-semibold text-emerald-900 transition-colors shadow-2xs"
                title="Change language (English, Telugu, Hindi)"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-700" />
                <span>{languages.find(l => l.code === language)?.native}</span>
                <ChevronDown className="w-3 h-3 text-emerald-700" />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-40 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                    Language / భాష
                  </div>
                  {languages.map(l => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-xs text-left flex items-center justify-between hover:bg-stone-50 transition-colors ${
                        language === l.code ? 'font-bold text-emerald-800 bg-emerald-50/50' : 'text-stone-700'
                      }`}
                    >
                      <span>{l.native}</span>
                      {language === l.code && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart / Prescription Basket (Visible for patient) */}
            {role === 'patient' && (
              <button
                onClick={() => navigate('/patient/orders')}
                className="relative p-2 rounded-xl text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                title="Prescription Basket"
              >
                <ShoppingBag className="w-5 h-5 text-stone-700" />
                {cart.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-700 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {cart.reduce((sum, i) => sum + i.quantity, 0)}
                  </span>
                )}
              </button>
            )}

            {/* Notifications Button */}
            <button
              onClick={() => setIsNotifOpen(true)}
              className="relative p-2 rounded-xl text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-stone-700" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-600 rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Role Switcher Pill */}
            <button
              onClick={() => setIsRoleModalOpen(true)}
              className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-xs text-stone-700 transition-colors shadow-2xs"
            >
              <span className={`w-2 h-2 rounded-full ${
                role === 'patient' ? 'bg-emerald-600' : role === 'doctor' ? 'bg-blue-600' : 'bg-amber-600'
              }`} />
              <span className="font-semibold capitalize text-stone-800">{role}</span>
              <RefreshCw className="w-3 h-3 text-stone-400" />
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 pl-1 sm:pl-2 p-1 rounded-xl hover:bg-stone-100 transition-colors"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-xl object-cover border border-stone-200"
                />
                <div className="hidden xl:block text-left text-xs leading-tight">
                  <p className="font-bold text-stone-900 truncate max-w-[110px]">{currentUser.name}</p>
                  <p className="text-[10px] text-stone-500 capitalize">{currentUser.role}</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 hidden sm:block" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-40 animate-in fade-in zoom-in-95 duration-100">
                  <div className="p-2.5 border-b border-stone-100 mb-1">
                    <p className="text-xs font-bold text-stone-900">{currentUser.name}</p>
                    <p className="text-[11px] text-stone-500">{currentUser.email}</p>
                    <div className="mt-1.5 inline-block text-[10px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200 capitalize">
                      {currentUser.role} Workspace
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsRoleModalOpen(true);
                    }}
                    className="w-full px-3 py-2 text-xs text-left rounded-xl text-stone-700 hover:bg-stone-50 flex items-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-700" />
                    Switch Role (Patient / Doctor / Pharmacy)
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      navigate('/settings');
                    }}
                    className="w-full px-3 py-2 text-xs text-left rounded-xl text-stone-700 hover:bg-stone-50 flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-stone-500" />
                    Account Settings & Profile
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      navigate('/ipr/assessment');
                    }}
                    className="w-full px-3 py-2 text-xs text-left rounded-xl text-stone-700 hover:bg-stone-50 flex items-center gap-2"
                  >
                    <Shield className="w-3.5 h-3.5 text-stone-500" />
                    IPR / TKDL Assessment
                  </button>

                  <div className="border-t border-stone-100 mt-1 pt-1">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        navigate('/login');
                      }}
                      className="w-full px-3 py-2 text-xs text-left rounded-xl text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out / Switch Demo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Role Switcher Modal */}
      <RoleSwitchModal isOpen={isRoleModalOpen} onClose={() => setIsRoleModalOpen(false)} />

      {/* Notifications Drawer */}
      <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
};
