import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Shield,
  Heart,
  AlertTriangle,
  Pill,
  Target,
  Phone,
  Edit2,
  Check,
  Sparkles,
  Award
} from 'lucide-react';

export const HealthProfileView: React.FC = () => {
  const { userProfile, updateUserProfile, showToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userProfile);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(formData);
    setIsEditing(false);
    showToast('Health Profile Updated', 'Ayurveda health record synced', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Patient Health & Wellness Record
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Encrypted personal health record, Doshic constitution, and clinical history.
          </p>
        </div>

        <button
          onClick={() => {
            if (isEditing) {
              updateUserProfile(formData);
              setIsEditing(false);
            } else {
              setIsEditing(true);
            }
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            isEditing ? 'bg-emerald-800 text-white' : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
          }`}
        >
          {isEditing ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </>
          ) : (
            <>
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </>
          )}
        </button>
      </div>

      {/* Main Profile Card */}
      <div className="p-6 bg-white rounded-3xl border border-stone-200/80 shadow-2xs space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-6 border-b border-stone-100">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
            alt="Anjali Sharma"
            className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-600/30 shadow-xs"
          />
          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h2 className="text-xl font-extrabold text-stone-900">{formData.name}</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 w-fit mx-auto sm:mx-0">
                AYUSH Verified ID: AY-KA-2026-881
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              {formData.age} Years • {formData.gender} • Blood Group: {formData.bloodGroup}
            </p>
            <p className="text-xs text-stone-400 font-mono mt-0.5">
              {formData.phone} • {formData.email}
            </p>
          </div>
        </div>

        {/* Section: Constitution & Dosha */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            Prakriti & Dosha Constitution
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 bg-amber-50/50 rounded-2xl border border-amber-200/80">
              <span className="font-bold text-amber-950 block">Primary Dosha (Prakriti)</span>
              <p className="text-base font-extrabold text-stone-900 mt-0.5">{formData.prakriti}</p>
              <p className="text-[11px] text-stone-500 mt-1">Inherent birth constitution</p>
            </div>
            <div className="p-3.5 bg-rose-50/50 rounded-2xl border border-rose-200/80">
              <span className="font-bold text-rose-950 block">Current Imbalance (Vikriti)</span>
              <p className="text-base font-extrabold text-stone-900 mt-0.5">{formData.vikriti}</p>
              <p className="text-[11px] text-stone-500 mt-1">Active metabolic state</p>
            </div>
            <div className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-200/80">
              <span className="font-bold text-emerald-950 block">Agni Status</span>
              <p className="text-base font-extrabold text-stone-900 mt-0.5">{formData.agniStatus}</p>
              <p className="text-[11px] text-stone-500 mt-1">Digestive metabolism</p>
            </div>
          </div>
        </div>

        {/* Section: Allergies & Dietary Restrictions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
            <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Known Allergies & Contraindications
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {formData.allergies.map((item, idx) => (
                <span key={idx} className="bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-md font-semibold">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
            <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-emerald-600" />
              Dietary Lifestyle & Food Habits
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {formData.dietaryPreferences.map((item, idx) => (
                <span key={idx} className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-semibold">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section: Current Medications & Health Goals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
            <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
              <Pill className="w-3.5 h-3.5 text-blue-600" />
              Current Medications & Herbs
            </h4>
            <ul className="space-y-1 text-stone-600 list-disc list-inside">
              {formData.currentMedications.map((m, idx) => (
                <li key={idx} className="font-medium">{m}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
            <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-indigo-600" />
              Primary Wellness Goals
            </h4>
            <ul className="space-y-1 text-stone-600 list-disc list-inside">
              {formData.healthGoals.map((g, idx) => (
                <li key={idx} className="font-medium">{g}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 flex items-center justify-between text-xs">
          <div>
            <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              Emergency Contact
            </h4>
            <p className="text-stone-600 mt-0.5">
              {formData.emergencyContact.name} ({formData.emergencyContact.relation})
            </p>
          </div>
          <span className="font-mono font-bold text-stone-900 text-sm">{formData.emergencyContact.phone}</span>
        </div>
      </div>
    </div>
  );
};
