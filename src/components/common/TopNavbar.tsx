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
  Menu,
  Check,
  LogOut,
  Shield
} from 'lucide-react';
import { LanguageCode } from '../../types';
import { NotificationDrawer } from './NotificationDrawer';

interface TopNavbarProps {
  onToggleMobileMenu: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onToggleMobileMenu }) => {
  const {
    currentUser,
    language,
    setLanguage,
    t,
    notifications,
    setIsSearchOpen
  } = useApp();

  const navigate = useNavigate();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const languages: { code: LanguageCode; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' }
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-6 py-3 transition-all">
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
              className="flex items-center gap-2.5 w-full bg-stone-100/80 hover:bg-stone-100 border border-stone-200/60 rounded-xl px-3.5 py-2.5 text-xs text-stone-500 transition-all text-left group shadow-sm"
            >
              <Search className="w-4 h-4 text-emerald-700 shrink-0 group-hover:text-emerald-800" />
              <span className="truncate flex-1">{t('searchPlaceholder')}</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-stone-400 bg-white rounded-md border border-stone-200 shadow-sm">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Location selector */}
            <div className="hidden md:flex items-center gap-1.5 text-xs text-stone-600 px-2.5 py-1.5 rounded-lg bg-stone-50 border border-stone-200/60">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span className="font-medium truncate max-w-[120px]">{currentUser.location || 'Bengaluru, KA'}</span>
            </div>

            {/* Prominent Multilingual Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-semibold text-stone-700 transition-colors shadow-sm"
                title="Change language (English, Telugu, Hindi)"
              >
                <Globe className="w-4 h-4 text-emerald-700" />
                <span className="hidden sm:inline">{languages.find(l => l.code === language)?.native}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-40 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                    Language
                  </div>
                  {languages.map(l => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-xs text-left flex items-center justify-between hover:bg-stone-50 transition-colors ${
                        language === l.code ? 'font-bold text-emerald-800 bg-emerald-50' : 'text-stone-700'
                      }`}
                    >
                      <span>{l.native}</span>
                      {language === l.code && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications Button */}
            <button
              onClick={() => setIsNotifOpen(true)}
              className="relative p-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors shadow-sm"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-stone-700" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 sm:pl-2 p-1 rounded-xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-200"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-stone-200 shadow-sm"
                />
                <div className="hidden xl:block text-left text-xs leading-tight pr-2">
                  <p className="font-bold text-stone-900 truncate max-w-[120px]">{currentUser.name}</p>
                  <p className="text-[10px] text-stone-500">Patient Profile</p>
                </div>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-40 animate-in fade-in zoom-in-95 duration-100">
                  <div className="p-3 border-b border-stone-100 mb-1">
                    <p className="text-sm font-bold text-stone-900">{currentUser.name}</p>
                    <p className="text-xs text-stone-500 mt-0.5">{currentUser.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      navigate('/settings');
                    }}
                    className="w-full px-3 py-2 text-sm text-left rounded-xl text-stone-700 hover:bg-stone-50 flex items-center gap-2 font-medium"
                  >
                    <User className="w-4 h-4 text-stone-500" />
                    Account Settings
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      navigate('/records');
                    }}
                    className="w-full px-3 py-2 text-sm text-left rounded-xl text-stone-700 hover:bg-stone-50 flex items-center gap-2 font-medium"
                  >
                    <Shield className="w-4 h-4 text-stone-500" />
                    Health Records
                  </button>

                  <div className="border-t border-stone-100 mt-1 pt-1">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        navigate('/login');
                      }}
                      className="w-full px-3 py-2 text-sm text-left rounded-xl text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-bold"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Notifications Drawer */}
      <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
};
