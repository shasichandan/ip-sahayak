import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockPharmacies, mockHospitals } from '../../data/mockData';
import {
  MapPin,
  Building,
  Phone,
  Clock,
  Navigation,
  ShieldCheck,
  Search,
  ExternalLink,
  Bed,
  Sparkles
} from 'lucide-react';

export const NearbyCareView: React.FC = () => {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'pharmacies' | 'hospitals'>('pharmacies');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPharmacies = mockPharmacies.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHospitals = mockHospitals.filter(h =>
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Nearby Ayurvedic Care & Pharmacies
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Discover verified AYUSH dispensaries, Panchakarma centers, and accredited Ayurvedic hospitals.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('pharmacies')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'pharmacies' ? 'bg-white text-emerald-950 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Dispensaries ({mockPharmacies.length})
          </button>
          <button
            onClick={() => setActiveTab('hospitals')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'hospitals' ? 'bg-white text-emerald-950 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Hospitals & IPD ({mockHospitals.length})
          </button>
        </div>
      </div>

      {/* Simulated Map Banner with live GPS radar */}
      <div className="relative h-48 sm:h-64 rounded-3xl overflow-hidden border border-stone-200 bg-stone-100 shadow-xs flex items-center justify-center">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

        {/* Map pins representation */}
        <div className="relative z-10 flex flex-col items-center text-center p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-stone-200/80 shadow-md max-w-sm">
          <div className="w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center mb-2 shadow-xs">
            <MapPin className="w-5 h-5 text-emerald-300" />
          </div>
          <h4 className="text-sm font-extrabold text-stone-900">Current Geo-Location: Indiranagar, Bengaluru</h4>
          <p className="text-[11px] text-stone-500 mt-0.5">
            Displaying 5 AYUSH-accredited facilities within 5.0 km radius.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-3.5 bg-white rounded-2xl border border-stone-200/80 shadow-2xs flex items-center">
        <Search className="w-4 h-4 text-emerald-700 mr-2.5 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={`Search ${activeTab === 'pharmacies' ? 'pharmacies by name or location' : 'hospitals by specialty (e.g. Panchakarma)'}...`}
          className="w-full bg-transparent text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-hidden"
        />
      </div>

      {/* Tab: Pharmacies List */}
      {activeTab === 'pharmacies' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPharmacies.map(pharmacy => (
            <div
              key={pharmacy.id}
              className="p-5 bg-white rounded-2xl border border-stone-200/80 hover:border-emerald-300 shadow-2xs transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-base font-extrabold text-stone-900">{pharmacy.name}</h3>
                    <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      {pharmacy.address}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
                    {pharmacy.distance}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 mt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    {pharmacy.timing}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    {pharmacy.phone}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-3 text-[11px]">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> AYUSH License: {pharmacy.licenseNumber}
                  </span>
                  {pharmacy.stockAvailable && (
                    <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-semibold">
                      Rx-to-Door Enabled
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
                <button
                  onClick={() => showToast(`Dialing ${pharmacy.name}`, pharmacy.phone, 'info')}
                  className="flex-1 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-stone-600" />
                  Call Store
                </button>
                <button
                  onClick={() => showToast('Opening GPS Navigation Map', pharmacy.address, 'info')}
                  className="flex-1 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Get Directions
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Hospitals List */}
      {activeTab === 'hospitals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHospitals.map(hospital => (
            <div
              key={hospital.id}
              className="p-5 bg-white rounded-2xl border border-stone-200/80 hover:border-emerald-300 shadow-2xs transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-extrabold text-stone-900">{hospital.name}</h3>
                      {hospital.emergencyAvailable && (
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-md">
                          24/7 Emergency
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      {hospital.address}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
                    {hospital.distance}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {hospital.specialties.map((s, idx) => (
                    <span key={idx} className="text-[11px] font-medium bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 mt-3 text-xs text-stone-600">
                  <span className="flex items-center gap-1 font-semibold">
                    <Bed className="w-3.5 h-3.5 text-stone-400" />
                    {hospital.bedCapacity} Inpatient Beds
                  </span>
                  <span>•</span>
                  <span>Accreditation: {hospital.accreditation}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
                <button
                  onClick={() => showToast(`Calling ${hospital.name}`, hospital.phone, 'info')}
                  className="flex-1 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-stone-600" />
                  Call Hospital
                </button>
                <button
                  onClick={() => showToast('Opening GPS Navigation Map', hospital.address, 'info')}
                  className="flex-1 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Directions
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
