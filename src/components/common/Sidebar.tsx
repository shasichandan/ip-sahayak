import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Bot,
  Scale,
  Layers3,
  BookOpen,
  FileCheck,
  Building2,
  Shield,
  Bookmark,
  Settings,
  CircleHelp,
  ChevronDown,
  ChevronRight,
  Award,
  MapPin,
  Compass,
  Lock,
  Sprout,
  Pill
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isRegimesOpen, setIsRegimesOpen] = useState(true);

  const isChatbotActive =
    location.pathname === '/chatbot' ||
    location.pathname === '/assistant' ||
    location.pathname === '/';

  // Sub-items for IP Regime Analysis
  const ipRegimeSubItems = [
    { path: '/regimes?type=patent', label: 'Patent (Sec 3(p))', icon: Shield },
    { path: '/regimes?type=trademark', label: 'Trademark (Class 5)', icon: Award },
    { path: '/regimes?type=gi', label: 'Geographical Indication', icon: MapPin },
    { path: '/regimes?type=copyright', label: 'Copyright', icon: FileCheck },
    { path: '/regimes?type=design', label: 'Industrial Design', icon: Compass },
    { path: '/regimes?type=trade_secret', label: 'Trade Secret', icon: Lock },
    { path: '/regimes?type=plant_variety', label: 'Plant Variety (PPV&FR)', icon: Sprout },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-stone-900/50 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[280px] flex-col border-r border-stone-200 bg-white transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="border-b border-stone-100 p-5 bg-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-900 text-white shadow-md shadow-emerald-950/20">
              <Scale className="h-5 w-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-stone-900">IP-SAKTI</span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-md">
                  Assistant
                </span>
              </div>
              <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                Ayurveda IP & Regulatory
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Content */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-6 text-[13px] font-medium">
          
          {/* PRIMARY ITEM: AI Chatbot */}
          <div>
            <NavLink
              to="/chatbot"
              onClick={onCloseMobile}
              className={() =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 font-bold transition-all ${
                  isChatbotActive
                    ? 'bg-emerald-900 text-white shadow-md shadow-emerald-950/20'
                    : 'text-stone-800 hover:bg-stone-100'
                }`
              }
            >
              <Bot className={`h-5 w-5 ${isChatbotActive ? 'text-emerald-300' : 'text-emerald-700'}`} />
              <span className="text-sm">AI Chatbot</span>
              <span className={`ml-auto text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${
                isChatbotActive ? 'bg-emerald-800 text-emerald-200' : 'bg-emerald-100 text-emerald-900'
              }`}>
                PRIMARY
              </span>
            </NavLink>
          </div>

          {/* SECTION 1: ANALYSIS & PROTECTION */}
          <div>
            <div className="px-2 mb-2 text-[11px] font-bold text-stone-400 uppercase tracking-[0.06em]">
              Analysis & Protection
            </div>
            
            <div className="space-y-1">
              {/* Expandable IP Regime Analysis */}
              <div>
                <button
                  onClick={() => setIsRegimesOpen(!isRegimesOpen)}
                  className={`w-full flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 transition-all ${
                    location.pathname.startsWith('/regimes')
                      ? 'bg-stone-100 text-emerald-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Scale className={`h-4 w-4 ${location.pathname.startsWith('/regimes') ? 'text-amber-600' : 'text-stone-400'}`} />
                    <span>IP Regime Analysis</span>
                  </div>
                  {isRegimesOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                  )}
                </button>

                {/* Nested IP Regimes */}
                {isRegimesOpen && (
                  <div className="ml-[18px] pl-3 border-l border-stone-200 my-1 space-y-0.5 animate-in fade-in duration-150">
                    <NavLink
                      to="/regimes"
                      onClick={onCloseMobile}
                      className={({ isActive }) =>
                        `flex items-center justify-between py-1.5 px-2 rounded-lg text-[12px] transition-colors ${
                          isActive && !location.search
                            ? 'text-emerald-900 font-semibold bg-stone-100'
                            : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                        }`
                      }
                    >
                      <span>Overview (All 10 Regimes)</span>
                    </NavLink>

                    {ipRegimeSubItems.map((sub) => {
                      const SubIcon = sub.icon;
                      const isActiveSub = location.pathname + location.search === sub.path;
                      return (
                        <NavLink
                          key={sub.path}
                          to={sub.path}
                          onClick={onCloseMobile}
                          className={`flex items-center gap-2 py-1.5 px-2 rounded-lg text-[12px] transition-colors ${
                            isActiveSub
                              ? 'text-emerald-900 font-semibold bg-stone-100'
                              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                          }`}
                        >
                          <SubIcon className={`w-3.5 h-3.5 ${isActiveSub ? 'text-emerald-600' : 'text-stone-400'}`} />
                          <span className="truncate">{sub.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Formulation Analysis */}
              <NavLink
                to="/formulation-analysis"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-all ${
                    isActive
                      ? 'bg-stone-100 text-emerald-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Layers3 className={`h-4 w-4 ${isActive ? 'text-emerald-700' : 'text-stone-400'}`} />
                    <span>Formulation Analysis</span>
                  </>
                )}
              </NavLink>

              {/* Traditional Knowledge / TKDL */}
              <NavLink
                to="/tkdl"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-all ${
                    isActive
                      ? 'bg-stone-100 text-emerald-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <BookOpen className={`h-4 w-4 ${isActive ? 'text-amber-600' : 'text-stone-400'}`} />
                    <span>Traditional Knowledge (TKDL)</span>
                  </>
                )}
              </NavLink>

              {/* Drug Classification */}
              <NavLink
                to="/drug-classification"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-all ${
                    isActive
                      ? 'bg-stone-100 text-emerald-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <FileCheck className={`h-4 w-4 ${isActive ? 'text-teal-700' : 'text-stone-400'}`} />
                    <span>Drug Classification</span>
                  </>
                )}
              </NavLink>

              {/* ABS Compliance */}
              <NavLink
                to="/abs-compliance"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-all ${
                    isActive
                      ? 'bg-stone-100 text-emerald-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Building2 className={`h-4 w-4 ${isActive ? 'text-purple-700' : 'text-stone-400'}`} />
                    <span>ABS Compliance (NBA)</span>
                  </>
                )}
              </NavLink>
            </div>
          </div>

          {/* SECTION 2: RESEARCH & EVIDENCE */}
          <div>
            <div className="px-2 mb-2 text-[11px] font-bold text-stone-400 uppercase tracking-[0.06em]">
              Research & Evidence
            </div>
            <div className="space-y-1">
              <NavLink
                to="/sources"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-all ${
                    isActive
                      ? 'bg-stone-100 text-emerald-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <BookOpen className={`h-4 w-4 ${isActive ? 'text-stone-700' : 'text-stone-400'}`} />
                    <span>Source Explorer</span>
                  </>
                )}
              </NavLink>

              <NavLink
                to="/prior-art"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-all ${
                    isActive
                      ? 'bg-stone-100 text-emerald-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Shield className={`h-4 w-4 ${isActive ? 'text-stone-700' : 'text-stone-400'}`} />
                    <span>Research & Patents Prior Art</span>
                  </>
                )}
              </NavLink>

              <NavLink
                to="/reports"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-all ${
                    isActive
                      ? 'bg-stone-100 text-emerald-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Bookmark className={`h-4 w-4 ${isActive ? 'text-stone-700' : 'text-stone-400'}`} />
                    <span>Saved Reports & Dossiers</span>
                  </>
                )}
              </NavLink>
            </div>
          </div>

          {/* SECTION 3: FORMULATION REGISTRY */}
          <div>
            <div className="px-2 mb-2 text-[11px] font-bold text-stone-400 uppercase tracking-[0.06em]">
              Formulation Registry
            </div>
            <div className="space-y-1">
              <NavLink
                to="/medicines"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-all ${
                    isActive
                      ? 'bg-stone-100 text-emerald-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Pill className={`h-4 w-4 ${isActive ? 'text-emerald-700' : 'text-stone-400'}`} />
                    <span>Formulations & Botanicals</span>
                  </>
                )}
              </NavLink>
            </div>
          </div>

          {/* SECTION 4: SYSTEM */}
          <div>
            <div className="px-2 mb-2 text-[11px] font-bold text-stone-400 uppercase tracking-[0.06em]">
              System
            </div>
            <div className="space-y-1">
              <NavLink
                to="/settings"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-all ${
                    isActive ? 'bg-stone-100 text-emerald-900 font-semibold' : 'text-stone-700 hover:bg-stone-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Settings className={`h-4 w-4 ${isActive ? 'text-stone-700' : 'text-stone-400'}`} />
                    <span>Settings</span>
                  </>
                )}
              </NavLink>

              <NavLink
                to="/help"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-all ${
                    isActive ? 'bg-stone-100 text-emerald-900 font-semibold' : 'text-stone-700 hover:bg-stone-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <CircleHelp className={`h-4 w-4 ${isActive ? 'text-stone-700' : 'text-stone-400'}`} />
                    <span>Help & Regulatory Guidelines</span>
                  </>
                )}
              </NavLink>
            </div>
          </div>

        </nav>

        {/* Bottom Product Info Area */}
        <div className="p-4 bg-white border-t border-stone-200">
          <div
            onClick={() => navigate('/settings')}
            className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200/80 cursor-pointer transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-900 text-emerald-200 shrink-0">
              <Scale className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-bold text-stone-900">IP-SAKTI Assistant</div>
              <div className="truncate text-[10px] text-stone-500">v2.5 Regulatory Edition</div>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
};
