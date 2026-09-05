import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Calendar,
  FileText,
  Sparkles,
  Bot,
  Stethoscope,
  Clock,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Send,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DoctorDashboard: React.FC = () => {
  const { showToast, setInspectSourceChain, appointments } = useApp();

  // Active consultation patient state
  const [activePatient, setActivePatient] = useState({
    name: 'Anjali Sharma',
    age: 28,
    gender: 'Female',
    chiefComplaint: 'Chronic hyperacidity (Amlapitta), burning sensation in chest after meals, irregular sleep',
    prakriti: 'Pitta-Vata',
    agni: 'Tikshnagni (Sharp/Hyper)',
    allergies: ['Gluten sensitivity', 'Excessive hot chili'],
    bp: '118/76 mmHg',
    pulse: 'Pitta-Mandala (Nadi Pariksha indicates aggravated Pitta in Annavaha Srotas)'
  });

  // Clinical Copilot Query & Result
  const [copilotQuery, setCopilotQuery] = useState('Pitta-Pradhana Amlapitta with nocturnal retrosternal burning and insomnia');
  const [isCopilotThinking, setIsCopilotThinking] = useState(false);
  const [copilotAnalysis, setCopilotAnalysis] = useState<any>({
    samprapti: 'Vidagdha Ajirna leading to upward movement of acidic Pitta (Urdhvaga Amlapitta), disturbing Prana Vata.',
    formulations: [
      { name: 'Avipattikar Churna', dose: '3g with warm water before meals', rationale: 'Classical Sukshma-Rechana; neutralizes Tikshna-Ushna Pitta and relieves burning.' },
      { name: 'Kamadudha Rasa (Mukta Yukta)', dose: '250mg with honey / milk BID', rationale: 'Direct Sheeta virya pitta-shamaka formulation for severe burning.' },
      { name: 'Brahmi Vati / Ashwagandha', dose: '1 tab at bedtime with cow milk', rationale: 'Calms Prana Vata and supports restorative sleep.' }
    ],
    pathyaAdvice: 'Old barley, moong dal soup, sweet pomegranate, boiled lukewarm water, regular sleep schedule.',
    contraindications: 'Katu-Amla-Lavana rasa (pungent/sour/salty foods), late night dinners, fried snacks.',
    classicalCitation: 'Charaka Samhita, Chikitsa Sthana, Adhyaya 15 (Grahani Dosha Chikitsa)'
  });

  // Prescription builder state
  const [prescribedList, setPrescribedList] = useState([
    { name: 'Avipattikar Churna', dosage: '2.5g', frequency: 'Twice daily', duration: '14 days', instructions: 'Before lunch and dinner with warm water' },
    { name: 'Kamadudha Rasa', dosage: '1 tablet (250mg)', frequency: 'Twice daily', duration: '14 days', instructions: 'After meals with honey' }
  ]);
  const [newMedName, setNewMedName] = useState('');
  const [newMedDose, setNewMedDose] = useState('');

  const handleCopilotAnalyze = () => {
    setIsCopilotThinking(true);
    setTimeout(() => {
      setIsCopilotThinking(false);
      setCopilotAnalysis({
        samprapti: 'Aggravated Pachaka Pitta combining with Samana Vayu causing reflux and impaired digestive fire.',
        formulations: [
          { name: 'Sutashekhara Rasa (Gold)', dose: '125mg BID with A2 milk', rationale: 'Potent Rasayana for refractory acid peptic disorders.' },
          { name: 'Avipattikar Churna', dose: '3g bedtime with lukewarm water', rationale: 'Downward redirection of Pitta (Anulomana).' },
          { name: 'Amalaki Rasayana', dose: '3g morning on empty stomach', rationale: 'Sheeta virya, sweet post-digestive cooling of Pitta.' }
        ],
        pathyaAdvice: 'Avoid fermented batters, sour curds, red chilies. Maintain at least 2 hrs gap before sleep.',
        contraindications: 'Strictly avoid fasting (Langhana) or sudden heavy fried intake.',
        classicalCitation: 'Bhavaprakasha Nighantu, Haritakyadi Varga / Charaka Samhita Chikitsa 15'
      });
      showToast('AI Clinical Copilot Analysis Updated', 'Classical texts verified', 'success');
    }, 900);
  };

  const handleAddMedication = () => {
    if (!newMedName) return;
    setPrescribedList(prev => [
      ...prev,
      {
        name: newMedName,
        dosage: newMedDose || '1 dose',
        frequency: 'Twice daily',
        duration: '14 days',
        instructions: 'With warm water after food'
      }
    ]);
    setNewMedName('');
    setNewMedDose('');
  };

  const handleAddCopilotMedsToPrescription = () => {
    copilotAnalysis.formulations.forEach((f: any) => {
      setPrescribedList(prev => [
        ...prev,
        {
          name: f.name,
          dosage: f.dose.split(' ')[0],
          frequency: 'Twice daily',
          duration: '14 days',
          instructions: f.dose
        }
      ]);
    });
    showToast('Copilot Formulations Added to Active Prescription', undefined, 'success');
  };

  const handleIssuePrescription = () => {
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
    showToast('Prescription Digitally Signed & Issued', 'Transmitted to Patient & Local AYUSH Pharmacy', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Doctor Header Banner */}
      <div className="p-6 bg-white rounded-3xl border border-stone-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80"
            alt="Dr. S. Kumar"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-600/30 shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-stone-900">Dr. S. Kumar, BAMS, MD (Ayurveda)</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Senior Physician
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Registration: AYUSH-KA-DOC-8921 • National Ayurveda Institute Fellow
            </p>
            <p className="text-[11px] text-emerald-800 font-semibold mt-0.5">
              Specialization: Kayachikitsa & Gastrointestinal Disorders (Annavaha Srotas)
            </p>
          </div>
        </div>

        {/* Quick KPI stats */}
        <div className="flex items-center gap-4 text-xs border-t md:border-t-0 pt-3 md:pt-0 border-stone-100">
          <div className="text-center px-3 py-1.5 bg-stone-50 rounded-xl border border-stone-100">
            <span className="font-extrabold text-stone-900 text-base block">6</span>
            <span className="text-stone-400 text-[10px] font-bold uppercase">Queue</span>
          </div>
          <div className="text-center px-3 py-1.5 bg-stone-50 rounded-xl border border-stone-100">
            <span className="font-extrabold text-emerald-800 text-base block">42</span>
            <span className="text-stone-400 text-[10px] font-bold uppercase">This Week</span>
          </div>
          <div className="text-center px-3 py-1.5 bg-stone-50 rounded-xl border border-stone-100">
            <span className="font-extrabold text-amber-800 text-base block">4.9★</span>
            <span className="text-stone-400 text-[10px] font-bold uppercase">Rating</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Active Patient Workspace & AI Clinical Copilot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): Active Patient File & Queue */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Patient Card */}
          <div className="p-5 bg-white rounded-3xl border border-stone-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Active Consultation
              </span>
              <span className="text-xs text-stone-400 font-mono">ID: PT-2026-881</span>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-stone-900">{activePatient.name}</h3>
                <span className="text-xs font-semibold text-stone-500">{activePatient.age}y, {activePatient.gender}</span>
              </div>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                <strong>Chief Complaint:</strong> {activePatient.chiefComplaint}
              </p>
            </div>

            {/* Ayurvedic Parameters */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-200/60">
                <span className="text-amber-900 font-bold block text-[10px]">Prakriti</span>
                <span className="font-extrabold text-stone-900">{activePatient.prakriti}</span>
              </div>
              <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-200/60">
                <span className="text-emerald-900 font-bold block text-[10px]">Agni Status</span>
                <span className="font-extrabold text-stone-900">{activePatient.agni}</span>
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
              <p className="text-stone-700"><strong>Nadi Pariksha:</strong> {activePatient.pulse}</p>
              <p className="text-stone-700"><strong>Allergies:</strong> {activePatient.allergies.join(', ')}</p>
            </div>

            {/* Patient Queue Switcher */}
            <div>
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                Today's Patient Queue
              </h4>
              <div className="space-y-1.5 text-xs">
                {[
                  { name: 'Anjali Sharma (Current)', time: '10:30 AM', reason: 'Amlapitta & Insomnia' },
                  { name: 'Rajesh Verma', time: '11:15 AM', reason: 'Sandhivata (Knee Pain)' },
                  { name: 'Priya Patel', time: '12:00 PM', reason: 'PCOS / Doshic Imbalance' }
                ].map((pt, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      idx === 0
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <div>
                      <p className="text-xs">{pt.name}</p>
                      <p className="text-[10px] text-stone-400 font-normal">{pt.reason}</p>
                    </div>
                    <span className="text-[11px] font-mono">{pt.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): AI Clinical Copilot & Prescription Builder */}
        <div className="lg:col-span-7 space-y-6">
          {/* AI Clinical Copilot Box */}
          <div className="p-6 bg-white rounded-3xl border border-stone-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4 text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-stone-900">AI Clinical Copilot</h3>
                  <p className="text-[11px] text-stone-500">Classical Differential Diagnosis & Shloka RAG</p>
                </div>
              </div>

              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Doctor Mode Active
              </span>
            </div>

            {/* Query Form */}
            <div className="flex gap-2">
              <input
                type="text"
                value={copilotQuery}
                onChange={e => setCopilotQuery(e.target.value)}
                placeholder="Enter clinical symptoms or differential diagnosis..."
                className="flex-1 p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden"
              />
              <button
                onClick={handleCopilotAnalyze}
                disabled={isCopilotThinking}
                className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition-colors shrink-0 shadow-xs flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isCopilotThinking ? 'Analyzing...' : 'Run Copilot'}</span>
              </button>
            </div>

            {/* Copilot Analysis Display */}
            {copilotAnalysis && (
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3 text-xs">
                <div>
                  <span className="font-bold text-emerald-900 block text-[11px] uppercase tracking-wider">
                    Classical Samprapti (Pathogenesis):
                  </span>
                  <p className="text-stone-700 mt-0.5 leading-relaxed">{copilotAnalysis.samprapti}</p>
                </div>

                {/* Formulations */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-stone-900 text-[11px] uppercase tracking-wider">
                      Recommended Classical Formulations:
                    </span>
                    <button
                      onClick={handleAddCopilotMedsToPrescription}
                      className="text-[11px] text-emerald-800 hover:text-emerald-950 font-bold underline"
                    >
                      + Insert All into Prescription
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {copilotAnalysis.formulations.map((f: any, idx: number) => (
                      <div key={idx} className="p-2.5 bg-white rounded-xl border border-stone-200 flex justify-between items-center">
                        <div>
                          <p className="font-bold text-stone-900">{f.name} <span className="font-normal text-stone-500">({f.dose})</span></p>
                          <p className="text-[11px] text-stone-500 mt-0.5">{f.rationale}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Classical Source Citation */}
                <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 flex items-center justify-between text-[11px]">
                  <span className="font-medium">Source: {copilotAnalysis.classicalCitation}</span>
                  <button
                    onClick={() =>
                      setInspectSourceChain({
                        claim: copilotAnalysis.samprapti,
                        source: 'Charaka Samhita',
                        document: 'Chikitsa Sthana 15',
                        section: 'Grahani & Amlapitta Adhyaya',
                        authority: 'CCRAS / National Ayurveda Canon',
                        confidence: 'high'
                      })
                    }
                    className="font-bold underline hover:text-emerald-900"
                  >
                    Verify Shloka Chain
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Prescription Writing Workspace */}
          <div className="p-6 bg-white rounded-3xl border border-stone-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-800" />
                Active Prescription Builder
              </h3>
              <span className="text-xs text-stone-500 font-medium">Patient: {activePatient.name}</span>
            </div>

            {/* Prescribed Items Table */}
            <div className="divide-y divide-stone-100 border border-stone-200 rounded-2xl overflow-hidden text-xs">
              {prescribedList.map((med, idx) => (
                <div key={idx} className="p-3 bg-stone-50/40 flex items-center justify-between gap-3">
                  <div>
                    <h5 className="font-bold text-stone-900">{med.name}</h5>
                    <p className="text-stone-500 text-[11px]">
                      {med.dosage} • {med.frequency} • {med.duration}
                    </p>
                    <p className="text-[11px] text-stone-400 italic mt-0.5">{med.instructions}</p>
                  </div>
                  <button
                    onClick={() => setPrescribedList(prescribedList.filter((_, i) => i !== idx))}
                    className="p-1 text-stone-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add formulation input row */}
            <div className="flex flex-col sm:flex-row gap-2 pt-1 text-xs">
              <input
                type="text"
                value={newMedName}
                onChange={e => setNewMedName(e.target.value)}
                placeholder="Add herb/formulation (e.g. Triphala Churna)..."
                className="flex-1 p-2.5 rounded-xl border border-stone-200 bg-stone-50"
              />
              <input
                type="text"
                value={newMedDose}
                onChange={e => setNewMedDose(e.target.value)}
                placeholder="Dosage & Timing (e.g. 3g at night)..."
                className="w-full sm:w-48 p-2.5 rounded-xl border border-stone-200 bg-stone-50"
              />
              <button
                type="button"
                onClick={handleAddMedication}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl transition-colors flex items-center justify-center gap-1 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>

            {/* Sign and Issue Prescription */}
            <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-center gap-3">
              <span className="text-[11px] text-stone-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                Signed with AYUSH Practitioner Key #DOC-8921
              </span>

              <button
                onClick={handleIssuePrescription}
                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Digitally Sign & Issue Prescription</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
