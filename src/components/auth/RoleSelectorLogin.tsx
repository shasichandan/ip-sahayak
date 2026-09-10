import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Heart,
  Stethoscope,
  Store,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Globe2,
  Lock,
  Leaf
} from 'lucide-react';

export const RoleSelectorLogin: React.FC = () => {
  const { role, setRole, language, setLanguage } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>(role);
  const navigate = useNavigate();

  const roleOptions = [
    {
      id: 'patient' as UserRole,
      title: 'Patient',
      persona: 'IP-SAKTI User',
      headline: 'My health, consultations & medicines',
      description: 'Access educational AI Sahayak in English, Telugu or Hindi, book Vaidyas, track Dosha, and order prescriptions with Rx-to-Door delivery.',
      icon: Heart,
      accent: 'emerald',
      badge: 'Personalized Care & Wellness'
    },
    {
      id: 'doctor' as UserRole,
      title: 'Vaidya / Doctor',
      persona: 'Dr. S. Kumar (BAMS, MD)',
      headline: 'Consultations, AI Copilot & prescriptions',
      description: 'Streamline patient queue, review AI clinical summaries & classical references, and approve structured prescriptions safely.',
      icon: Stethoscope,
      accent: 'blue',
      badge: 'Clinical Copilot & Practice'
    },
    {
      id: 'pharmacy' as UserRole,
      title: 'Pharmacy',
      persona: 'Green Ayurveda Pharmacy (Licensed)',
      headline: 'Orders, inventory & medicine verification',
      description: 'Fulfill digital prescriptions, verify batch numbers via AYUSH registries, and coordinate eco-delivery riders.',
      icon: Store,
      accent: 'amber',
      badge: 'Dispensing & Batch Verification'
    }
  ];

  const handleContinue = () => {
    setRole(selectedRole);
    if (selectedRole === 'patient') navigate('/patient/dashboard');
    else if (selectedRole === 'doctor') navigate('/doctor/dashboard');
    else if (selectedRole === 'pharmacy') navigate('/pharmacy/dashboard');
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between p-4 sm:p-8">
      {/* Top Header */}
      <div className="max-w-5xl w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shadow-md shadow-emerald-900/10">
            <Leaf className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <h1 className="font-extrabold text-stone-900 tracking-tight text-lg flex items-center gap-1.5">
              IP-SAKTI <span className="text-emerald-800 text-sm font-bold bg-emerald-100/70 px-2 py-0.5 rounded-md">SAHAYAK</span>
            </h1>
            <p className="text-[11px] text-stone-500 font-medium">
              Your AI-powered Ayurveda care & knowledge ecosystem
            </p>
          </div>
        </div>

        {/* Language selector toggle */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-stone-200 text-xs shadow-2xs">
          <Globe2 className="w-4 h-4 text-emerald-700" />
          <button
            onClick={() => setLanguage('en')}
            className={`font-medium ${language === 'en' ? 'text-emerald-800 font-bold' : 'text-stone-500'}`}
          >
            EN
          </button>
          <span className="text-stone-300">|</span>
          <button
            onClick={() => setLanguage('te')}
            className={`font-medium ${language === 'te' ? 'text-emerald-800 font-bold' : 'text-stone-500'}`}
          >
            తెలుగు
          </button>
          <span className="text-stone-300">|</span>
          <button
            onClick={() => setLanguage('hi')}
            className={`font-medium ${language === 'hi' ? 'text-emerald-800 font-bold' : 'text-stone-500'}`}
          >
            हिन्दी
          </button>
        </div>
      </div>

      {/* Main Role Selection Card */}
      <div className="max-w-4xl w-full mx-auto my-auto py-8">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Smart India Hackathon Prototype
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Welcome to IP-SAKTI SAHAYAK
          </h2>
          <p className="text-sm text-stone-600 mt-2 max-w-lg mx-auto">
            How would you like to explore the digital Ayurveda care ecosystem today? Select a role below to launch the personalized workspace.
          </p>
        </div>

        {/* 3 Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {roleOptions.map(opt => {
            const isSelected = selectedRole === opt.id;
            const Icon = opt.icon;

            return (
              <div
                key={opt.id}
                onClick={() => setSelectedRole(opt.id)}
                className={`relative p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-600 bg-white ring-2 ring-emerald-600/20 shadow-lg'
                    : 'border-stone-200/90 bg-white/80 hover:bg-white hover:border-emerald-300 shadow-xs'
                }`}
              >
                {/* Active Indicator Top Right */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${
                    isSelected ? 'bg-emerald-100/70 text-emerald-800' : 'bg-stone-100 text-stone-600'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-stone-300'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mb-1.5">
                    {opt.badge}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900">{opt.title}</h3>
                  <p className="text-xs font-semibold text-emerald-800 mt-0.5">{opt.persona}</p>
                  <p className="text-xs font-medium text-stone-700 mt-2">{opt.headline}</p>
                  <p className="text-xs text-stone-500 mt-2 leading-relaxed">{opt.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
                  <span>Enter as {opt.title}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleContinue}
            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-900/20 flex items-center justify-center gap-2 hover:translate-y-[-1px]"
          >
            <span>Continue to {selectedRole === 'patient' ? 'Patient Care' : selectedRole === 'doctor' ? 'Vaidya Copilot' : 'Pharmacy Operations'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Safety Note & Disclaimers */}
        <div className="mt-8 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-900 flex items-center gap-2.5 max-w-2xl mx-auto">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>Safety Principle:</strong> AI provides educational guidance to patients and drafts documentation for doctors. The AI never independently prescribes medicines.
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-5xl w-full mx-auto text-center text-xs text-stone-400 border-t border-stone-200/60 pt-4">
        IP-SAKTI SAHAYAK • Role-based Digital Ayurveda Ecosystem • Smart India Hackathon Prototype
      </div>
    </div>
  );
};
