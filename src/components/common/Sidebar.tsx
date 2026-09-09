import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Scale,
  Layers3,
  BookOpen,
  FileCheck,
  Building2,
  Shield,
  Bookmark,
  Activity,
  Settings,
  CircleHelp,
  ChevronDown,
  ChevronRight,
  User,
  Stethoscope,
  Calendar,
  FileText,
  ShoppingBag,
  PackageCheck,
  Award,
  MapPin,
  Compass,
  Lock,
  Sprout
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
        <div className="border-b border-stone-100 p-5 bg-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-900 text-white shadow-md shadow-emerald-950/20">
              <Scale className="h-5 w-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-stone-900">IP-SAKTI</span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-md">
                  Sahayak
                </span>
              </div>
              <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                Ayurveda IP & Regulatory
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Content */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-8 text-[14px] font-medium">
          
          {/* SECTION 1: ANALYSIS & PROTECTION */}
          <div>
            <div className="px-2 mb-3 text-[11px] font-bold text-stone-400 uppercase tracking-[0.06em]">
              Analysis & Protection
            </div>
            
            <div className="space-y-1">
              {/* Expandable IP Regime Analysis */}
              <div>
                <button
                  onClick={() => setIsRegimesOpen(!isRegimesOpen)}
                  className={`w-full flex items-center justify-between gap-3 rounded-lg px-2 py-2 transition-all ${
                    location.pathname.startsWith('/regimes')
                      ? 'bg-stone-50 text-emerald-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Scale className={`h-[18px] w-[18px] ${location.pathname.startsWith('/regimes') ? 'text-amber-600' : 'text-stone-400'}`} />
                    <span>IP Regime Analysis</span>
                  </div>
                  {isRegimesOpen ? (
                    <ChevronDown className="w-4 h-4 text-stone-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  )}
                </button>

                {/* Nested IP Regimes */}
                {isRegimesOpen && (
                  <div className="ml-[18px] pl-4 border-l border-stone-200 my-1 space-y-0.5 animate-in fade-in duration-150">
                    <NavLink
                      to="/regimes"
                      onClick={onCloseMobile}
                      className={({ isActive }) =>
                        `flex items-center justify-between py-1.5 px-2 rounded-lg text-[13px] transition-colors ${
                          isActive && !location.search
                            ? 'text-emerald-900 font-semibold bg-stone-50'
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
                          className={`flex items-center gap-2.5 py-1.5 px-2 rounded-lg text-[13px] transition-colors ${
                            isActiveSub
                              ? 'text-emerald-900 font-semibold bg-stone-50'
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
                  `flex items-center gap-3 rounded-lg px-2 py-2 transition-all ${
                    isActive
                      ? 'bg-stone-50 text-emerald-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Layers3 className={`h-[18px] w-[18px] ${isActive ? 'text-emerald-700' : 'text-stone-400'}`} />
                    <span>Formulation Analysis</span>
                  </>
                )}
              </NavLink>

              {/* Traditional Knowledge / TKDL */}
              <NavLink
                to="/tkdl"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-2 py-2 transition-all ${
                    isActive
                      ? 'bg-stone-50 text-emerald-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <BookOpen className={`h-[18px] w-[18px] ${isActive ? 'text-amber-600' : 'text-stone-400'}`} />
                    <span>Traditional Knowledge (TKDL)</span>
                  </>
                )}
              </NavLink>

              {/* Drug Classification */}
              <NavLink
                to="/drug-classification"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-2 py-2 transition-all ${
                    isActive
                      ? 'bg-stone-50 text-emerald-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <FileCheck className={`h-[18px] w-[18px] ${isActive ? 'text-teal-700' : 'text-stone-400'}`} />
                    <span>Drug Classification</span>
                  </>
                )}
              </NavLink>

              {/* ABS Compliance */}
              <NavLink
                to="/abs-compliance"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-2 py-2 transition-all ${
                    isActive
                      ? 'bg-stone-50 text-emerald-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Building2 className={`h-[18px] w-[18px] ${isActive ? 'text-purple-700' : 'text-stone-400'}`} />
                    <span>ABS Compliance (NBA)</span>
                  </>
                )}
              </NavLink>
            </div>
          </div>

          {/* SECTION 2: RESEARCH & EVIDENCE */}
          <div>
            <div className="px-2 mb-3 text-[11px] font-bold text-stone-400 uppercase tracking-[0.06em]">
              Research & Evidence
            </div>
            <div className="space-y-1">
              <NavLink
                to="/sources"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-2 py-2 transition-all ${
                    isActive
                      ? 'bg-stone-50 text-emerald-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <BookOpen className={`h-[18px] w-[18px] ${isActive ? 'text-stone-600' : 'text-stone-400'}`} />
                    <span>Source Explorer</span>
                  </>
                )}
              </NavLink>

              <NavLink
                to="/prior-art"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-2 py-2 transition-all ${
                    isActive
                      ? 'bg-stone-50 text-emerald-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Shield className={`h-[18px] w-[18px] ${isActive ? 'text-stone-600' : 'text-stone-400'}`} />
                    <span>Research & Patents Prior Art</span>
                  </>
                )}
              </NavLink>

              <NavLink
                to="/reports"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-2 py-2 transition-all ${
                    isActive
                      ? 'bg-stone-50 text-emerald-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Bookmark className={`h-[18px] w-[18px] ${isActive ? 'text-stone-600' : 'text-stone-400'}`} />
                    <span>Saved Reports & Dossiers</span>
                  </>
                )}
              </NavLink>
            </div>
          </div>

          {/* SECTION 3: CLINICAL & HEALTH HUB */}
          <div>
            <button
              onClick={() => setIsClinicalOpen(!isClinicalOpen)}
              className="w-full flex items-center justify-between px-2 mb-2 text-[11px] font-bold text-stone-400 uppercase tracking-[0.06em] hover:text-stone-600 transition-colors"
            >
              <span>Clinical & Health Hub</span>
              {isClinicalOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {isClinicalOpen && (
              <div className="space-y-1">
                <NavLink
                  to="/dashboard"
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-2 py-2 transition-all ${
                      isActive ? 'bg-stone-50 text-emerald-900 font-semibold' : 'text-stone-700 hover:bg-stone-50'
                    }`
                  }
                >
                  <Activity className="h-[18px] w-[18px] text-stone-400" />
                  <span>Clinical Dashboard</span>
                </NavLink>

                <NavLink
                  to="/doctors"
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-2 py-2 transition-all ${
                      isActive ? 'bg-stone-50 text-emerald-900 font-semibold' : 'text-stone-700 hover:bg-stone-50'
                    }`
                  }
                >
                  <Stethoscope className="h-[18px] w-[18px] text-stone-400" />
                  <span>Doctor Consultation</span>
                </NavLink>

                <NavLink
                  to="/appointments"
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-2 py-2 transition-all ${
                      isActive ? 'bg-stone-50 text-emerald-900 font-semibold' : 'text-stone-700 hover:bg-stone-50'
                    }`
                  }
                >
                  <Calendar className="h-[18px] w-[18px] text-stone-400" />
                  <span>Appointments</span>
                </NavLink>

                <NavLink
                  to="/prescriptions"
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-2 py-2 transition-all ${
                      isActive ? 'bg-stone-50 text-emerald-900 font-semibold' : 'text-stone-700 hover:bg-stone-50'
                    }`
                  }
                >
                  <FileText className="h-[18px] w-[18px] text-stone-400" />
                  <span>Prescriptions</span>
                </NavLink>

                <NavLink
                  to="/medicines"
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-2 py-2 transition-all ${
                      isActive ? 'bg-stone-50 text-emerald-900 font-semibold' : 'text-stone-700 hover:bg-stone-50'
                    }`
                  }
                >
                  <ShoppingBag className="h-[18px] w-[18px] text-stone-400" />
                  <span>Medicines & Formulations</span>
                </NavLink>

                <NavLink
                  to="/orders"
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-2 py-2 transition-all ${
                      isActive ? 'bg-stone-50 text-emerald-900 font-semibold' : 'text-stone-700 hover:bg-stone-50'
                    }`
                  }
                >
                  <PackageCheck className="h-[18px] w-[18px] text-stone-400" />
                  <span>Orders & Dispensing</span>
                </NavLink>

                <NavLink
                  to="/records"
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-2 py-2 transition-all ${
                      isActive ? 'bg-stone-50 text-emerald-900 font-semibold' : 'text-stone-700 hover:bg-stone-50'
                    }`
                  }
                >
                  <Activity className="h-[18px] w-[18px] text-stone-400" />
                  <span>Health Records</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* SECTION 4: SYSTEM */}
          <div>
            <div className="px-2 mb-3 text-[11px] font-bold text-stone-400 uppercase tracking-[0.06em]">
              System
            </div>
            <div className="space-y-1">
              <NavLink
                to="/settings"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-2 py-2 transition-all ${
                    isActive ? 'bg-stone-50 text-emerald-900 font-semibold' : 'text-stone-700 hover:bg-stone-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Settings className={`h-[18px] w-[18px] ${isActive ? 'text-stone-600' : 'text-stone-400'}`} />
                    <span>Settings</span>
                  </>
                )}
              </NavLink>

              <NavLink
                to="/help"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-2 py-2 transition-all ${
                    isActive ? 'bg-stone-50 text-emerald-900 font-semibold' : 'text-stone-700 hover:bg-stone-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <CircleHelp className={`h-[18px] w-[18px] ${isActive ? 'text-stone-600' : 'text-stone-400'}`} />
                    <span>Help & Regulatory Guidelines</span>
                  </>
                )}
              </NavLink>
            </div>
          </div>

        </nav>

        {/* Bottom User Area */}
        <div className="p-4 bg-white border-t border-stone-200">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-50 cursor-pointer transition-colors" onClick={() => navigate('/settings')}>
            <img src={currentUser.avatar} alt={currentUser.name} className="h-9 w-9 rounded-full object-cover border border-stone-200" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-stone-900">{currentUser.name}</div>
              <div className="truncate text-[11px] text-emerald-800 font-medium">Ayurveda Innovator</div>
            </div>
            <User className="w-4 h-4 text-stone-400" />
          </div>
        </div>

      </aside>
    </>
  );
};
