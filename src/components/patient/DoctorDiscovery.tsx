import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockDoctors } from '../../data/mockData';
import { Doctor } from '../../types';
import {
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  Calendar,
  ShieldCheck,
  Video,
  Building,
  CheckCircle,
  X,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DoctorDiscovery: React.FC = () => {
  const { bookAppointment, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 10:30 AM');
  const [consultType, setConsultType] = useState<'Video Consultation' | 'In-Clinic'>('Video Consultation');
  const [reason, setReason] = useState('Digestive health follow-up');

  const specialties = ['All', 'Digestive Health', 'Metabolic Disorders', 'Joint & Spine Health', 'PCOS/PCOD Management'];
  const languages = ['All', 'English', 'తెలుగు', 'हिन्दी'];

  const filteredDoctors = mockDoctors.filter(doc => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      doc.hospitalAffiliation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialties.includes(selectedSpecialty);
    const matchesLang = selectedLanguage === 'All' || doc.languages.includes(selectedLanguage);

    return matchesSearch && matchesSpecialty && matchesLang;
  });

  const handleConfirmBooking = () => {
    if (!bookingDoctor) return;
    bookAppointment(
      bookingDoctor.name,
      selectedDate.split(',')[0],
      selectedDate.split(',')[1] || '10:30 AM',
      consultType,
      reason
    );
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    } catch {
      // ignore
    }
    setBookingDoctor(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Find a Qualified Vaidya
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Connect with verified Ayurvedic physicians for authentic pulse diagnosis, personalized diets, and clinical care.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-2xs space-y-3">
        <div className="flex items-center bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5">
          <Search className="w-4 h-4 text-emerald-700 mr-2.5 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by specialty, doctor name, condition (e.g. Amlapitta, Joint Pain)..."
            className="w-full bg-transparent text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-hidden"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-xs text-stone-400 hover:text-stone-600">
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
          {/* Specialty Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider shrink-0 mr-1">
              Specialty:
            </span>
            {specialties.map(sp => (
              <button
                key={sp}
                onClick={() => setSelectedSpecialty(sp)}
                className={`px-3 py-1 rounded-lg font-medium transition-all shrink-0 ${
                  selectedSpecialty === sp
                    ? 'bg-emerald-800 text-white font-bold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70'
                }`}
              >
                {sp}
              </button>
            ))}
          </div>

          {/* Language filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
              Language:
            </span>
            {languages.map(lang => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-all ${
                  selectedLanguage === lang
                    ? 'bg-emerald-100 text-emerald-900 font-bold'
                    : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {filteredDoctors.map(doc => (
          <div
            key={doc.id}
            className="p-5 rounded-2xl bg-white border border-stone-200/80 hover:border-emerald-300 shadow-2xs transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Doctor Header */}
              <div className="flex items-start gap-3.5 mb-3.5">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-stone-200 shrink-0 shadow-xs"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-extrabold text-stone-900 truncate">{doc.name}</h3>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>{doc.rating}</span>
                      <span className="text-[10px] text-stone-400 font-normal">({doc.reviewCount})</span>
                    </div>
                  </div>
                  <p className="text-xs text-emerald-800 font-semibold">{doc.title}</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">{doc.degree}</p>
                </div>
              </div>

              {/* Badges: Exp, Distance, Languages */}
              <div className="flex flex-wrap gap-1.5 mb-3 text-[11px]">
                <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium">
                  {doc.experienceYears} Years Exp
                </span>
                <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-700" /> {doc.location}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium">
                  Speaks: {doc.languages.join(', ')}
                </span>
              </div>

              {/* Specialties */}
              <div className="mb-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                  Specialties:
                </p>
                <div className="flex flex-wrap gap-1">
                  {doc.specialties.map((sp, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] font-medium bg-emerald-50 text-emerald-900 border border-emerald-200/60 px-2 py-0.5 rounded-md"
                    >
                      {sp}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed line-clamp-2 mb-4">
                {doc.about}
              </p>
            </div>

            {/* Bottom info & Book Button */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-semibold">Consultation</span>
                <p className="text-base font-extrabold text-stone-900">₹{doc.consultationFee}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setBookingDoctor(doc)}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition-all shadow-xs"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {bookingDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative">
            <button
              onClick={() => setBookingDoctor(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <img
                src={bookingDoctor.image}
                alt={bookingDoctor.name}
                className="w-12 h-12 rounded-xl object-cover border border-stone-200"
              />
              <div>
                <h3 className="text-base font-bold text-stone-900">{bookingDoctor.name}</h3>
                <p className="text-xs text-emerald-800 font-medium">{bookingDoctor.title}</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              {/* Consultation Type */}
              <div>
                <label className="font-bold text-stone-700 block mb-1.5">Consultation Mode:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setConsultType('Video Consultation')}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 font-semibold transition-all ${
                      consultType === 'Video Consultation'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                        : 'border-stone-200 text-stone-600'
                    }`}
                  >
                    <Video className="w-4 h-4 text-emerald-700" />
                    Video Call
                  </button>
                  <button
                    type="button"
                    onClick={() => setConsultType('In-Clinic')}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 font-semibold transition-all ${
                      consultType === 'In-Clinic'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                        : 'border-stone-200 text-stone-600'
                    }`}
                  >
                    <Building className="w-4 h-4 text-emerald-700" />
                    In-Clinic Visit
                  </button>
                </div>
              </div>

              {/* Slot picker */}
              <div>
                <label className="font-bold text-stone-700 block mb-1.5">Select Time Slot:</label>
                <select
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 focus:outline-hidden"
                >
                  <option value="Tomorrow, 10:30 AM">Tomorrow, 10:30 AM (Recommended)</option>
                  <option value="Tomorrow, 02:00 PM">Tomorrow, 02:00 PM</option>
                  <option value="Tomorrow, 05:30 PM">Tomorrow, 05:30 PM</option>
                  <option value="Friday, 11:00 AM">Friday, 11:00 AM</option>
                </select>
              </div>

              {/* Reason */}
              <div>
                <label className="font-bold text-stone-700 block mb-1.5">Primary Health Concern:</label>
                <input
                  type="text"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  placeholder="e.g. Acid reflux, sleep distress, dosha balancing..."
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 focus:outline-hidden"
                />
              </div>

              {/* Fee breakdown */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex justify-between items-center">
                <span className="font-semibold text-stone-600">Consultation Fee</span>
                <span className="font-extrabold text-stone-900 text-sm">₹{bookingDoctor.consultationFee}</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleConfirmBooking}
                  className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition-colors shadow-xs"
                >
                  Confirm & Reserve Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
