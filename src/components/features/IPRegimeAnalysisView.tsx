import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Scale,
  Shield,
  BookOpen,
  Award,
  MapPin,
  FileText,
  Compass,
  Lock,
  Sprout,
  Building2,
  FileCheck,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Info,
  Filter
} from 'lucide-react';
import { ipRegimesList, authoritativeSources } from '../../data/ipData';

export const IPRegimeAnalysisView: React.FC = () => {
  const { setInspectSourceChain } = useApp();
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expandedRegime, setExpandedRegime] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeParam = params.get('type');
    if (typeParam) {
      setActiveFilter(typeParam);
      setExpandedRegime(typeParam);
    }
  }, [location.search]);

  const filteredRegimes = activeFilter === 'all'
    ? ipRegimesList
    : ipRegimesList.filter(r => r.id === activeFilter);

  const getIcon = (id: string) => {
    switch (id) {
      case 'patent': return <Shield className="w-5 h-5 text-rose-600" />;
      case 'tkdl': return <BookOpen className="w-5 h-5 text-amber-600" />;
      case 'trademark': return <Award className="w-5 h-5 text-blue-600" />;
      case 'gi': return <MapPin className="w-5 h-5 text-emerald-600" />;
      case 'abs': return <Scale className="w-5 h-5 text-purple-600" />;
      case 'drug_regulation': return <FileCheck className="w-5 h-5 text-teal-600" />;
      case 'design': return <Compass className="w-5 h-5 text-indigo-600" />;
      case 'plant_variety': return <Sprout className="w-5 h-5 text-lime-600" />;
      case 'trade_secret': return <Lock className="w-5 h-5 text-stone-600" />;
      case 'copyright': return <FileText className="w-5 h-5 text-cyan-600" />;
      default: return <Scale className="w-5 h-5 text-emerald-700" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-stone-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
              IP Regimes Navigator
            </span>
            <span className="text-xs text-stone-500">10 Strategic Dimensions</span>
          </div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight mt-1 flex items-center gap-2">
            <Scale className="w-6 h-6 text-amber-800" />
            <span>Ayurvedic Intellectual Property Regime Matrix</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-0.5 max-w-3xl leading-relaxed">
            Examine the statutory intersection of Patents, Traditional Knowledge (TKDL), Trademarks, Geographical Indications, ABS Compliance, Plant Varieties, and Drug Regulations for Ayurvedic innovations.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'all'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            All (10)
          </button>
          {['patent', 'tkdl', 'trademark', 'abs', 'drug_regulation', 'gi'].map(key => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold uppercase tracking-wider text-[10px] transition-all ${
                activeFilter === key
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              {key.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Regimes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRegimes.map((regime) => {
          const isExpanded = expandedRegime === regime.id;
          return (
            <div
              key={regime.id}
              className={`bg-white rounded-2xl border transition-all ${
                isExpanded ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/20' : 'border-stone-200 shadow-xs hover:border-stone-300'
              } p-5 flex flex-col justify-between`}
            >
              <div>
                {/* Card Top Title Bar */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 shadow-2xs">
                      {getIcon(regime.id)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-stone-900 leading-tight">
                        {regime.name}
                      </h3>
                      <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                        {regime.governingLaw}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedRegime(isExpanded ? null : regime.id)}
                    className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Authority Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md">
                    Auth: {regime.statutoryAuthority.split('(')[0]}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    High Relevance
                  </span>
                </div>

                {/* Ayurveda Context Narrative */}
                <p className="text-xs text-stone-700 leading-relaxed mb-3">
                  {regime.ayurvedaContext}
                </p>

                {/* Progressive Disclosure: Expanded Technical Details */}
                {isExpanded && (
                  <div className="space-y-3 pt-3 border-t border-stone-100 animate-in fade-in duration-200">
                    
                    {/* Relevance Criteria Checklist */}
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70">
                      <h4 className="text-[11px] font-bold text-stone-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Key Relevance Criteria</span>
                      </h4>
                      <ul className="space-y-1 text-xs text-stone-600">
                        {regime.relevanceCriteria.map((crit, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{crit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Risks */}
                    <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-200/70">
                      <h4 className="text-[11px] font-bold text-rose-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Statutory & Litigation Risks</span>
                      </h4>
                      <ul className="space-y-1 text-xs text-rose-800">
                        {regime.keyRisks.map((risk, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="font-bold">•</span>
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommended Action Strategy */}
                    <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/70">
                      <h4 className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Recommended IP Strategy</span>
                      </h4>
                      <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                        {regime.recommendedAction}
                      </p>
                    </div>

                  </div>
                )}
              </div>

              {/* Bottom Actions Row */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => setExpandedRegime(isExpanded ? null : regime.id)}
                  className="text-stone-500 hover:text-stone-900 font-medium"
                >
                  {isExpanded ? 'Show less' : 'View statutory requirements →'}
                </button>

                <a
                  href={regime.officialPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 transition-colors"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
