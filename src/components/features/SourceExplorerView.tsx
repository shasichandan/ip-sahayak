import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Search,
  Filter,
  ExternalLink,
  Building2,
  Calendar,
  FileText,
  Shield,
  Tag,
  CheckCircle2
} from 'lucide-react';
import { authoritativeSources } from '../../data/ipData';

export const SourceExplorerView: React.FC = () => {
  const { setInspectSourceChain } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Sources' },
    { id: 'Patent Law', label: 'Patent Law' },
    { id: 'Traditional Knowledge', label: 'Traditional Knowledge' },
    { id: 'ABS Compliance', label: 'ABS / Biodiversity' },
    { id: 'Drug Regulation', label: 'Drug Regulations' },
    { id: 'Classical Text', label: 'Classical Texts' },
    { id: 'Geographical Indications', label: 'GI Registry' }
  ];

  const filtered = authoritativeSources.filter(s => {
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.authority.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-stone-200 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-800 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
            Source-Cited Corpus
          </span>
          <span className="text-xs text-stone-500">Legal & Traditional Provenance</span>
        </div>
        <h1 className="text-2xl font-black text-stone-900 tracking-tight mt-1 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-emerald-800" />
          <span>Ayurvedic Legal & Regulatory Source Explorer</span>
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-0.5 max-w-3xl leading-relaxed">
          Search the underlying statutory acts, TKDL pharmacopoeias, AYUSH gazette notifications, and judicial precedents governing Ayurvedic intellectual property and medicine manufacture.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search statutes, rules (e.g. Section 3(p), Rule 158B, TKDL, NBA), or excerpt keywords..."
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-700"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'bg-stone-50 border border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-stone-700 px-1">
          <span>Found {filtered.length} Statutory & Scientific Sources</span>
          <span className="text-stone-400 font-normal">All entries indexed in RAG knowledge graph</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(src => (
            <div
              key={src.id}
              className="bg-white rounded-2xl border border-stone-200 hover:border-emerald-400 transition-all p-5 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 border border-stone-200">
                    {src.category || src.type}
                  </span>
                  {src.date && (
                    <span className="text-[10px] text-stone-500 font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-stone-400" />
                      {src.date}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-black text-stone-900 leading-tight">
                    {src.title}
                  </h3>
                  <p className="text-xs text-emerald-800 font-mono font-semibold mt-0.5">
                    {src.section}
                  </p>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 leading-relaxed italic">
                  "{src.excerpt}"
                </div>

                <div className="flex items-center gap-1 text-[11px] text-stone-500 font-medium">
                  <Building2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="truncate">{src.authority}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <button
                  onClick={() =>
                    setInspectSourceChain({
                      claim: `Statutory excerpt from ${src.title}`,
                      source: src.title,
                      document: src.section,
                      section: src.pageOrChapter || 'Reference Provision',
                      authority: src.authority,
                      confidence: 'high'
                    })
                  }
                  className="font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                >
                  <span>Verify Provenance Chain</span>
                  <ExternalLink className="w-3 h-3" />
                </button>

                <span className="text-[10px] text-stone-400 font-mono">
                  Score: {src.relevanceScore}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
