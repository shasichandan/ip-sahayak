import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Globe,
  Bell,
  ChevronDown,
  Menu,
  Check,
  Settings,
  Scale
} from 'lucide-react';
import { LanguageCode } from '../../types';
import { NotificationDrawer } from './NotificationDrawer';

interface TopNavbarProps {
  onToggleMobileMenu: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onToggleMobileMenu }) => {
  const {
    language,
    setLanguage,
    t,
    notifications,
    setIsSearchOpen
  } = useApp();

  const navigate = useNavigate();
  const [isLangOpen, setIsLangOpen] = useState(false);
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
          {/* Left: Mobile hamburger & Brand/Search */}
          <div className="flex items-center gap-3 flex-1 max-w-2xl">
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors shrink-0"
              aria-label="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Desktop Brand Label in Header */}
            <div className="hidden sm:flex items-center gap-2 mr-2 shrink-0">
              <span className="font-black text-sm md:text-base text-stone-900 tracking-tight flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-emerald-700" />
                IP-SAKTI
              </span>
              <span className="hidden md:inline text-[11px] text-stone-500 font-medium pl-2 border-l border-stone-300">
                AI-Powered IP & Regulatory Assistant
              </span>
            </div>

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
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Regulatory Mode Badge */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-stone-700 px-2.5 py-1.5 rounded-lg bg-emerald-50/80 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="font-bold text-[11px] text-emerald-900 truncate">IPO & TKDL Active</span>
            </div>

            {/* Prominent Multilingual Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-semibold text-stone-700 transition-colors shadow-2xs"
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
              className="relative p-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors shadow-2xs"
              title="Regulatory & Patent Alerts"
            >
              <Bell className="w-4 h-4 text-stone-700" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-600 rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Settings Button */}
            <button
              onClick={() => navigate('/settings')}
              className="p-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors shadow-2xs"
              title="System & Jurisdiction Settings"
            >
              <Settings className="w-4 h-4 text-stone-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Notifications Drawer */}
      <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
};
