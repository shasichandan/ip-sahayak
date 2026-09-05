import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Heart,
  FileText,
  Clock,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Truck,
  Sun,
  Sunset,
  Moon,
  ChevronRight,
  ShieldCheck,
  Activity,
  Bot
} from 'lucide-react';

export const PatientDashboard: React.FC = () => {
  const { currentUser, prescriptions, appointments, orders, showToast } = useApp();
  const navigate = useNavigate();

  const activeRx = prescriptions[0];
  const upcomingApt = appointments.find(a => a.status === 'upcoming');
  const activeOrder = orders[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
            Good morning, Anjali <span className="text-emerald-700">🌿</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Here is your Ayurvedic health and care overview for today.
          </p>
        </div>

        {/* Quick Action: Ask AI */}
        <button
          onClick={() => navigate('/patient/ai')}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-xs shadow-emerald-900/10 transition-all self-start sm:self-auto"
        >
          <Bot className="w-4 h-4 text-emerald-300" />
          <span>Ask AI Sahayak</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Top 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: Health & Prakriti */}
        <div
          onClick={() => navigate('/patient/dosha')}
          className="p-4 rounded-2xl bg-white border border-stone-200/80 hover:border-emerald-300 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-semibold text-stone-500">Prakriti Assessment</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <p className="text-lg font-bold text-stone-900">Pitta-Vata</p>
          <p className="text-xs text-stone-500 mt-0.5">Seasonal balance: 82%</p>
          <div className="mt-3 flex items-center text-[11px] font-semibold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
            <span>Explore Dosha & Diet</span>
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </div>
        </div>

        {/* Card 2: Active Prescription */}
        <div
          onClick={() => navigate('/patient/prescriptions')}
          className="p-4 rounded-2xl bg-white border border-stone-200/80 hover:border-emerald-300 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-semibold text-stone-500">Active Prescription</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <p className="text-lg font-bold text-stone-900">{activeRx ? '1 Active Regimen' : 'No Active Rx'}</p>
          <p className="text-xs text-stone-500 mt-0.5">
            {activeRx ? `${activeRx.medicines.length} classical formulations` : 'Consult a Vaidya'}
          </p>
          <div className="mt-3 flex items-center text-[11px] font-semibold text-blue-700 group-hover:translate-x-0.5 transition-transform">
            <span>View Doctor Rx & Advice</span>
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </div>
        </div>

        {/* Card 3: Today's Medicines */}
        <div
          onClick={() => navigate('/patient/orders')}
          className="p-4 rounded-2xl bg-white border border-stone-200/80 hover:border-emerald-300 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-semibold text-stone-500">Today's Medicines</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-lg font-bold text-stone-900">1 of 2 Taken</p>
          <p className="text-xs text-stone-500 mt-0.5">Next: 8:00 PM (Triphala)</p>
          <div className="mt-3 flex items-center text-[11px] font-semibold text-purple-700 group-hover:translate-x-0.5 transition-transform">
            <span>Prescription Basket & Delivery</span>
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </div>
        </div>

        {/* Card 4: Upcoming Appointment */}
        <div
          onClick={() => navigate('/patient/appointments')}
          className="p-4 rounded-2xl bg-white border border-stone-200/80 hover:border-emerald-300 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-semibold text-stone-500">Upcoming Care</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <p className="text-lg font-bold text-stone-900">Dr. S. Kumar</p>
          <p className="text-xs text-stone-500 mt-0.5">{upcomingApt ? `${upcomingApt.date} • ${upcomingApt.time}` : 'No upcoming calls'}</p>
          <div className="mt-3 flex items-center text-[11px] font-semibold text-amber-800 group-hover:translate-x-0.5 transition-transform">
            <span>Join Video Consultation</span>
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </div>
        </div>
      </div>

      {/* Grid: Left 2 Cols (Dosha + Routine), Right 1 Col (Orders + Care) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Dosha Balance & Routine */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dosha Balance Visualization Card */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base font-bold text-stone-900">Dosha & Wellness Equilibrium</h3>
                <p className="text-xs text-stone-500">
                  Wellness profile based on your self-assessment. (Educational only, not a medical diagnosis).
                </p>
              </div>
              <button
                onClick={() => navigate('/patient/dosha')}
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline self-start sm:self-auto"
              >
                Retake Assessment
              </button>
            </div>

            {/* Visual Meters */}
            <div className="space-y-3.5">
              {/* Vata */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-sky-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-500"></span> Vata (Air & Space)
                  </span>
                  <span className="text-stone-600">35% • Active & Energetic</span>
                </div>
                <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full transition-all" style={{ width: '35%' }} />
                </div>
              </div>

              {/* Pitta */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-amber-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span> Pitta (Fire & Water)
                  </span>
                  <span className="text-stone-600">45% • Slightly Elevated (Digestive Agni)</span>
                </div>
                <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: '45%' }} />
                </div>
              </div>

              {/* Kapha */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-emerald-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span> Kapha (Earth & Water)
                  </span>
                  <span className="text-stone-600">20% • Grounded & Stable</span>
                </div>
                <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full transition-all" style={{ width: '20%' }} />
                </div>
              </div>
            </div>

            {/* Gentle Ayurvedic Tip for current state */}
            <div className="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Ayurvedic Daily Guidance:</span> Favor cooling herbs (Amalaki, Coriander seeds water) and avoid sour or fried food combinations today to soothe elevated Pitta.
              </div>
            </div>
          </div>

          {/* Today's Dinacharya Routine & Medicine Reminders */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
            <h3 className="text-base font-bold text-stone-900 mb-4">Today's Dinacharya & Medicines</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Morning */}
              <div className="p-3.5 rounded-xl border border-stone-100 bg-stone-50/40">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-amber-700">
                  <Sun className="w-4 h-4" />
                  <span>Morning (Pratah)</span>
                </div>
                <div className="space-y-2 text-xs text-stone-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="line-through text-stone-400">Ushapan (Warm water)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="line-through text-stone-400">Avipattikar Churna 2.5g</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border border-stone-300 inline-block shrink-0" />
                    <span>15 min Pranayama (Shitali)</span>
                  </div>
                </div>
              </div>

              {/* Afternoon */}
              <div className="p-3.5 rounded-xl border border-stone-100 bg-stone-50/40">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-emerald-700">
                  <Sunset className="w-4 h-4" />
                  <span>Afternoon (Madhyahna)</span>
                </div>
                <div className="space-y-2 text-xs text-stone-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="line-through text-stone-400">Warm cooked lunch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border border-stone-300 inline-block shrink-0" />
                    <span>Takra (Spiced buttermilk)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border border-stone-300 inline-block shrink-0" />
                    <span>No iced water with meals</span>
                  </div>
                </div>
              </div>

              {/* Evening / Night */}
              <div className="p-3.5 rounded-xl border border-stone-100 bg-stone-50/40">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-purple-700">
                  <Moon className="w-4 h-4" />
                  <span>Evening (Sayam / Ratri)</span>
                </div>
                <div className="space-y-2 text-xs text-stone-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-purple-600 inline-block shrink-0 animate-pulse" />
                      <span className="font-semibold text-stone-900">Triphala Churna 3g</span>
                    </div>
                    <span className="text-[10px] text-stone-400 font-mono">8:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full border border-stone-300 inline-block shrink-0" />
                      <span>Ashwagandha with Milk</span>
                    </div>
                    <span className="text-[10px] text-stone-400 font-mono">9:30 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border border-stone-300 inline-block shrink-0" />
                    <span>Screen off 45 min before sleep</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Active Rx Order & AI Sahayak Card */}
        <div className="space-y-6">
          {/* Ask AI Sahayak Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-white shadow-md relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-700/80 px-2 py-0.5 rounded-md text-emerald-100">
                AI Knowledge Assistant
              </span>
              <h3 className="text-lg font-extrabold mt-2">Have a question about your care?</h3>
              <p className="text-xs text-emerald-100/90 mt-1 leading-relaxed">
                Ask about classical herbs, food incompatibilities (Viruddha Ahara), or understand doctor's prescriptions in English, Telugu, or Hindi.
              </p>

              <button
                onClick={() => navigate('/patient/ai')}
                className="mt-4 w-full py-2.5 px-4 bg-white text-emerald-950 text-xs font-bold rounded-xl hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Ask AI Sahayak</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Rx-to-Door Delivery Tracking Card */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-800" />
                <h4 className="text-xs font-bold text-stone-900">Rx-to-Door Delivery</h4>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Out for Delivery
              </span>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-xs mb-3">
              <p className="font-bold text-stone-900">Order #ord-9941</p>
              <p className="text-stone-500 text-[11px] mt-0.5">
                From: Green Ayurveda Pharmacy (1.2 km away)
              </p>
              <div className="mt-2 text-[11px] text-stone-700 space-y-0.5">
                <p>• Triphala Churna (Shodhit Classical)</p>
                <p>• Ashwagandha Rasayana Lehyam</p>
              </div>
            </div>

            <button
              onClick={() => navigate('/patient/orders')}
              className="w-full py-2 bg-stone-100 hover:bg-stone-200/70 text-stone-800 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Track Live Delivery</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Doctor Consultation Card */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={upcomingApt?.doctorImage}
                alt="Doctor"
                className="w-10 h-10 rounded-xl object-cover border border-stone-200"
              />
              <div>
                <h4 className="text-xs font-bold text-stone-900">{upcomingApt?.doctorName}</h4>
                <p className="text-[11px] text-stone-500">{upcomingApt?.doctorSpecialty}</p>
              </div>
            </div>

            <div className="text-xs text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-100 mb-3">
              <p className="font-semibold text-stone-800">Tomorrow • 10:30 AM</p>
              <p className="text-[11px] text-stone-500 mt-0.5">{upcomingApt?.reason}</p>
            </div>

            <button
              onClick={() => {
                showToast('Launching video consultation room...', undefined, 'info');
                navigate('/patient/appointments');
              }}
              className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs rounded-xl transition-colors text-center"
            >
              View Appointment Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
