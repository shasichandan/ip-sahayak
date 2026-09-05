import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sun,
  Moon,
  Clock,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Utensils,
  Leaf,
  ShieldCheck
} from 'lucide-react';
import { dinacharyaRoutine, ritucharyaSeasons, incompatibleFoodsList } from '../../data/mockData';

export const DietLifestyleView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dinacharya' | 'ritucharya' | 'viruddha'>('dinacharya');

  // Viruddha Ahara (Incompatible Foods) interactive checker state
  const [food1, setFood1] = useState('Milk');
  const [food2, setFood2] = useState('Fish');

  const foodOptions = ['Milk', 'Fish', 'Citrus / Lemon', 'Banana', 'Honey', 'Ghee (Hot)', 'Curd / Yogurt (Night)', 'Melon'];

  // Check if current pair matches an incompatible combination
  const currentPairCheck = incompatibleFoodsList.find(
    item =>
      (item.food1.toLowerCase().includes(food1.toLowerCase()) && item.food2.toLowerCase().includes(food2.toLowerCase())) ||
      (item.food1.toLowerCase().includes(food2.toLowerCase()) && item.food2.toLowerCase().includes(food1.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Ayurvedic Diet & Lifestyle Wisdom
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Dinacharya (daily rhythm), Ritucharya (seasonal living), and Viruddha Ahara food pairing rules.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('dinacharya')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'dinacharya' ? 'bg-white text-emerald-950 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Dinacharya (Daily)
          </button>
          <button
            onClick={() => setActiveTab('ritucharya')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'ritucharya' ? 'bg-white text-emerald-950 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Ritucharya (Seasonal)
          </button>
          <button
            onClick={() => setActiveTab('viruddha')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'viruddha' ? 'bg-white text-emerald-950 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Food Compatibility Checker</span>
          </button>
        </div>
      </div>

      {/* TAB 1: DINACHARYA */}
      {activeTab === 'dinacharya' && (
        <div className="space-y-4">
          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 text-xs text-emerald-950">
            <span className="font-bold">Classical Principle (Charaka Samhita, Sutra Sthana):</span> Dinacharya aligns the human biological clock with solar and lunar rhythms to naturally balance Vata, Pitta, and Kapha throughout the day.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dinacharyaRoutine.map((item, idx) => (
              <div
                key={idx}
                className="p-5 bg-white rounded-2xl border border-stone-200/80 shadow-2xs space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-emerald-700" />
                    {item.time}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Dosha: {item.dosha}
                  </span>
                </div>

                <h3 className="font-bold text-stone-900 text-sm">{item.activity}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{item.description}</p>
                <div className="pt-2 border-t border-stone-100 text-[11px] text-emerald-900 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-700" />
                  Benefit: {item.benefit}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: RITUCHARYA */}
      {activeTab === 'ritucharya' && (
        <div className="space-y-4">
          <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/80 text-xs text-amber-950">
            <span className="font-bold">Seasonal Wisdom (Ashtanga Hridaya):</span> Each season influences the accumulation (Chaya), aggravation (Prakopa), and pacification (Prashama) of doshas in the body.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ritucharyaSeasons.map((season, idx) => (
              <div
                key={idx}
                className="p-5 bg-white rounded-2xl border border-stone-200/80 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-stone-900 text-base">{season.season}</h3>
                  <span className="text-xs font-semibold text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-md">
                    {season.months}
                  </span>
                </div>

                <div className="p-2.5 bg-stone-50 rounded-xl text-xs space-y-1">
                  <p><span className="font-bold text-stone-800">Dominant Dosha:</span> {season.doshaState}</p>
                  <p><span className="font-bold text-stone-800">Agni (Metabolic Power):</span> {season.agniStatus}</p>
                </div>

                <div className="space-y-1 text-xs">
                  <p className="font-bold text-emerald-900">🌿 Pathya (Recommended Diet & Herbs):</p>
                  <p className="text-stone-600">{season.recommendedDiet}</p>
                </div>

                <div className="space-y-1 text-xs">
                  <p className="font-bold text-rose-900">⚠ Apathya (Avoid / Restrict):</p>
                  <p className="text-stone-600">{season.avoidDiet}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: VIRUDDHA AHARA INTERACTIVE CHECKER */}
      {activeTab === 'viruddha' && (
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-stone-200/80 shadow-xs space-y-5">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-full">
                Classical Toxicology & Digestion (Charaka Samhita, Sutra Sthana 26)
              </span>
              <h3 className="text-lg font-extrabold text-stone-900 mt-1">
                Viruddha Ahara (Incompatible Food Combinations) Checker
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Certain foods consume opposite potencies (Virya Viruddha) or post-digestive conflicts, producing slow internal toxins (Ama / Gara Visha).
              </p>
            </div>

            {/* Interactive Food Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-stone-700 block text-xs mb-1.5">First Food Item:</label>
                <select
                  value={food1}
                  onChange={e => setFood1(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-xs font-semibold text-stone-900 focus:outline-hidden"
                >
                  {foodOptions.map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block text-xs mb-1.5">Second Food Item:</label>
                <select
                  value={food2}
                  onChange={e => setFood2(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-xs font-semibold text-stone-900 focus:outline-hidden"
                >
                  {foodOptions.map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Outcome Result Box */}
            {currentPairCheck ? (
              <div className="p-5 bg-rose-50 border border-rose-200 rounded-2xl text-xs space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 font-bold text-rose-800 text-sm">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  <span>INCOMPATIBLE COMBINATION (VIRUDDHA AHARA)</span>
                </div>
                <p className="text-rose-950 leading-relaxed font-medium">
                  <strong>Ayurvedic Consequence:</strong> {currentPairCheck.consequence}
                </p>
                <div className="p-3 bg-white/80 rounded-xl text-stone-700 border border-rose-100">
                  <span className="font-bold text-stone-900 block mb-0.5">Classical Text Basis:</span>
                  <span className="italic">{currentPairCheck.classicalReference}</span>
                </div>
              </div>
            ) : (
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-2 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 font-bold text-emerald-800 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Compatible or No Severe Classical Conflict Found</span>
                </div>
                <p className="text-emerald-900">
                  {food1} and {food2} do not form an immediate classical Viruddha Ahara pair. Always consume warm, freshly cooked meals according to your hunger.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
