import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileCheck,
  Building2,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { authoritativeSources } from '../../data/ipData';

export const DrugClassificationView: React.FC = () => {
  const { setInspectSourceChain } = useApp();

  const [inSchedule1, setInSchedule1] = useState<'yes' | 'no'>('yes');
  const [exactRecipe, setExactRecipe] = useState<'yes' | 'no'>('no');
  const [modernExcipients, setModernExcipients] = useState<'yes' | 'no'>('yes');
  const [scheduleE1Poison, setScheduleE1Poison] = useState<'no' | 'yes'>('no');

  // Decision logic
  let classificationCategory = '';
  let regulatoryPathway = '';
  let trialRequirements = '';
  let licensingAuthority = '';
  let badgeColor = '';

  if (inSchedule1 === 'yes' && exactRecipe === 'yes' && modernExcipients === 'no') {
    classificationCategory = 'Classical Ayurvedic Medicine (Section 3(a))';
    regulatoryPathway = 'Rule 158B(I) — Classical ASU Drug without modifications';
    trialRequirements = 'No animal toxicity or clinical efficacy trials required. Reference to First Schedule text is sufficient proof of safety.';
    licensingAuthority = 'State AYUSH Licensing Authority (SLA) under standard Form 25D';
    badgeColor = 'emerald';
  } else if (inSchedule1 === 'yes' && (exactRecipe === 'no' || modernExcipients === 'yes')) {
    classificationCategory = 'Patent or Proprietary Ayurvedic Medicine (ASU)';
    regulatoryPathway = 'Rule 158B(IV) — Ingredients listed in authoritative books with novel dosage or ratio';
    trialRequirements = 'Submission of published safety literature, pilot batch stability study (3 batches), and heavy metal/microbial clearance under Rule 161.';
    licensingAuthority = 'State AYUSH SLA with proprietary product dossier review';
    badgeColor = 'amber';
  } else {
    classificationCategory = 'New / Novel Botanical Formulation (Requires Drug Controller Review)';
    regulatoryPathway = 'Phyto-Pharmaceutical / New Drug Pathway (Rule 122E / DCGI Review)';
    trialRequirements = 'Phase I, II, and III clinical trials and non-clinical safety pharmacology dossiers mandatory before commercial launch.';
    licensingAuthority = 'Central Drugs Standard Control Organization (CDSCO) & Ministry of AYUSH';
    badgeColor = 'rose';
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-stone-200 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full border border-teal-200">
            Regulatory Module
          </span>
          <span className="text-xs text-stone-500">Drugs and Cosmetics Rules, 1945</span>
        </div>
        <h1 className="text-2xl font-black text-stone-900 tracking-tight mt-1 flex items-center gap-2">
          <FileCheck className="w-6 h-6 text-teal-800" />
          <span>AYUSH Drug Regulatory Classification Engine</span>
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-0.5 max-w-3xl leading-relaxed">
          Determine the legal classification of your formulation under Rule 158B of the Drugs and Cosmetics Rules, 1945: Classical Medicine vs Patent/Proprietary ASU vs New Botanical Drug.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Decision Questionnaire */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
          <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-teal-700" />
            <span>Formulation Classification Checklist</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-stone-800 block mb-1">
                1. Are all active herbs listed in the 54 First Schedule authoritative texts?
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setInSchedule1('yes')}
                  className={`flex-1 py-1.5 rounded-lg border font-semibold text-xs ${inSchedule1 === 'yes' ? 'bg-teal-800 text-white border-teal-900' : 'bg-stone-50 text-stone-700 border-stone-200'}`}
                >
                  Yes (Schedule 1)
                </button>
                <button
                  type="button"
                  onClick={() => setInSchedule1('no')}
                  className={`flex-1 py-1.5 rounded-lg border font-semibold text-xs ${inSchedule1 === 'no' ? 'bg-teal-800 text-white border-teal-900' : 'bg-stone-50 text-stone-700 border-stone-200'}`}
                >
                  No (Unlisted / Novel)
                </button>
              </div>
            </div>

            <div>
              <label className="font-bold text-stone-800 block mb-1">
                2. Is the formulation prepared exactly according to the classical recipe without modifying proportions?
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setExactRecipe('yes')}
                  className={`flex-1 py-1.5 rounded-lg border font-semibold text-xs ${exactRecipe === 'yes' ? 'bg-teal-800 text-white border-teal-900' : 'bg-stone-50 text-stone-700 border-stone-200'}`}
                >
                  Exact Classical Recipe
                </button>
                <button
                  type="button"
                  onClick={() => setExactRecipe('no')}
                  className={`flex-1 py-1.5 rounded-lg border font-semibold text-xs ${exactRecipe === 'no' ? 'bg-teal-800 text-white border-teal-900' : 'bg-stone-50 text-stone-700 border-stone-200'}`}
                >
                  Modified / Innovative Ratio
                </button>
              </div>
            </div>

            <div>
              <label className="font-bold text-stone-800 block mb-1">
                3. Does the formulation introduce modern dosage forms (effervescent, nano-lipids, softgels) or non-aqueous solvents?
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setModernExcipients('yes')}
                  className={`flex-1 py-1.5 rounded-lg border font-semibold text-xs ${modernExcipients === 'yes' ? 'bg-teal-800 text-white border-teal-900' : 'bg-stone-50 text-stone-700 border-stone-200'}`}
                >
                  Yes (Modern Delivery)
                </button>
                <button
                  type="button"
                  onClick={() => setModernExcipients('no')}
                  className={`flex-1 py-1.5 rounded-lg border font-semibold text-xs ${modernExcipients === 'no' ? 'bg-teal-800 text-white border-teal-900' : 'bg-stone-50 text-stone-700 border-stone-200'}`}
                >
                  No (Classical Churna/Vati/Ghrita)
                </button>
              </div>
            </div>

            <div>
              <label className="font-bold text-stone-800 block mb-1">
                4. Does it contain Schedule E(1) specified poisonous ingredients (e.g. Vatsanabha, Bhallataka, Kupilu)?
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setScheduleE1Poison('no')}
                  className={`flex-1 py-1.5 rounded-lg border font-semibold text-xs ${scheduleE1Poison === 'no' ? 'bg-teal-800 text-white border-teal-900' : 'bg-stone-50 text-stone-700 border-stone-200'}`}
                >
                  No Poisonous Herbs
                </button>
                <button
                  type="button"
                  onClick={() => setScheduleE1Poison('yes')}
                  className={`flex-1 py-1.5 rounded-lg border font-semibold text-xs ${scheduleE1Poison === 'yes' ? 'bg-teal-800 text-white border-teal-900' : 'bg-stone-50 text-stone-700 border-stone-200'}`}
                >
                  Contains Sched E(1)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Classification Result Card */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Official Statutory Classification
              </span>
              <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
                badgeColor === 'emerald' ? 'bg-emerald-50 text-emerald-900 border-emerald-200' :
                badgeColor === 'amber' ? 'bg-amber-50 text-amber-900 border-amber-200' :
                'bg-rose-50 text-rose-900 border-rose-200'
              }`}>
                {classificationCategory.split('(')[0]}
              </span>
            </div>

            <div>
              <h3 className="text-base font-black text-stone-900 mb-1">
                {classificationCategory}
              </h3>
              <p className="text-xs text-stone-600 font-mono">
                {regulatoryPathway}
              </p>
            </div>

            {/* Trial & Safety Dossier Requirements */}
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <div className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Clinical & Safety Dossier Requirements</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {trialRequirements}
              </p>
            </div>

            {/* Licensing Body */}
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <div className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Statutory Licensing Authority</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {licensingAuthority}
              </p>
            </div>

            {/* Schedule E(1) Warning if applicable */}
            {scheduleE1Poison === 'yes' && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 space-y-1">
                <div className="font-bold flex items-center gap-1 text-rose-800">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Schedule E(1) Poisonous Substance Warning</span>
                </div>
                <p>
                  Formulation contains herbs specified in Schedule E(1). Mandatory caution warning must appear on the packaging: "Caution: To be taken under medical supervision only" with red box outline.
                </p>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
            <button
              onClick={() =>
                setInspectSourceChain({
                  claim: `Rule 158B Classification for ${classificationCategory}`,
                  source: 'Drugs and Cosmetics Rules, 1945',
                  document: 'Rule 158B — Licensing of ASU Drugs',
                  section: 'Part XVI',
                  authority: 'Ministry of AYUSH, Government of India',
                  confidence: 'high'
                })
              }
              className="font-bold text-teal-800 hover:text-teal-950 flex items-center gap-1"
            >
              <span>View Rule 158B Provenance</span>
              <ExternalLink className="w-3 h-3" />
            </button>

            <span className="text-[11px] text-stone-400">
              CDSCO / AYUSH Notification GSR 560(E)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
