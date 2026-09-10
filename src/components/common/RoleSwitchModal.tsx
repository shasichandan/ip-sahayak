import React from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../../types';
import { Heart, Stethoscope, Store, Check, X, ShieldAlert } from 'lucide-react';

interface RoleSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoleSwitchModal: React.FC<RoleSwitchModalProps> = ({ isOpen, onClose }) => {
  const { role, setRole } = useApp();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSelectRole = (newRole: UserRole) => {
    setRole(newRole);
    onClose();
    if (newRole === 'patient') navigate('/patient/dashboard');
    else if (newRole === 'doctor') navigate('/doctor/dashboard');
    else if (newRole === 'pharmacy') navigate('/pharmacy/dashboard');
  };

  const roles = [
    {
      id: 'patient' as UserRole,
      title: 'Patient (Care Seeker)',
      name: 'IP-SAKTI User',
      desc: 'Access personal health diary, educational AI Sahayak, prescriptions, nearby pharmacies, and Ayurveda shop.',
      restrictions: 'AI never independently prescribes medicines. Educational guidance only.',
      icon: <Heart className="w-5 h-5 text-emerald-700" />,
      bg: 'hover:border-emerald-300 hover:bg-emerald-50/40'
    },
    {
      id: 'doctor' as UserRole,
      title: 'Vaidya / Ayurveda Doctor',
      name: 'Dr. S. Kumar',
      desc: 'Patient consultation queue, AI Clinical Copilot, differential diagnosis, and prescription builder.',
      restrictions: 'AI generates draft summaries & prescriptions; Doctor must review, edit & approve.',
      icon: <Stethoscope className="w-5 h-5 text-emerald-700" />,
      bg: 'hover:border-emerald-300 hover:bg-emerald-50/40'
    },
    {
      id: 'pharmacy' as UserRole,
      title: 'Licensed Ayurveda Pharmacy',
      name: 'Green Ayurveda Pharmacy',
      desc: 'Live incoming orders, batch authentications, inventory management, and prescription verification.',
      restrictions: 'Access restricted to order fulfillment; cannot view unrelated patient medical histories.',
      icon: <Store className="w-5 h-5 text-emerald-700" />,
      bg: 'hover:border-emerald-300 hover:bg-emerald-50/40'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1.5 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Role-Based Ecosystem
          </span>
          <h3 className="text-xl font-bold text-stone-900 mt-2">Switch Workspace Role</h3>
          <p className="text-xs text-stone-500 mt-1">
            Experience IP-SAKTI SAHAYAK from the perspective of each stakeholder.
          </p>
        </div>

        <div className="space-y-3">
          {roles.map(r => {
            const isSelected = role === r.id;
            return (
              <div
                key={r.id}
                onClick={() => handleSelectRole(r.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/10'
                    : `border-stone-200 bg-white ${r.bg}`
                }`}
              >
                <div className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-xs shrink-0">
                  {r.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">{r.title}</h4>
                      <p className="text-xs text-emerald-800 font-medium">{r.name}</p>
                    </div>
                    {isSelected && (
                      <span className="flex items-center text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <Check className="w-3.5 h-3.5 mr-1" /> Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">{r.desc}</p>
                  <div className="mt-2 text-[11px] text-stone-500 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{r.restrictions}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
