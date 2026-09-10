import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Video,
  Clock,
  MapPin,
  X,
  Phone,
  Mic,
  MicOff,
  VideoOff,
  Share2,
  FileText,
  AlertCircle,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { Appointment } from '../../types';

export const AppointmentsView: React.FC = () => {
  const { appointments, cancelAppointment, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [videoModalApt, setVideoModalApt] = useState<Appointment | null>(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);

  const filteredAppointments = appointments.filter(a => a.status === activeTab);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Consultations & Appointments
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Manage your video consultations, in-clinic visits, and clinical follow-ups.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        {(['upcoming', 'completed', 'cancelled'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all capitalize ${
              activeTab === tab
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            {tab} ({appointments.filter(a => a.status === tab).length})
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200/80 p-8">
            <Calendar className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-stone-700">No {activeTab} appointments found</h3>
            <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
              You do not have any appointments in this status. Find a Vaidya to book your next consultation.
            </p>
          </div>
        ) : (
          filteredAppointments.map(apt => (
            <div
              key={apt.id}
              className="p-5 rounded-2xl bg-white border border-stone-200/80 hover:border-emerald-300 shadow-2xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left Details */}
              <div className="flex items-start gap-4">
                <img
                  src={apt.doctorImage}
                  alt={apt.doctorName}
                  className="w-14 h-14 rounded-2xl object-cover border border-stone-200 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-stone-900">{apt.doctorName}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {apt.type}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800 font-semibold">{apt.doctorSpecialty}</p>

                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-stone-600">
                    <span className="flex items-center gap-1 font-semibold text-stone-900">
                      <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                      {apt.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-semibold text-stone-900">
                      <Clock className="w-3.5 h-3.5 text-emerald-700" />
                      {apt.time}
                    </span>
                  </div>

                  <p className="text-xs text-stone-500 mt-2">
                    <span className="font-semibold text-stone-700">Reason:</span> {apt.reason}
                  </p>

                  {apt.notes && (
                    <div className="mt-2 p-2.5 bg-stone-50 rounded-xl border border-stone-100 text-xs text-stone-600">
                      <span className="font-bold text-stone-800">Doctor Note:</span> {apt.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-stone-100">
                {apt.status === 'upcoming' && (
                  <>
                    <button
                      onClick={() => setVideoModalApt(apt)}
                      className="w-full sm:w-auto px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <Video className="w-4 h-4" />
                      Join Consultation
                    </button>
                    <button
                      onClick={() => cancelAppointment(apt.id)}
                      className="w-full sm:w-auto px-3 py-2.5 bg-stone-100 hover:bg-rose-50 hover:text-rose-700 text-stone-700 font-semibold text-xs rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {apt.status === 'completed' && (
                  <button
                    onClick={() => showToast('Downloading Consultation Summary...', undefined, 'info')}
                    className="w-full sm:w-auto px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-4 h-4 text-emerald-700" />
                    Download Case Summary
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Video Consultation Room Modal */}
      {videoModalApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="bg-stone-900 rounded-3xl max-w-4xl w-full h-[85vh] shadow-2xl border border-stone-800 flex flex-col overflow-hidden text-white relative">
            {/* Call Header */}
            <div className="p-4 bg-stone-900/90 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <div>
                  <h3 className="font-bold text-sm text-stone-100">{videoModalApt.doctorName}</h3>
                  <p className="text-xs text-stone-400">Encrypted Ayurveda Tele-consultation • AYUSH Protocol</p>
                </div>
              </div>
              <button
                onClick={() => setVideoModalApt(null)}
                className="text-stone-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Stage Video Preview */}
            <div className="flex-1 bg-stone-950 p-4 relative flex items-center justify-center overflow-hidden">
              {/* Doctor Video Mock Frame */}
              <div className="w-full h-full max-h-[500px] rounded-2xl overflow-hidden relative bg-stone-900 border border-stone-800 flex items-center justify-center">
                <img
                  src={videoModalApt.doctorImage}
                  alt={videoModalApt.doctorName}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute bottom-4 left-4 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {videoModalApt.doctorName} (Doctor Active)
                </div>

                {/* Patient PIP video window */}
                <div className="absolute top-4 right-4 w-32 sm:w-44 h-24 sm:h-32 rounded-xl bg-stone-800 border-2 border-emerald-500/80 overflow-hidden shadow-2xl">
                  {isVideoOn ? (
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-stone-400">
                      Camera Off
                    </div>
                  )}
                  <div className="absolute bottom-1 left-2 text-[10px] font-medium bg-black/60 px-1.5 rounded-sm">
                    You
                  </div>
                </div>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="p-4 bg-stone-900 border-t border-stone-800 flex items-center justify-center gap-4">
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={`p-3.5 rounded-2xl font-bold transition-colors ${
                  isMicOn ? 'bg-stone-800 hover:bg-stone-700 text-stone-200' : 'bg-rose-600 text-white'
                }`}
              >
                {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-3.5 rounded-2xl font-bold transition-colors ${
                  isVideoOn ? 'bg-stone-800 hover:bg-stone-700 text-stone-200' : 'bg-rose-600 text-white'
                }`}
              >
                {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => {
                  setVideoModalApt(null);
                  showToast('Consultation ended safely', 'Summary generated in health diary', 'success');
                }}
                className="px-6 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl text-xs transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 rotate-[135deg]" />
                End Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
