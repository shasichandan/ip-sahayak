import React from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Calendar, 
  FileText, 
  PackageCheck, 
  Bot, 
  ChevronRight,
  HeartPulse
} from 'lucide-react';

export const MainDashboard: React.FC = () => {
  const { currentUser, appointments, prescriptions, orders } = useApp();
  const navigate = useNavigate();

  const upcomingApt = appointments.find(a => a.status === 'upcoming');
  const activePrescriptions = prescriptions.filter(p => p.status === 'active');
  const activeOrders = orders.filter(o => o.status !== 'delivered');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-stone-900 tracking-tight">
            Welcome back, {currentUser.name.split(' ')[0]}
          </h1>
          <p className="text-sm text-stone-500 mt-1 font-medium">
            Here is your health overview for today.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={() => navigate('/assistant')}
             className="flex items-center gap-2 bg-emerald-800 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-emerald-900/20 hover:bg-emerald-700 transition-all"
           >
             <Bot className="w-4 h-4 text-emerald-200" />
             AI Health Assistant
           </button>
        </div>
      </header>

      {/* AI Assistant Quick Card */}
      <section className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Bot className="w-48 h-48" />
        </div>
        <div className="relative z-10 max-w-xl">
          <h2 className="text-xl md:text-2xl font-bold mb-2">How are you feeling today?</h2>
          <p className="text-emerald-100 text-sm mb-6 max-w-md leading-relaxed">
            Describe your symptoms, upload a lab report, or ask any health-related question. Our AI Sahayak is here to guide you.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => navigate('/assistant')}
              className="bg-white text-emerald-900 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-emerald-50 transition-colors"
            >
              Start Consultation
            </button>
            <button 
               onClick={() => navigate('/assistant')}
               className="bg-white/10 text-white backdrop-blur-sm border border-white/20 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/20 transition-colors"
            >
              Upload Report
            </button>
          </div>
        </div>
      </section>

      {/* Overview Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Upcoming Appointment */}
        <div className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-800">Upcoming Appointment</h3>
          </div>
          {upcomingApt ? (
            <div>
              <p className="text-sm font-bold text-stone-900">{upcomingApt.doctorName}</p>
              <p className="text-xs text-stone-500 mt-1">{upcomingApt.date} at {upcomingApt.time}</p>
              <button 
                onClick={() => navigate('/appointments')}
                className="mt-4 flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                View details <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>
          ) : (
            <div>
              <p className="text-xs text-stone-500">No upcoming appointments.</p>
              <button 
                onClick={() => navigate('/doctors')}
                className="mt-4 flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Book now <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>
          )}
        </div>

        {/* Active Prescriptions */}
        <div className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-800">Prescriptions</h3>
          </div>
          <div>
             <p className="text-2xl font-black text-stone-900">{activePrescriptions.length}</p>
             <p className="text-xs text-stone-500 mt-1">Active prescriptions</p>
             <button 
                onClick={() => navigate('/prescriptions')}
                className="mt-4 flex items-center text-xs font-semibold text-emerald-600 hover:text-emerald-700"
              >
                View all <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
          </div>
        </div>

        {/* Active Orders */}
        <div className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <PackageCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-800">Orders</h3>
          </div>
          <div>
             <p className="text-2xl font-black text-stone-900">{activeOrders.length}</p>
             <p className="text-xs text-stone-500 mt-1">In progress</p>
             <button 
                onClick={() => navigate('/orders')}
                className="mt-4 flex items-center text-xs font-semibold text-amber-600 hover:text-amber-700"
              >
                Track orders <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
          </div>
        </div>

        {/* Health Records Shortcut */}
        <div className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-800">Health Records</h3>
          </div>
          <div>
             <p className="text-xs text-stone-500 leading-relaxed">
               Access your lab reports, historical prescriptions, and profile.
             </p>
             <button 
                onClick={() => navigate('/records')}
                className="mt-4 flex items-center text-xs font-semibold text-purple-600 hover:text-purple-700"
              >
                Open records <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
          </div>
        </div>
      </section>

      {/* Quick Action Bottom area */}
      <section className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
         <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="p-2 bg-stone-100 rounded-lg text-stone-600">
               <HeartPulse className="w-5 h-5" />
             </div>
             <div>
               <h4 className="font-bold text-sm text-stone-900">Ayurvedic Health Profile</h4>
               <p className="text-xs text-stone-500">Update your Dosha assessment and daily diary.</p>
             </div>
           </div>
           <button 
             onClick={() => navigate('/settings')}
             className="px-4 py-2 border border-stone-200 rounded-lg text-xs font-bold text-stone-700 hover:bg-stone-50 transition-colors"
           >
             Manage Profile
           </button>
         </div>
      </section>
    </div>
  );
};
