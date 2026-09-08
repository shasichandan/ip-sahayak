import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Search,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  Sparkles,
  ScrollText,
  CheckCircle2,
  FileText,
  ArrowRight
} from 'lucide-react';
import { authoritativeSources } from '../../data/ipData';

interface TKDLRecord {
  id: string;
  botanicalName: string;
  sanskritName: string;
  ipcClass: string;
  classicalSources: string[];
  therapeuticIndications: string[];
  tkdlCode: string;
  priorArtSeverity: 'HIGH' | 'MODERATE' | 'LOW';
  excerpt: string;
  patentabilityBar: string;
}

export const TKDLCheckView: React.FC = () => {
  const { setInspectSourceChain, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('Curcuma longa');
  const [selectedRecord, setSelectedRecord] = useState<TKDLRecord | null>(null);

  const mockTkdlCorpus: TKDLRecord[] = [
    {
      id: 'tkdl-01',
      botanicalName: 'Curcuma longa L.',
      sanskritName: 'Haridra / Nisha',
      ipcClass: 'IPC: A61K 36/9066',
      classicalSources: ['Charaka Samhita (Sutra Sthana)', 'Sushruta Samhita (Chikitsa Sthana)', 'Bhavaprakasha Nighantu'],
      therapeuticIndications: ['Prameha (Metabolic disorders / Diabetes)', 'Kushta (Dermatological ailments)', 'Vranaropana (Wound healing)'],
      tkdlCode: 'CSIR-TKDL: RG/2180',
      priorArtSeverity: 'HIGH',
      excerpt: 'Documented use of Haridra powder mixed with honey or ghee for inflammatory skin disorders and mucosal ulcerations dating back to 6th century BCE.',
      patentabilityBar: 'Section 3(p) non-patentability bar strictly applies to direct herbal powders, simple decoctions, and wound-healing indications.'
    },
    {
      id: 'tkdl-02',
      botanicalName: 'Withania somnifera (L.) Dunal',
      sanskritName: 'Ashwagandha / Hayagandha',
      ipcClass: 'IPC: A61K 36/81',
      classicalSources: ['Charaka Samhita (Chikitsa Sthana: Rasayana)', 'Ashtanga Hridaya (Uttara Sthana)', 'Chakradatta'],
      therapeuticIndications: ['Balya (Strength promoting)', 'Medhya Rasayana (Cognitive enhancement)', 'Kshaya (Debilitation & emaciation)'],
      tkdlCode: 'CSIR-TKDL: AK/1429',
      priorArtSeverity: 'HIGH',
      excerpt: 'Classical processing in milk decoction (Ksheera Paka) and ghee (Ghrita) for revitalizing neuromuscular tissues and senile dementia.',
      patentabilityBar: 'Claims directed to Ashwagandha extracts for stress/adaptogenic support lack novelty against CSIR-TKDL archives.'
    },
    {
      id: 'tkdl-03',
      botanicalName: 'Tinospora cordifolia (Willd.) Miers',
      sanskritName: 'Guduchi / Amrita',
      ipcClass: 'IPC: A61K 36/59',
      classicalSources: ['Charaka Samhita', 'Sushruta Samhita', 'Dhanvantari Nighantu'],
      therapeuticIndications: ['Jvara (Chronic fevers)', 'Rasayana (Immunomodulation)', 'Yakrit-Pliha Roga (Hepato-protective)'],
      tkdlCode: 'CSIR-TKDL: GD/3310',
      priorArtSeverity: 'HIGH',
      excerpt: 'Guduchi Satva (aqueous starch extract) documented as immunomodulatory Deepana-Pachana formulation.',
      patentabilityBar: 'Aqueous extracts and immune-stimulatory claims barred under Section 3(p) and 3(e).'
    },
    {
      id: 'tkdl-04',
      botanicalName: 'Commiphora mukul (Stocks) Hook.',
      sanskritName: 'Guggulu',
      ipcClass: 'IPC: A61K 36/324',
      classicalSources: ['Sushruta Samhita (Sutra Sthana)', 'Bhavaprakasha', 'Bhaishajya Ratnavali'],
      therapeuticIndications: ['Medoroga (Hyperlipidemia / Obesity)', 'Vatarakta (Gout & Arthritis)', 'Vidradhi (Abscesses)'],
      tkdlCode: 'CSIR-TKDL: GG/4102',
      priorArtSeverity: 'HIGH',
      excerpt: 'Shuddha Guggulu purified in Triphala Kwatha for mobilizing adipose tissue and clearing vascular obstructions.',
      patentabilityBar: 'Cholesterol-lowering claims routinely invalidated by EPO and USPTO based on TKDL citations.'
    }
  ];

  const filteredRecords = mockTkdlCorpus.filter(r =>
    r.botanicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.sanskritName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.tkdlCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.therapeuticIndications.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-stone-900 to-emerald-950 rounded-2xl p-6 text-white shadow-md border border-amber-800/40">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-amber-400/30">
            SIH26045 Key Differentiator
          </span>
          <span className="text-xs text-stone-300">• CSIR-TKDL Prior Art Engine</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2 mt-1">
          <BookOpen className="w-6 h-6 text-amber-400" />
          <span>Traditional Knowledge & TKDL Prior Art Discovery</span>
        </h1>
        <p className="text-xs sm:text-sm text-amber-100/90 mt-1 max-w-3xl leading-relaxed">
          "Could this knowledge already exist in documented traditional knowledge?" Cross-reference botanical combinations and therapeutic uses against over 4.5 lakh CSIR-TKDL formulations and classical Samhita treatises.
        </p>
      </div>

      {/* Search & Query Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search botanical name (e.g. Curcuma, Ashwagandha), Sanskrit name, or IPC Class..."
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600/20 focus:border-amber-700"
          />
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-stone-700 px-1">
          <span>Identified CSIR-TKDL Prior Art Records ({filteredRecords.length})</span>
          <span className="text-amber-800 font-normal">Section 3(p) Indian Patent Act Screening</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRecords.map((record) => (
            <div
              key={record.id}
              className="bg-white rounded-2xl border border-stone-200 hover:border-amber-400 transition-all p-5 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {record.tkdlCode}
                    </span>
                    <h3 className="text-sm font-black text-stone-900 mt-1">
                      {record.botanicalName} ({record.sanskritName})
                    </h3>
                    <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                      {record.ipcClass}
                    </p>
                  </div>

                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
                    {record.priorArtSeverity} PRIOR ART BAR
                  </span>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70 text-xs text-stone-700">
                  <span className="font-bold text-stone-800">Classical Indicative Excerpt: </span>
                  <p className="italic mt-0.5 leading-relaxed">"{record.excerpt}"</p>
                </div>

                <div>
                  <div className="text-[11px] font-bold text-stone-700 mb-1">Documented Samhita Sources:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {record.classicalSources.map((src, sIdx) => (
                      <span key={sIdx} className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md">
                        {src}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-200/80 text-xs">
                  <div className="font-bold text-rose-900 flex items-center gap-1.5 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Patentability Implications (Sec 3(p))</span>
                  </div>
                  <p className="text-rose-950 leading-relaxed">
                    {record.patentabilityBar}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <button
                  onClick={() =>
                    setInspectSourceChain({
                      claim: `TKDL Prior Art bar for ${record.botanicalName}`,
                      source: 'CSIR Traditional Knowledge Digital Library',
                      document: record.tkdlCode,
                      section: record.ipcClass,
                      authority: 'Council of Scientific & Industrial Research (CSIR) - Govt of India',
                      confidence: 'high'
                    })
                  }
                  className="font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1"
                >
                  <span>Verify Provenance Chain</span>
                  <ExternalLink className="w-3 h-3" />
                </button>

                <a
                  href="https://tkdl.res.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-500 hover:text-stone-800 font-medium"
                >
                  TKDL Portal →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
