import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, ShieldCheck, ArrowDown, ExternalLink, X, Building2, ScrollText, CheckCircle2 } from 'lucide-react';

export const SourceChainModal: React.FC = () => {
  const { inspectSourceChain, setInspectSourceChain } = useApp();

  if (!inspectSourceChain) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 overflow-hidden relative">
        <button
          onClick={() => setInspectSourceChain(null)}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1.5 rounded-lg hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
            <ScrollText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-900">Source Traceability Chain</h3>
            <p className="text-xs text-stone-500">
              Verified clinical & traditional provenance protocol (Ayurveda RAG v2.4)
            </p>
          </div>
        </div>

        {/* Chain Flow */}
        <div className="space-y-3 relative">
          {/* Step 1: AI Claim */}
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-emerald-700 mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Step 1: AI Synthesis Claim
            </div>
            <p className="text-sm font-medium text-stone-800">
              "{inspectSourceChain.claim}"
            </p>
          </div>

          <div className="flex justify-center text-stone-400 py-0.5">
            <ArrowDown className="w-4 h-4 text-emerald-600" />
          </div>

          {/* Step 2: Source Corpus */}
          <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-emerald-800 mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              Step 2: Primary Classical Corpus / Index
            </div>
            <p className="text-sm font-bold text-stone-900">
              {inspectSourceChain.source}
            </p>
          </div>

          <div className="flex justify-center text-stone-400 py-0.5">
            <ArrowDown className="w-4 h-4 text-emerald-600" />
          </div>

          {/* Step 3: Document & Section */}
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-1">
              Step 3: Classical Document & Exact Sthana/Adhyaya
            </div>
            <p className="text-sm font-semibold text-stone-900">
              {inspectSourceChain.document}
            </p>
            <p className="text-xs text-stone-600 mt-0.5 font-mono">
              Reference: {inspectSourceChain.section}
            </p>
          </div>

          <div className="flex justify-center text-stone-400 py-0.5">
            <ArrowDown className="w-4 h-4 text-emerald-600" />
          </div>

          {/* Step 4: Authoritative Body */}
          <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-amber-800 mb-1 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-amber-700" />
              Step 4: Statutory / Research Authority Verification
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-stone-900">
                {inspectSourceChain.authority}
              </span>
              <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" /> Traceable
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between pt-4 border-t border-stone-100">
          <span className="text-xs text-stone-500">
            Confidence: <span className="font-semibold text-emerald-700 uppercase">{inspectSourceChain.confidence}</span>
          </span>
          <button
            onClick={() => setInspectSourceChain(null)}
            className="px-4 py-2 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition-colors"
          >
            Close Provenance
          </button>
        </div>
      </div>
    </div>
  );
};
