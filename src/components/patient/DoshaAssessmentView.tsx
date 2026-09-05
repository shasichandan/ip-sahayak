import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sun,
  Wind,
  Droplets,
  Flame,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DoshaAssessmentView: React.FC = () => {
  const { showToast } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({
    frame: 'Medium & Athletic',
    skin: 'Warm, sensitive to sun',
    weather: 'Dislikes excessive heat / humidity',
    food: 'Prefers cooling, sweet, bitter foods',
    sleep: 'Moderate (6-7 hrs), vivid dreams',
    digestion: 'Sharp appetite, irritable if meals delayed'
  });

  const questions = [
    {
      id: 'frame',
      title: 'Physical Frame & Joint Structure',
      subtitle: 'How would you describe your bone structure and physical build?',
      options: [
        { label: 'Slender, light bones, prominent joints', dosha: 'Vata' },
        { label: 'Medium & Athletic, moderate muscle tone', dosha: 'Pitta' },
        { label: 'Broad, strong, heavier bone structure', dosha: 'Kapha' }
      ]
    },
    {
      id: 'skin',
      title: 'Skin Quality & Complexion',
      subtitle: 'How does your skin behave throughout the seasons?',
      options: [
        { label: 'Dry, rough, prone to chapping in cold winds', dosha: 'Vata' },
        { label: 'Warm, sensitive to sun, prone to redness/freckles', dosha: 'Pitta' },
        { label: 'Oily, thick, smooth, cool to touch', dosha: 'Kapha' }
      ]
    },
    {
      id: 'weather',
      title: 'Climatic Reaction',
      subtitle: 'Which weather condition causes you the greatest discomfort?',
      options: [
        { label: 'Cold, dry, windy weather', dosha: 'Vata' },
        { label: 'Dislikes excessive heat / humidity / bright sun', dosha: 'Pitta' },
        { label: 'Damp, cold, overcast cloudy days', dosha: 'Kapha' }
      ]
    },
    {
      id: 'food',
      title: 'Food Taste (Rasa) Preference',
      subtitle: 'What flavors naturally satisfy and balance you?',
      options: [
        { label: 'Warm, grounding, nourishing soups and ghee', dosha: 'Vata' },
        { label: 'Prefers cooling, sweet, bitter foods and salads', dosha: 'Pitta' },
        { label: 'Light, pungent, spicy, warm dry foods', dosha: 'Kapha' }
      ]
    },
    {
      id: 'sleep',
      title: 'Sleep Architecture & Rest',
      subtitle: 'What is your typical sleep rhythm?',
      options: [
        { label: 'Light, interrupted, tends to wake up early', dosha: 'Vata' },
        { label: 'Moderate (6-7 hrs), vivid dreams, falls asleep quickly', dosha: 'Pitta' },
        { label: 'Deep, heavy (8+ hrs), slow to wake up in morning', dosha: 'Kapha' }
      ]
    },
    {
      id: 'digestion',
      title: 'Agni (Metabolic & Digestive Power)',
      subtitle: 'How does your digestive system behave across meals?',
      options: [
        { label: 'Irregular appetite, prone to dry gas or bloating', dosha: 'Vata' },
        { label: 'Sharp appetite, irritable if meals delayed, mild acidity', dosha: 'Pitta' },
        { label: 'Slow, steady appetite, heavy feeling after meals', dosha: 'Kapha' }
      ]
    }
  ];

  const currentQ = questions[step - 1];

  const handleSelectOption = (optionLabel: string) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: optionLabel }));
  };

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      setStep(7); // Result step
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      } catch {
        // ignore
      }
      showToast('Prakriti Profile Synthesized', 'Educational wellness report ready', 'success');
    }
  };

  const handleReset = () => {
    setStep(1);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <Activity className="w-3.5 h-3.5 text-emerald-600" />
          Prakriti Self-Assessment Wizard
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Discover Your Dosha & Wellness Profile
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto">
          Understand your unique constitution (Prakriti) and current state of balance according to classical Ayurvedic principles.
        </p>
      </div>

      {/* Stepper Progress indicator */}
      {step <= 6 && (
        <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-2xs space-y-3">
          <div className="flex justify-between text-xs font-bold text-stone-500">
            <span>Question {step} of 6</span>
            <span className="text-emerald-800">{Math.round((step / 6) * 100)}% Completed</span>
          </div>
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-800 rounded-full transition-all duration-300"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Question Card */}
      {step <= 6 && currentQ && (
        <div className="p-6 bg-white rounded-3xl border border-stone-200/80 shadow-xs space-y-5">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              Step 0{step}
            </span>
            <h3 className="text-lg font-bold text-stone-900 mt-2">{currentQ.title}</h3>
            <p className="text-xs text-stone-500 mt-0.5">{currentQ.subtitle}</p>
          </div>

          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = answers[currentQ.id] === opt.label;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(opt.label)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/10 shadow-xs'
                      : 'border-stone-200 bg-stone-50/40 hover:bg-stone-50 hover:border-stone-300'
                  }`}
                >
                  <span className={`text-xs sm:text-sm font-semibold ${isSelected ? 'text-emerald-950 font-bold' : 'text-stone-800'}`}>
                    {opt.label}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                      isSelected ? 'border-emerald-600 bg-emerald-800 text-white' : 'border-stone-300'
                    }`}
                  >
                    {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-100">
            <button
              disabled={step === 1}
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-stone-600 hover:text-stone-900 disabled:opacity-30 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
            >
              <span>{step === 6 ? 'Generate Wellness Profile' : 'Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* RESULT STEP (Step 7) */}
      {step === 7 && (
        <div className="space-y-6 animate-in zoom-in-95 duration-200">
          <div className="p-6 sm:p-8 bg-white rounded-3xl border border-stone-200/80 shadow-md space-y-6">
            <div className="text-center space-y-1 pb-4 border-b border-stone-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Prakriti Assessment Result
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2">
                Your Wellness Profile: <span className="text-emerald-800">Pitta-Vata (Agni Dominant)</span>
              </h2>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Your constitution naturally combines the dynamism and mental sharpness of Pitta with the quick adaptability of Vata.
              </p>
            </div>

            {/* Dosha Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Pitta */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                  <Flame className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-stone-900 text-sm">Pitta (45%)</h4>
                <p className="text-[11px] text-amber-950 font-medium">Primary Dosha • Fire & Water</p>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  High metabolic fire, sharp intellect, active digestion. Keep cooled with sweet/bitter tastes.
                </p>
              </div>

              {/* Vata */}
              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mx-auto">
                  <Wind className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-stone-900 text-sm">Vata (35%)</h4>
                <p className="text-[11px] text-sky-950 font-medium">Secondary Dosha • Air & Space</p>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Creative, communicative, flexible. Prone to dry skin or evening fatigue when ungrounded.
                </p>
              </div>

              {/* Kapha */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <Droplets className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-stone-900 text-sm">Kapha (20%)</h4>
                <p className="text-[11px] text-emerald-950 font-medium">Foundation • Earth & Water</p>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Underlying structural endurance and stamina. Balanced immunity.
                </p>
              </div>
            </div>

            {/* Personalized Recommendations */}
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3 text-xs">
              <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                Personalized Dinacharya Recommendations for You
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-700">
                <div className="p-3 bg-white rounded-xl border border-stone-100">
                  <p className="font-bold text-stone-900 mb-1">🌿 Herbs to Favor</p>
                  <p>Amalaki, Brahmi, Shatavari, Coriander seeds, and moderate Triphala at night.</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-stone-100">
                  <p className="font-bold text-stone-900 mb-1">🍲 Optimal Diet (Ahara)</p>
                  <p>Cooked moong dal, basmati rice, soaked raisins, pomegranate, sweet ripe fruits, and warm milk with nutmeg.</p>
                </div>
              </div>
            </div>

            {/* MANDATORY EDUCATIONAL DISCLAIMER */}
            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Educational Wellness Assessment:</strong> This self-assessment questionnaire is strictly for educational wellness purposes and does NOT constitute a clinical Nadi Pariksha (pulse diagnosis) or medical prescription. Please consult a qualified Vaidya for medical diagnosis.
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => navigate('/patient/diet')}
                className="flex-1 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs transition-colors shadow-xs text-center"
              >
                View Personalized Ayurvedic Diet
              </button>
              <button
                onClick={() => navigate('/patient/doctors')}
                className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl text-xs transition-colors text-center"
              >
                Consult Vaidya to Verify Dosha
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-3 bg-white border border-stone-200 hover:bg-stone-50 text-stone-600 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
