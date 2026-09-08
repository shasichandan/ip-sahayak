import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  Sparkles,
  Shield,
  BookOpen,
  Scale,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  RefreshCw,
  Bookmark,
  FileText
} from 'lucide-react';
import { authoritativeSources } from '../../data/ipData';

export const FormulationAnalysisView: React.FC = () => {
  const { showToast, saveAnswer, setInspectSourceChain } = useApp();
  const navigate = useNavigate();

  const [productName, setProductName] = useState('AshwaCurcumin Bio-Synergy');
  const [ingredients, setIngredients] = useState('Withania somnifera (Ashwagandha root 400mg), Curcuma longa (Turmeric 95% Curcuminoids 250mg), Piper nigrum (Bio-enhancer Piperine 10mg)');
  const [dosageForm, setDosageForm] = useState('Nano-lipid Self-Emulsifying Capsule');
  const [intendedUse, setIntendedUse] = useState('Joint mobility, chronic osteoarthritis inflammation, neuro-cognitive recovery');
  const [bioSource, setBioSource] = useState('Cultivated in Madhya Pradesh & Karnataka, India (Domestic Biological Resource)');
  const [tkBasis, setTkBasis] = useState('Derived from classical Rasayana principles; modified extraction with proprietary lipid carrier');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(true);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalyzed(true);
      showToast('Formulation Analysis Completed', 'Multi-regime IP evaluation generated', 'success');
    }, 800);
  };

  const loadSample = (type: 'curcumin' | 'triphala') => {
    if (type === 'curcumin') {
      setProductName('AshwaCurcumin Bio-Synergy');
      setIngredients('Withania somnifera (Ashwagandha root 400mg), Curcuma longa (Turmeric 95% Curcuminoids 250mg), Piper nigrum (Bio-enhancer Piperine 10mg)');
      setDosageForm('Nano-lipid Self-Emulsifying Capsule');
      setIntendedUse('Joint mobility, chronic osteoarthritis inflammation, neuro-cognitive recovery');
      setBioSource('Cultivated in Madhya Pradesh & Karnataka, India (Domestic Biological Resource)');
      setTkBasis('Derived from classical Rasayana principles; modified extraction with proprietary lipid carrier');
    } else {
      setProductName('Modified Triphala-Guggulu Effervescent');
      setIngredients('Amalaki, Haritaki, Bibhitaki, Commiphora mukul (Shuddha Guggulu 300mg), Excipients (Citric acid, Sodium bicarbonate)');
      setDosageForm('Effervescent Rapid-Dispersible Granules');
      setIntendedUse('Lipid metabolism regulation, obesity (Sthoulya), anti-hyperlipidemic');
      setBioSource('Wildcrafted from Western Ghats forests, Kerala (State Biodiversity Board jurisdiction)');
      setTkBasis('Classical formulation in Sharangadhara Samhita; modified into modern effervescent dosage form');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-stone-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Formulation Workflow
            </span>
            <span className="text-xs text-stone-500">SIH26045 Module 2</span>
          </div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight mt-1 flex items-center gap-2">
            <Layers className="w-6 h-6 text-emerald-800" />
            <span>Ayurvedic Formulation IP & Regulatory Analyzer</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
            Submit botanical ingredients, extraction methods and dosage specifications to evaluate Section 3(p) barriers, CSIR-TKDL matches, ABS filings, and Rule 158B drug classification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => loadSample('curcumin')}
            className="px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
          >
            Sample: Ashwagandha + Turmeric
          </button>
          <button
            type="button"
            onClick={() => loadSample('triphala')}
            className="px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
          >
            Sample: Triphala-Guggulu
          </button>
        </div>
      </div>

      {/* Input Formulation Form */}
      <form onSubmit={handleAnalyze} className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>Formulation Profile & Botanical Specifications</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Product / Innovation Working Name
            </label>
            <input
              type="text"
              value={productName}
              onChange={e => setProductName(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-700"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Dosage Form & Delivery System
            </label>
            <input
              type="text"
              value={dosageForm}
              onChange={e => setDosageForm(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-700"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Active Botanical & Mineral Ingredients (with botanical binomials & proportions)
            </label>
            <textarea
              rows={2}
              value={ingredients}
              onChange={e => setIngredients(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-700"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Intended Indication & Therapeutic Claims
            </label>
            <input
              type="text"
              value={intendedUse}
              onChange={e => setIntendedUse(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-700"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Source & Provenance of Biological Materials (ABS / NBA Tracing)
            </label>
            <input
              type="text"
              value={bioSource}
              onChange={e => setBioSource(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-700"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Traditional Knowledge Basis / Classical Text Origin
            </label>
            <input
              type="text"
              value={tkBasis}
              onChange={e => setTkBasis(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-700"
              required
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={isAnalyzing}
            className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Cross-referencing TKDL & Patents Act...</span>
              </>
            ) : (
              <>
                <span>Run Comprehensive IP & Regulatory Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Structured Analysis Results Output */}
      {hasAnalyzed && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
          
          {/* Top Banner with Confidence */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-xl">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-stone-900">
                  IP & Regulatory Synthesis: {productName}
                </h3>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                  Formulation Dossier Generated
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-0.5">
                Evaluation across Patents Act 1970, Biological Diversity Act 2002, D&C Act 1940, and CSIR-TKDL.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-900 bg-white px-3 py-1 rounded-lg border border-emerald-200 shadow-2xs">
                AI Confidence: 91% (High)
              </span>
              <button
                onClick={() => {
                  saveAnswer(`Formulation: ${productName}`, `Analyzed IP barriers for ${productName} with Section 3(p) flags and NBA requirements.`, 'Formulation Analysis', 5);
                  showToast('Dossier Saved', 'Added to Saved Reports & Dossiers', 'success');
                }}
                className="p-1.5 rounded-lg border border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50"
                title="Save Dossier"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 1. Formulation Summary */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>1. Formulation Summary</span>
            </h4>
            <p className="text-xs text-stone-700 leading-relaxed">
              The proposed formulation <span className="font-bold">{productName}</span> integrates classical botanicals (<span className="italic">Withania somnifera</span> and <span className="italic">Curcuma longa</span>) with a modern lipid nano-carrier delivery system. While the botanical combination has millennia of documented use in Rasayana literature, the novel delivery matrix and enhanced bio-absorption kinetics represent a dual intellectual property profile: standard herb combinations are non-patentable under Section 3(p), but the specific nano-lipid formulation process and synergistic bio-availability data may satisfy inventive step criteria.
            </p>
          </div>

          {/* 2. Potential IP Regimes */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-amber-700" />
              <span>2. Potential IP Regimes Breakdown</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl">
                <div className="flex items-center justify-between text-xs font-bold text-rose-900 mb-1">
                  <span>Patent</span>
                  <span className="text-[10px] px-2 py-0.5 bg-rose-100 text-rose-800 rounded-full font-extrabold">CONDITIONAL</span>
                </div>
                <p className="text-[11px] text-stone-600">
                  Barred for raw herbs (Sec 3(p)); focus claims on the nano-lipid delivery method and synergistic ratio.
                </p>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl">
                <div className="flex items-center justify-between text-xs font-bold text-blue-900 mb-1">
                  <span>Trademark</span>
                  <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full font-extrabold">HIGH PRIORITY</span>
                </div>
                <p className="text-[11px] text-stone-600">
                  Register "{productName}" under Nice Class 5 (pharmaceuticals) and Class 35 (e-commerce).
                </p>
              </div>

              <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-xl">
                <div className="flex items-center justify-between text-xs font-bold text-purple-900 mb-1">
                  <span>ABS (Biodiversity)</span>
                  <span className="text-[10px] px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full font-extrabold">MANDATORY</span>
                </div>
                <p className="text-[11px] text-stone-600">
                  Section 6 NBA Form III filing required before patent grant; SBB intimation for commercial sale.
                </p>
              </div>

              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-1">
                  <span>Trade Secret</span>
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-extrabold">STRATEGIC</span>
                </div>
                <p className="text-[11px] text-stone-600">
                  Protect exact temperature, homogenizer speeds, and lipid excipient ratios via internal NDAs.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Traditional Knowledge Relevance & 4. Patentability Considerations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-amber-50/40 border border-amber-200/80 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>3. Traditional Knowledge (TKDL) Relevance</span>
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed">
                Prior art identified in CSIR-TKDL Records <span className="font-mono font-bold">RG/2180</span> (Curcuma longa) and <span className="font-mono font-bold">AK/1429</span> (Withania somnifera) spanning 14 centuries in Charaka Samhita and Bhavaprakasha Nighantu.
              </p>
              <div className="p-2.5 bg-white rounded-lg border border-amber-200 text-[11px] text-stone-700">
                <span className="font-bold text-amber-900">Patentability Implication: </span>
                Any claim claiming mere combination for anti-inflammatory or revitalizing action will be rejected under Section 3(p) as known prior art.
              </div>
            </div>

            <div className="p-4 bg-rose-50/40 border border-rose-200/80 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-rose-700" />
                <span>4. Patentability Considerations (Sec 3(p) & 3(e))</span>
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed">
                To overcome the Section 3(e) "mere admixture" objection, applicant must provide empirical proof of unexpected synergy (Combination Index &lt; 0.8) where the combined efficacy exceeds the algebraic sum of individual herbs.
              </p>
              <div className="p-2.5 bg-white rounded-lg border border-rose-200 text-[11px] text-stone-700">
                <span className="font-bold text-rose-900">Claim Drafting Recommendation: </span>
                Structure claims around the novel formulation matrix (specific lipid:surfactant:extract ratio) rather than the raw plant material.
              </div>
            </div>
          </div>

          {/* 5. Drug Classification & 6. ABS Considerations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-teal-50/40 border border-teal-200/80 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-teal-700" />
                <span>5. Drug Regulatory Classification (Rule 158B)</span>
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed">
                Classified as <span className="font-bold">Patent or Proprietary Ayurvedic Medicine (ASU)</span> under Rule 158B(IV) because of the modified dosage form (nano-capsule) and combination.
              </p>
              <p className="text-[11px] text-stone-600">
                Requires safety dossier with published animal toxicity studies and 3-batch pilot stability study before State AYUSH Licensing Authority.
              </p>
            </div>

            <div className="p-4 bg-purple-50/40 border border-purple-200/80 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-purple-700" />
                <span>6. ABS Considerations (Biological Diversity Act)</span>
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed">
                Biological resources sourced domestically from MP and Karnataka require prior intimation to the MP and Karnataka State Biodiversity Boards under Section 7.
              </p>
              <p className="text-[11px] text-stone-600">
                If filing an Indian or international PCT patent, prior approval from the National Biodiversity Authority (Form III) is non-negotiable under Section 6.
              </p>
            </div>
          </div>

          {/* 7. Potential Risks & 8. Recommended Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>7. Potential IP & Regulatory Risks</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700">
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>Pre-grant opposition from competitors or CSIR-TKDL citing non-patentability.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>Non-compliance penalty under Section 55 of Biological Diversity Act if NBA Form III is omitted.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>Rejection of descriptive trademark applications under Section 9 of Trade Marks Act.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>8. Recommended Strategic Next Steps</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-700 font-bold">1.</span>
                  <span>File Trademark Class 5 application for the coined brand name.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-700 font-bold">2.</span>
                  <span>Conduct in-vitro combination index synergy studies before patent claim drafting.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-700 font-bold">3.</span>
                  <span>File NBA Form III with the National Biodiversity Authority.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-700 font-bold">4.</span>
                  <span>Prepare Rule 158B licensing dossier for State AYUSH Authority.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 9. Cited Sources */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span>9. Traceable Legal & Regulatory Sources</span>
              </h4>
              <span className="text-[11px] text-stone-500">4 statutory references consulted</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {authoritativeSources.slice(0, 4).map((src) => (
                <div key={src.id} className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[9px] font-bold uppercase text-emerald-800 mb-1">
                      <span>{src.category}</span>
                      <span>{src.relevanceScore}% match</span>
                    </div>
                    <h5 className="text-xs font-bold text-stone-900 line-clamp-1">{src.title}</h5>
                    <p className="text-[10px] text-stone-500 font-mono mt-0.5">{src.section}</p>
                    <p className="text-[11px] text-stone-600 italic line-clamp-2 mt-1">"{src.excerpt}"</p>
                  </div>
                  <button
                    onClick={() =>
                      setInspectSourceChain({
                        claim: `Formulation ${productName} compliance evaluation`,
                        source: src.title,
                        document: src.section,
                        section: src.pageOrChapter || 'Section Ref',
                        authority: src.authority,
                        confidence: 'high'
                      })
                    }
                    className="mt-2 pt-1.5 border-t border-stone-200 text-[10px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center justify-between"
                  >
                    <span>View Provenance</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
