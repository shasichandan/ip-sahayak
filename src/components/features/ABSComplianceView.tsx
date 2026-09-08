import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Scale,
  Building2,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  HelpCircle,
  FileCheck,
  Sparkles
} from 'lucide-react';
import { authoritativeSources } from '../../data/ipData';

export const ABSComplianceView: React.FC = () => {
  const { setInspectSourceChain } = useApp();

  const [entityType, setEntityType] = useState<'indian' | 'foreign'>('indian');
  const [hasForeignEquity, setHasForeignEquity] = useState<'no' | 'yes'>('no');
  const [filingIPR, setFilingIPR] = useState<'yes' | 'no'>('yes');
  const [commercialSale, setCommercialSale] = useState<'yes' | 'no'>('yes');
  const [stateOfOrigin, setStateOfOrigin] = useState('Karnataka / Madhya Pradesh');

  const isSection3Entity = entityType === 'foreign' || hasForeignEquity === 'yes';

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-stone-200 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-200">
            Biodiversity Compliance
          </span>
          <span className="text-xs text-stone-500">The Biological Diversity Act, 2002 (amended 2023)</span>
        </div>
        <h1 className="text-2xl font-black text-stone-900 tracking-tight mt-1 flex items-center gap-2">
          <Scale className="w-6 h-6 text-purple-800" />
          <span>Access and Benefit Sharing (ABS) & NBA Compliance Navigator</span>
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-0.5 max-w-3xl leading-relaxed">
          Evaluate statutory compliance obligations before accessing Indian biological resources for commercial Ayurvedic manufacturing or filing intellectual property applications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Parameters */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
          <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-700" />
            <span>Entity & Resource Parameters</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-stone-800 block mb-1">
                1. Entity Legal Status
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setEntityType('indian'); setHasForeignEquity('no'); }}
                  className={`flex-1 py-1.5 rounded-lg border font-semibold text-xs ${entityType === 'indian' ? 'bg-purple-900 text-white border-purple-950' : 'bg-stone-50 text-stone-700 border-stone-200'}`}
                >
                  Indian Citizen / Domestic Firm
                </button>
                <button
                  type="button"
                  onClick={() => { setEntityType('foreign'); setHasForeignEquity('yes'); }}
                  className={`flex-1 py-1.5 rounded-lg border font-semibold text-xs ${entityType === 'foreign' ? 'bg-purple-900 text-white border-purple-950' : 'bg-stone-50 text-stone-700 border-stone-200'}`}
                >
                  Foreign Entity / NRI / MNC
                </button>
              </div>
            </div>

            <div>
              <label className="font-bold text-stone-800 block mb-1">
                2. Does the Indian company have any Foreign Shareholding / Non-Indian Directors?
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setHasForeignEquity('no')}
                  className={`flex-1 py-1.5 rounded-lg border font-semibold text-xs ${hasForeignEquity === 'no' ? 'bg-purple-900 text-white border-purple-950' : 'bg-stone-50 text-stone-700 border-stone-200'}`}
                >
                  100% Indian Equity
                </button>
                <button
                  type="button"
                  onClick={() => setHasForeignEquity('yes')}
                  className={`flex-1 py-1.5 rounded-lg border font-semibold text-xs ${hasForeignEquity === 'yes' ? 'bg-purple-900 text-white border-purple-950' : 'bg-stone-50 text-stone-700 border-stone-200'}`}
                >
                  Has Foreign Participation
                </button>
              </div>
            </div>

            <div>
              <label className="font-bold text-stone-800 block mb-1">
                3. Are you applying for a Patent / Intellectual Property Right?
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFilingIPR('yes')}
                  className={`flex-1 py-1.5 rounded-lg border font-semibold text-xs ${filingIPR === 'yes' ? 'bg-purple-900 text-white border-purple-950' : 'bg-stone-50 text-stone-700 border-stone-200'}`}
                >
                  Yes (Patent Filing)
                </button>
                <button
                  type="button"
                  onClick={() => setFilingIPR('no')}
                  className={`flex-1 py-1.5 rounded-lg border font-semibold text-xs ${filingIPR === 'no' ? 'bg-purple-900 text-white border-purple-950' : 'bg-stone-50 text-stone-700 border-stone-200'}`}
                >
                  No (Pure Manufacturing)
                </button>
              </div>
            </div>

            <div>
              <label className="font-bold text-stone-800 block mb-1">
                4. Commercial Utilization / Scale Manufacturing
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCommercialSale('yes')}
                  className={`flex-1 py-1.5 rounded-lg border font-semibold text-xs ${commercialSale === 'yes' ? 'bg-purple-900 text-white border-purple-950' : 'bg-stone-50 text-stone-700 border-stone-200'}`}
                >
                  Commercial Production
                </button>
                <button
                  type="button"
                  onClick={() => setCommercialSale('no')}
                  className={`flex-1 py-1.5 rounded-lg border font-semibold text-xs ${commercialSale === 'no' ? 'bg-purple-900 text-white border-purple-950' : 'bg-stone-50 text-stone-700 border-stone-200'}`}
                >
                  Academic / Research Only
                </button>
              </div>
            </div>

            <div>
              <label className="font-bold text-stone-800 block mb-1">
                Origin State of Bio-Resource Procurement
              </label>
              <input
                type="text"
                value={stateOfOrigin}
                onChange={e => setStateOfOrigin(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-stone-900"
              />
            </div>
          </div>
        </div>

        {/* Compliance Results Card */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Compliance Determination
              </span>
              <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
                isSection3Entity || filingIPR === 'yes'
                  ? 'bg-purple-50 text-purple-900 border-purple-200'
                  : 'bg-emerald-50 text-emerald-900 border-emerald-200'
              }`}>
                {isSection3Entity ? 'Section 3 Entity (NBA Direct Approval)' : 'Section 7 Entity (SBB Intimation)'}
              </span>
            </div>

            {/* Section 6 IPR Mandate Alert */}
            {filingIPR === 'yes' && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl space-y-1 text-xs text-rose-950">
                <div className="font-bold text-rose-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Mandatory Section 6 Prior NBA Clearance (Form III)</span>
                </div>
                <p>
                  Section 6(1) of the Biological Diversity Act mandates that NO PERSON shall apply for any IPR in or outside India for an invention based on Indian biological resources without obtaining prior approval of the National Biodiversity Authority (NBA).
                </p>
                <p className="font-bold text-rose-900 text-[11px] pt-1">
                  Penalty: The Indian Patent Office will withhold final patent grant until NBA Form III clearance is furnished.
                </p>
              </div>
            )}

            {/* Commercial Utilization Obligations */}
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
              <div className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-purple-700" />
                <span>State Biodiversity Board (SBB) Intimation</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                For commercial Ayurvedic manufacturing, Indian citizens and entities must give prior intimation under Section 7 to the concerned State Biodiversity Boards ({stateOfOrigin}). Benefit sharing fees range from 0.1% to 0.5% of annual gross ex-factory sales value under the 2014 ABS Guidelines.
              </p>
            </div>

            {/* Exemptions under 2023 Amendment */}
            <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200/70 space-y-1 text-xs">
              <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ayush Registered Practitioners & Cultivated Plants Exemption</span>
              </div>
              <p className="text-emerald-950 leading-relaxed">
                Under the Biological Diversity (Amendment) Act 2023, registered AYUSH practitioners and cultivated medicinal plants (with documented farmers' mandi receipts) are exempt from SBB intimation and ABS benefit-sharing fees for traditional Ayurvedic practice.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
            <button
              onClick={() =>
                setInspectSourceChain({
                  claim: 'ABS Section 6 IPR Approval Requirement',
                  source: 'The Biological Diversity Act, 2002',
                  document: 'Chapter II, Section 6(1)',
                  section: 'Form III Regulations',
                  authority: 'National Biodiversity Authority (NBA), Chennai',
                  confidence: 'high'
                })
              }
              className="font-bold text-purple-800 hover:text-purple-950 flex items-center gap-1"
            >
              <span>View BDA Section 6 Provenance</span>
              <ExternalLink className="w-3 h-3" />
            </button>

            <a
              href="http://nbaindia.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-stone-800 font-medium"
            >
              NBA Portal →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
