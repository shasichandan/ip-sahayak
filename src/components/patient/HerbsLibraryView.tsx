import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockHerbs } from '../../data/mockData';
import { HerbDetail } from '../../types';
import {
  BookOpen,
  Search,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  Flame,
  Wind,
  Droplets,
  ExternalLink,
  ChevronRight,
  Info,
  X
} from 'lucide-react';

export const HerbsLibraryView: React.FC = () => {
  const { setInspectSourceChain, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDosha, setSelectedDosha] = useState('All');
  const [activeHerb, setActiveHerb] = useState<HerbDetail | null>(null);

  const filteredHerbs = mockHerbs.filter(herb => {
    const matchesSearch =
      herb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      herb.botanicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      herb.sanskritName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      herb.traditionalUses.some(u => u.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDosha =
      selectedDosha === 'All' || herb.doshaImpact.toLowerCase().includes(selectedDosha.toLowerCase());

    return matchesSearch && matchesDosha;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Classical Herbs & Formulations Encyclopedia
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Grounded in Charaka Samhita, Sushruta Samhita, and modern pharmacopeial monographs.
          </p>
        </div>
      </div>

      {/* Search & Dosha Filter */}
      <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-2xs space-y-3">
        <div className="flex items-center bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5">
          <Search className="w-4 h-4 text-emerald-700 mr-2.5 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by herb, botanical name, or indication (e.g. Ashwagandha, Triphala, Brahmi)..."
            className="w-full bg-transparent text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-hidden"
          />
        </div>

        {/* Dosha Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider shrink-0 mr-1">
            Dosha Focus:
          </span>
          {['All', 'Vata', 'Pitta', 'Kapha'].map(d => (
            <button
              key={d}
              onClick={() => setSelectedDosha(d)}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                selectedDosha === d
                  ? 'bg-emerald-800 text-white font-bold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Herbs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredHerbs.map(herb => (
          <div
            key={herb.id}
            className="p-5 rounded-2xl bg-white border border-stone-200/80 hover:border-emerald-300 shadow-2xs transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-base font-extrabold text-stone-900">{herb.name}</h3>
                  <p className="text-xs text-emerald-800 font-bold font-serif">{herb.sanskritName}</p>
                  <p className="text-[11px] text-stone-400 italic font-mono mt-0.5">{herb.botanicalName}</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                  {herb.category}
                </span>
              </div>

              {/* Doshic Action Tag */}
              <div className="my-2.5 p-2 bg-stone-50 rounded-xl text-xs text-stone-700">
                <span className="font-bold text-stone-900 block text-[10px] uppercase">Doshic Action</span>
                <span className="font-medium text-emerald-900">{herb.doshaImpact}</span>
              </div>

              {/* Classical Parameters (Rasa, Virya, Vipaka) */}
              <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] py-2 border-y border-stone-100">
                <div className="bg-stone-50/70 p-1.5 rounded-lg">
                  <span className="text-stone-400 font-bold block">RASA</span>
                  <span className="font-semibold text-stone-800 truncate block">{herb.rasa[0]}</span>
                </div>
                <div className="bg-stone-50/70 p-1.5 rounded-lg">
                  <span className="text-stone-400 font-bold block">VIRYA</span>
                  <span className="font-semibold text-stone-800 truncate block">{herb.virya}</span>
                </div>
                <div className="bg-stone-50/70 p-1.5 rounded-lg">
                  <span className="text-stone-400 font-bold block">VIPAKA</span>
                  <span className="font-semibold text-stone-800 truncate block">{herb.vipaka}</span>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-[11px] font-semibold text-stone-400 mb-1">Traditional Uses:</p>
                <div className="flex flex-wrap gap-1">
                  {herb.traditionalUses.slice(0, 3).map((use, uIdx) => (
                    <span key={uIdx} className="text-[10px] bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded-md">
                      {use}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 mt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] text-stone-400 font-medium">
                {herb.classicalReferences.length} Classical References
              </span>
              <button
                onClick={() => setActiveHerb(herb)}
                className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
              >
                Deep Dive
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Deep Dive Herb Detail Modal */}
      {activeHerb && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveHerb(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pb-4 border-b border-stone-100">
              <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                Classical Pharmacopeial Monograph
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-2">
                {activeHerb.name} ({activeHerb.sanskritName})
              </h2>
              <p className="text-xs text-stone-500 font-mono italic">{activeHerb.botanicalName}</p>
            </div>

            <div className="py-4 space-y-4 text-xs">
              {/* Ayurvedic Pharmacology Table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                <div>
                  <span className="text-stone-400 uppercase font-bold text-[10px]">Rasa (Taste)</span>
                  <p className="font-bold text-stone-800 text-xs mt-0.5">{activeHerb.rasa.join(', ')}</p>
                </div>
                <div>
                  <span className="text-stone-400 uppercase font-bold text-[10px]">Guna (Quality)</span>
                  <p className="font-bold text-stone-800 text-xs mt-0.5">{activeHerb.guna.join(', ')}</p>
                </div>
                <div>
                  <span className="text-stone-400 uppercase font-bold text-[10px]">Virya (Potency)</span>
                  <p className="font-bold text-stone-800 text-xs mt-0.5">{activeHerb.virya}</p>
                </div>
                <div>
                  <span className="text-stone-400 uppercase font-bold text-[10px]">Vipaka (Post-Digestive)</span>
                  <p className="font-bold text-stone-800 text-xs mt-0.5">{activeHerb.vipaka}</p>
                </div>
              </div>

              {/* Doshic impact */}
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/60 text-emerald-950">
                <span className="font-bold text-emerald-900 block mb-1">Doshic Karma (Action):</span>
                <p className="leading-relaxed">{activeHerb.doshaImpact}</p>
              </div>

              {/* Classical Citations */}
              <div>
                <h4 className="font-bold text-stone-900 mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  Primary Classical Text Citations
                </h4>
                <div className="space-y-2">
                  {activeHerb.classicalReferences.map((refStr, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-xl border border-stone-200 text-stone-700 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-stone-900">{refStr}</p>
                      </div>
                      <button
                        onClick={() =>
                          setInspectSourceChain({
                            claim: `${activeHerb.name} classical pharmacology`,
                            source: refStr.split(':')[0],
                            document: refStr,
                            section: 'Classical Verse',
                            authority: 'CCRAS / Classical Ayurveda Canon',
                            confidence: 'high'
                          })
                        }
                        className="text-[11px] text-emerald-800 font-bold underline hover:text-emerald-950 shrink-0 ml-3"
                      >
                        Verify Traceability
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety & Contraindications */}
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 space-y-1">
                <h4 className="font-bold text-amber-950 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-700" />
                  Safety & Pharmacological Notes
                </h4>
                <p className="leading-relaxed text-[11px]">
                  {activeHerb.safetyNotes}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setActiveHerb(null)}
                className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs transition-colors"
              >
                Close Monograph
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
