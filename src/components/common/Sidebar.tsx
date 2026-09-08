import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Bot,
  Scale,
  Layers,
  BookOpen,
  FileCheck,
  Building2,
  Bookmark,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Shield,
  Award,
  MapPin,
  FileText,
  Compass,
  Lock,
  Sprout,
  Activity,
  Stethoscope,
  Calendar,
  ShoppingBag,
  PackageCheck,
  LogOut,
  User,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { currentUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [isRegimesOpen, setIsRegimesOpen] = useState(true);
  const [isClinicalOpen, setIsClinicalOpen] = useState(false);

  // Sub-items for IP Regime Analysis
  const ipRegimeSubItems = [
    { path: '/regimes?type=patent', label: 'Patent (Sec 3(p))', icon: Shield },
    { path: '/regimes?type=trademark', label: 'Trademark (Class 5)', icon: Award },
    { path: '/regimes?type=gi', label: 'Geographical Indication', icon: MapPin },
    { path: '/regimes?type=copyright', label: 'Copyright', icon: FileText },
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
        <div className="border-b border-stone-100 p-4 sm:p-5 bg-stone-50/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-900 text-white shadow-md shadow-emerald-950/20">
              <Scale className="h-5 w-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-stone-900">IP-SAKTI</span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded-md">
                  Sahayak
                </span>
              </div>
              <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                Ayurveda IP & Regulatory AI
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Content */}
        <nav className="flex-1 overflow-y-auto px-3.5 py-4 space-y-5 text-xs font-semibold">
          
          {/* SECTION 1: MAIN */}
          <div>
            <div className="px-2.5 mb-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-wider flex items-center justify-between">
              <span>Main</span>
              <span className="text-emerald-700 font-normal">SIH26045</span>
            </div>
            <div className="space-y-1">
              <NavLink
                to="/assistant"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center justify-between gap-2.5 rounded-xl px-3 py-2 text-xs transition-all ${
                    isActive
                      ? 'bg-emerald-900 text-white font-bold shadow-xs'
                      : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <Bot className="h-4 w-4" />
                  <span>AI Assistant</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-bold uppercase bg-emerald-700 text-emerald-100">
                  Primary
                </span>
              </NavLink>

              <button
                onClick={() => {
                  navigate('/assistant');
                  onCloseMobile();
                }}
                className="w-full text-left flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] text-stone-500 hover:text-emerald-800 hover:bg-emerald-50/50 transition-colors pl-8"
              >
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>+ New Consultation</span>
              </button>
            </div>
          </div>

          {/* SECTION 2: ANALYSIS (HIGH PRIORITY) */}
          <div>
            <div className="px-2.5 mb-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
              Analysis & Protection
            </div>
            
            <div className="space-y-1">
              {/* Expandable IP Regime Analysis */}
              <div>
                <button
                  onClick={() => setIsRegimesOpen(!isRegimesOpen)}
                  className={`w-full flex items-center justify-between gap-2.5 rounded-xl px-3 py-2 text-xs transition-all ${
                    location.pathname.startsWith('/regimes')
                      ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Scale className="h-4 w-4 text-amber-700" />
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
                  <div className="ml-4 pl-3 border-l-2 border-emerald-100 my-1 space-y-0.5 animate-in fade-in duration-150">
                    <NavLink
                      to="/regimes"
                      onClick={onCloseMobile}
                      className={({ isActive }) =>
                        `flex items-center justify-between py-1.5 px-2 rounded-lg text-[11px] transition-colors ${
                          isActive && !location.search
                            ? 'text-emerald-900 font-bold bg-emerald-50'
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
                          className={`flex items-center gap-2 py-1.5 px-2 rounded-lg text-[11px] transition-colors ${
                            isActiveSub
                              ? 'text-emerald-900 font-bold bg-emerald-50'
                              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                          }`}
                        >
                          <SubIcon className="w-3 h-3 text-stone-400" />
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
                  `flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`
                }
              >
                <Layers className="h-4 w-4 text-emerald-700" />
                <span>Formulation Analysis</span>
              </NavLink>

              {/* Traditional Knowledge / TKDL */}
              <NavLink
                to="/tkdl"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`
                }
              >
                <BookOpen className="h-4 w-4 text-amber-600" />
                <span>Traditional Knowledge (TKDL)</span>
              </NavLink>

              {/* Drug Classification */}
              <NavLink
                to="/drug-classification"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`
                }
              >
                <FileCheck className="h-4 w-4 text-teal-700" />
                <span>Drug Classification</span>
              </NavLink>

              {/* ABS Compliance */}
              <NavLink
                to="/abs-compliance"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`
                }
              >
                <Building2 className="h-4 w-4 text-purple-700" />
                <span>ABS Compliance (NBA)</span>
              </NavLink>
            </div>
          </div>

          {/* SECTION 3: RESEARCH & EVIDENCE */}
          <div>
            <div className="px-2.5 mb-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
              Research & Evidence
            </div>
            <div className="space-y-1">
              <NavLink
                to="/sources"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`
                }
              >
                <BookOpen className="h-4 w-4 text-stone-500" />
                <span>Source Explorer</span>
              </NavLink>

              <NavLink
                to="/prior-art"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`
                }
              >
                <Shield className="h-4 w-4 text-stone-500" />
                <span>Research & Patents Prior Art</span>
              </NavLink>

              <NavLink
                to="/reports"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`
                }
              >
                <Bookmark className="h-4 w-4 text-stone-500" />
                <span>Saved Reports & Dossiers</span>
              </NavLink>
            </div>
          </div>

          {/* SECTION 4: CLINICAL & HEALTH HUB (Preserves ALL existing functional views) */}
          <div>
            <button
              onClick={() => setIsClinicalOpen(!isClinicalOpen)}
              className="w-full flex items-center justify-between px-2.5 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider hover:text-stone-600 transition-colors"
            >
              <span>Clinical & Health Hub</span>
              {isClinicalOpen ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </button>

            {isClinicalOpen && (
              <div className="space-y-1 mt-1 pl-1">
                <NavLink
                  to="/dashboard"
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 rounded-xl px-3 py-1.5 text-xs transition-all ${
                      isActive ? 'bg-stone-100 text-stone-900 font-bold' : 'text-stone-600 hover:bg-stone-50'
                    }`
                  }
                >
                  <Activity className="h-3.5 w-3.5 text-stone-400" />
                  <span>Clinical Dashboard</span>
                </NavLink>

                <NavLink
                  to="/doctors"
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 rounded-xl px-3 py-1.5 text-xs transition-all ${
                      isActive ? 'bg-stone-100 text-stone-900 font-bold' : 'text-stone-600 hover:bg-stone-50'
                    }`
                  }
                >
                  <Stethoscope className="h-3.5 w-3.5 text-stone-400" />
                  <span>Doctor Consultation</span>
                </NavLink>

                <NavLink
                  to="/appointments"
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 rounded-xl px-3 py-1.5 text-xs transition-all ${
                      isActive ? 'bg-stone-100 text-stone-900 font-bold' : 'text-stone-600 hover:bg-stone-50'
                    }`
                  }
                >
                  <Calendar className="h-3.5 w-3.5 text-stone-400" />
                  <span>Appointments</span>
                </NavLink>

                <NavLink
                  to="/prescriptions"
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 rounded-xl px-3 py-1.5 text-xs transition-all ${
                      isActive ? 'bg-stone-100 text-stone-900 font-bold' : 'text-stone-600 hover:bg-stone-50'
                    }`
                  }
                >
                  <FileText className="h-3.5 w-3.5 text-stone-400" />
                  <span>Prescriptions</span>
                </NavLink>

                <NavLink
                  to="/medicines"
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 rounded-xl px-3 py-1.5 text-xs transition-all ${
                      isActive ? 'bg-stone-100 text-stone-900 font-bold' : 'text-stone-600 hover:bg-stone-50'
                    }`
                  }
                >
                  <ShoppingBag className="h-3.5 w-3.5 text-stone-400" />
                  <span>Medicines & Formulations</span>
                </NavLink>

                <NavLink
                  to="/orders"
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 rounded-xl px-3 py-1.5 text-xs transition-all ${
                      isActive ? 'bg-stone-100 text-stone-900 font-bold' : 'text-stone-600 hover:bg-stone-50'
                    }`
                  }
                >
                  <PackageCheck className="h-3.5 w-3.5 text-stone-400" />
                  <span>Orders & Dispensing</span>
                </NavLink>

                <NavLink
                  to="/records"
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 rounded-xl px-3 py-1.5 text-xs transition-all ${
                      isActive ? 'bg-stone-100 text-stone-900 font-bold' : 'text-stone-600 hover:bg-stone-50'
                    }`
                  }
                >
                  <Activity className="h-3.5 w-3.5 text-stone-400" />
                  <span>Health Records</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* SECTION 5: SYSTEM */}
          <div>
            <div className="px-2.5 mb-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
              System
            </div>
            <div className="space-y-1">
              <NavLink
                to="/settings"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs transition-all ${
                    isActive ? 'bg-stone-100 text-stone-900 font-bold' : 'text-stone-600 hover:bg-stone-100'
                  }`
                }
              >
                <Settings className="h-4 w-4 text-stone-400" />
                <span>Settings</span>
              </NavLink>

              <NavLink
                to="/help"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs transition-all ${
                    isActive ? 'bg-stone-100 text-stone-900 font-bold' : 'text-stone-600 hover:bg-stone-100'
                  }`
                }
              >
                <HelpCircle className="h-4 w-4 text-stone-400" />
                <span>Help & Regulatory Guidelines</span>
              </NavLink>
            </div>
          </div>

        </nav>

        {/* Bottom User Area */}
        <div className="border-t border-stone-100 p-3.5 bg-stone-50/50">
          <div className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-stone-100/80 cursor-pointer transition-colors" onClick={() => navigate('/settings')}>
            <img src={currentUser.avatar} alt={currentUser.name} className="h-8 w-8 rounded-full object-cover border border-stone-200" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-bold text-stone-900">{currentUser.name}</div>
              <div className="truncate text-[10px] text-emerald-800 font-medium">Ayurveda Innovator</div>
            </div>
            <User className="w-3.5 h-3.5 text-stone-400" />
          </div>
        </div>

      </aside>
    </>
  );
};
