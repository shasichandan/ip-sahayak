import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  Stethoscope,
  Building2,
  BookOpen,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { mockDoctors, mockProducts, mockHerbs, mockHospitals, mockPharmacies } from '../../data/mockData';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen } = useApp();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Keyboard shortcut Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  const results = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();

    return {
      herbs: mockHerbs.filter(h => h.name.toLowerCase().includes(q) || h.botanicalName.toLowerCase().includes(q)),
      products: mockProducts.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)),
      doctors: mockDoctors.filter(d => d.name.toLowerCase().includes(q) || d.specialties.some(s => s.toLowerCase().includes(q))),
      pharmacies: mockPharmacies.filter(ph => ph.name.toLowerCase().includes(q) || ph.address.toLowerCase().includes(q)),
      hospitals: mockHospitals.filter(h => h.name.toLowerCase().includes(q) || h.specialties.some(s => s.toLowerCase().includes(q)))
    };
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-stone-200 bg-stone-50/50">
          <Search className="w-5 h-5 text-emerald-700 shrink-0 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search herbs, medicines, vaidyas, pharmacies, regulations..."
            className="w-full bg-transparent text-sm text-stone-900 placeholder-stone-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-600 p-1 text-xs mr-2 font-medium"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results / Quick Suggestions */}
        <div className="overflow-y-auto p-4 space-y-4 text-xs">
          {!query ? (
            <div>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-2">
                Quick Suggestions & Categories
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { label: 'Ashwagandha Rasayana', cat: 'Herbs & Formulations', path: '/patient/herbs' },
                  { label: 'Dr. S. Kumar (Kaya Chikitsa)', cat: 'Vaidya Directory', path: '/patient/doctors' },
                  { label: 'Triphala Churna 1:1:1', cat: 'Prescription Medicine', path: '/patient/medicines' },
                  { label: 'Green Ayurveda Pharmacy', cat: 'Nearby Pharmacy', path: '/patient/pharmacies' },
                  { label: 'Rule 158B ASU Compliance', cat: 'IPR & Regulations', path: '/ipr/regulations' },
                  { label: 'Viruddha Ahara Checker', cat: 'Ayurvedic Diet', path: '/patient/diet' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigate(item.path);
                    }}
                    className="flex flex-col text-left p-2.5 rounded-xl border border-stone-100 hover:border-emerald-200 hover:bg-emerald-50/40 transition-colors"
                  >
                    <span className="font-semibold text-stone-800 text-xs">{item.label}</span>
                    <span className="text-[10px] text-stone-500 mt-0.5">{item.cat}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Herbs */}
              {results && results.herbs.length > 0 && (
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider font-bold text-emerald-800 flex items-center gap-1.5 mb-2">
                    <BookOpen className="w-3.5 h-3.5" /> Herbs & Classical Formulations ({results.herbs.length})
                  </h4>
                  <div className="space-y-1.5">
                    {results.herbs.map(herb => (
                      <div
                        key={herb.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigate('/patient/herbs');
                        }}
                        className="p-2.5 rounded-xl border border-stone-100 hover:bg-emerald-50/50 cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold text-stone-900">{herb.name} ({herb.sanskritName})</p>
                          <p className="text-[11px] text-stone-500">{herb.botanicalName} • {herb.category}</p>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Products */}
              {results && results.products.length > 0 && (
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider font-bold text-emerald-800 flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3.5 h-3.5" /> Medicines & Products ({results.products.length})
                  </h4>
                  <div className="space-y-1.5">
                    {results.products.map(prod => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigate('/patient/medicines');
                        }}
                        className="p-2.5 rounded-xl border border-stone-100 hover:bg-emerald-50/50 cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold text-stone-900">{prod.name}</p>
                          <p className="text-[11px] text-stone-500">{prod.brand} • ₹{prod.price}</p>
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          In Stock
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Doctors */}
              {results && results.doctors.length > 0 && (
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider font-bold text-emerald-800 flex items-center gap-1.5 mb-2">
                    <Stethoscope className="w-3.5 h-3.5" /> Vaidyas & Doctors ({results.doctors.length})
                  </h4>
                  <div className="space-y-1.5">
                    {results.doctors.map(doc => (
                      <div
                        key={doc.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigate('/patient/doctors');
                        }}
                        className="p-2.5 rounded-xl border border-stone-100 hover:bg-emerald-50/50 cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold text-stone-900">{doc.name} <span className="text-[10px] text-emerald-700 font-normal">({doc.title})</span></p>
                          <p className="text-[11px] text-stone-500">{doc.specialties.join(', ')} • ⭐ {doc.rating}</p>
                        </div>
                        <span className="text-[11px] text-stone-600 font-medium">₹{doc.consultationFee}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hospitals & Pharmacies */}
              {results && (results.pharmacies.length > 0 || results.hospitals.length > 0) && (
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider font-bold text-emerald-800 flex items-center gap-1.5 mb-2">
                    <Building2 className="w-3.5 h-3.5" /> Care Centers & Pharmacies
                  </h4>
                  <div className="space-y-1.5">
                    {results.pharmacies.map(ph => (
                      <div
                        key={ph.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigate('/patient/pharmacies');
                        }}
                        className="p-2.5 rounded-xl border border-stone-100 hover:bg-emerald-50/50 cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold text-stone-900">{ph.name}</p>
                          <p className="text-[11px] text-stone-500">{ph.distance} • Verified Seller</p>
                        </div>
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          Open Now
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {results &&
                results.herbs.length === 0 &&
                results.products.length === 0 &&
                results.doctors.length === 0 &&
                results.pharmacies.length === 0 &&
                results.hospitals.length === 0 && (
                  <div className="text-center py-8 text-stone-500">
                    <p className="font-semibold text-stone-700">No results found for "{query}"</p>
                    <p className="text-xs text-stone-400 mt-1">
                      Try searching for "Triphala", "Ashwagandha", "Pitta", or "Dr. Kumar"
                    </p>
                  </div>
                )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-stone-100/60 border-t border-stone-200 text-[11px] text-stone-500 flex justify-between items-center">
          <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-stone-300 rounded-md font-mono text-[10px]">ESC</kbd> to exit</span>
          <span className="text-emerald-800 font-medium">IP-SAKTI Knowledge Engine</span>
        </div>
      </div>
    </div>
  );
};
