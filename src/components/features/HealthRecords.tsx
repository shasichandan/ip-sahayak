import React from 'react';
import { FileText, Download, Upload, Activity } from 'lucide-react';

export const HealthRecords: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">Health Records</h1>
          <p className="text-sm text-stone-500 mt-1">Manage your lab reports, prescriptions, and medical documents.</p>
        </div>
        <button className="flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-stone-800 transition-colors">
          <Upload className="w-4 h-4" />
          Upload Document
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Categories Sidebar */}
        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-50 text-emerald-900 font-bold border border-emerald-100">
            <span className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-700" />
              All Records
            </span>
            <span className="text-xs bg-emerald-200 px-2 py-0.5 rounded-full">12</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-stone-50 text-stone-700 font-medium transition-colors">
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-stone-400" />
              Lab Reports
            </span>
            <span className="text-xs bg-stone-100 px-2 py-0.5 rounded-full">3</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-stone-50 text-stone-700 font-medium transition-colors">
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-stone-400" />
              Prescriptions
            </span>
            <span className="text-xs bg-stone-100 px-2 py-0.5 rounded-full">5</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-stone-50 text-stone-700 font-medium transition-colors">
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-stone-400" />
              Consultation Notes
            </span>
            <span className="text-xs bg-stone-100 px-2 py-0.5 rounded-full">4</span>
          </button>
        </div>

        {/* Documents List */}
        <div className="md:col-span-2 space-y-4">
           {/* Sample Document */}
           <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between hover:border-emerald-200 transition-colors group">
              <div className="flex items-start gap-4">
                 <div className="p-3 bg-red-50 text-red-600 rounded-xl shrink-0">
                    <FileText className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="font-bold text-stone-900">Complete Blood Count (CBC)</h3>
                    <p className="text-xs text-stone-500 mt-0.5">Added on Sep 01, 2026 • PDF • 1.2 MB</p>
                    <div className="flex gap-2 mt-2">
                       <span className="text-[10px] font-bold bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md">Lab Report</span>
                    </div>
                 </div>
              </div>
              <button className="p-2 text-stone-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors">
                 <Download className="w-5 h-5" />
              </button>
           </div>
           
           {/* Sample Document */}
           <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between hover:border-emerald-200 transition-colors group">
              <div className="flex items-start gap-4">
                 <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                    <FileText className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="font-bold text-stone-900">Ayurveda Consultation Summary</h3>
                    <p className="text-xs text-stone-500 mt-0.5">Added on Aug 15, 2026 • PDF • 450 KB</p>
                    <div className="flex gap-2 mt-2">
                       <span className="text-[10px] font-bold bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md">Consultation</span>
                    </div>
                 </div>
              </div>
              <button className="p-2 text-stone-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors">
                 <Download className="w-5 h-5" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
