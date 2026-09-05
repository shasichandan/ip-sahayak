import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookMarked,
  Plus,
  Moon,
  Zap,
  Smile,
  Droplets,
  Flame,
  Calendar,
  Sparkles,
  TrendingUp,
  X
} from 'lucide-react';
import { HealthDiaryEntry } from '../../types';

export const HealthDiaryView: React.FC = () => {
  const { diaryEntries, addDiaryEntry, showToast } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  // New entry form state
  const [sleepHours, setSleepHours] = useState(7.5);
  const [energyLevel, setEnergyLevel] = useState<'Low' | 'Moderate' | 'High' | 'Optimal'>('Optimal');
  const [digestionQuality, setDigestionQuality] = useState<'Sluggish' | 'Balanced' | 'Sharp' | 'Hyperacidic'>('Balanced');
  const [mood, setMood] = useState('Peaceful & focused');
  const [waterGlasses, setWaterGlasses] = useState(8);
  const [symptoms, setSymptoms] = useState('');
  const [foodNotes, setFoodNotes] = useState('Khichdi with cow ghee, herbal tea');

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: Omit<HealthDiaryEntry, 'id'> = {
      date: 'Today, ' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sleepHours,
      energyLevel,
      digestionQuality,
      mood,
      waterGlasses,
      symptoms: symptoms ? symptoms.split(',').map(s => s.trim()) : [],
      foodNotes
    };
    addDiaryEntry(entry);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Ayurveda Health Diary & Dinacharya Tracker
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Log your daily sleep, Agni (digestive fire), Ojas (vital energy), and wellness habits.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-xs transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Log Today's Habits</span>
        </button>
      </div>

      {/* Wellness Metrics Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-2xs">
          <div className="flex items-center gap-2 text-stone-500 text-xs font-semibold mb-1">
            <Moon className="w-4 h-4 text-indigo-600" />
            <span>Avg Sleep</span>
          </div>
          <p className="text-xl font-extrabold text-stone-900">7.4 hrs</p>
          <span className="text-[10px] text-emerald-700 font-bold">Optimal circadian sync</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-2xs">
          <div className="flex items-center gap-2 text-stone-500 text-xs font-semibold mb-1">
            <Flame className="w-4 h-4 text-amber-600" />
            <span>Agni Balance</span>
          </div>
          <p className="text-xl font-extrabold text-stone-900">Samagni</p>
          <span className="text-[10px] text-emerald-700 font-bold">Stable digestive fire</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-2xs">
          <div className="flex items-center gap-2 text-stone-500 text-xs font-semibold mb-1">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span>Vital Energy</span>
          </div>
          <p className="text-xl font-extrabold text-stone-900">High (Ojas)</p>
          <span className="text-[10px] text-emerald-700 font-bold">+12% vs last week</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-2xs">
          <div className="flex items-center gap-2 text-stone-500 text-xs font-semibold mb-1">
            <Droplets className="w-4 h-4 text-blue-600" />
            <span>Hydration</span>
          </div>
          <p className="text-xl font-extrabold text-stone-900">8.2 cups</p>
          <span className="text-[10px] text-stone-500 font-medium">Warm water & Ushnodaka</span>
        </div>
      </div>

      {/* Diary Timeline Entries */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-stone-900">Daily Log History</h3>
        {diaryEntries.map(entry => (
          <div
            key={entry.id}
            className="p-5 bg-white rounded-2xl border border-stone-200/80 shadow-2xs space-y-3"
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-stone-100">
              <span className="flex items-center gap-1.5 font-bold text-sm text-stone-900">
                <Calendar className="w-4 h-4 text-emerald-700" />
                {entry.date}
              </span>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Mood: {entry.mood}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Sleep</span>
                <span className="font-bold text-stone-800">{entry.sleepHours} Hours</span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Energy</span>
                <span className="font-bold text-stone-800">{entry.energyLevel}</span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Digestion</span>
                <span className="font-bold text-stone-800">{entry.digestionQuality}</span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Hydration</span>
                <span className="font-bold text-stone-800">{entry.waterGlasses} Glasses</span>
              </div>
            </div>

            {entry.foodNotes && (
              <div className="text-xs text-stone-600 bg-stone-50/50 p-2.5 rounded-xl">
                <span className="font-bold text-stone-800">Diet & Meals:</span> {entry.foodNotes}
              </div>
            )}

            {entry.symptoms.length > 0 && (
              <div className="flex flex-wrap items-center gap-1 text-xs">
                <span className="text-[11px] font-semibold text-stone-400 mr-1">Noted Symptoms:</span>
                {entry.symptoms.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium bg-amber-50 text-amber-900 px-2 py-0.5 rounded-md border border-amber-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Entry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-extrabold text-stone-900 mb-4">
              Log Today's Ayurveda Habits & Agni
            </h3>

            <form onSubmit={handleSaveEntry} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Sleep Hours:</label>
                  <input
                    type="number"
                    step="0.5"
                    value={sleepHours}
                    onChange={e => setSleepHours(parseFloat(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Water Glasses:</label>
                  <input
                    type="number"
                    value={waterGlasses}
                    onChange={e => setWaterGlasses(parseInt(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Vital Energy (Ojas):</label>
                  <select
                    value={energyLevel}
                    onChange={e => setEnergyLevel(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                  >
                    <option value="Optimal">Optimal</option>
                    <option value="High">High</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Digestion (Agni):</label>
                  <select
                    value={digestionQuality}
                    onChange={e => setDigestionQuality(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                  >
                    <option value="Balanced">Balanced (Samagni)</option>
                    <option value="Sharp">Sharp (Tikshnagni)</option>
                    <option value="Sluggish">Sluggish (Mandagni)</option>
                    <option value="Hyperacidic">Hyperacidic</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Mood & Mental State:</label>
                <input
                  type="text"
                  value={mood}
                  onChange={e => setMood(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Meals & Dietary Notes:</label>
                <textarea
                  rows={2}
                  value={foodNotes}
                  onChange={e => setFoodNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
              >
                Save to Health Diary
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
