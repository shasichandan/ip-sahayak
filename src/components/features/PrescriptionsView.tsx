import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Download,
  ShoppingBag,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Printer,
  Sparkles,
  Truck,
  Building,
  Check,
  X
} from 'lucide-react';
import { Prescription } from '../../types';
import { mockProducts } from '../../data/mockData';

export const PrescriptionsView: React.FC = () => {
  const { prescriptions, addToCart, showToast, createOrderFromCart } = useApp();
  const navigate = useNavigate();

  const [selectedRx, setSelectedRx] = useState<Prescription>(prescriptions[0]);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showRxToDoorModal, setShowRxToDoorModal] = useState(false);
  const [rxWorkflowStep, setRxWorkflowStep] = useState(1);

  const handleStartRxToDoor = (rx: Prescription) => {
    setSelectedRx(rx);
    setRxWorkflowStep(1);
    setShowRxToDoorModal(true);
  };

  const handleTransferToBasketAndOrder = () => {
    // Add all medicines from rx into cart
    selectedRx.medicines.forEach(m => {
      const match = mockProducts.find(p => p.name.toLowerCase().includes(m.name.split(' ')[0].toLowerCase())) || mockProducts[0];
      addToCart(match, 1, `${m.dosage} (${m.frequency})`);
    });
    setRxWorkflowStep(4);
    setTimeout(() => {
      createOrderFromCart('Green Ayurveda Pharmacy');
      setRxWorkflowStep(5);
      showToast('Rx Order Dispatched to Green Ayurveda Pharmacy', 'Eco-rider assigned for 45 min delivery', 'success');
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            My Prescriptions & Regimens
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Doctor-approved Ayurvedic regimens, dosage schedules, and Rx-to-Door home delivery.
          </p>
        </div>

        {/* Global Action: Rx to Door */}
        <button
          onClick={() => handleStartRxToDoor(selectedRx)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-xs transition-all self-start sm:self-auto"
        >
          <Truck className="w-4 h-4 text-emerald-300" />
          <span>Launch Rx-to-Door Delivery</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Prescriptions List */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">
            All Prescriptions ({prescriptions.length})
          </p>
          {prescriptions.map(rx => {
            const isSelected = selectedRx.id === rx.id;
            return (
              <div
                key={rx.id}
                onClick={() => setSelectedRx(rx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-600 bg-white ring-2 ring-emerald-600/10 shadow-md'
                    : 'border-stone-200/80 bg-white hover:border-emerald-300 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Approved by Doctor
                  </span>
                  <span className="text-[11px] text-stone-400">{rx.date}</span>
                </div>
                <h4 className="font-bold text-stone-900 text-sm">{rx.diagnosis}</h4>
                <p className="text-xs text-stone-500 mt-0.5">{rx.doctorName}</p>
                <p className="text-xs text-stone-400 font-mono mt-1">Regimen: {rx.medicines.length} formulations</p>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Prescription Full Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-6">
            {/* Doctor & Clinic Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-stone-100">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Official Medical Prescription
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-2">{selectedRx.doctorName}</h3>
                <p className="text-xs text-stone-500">{selectedRx.doctorTitle}</p>
                <p className="text-[11px] text-stone-400 font-mono mt-0.5">License: {selectedRx.doctorLicense}</p>
              </div>

              {/* Patient info & Actions */}
              <div className="sm:text-right space-y-2">
                <div>
                  <span className="text-[11px] font-semibold text-stone-400 uppercase">Patient:</span>
                  <p className="text-sm font-bold text-stone-900">{selectedRx.patientName} ({selectedRx.patientAge}y, {selectedRx.patientGender})</p>
                  <p className="text-xs text-stone-500">Date: {selectedRx.date} • Valid till: {selectedRx.validTill}</p>
                </div>

                <div className="flex sm:justify-end gap-2 pt-1">
                  <button
                    onClick={() => setShowPdfModal(true)}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5 text-stone-600" />
                    Download PDF
                  </button>
                  <button
                    onClick={() => handleStartRxToDoor(selectedRx)}
                    className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Truck className="w-3.5 h-3.5 text-emerald-300" />
                    Rx-to-Door
                  </button>
                </div>
              </div>
            </div>

            {/* Diagnosis & Ayurvedic Assessment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-emerald-50/40 rounded-xl border border-emerald-200/60 text-xs">
              <div>
                <p className="font-semibold text-emerald-900/60 uppercase text-[10px]">Clinical Diagnosis:</p>
                <p className="font-bold text-stone-900 text-sm mt-0.5">{selectedRx.diagnosis}</p>
              </div>
              <div>
                <p className="font-semibold text-emerald-900/60 uppercase text-[10px]">Ayurvedic Samprapti / Vikriti:</p>
                <p className="font-bold text-emerald-950 text-sm mt-0.5">{selectedRx.ayurvedicDiagnosis}</p>
              </div>
            </div>

            {/* Prescribed Medicines Table */}
            <div>
              <h4 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-800" />
                Prescribed Formulations & Dosage Table
              </h4>
              <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden text-xs">
                {selectedRx.medicines.map((med, idx) => (
                  <div key={idx} className="p-3.5 bg-stone-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-sm">{med.name}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                          {med.formulation}
                        </span>
                      </div>
                      <p className="text-stone-600">
                        <span className="font-semibold text-stone-800">Dosage:</span> {med.dosage} •{' '}
                        <span className="font-semibold text-stone-800">Frequency:</span> {med.frequency} •{' '}
                        <span className="font-semibold text-stone-800">Duration:</span> {med.duration}
                      </p>
                      <p className="text-[11px] text-stone-500 italic">
                        Instructions: {med.instructions} ({med.timing})
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const prod = mockProducts.find(p => p.name.includes(med.name.split(' ')[0])) || mockProducts[0];
                        addToCart(prod, 1, `${med.dosage} (${med.frequency})`);
                      }}
                      className="shrink-0 px-3 py-1.5 bg-white hover:bg-emerald-50 text-emerald-800 hover:text-emerald-900 font-bold border border-stone-200 hover:border-emerald-300 rounded-lg text-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Basket
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Lifestyle & Pathya / Apathya Advice */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/70">
                <h5 className="font-bold text-stone-900 mb-2">🌿 Pathya (Dietary Recommendations)</h5>
                <ul className="space-y-1.5 text-stone-600 list-disc list-inside">
                  {selectedRx.dietAdvice.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/70">
                <h5 className="font-bold text-stone-900 mb-2">🧘 Dinacharya (Lifestyle Advice)</h5>
                <ul className="space-y-1.5 text-stone-600 list-disc list-inside">
                  {selectedRx.lifestyleAdvice.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Doctor Signature Block */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Digitally signed via AYUSH Practitioner Verification Key</span>
              </div>
              <span className="font-bold text-stone-700">{selectedRx.doctorName} (BAMS, MD)</span>
            </div>
          </div>
        </div>
      </div>

      {/* RX-TO-DOOR WORKFLOW STEPPER MODAL */}
      {showRxToDoorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative">
            <button
              onClick={() => setShowRxToDoorModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1.5 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                Ecosystem Workflow
              </span>
              <h3 className="text-xl font-extrabold text-stone-900 mt-1">
                Rx-to-Door Prescription Fulfillment
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Zero-friction transition: Prescription → Local AYUSH Pharmacy Stock Check → Verified Dispensing → Doorstep Delivery
              </p>
            </div>

            {/* 5-Step Stepper Bar */}
            <div className="relative flex items-center justify-between mb-8 px-2">
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-stone-200 -z-0" />
              {[
                { step: 1, title: 'Prescription' },
                { step: 2, title: 'Medicine Match' },
                { step: 3, title: 'Pharmacy Check' },
                { step: 4, title: 'Order Placed' },
                { step: 5, title: 'Dispatched' }
              ].map(s => {
                const isPassed = rxWorkflowStep >= s.step;
                return (
                  <div key={s.step} className="flex flex-col items-center relative z-10">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isPassed
                          ? 'bg-emerald-800 text-white shadow-xs'
                          : 'bg-white border-2 border-stone-300 text-stone-400'
                      }`}
                    >
                      {isPassed ? <Check className="w-4 h-4 stroke-[3]" /> : s.step}
                    </div>
                    <span className="text-[10px] font-semibold text-stone-600 mt-1.5 hidden sm:block">
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Stepper Content */}
            <div className="space-y-4 text-xs">
              {rxWorkflowStep === 1 && (
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <h4 className="font-bold text-stone-900 text-sm">Step 1: Prescription Received & Digitized</h4>
                  <p className="text-stone-600">
                    Rx #{selectedRx.id} verified from {selectedRx.doctorName}. Regimen includes 3 formulations.
                  </p>
                  <button
                    onClick={() => setRxWorkflowStep(2)}
                    className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition-colors"
                  >
                    Proceed to Formulations Matching →
                  </button>
                </div>
              )}

              {rxWorkflowStep === 2 && (
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <h4 className="font-bold text-stone-900 text-sm">Step 2: Matching Classical Formulations</h4>
                  <div className="space-y-2">
                    {selectedRx.medicines.map((m, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-white rounded-lg border border-stone-100">
                        <span className="font-semibold text-stone-800">{m.name}</span>
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> 100% Match (In Stock)
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setRxWorkflowStep(3)}
                    className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition-colors"
                  >
                    Select Nearby Dispensing Pharmacy →
                  </button>
                </div>
              )}

              {rxWorkflowStep === 3 && (
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <h4 className="font-bold text-stone-900 text-sm">Step 3: Preferred Nearby AYUSH Pharmacy</h4>
                  <div className="p-3 bg-white rounded-xl border border-emerald-300 ring-2 ring-emerald-600/10 flex items-start gap-3">
                    <Building className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-stone-900">Green Ayurveda Pharmacy</h5>
                      <p className="text-stone-500 text-[11px]">1.2 km away • HAL 2nd Stage, Indiranagar</p>
                      <span className="inline-block mt-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                        ✓ All 3 Formulations in stock • 45 min Express Eco-Delivery
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleTransferToBasketAndOrder}
                    className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl transition-colors shadow-xs"
                  >
                    Confirm & Place Rx Order (₹685)
                  </button>
                </div>
              )}

              {rxWorkflowStep === 4 && (
                <div className="p-6 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin mx-auto" />
                  <h4 className="font-bold text-stone-900 text-sm">Transmitting to Pharmacy Dispensing Terminal...</h4>
                  <p className="text-stone-500">Checking batch barcodes and AYUSH license compliance.</p>
                </div>
              )}

              {rxWorkflowStep === 5 && (
                <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-800 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="font-extrabold text-stone-900 text-base">Order Placed Successfully!</h4>
                  <p className="text-stone-600">
                    Green Ayurveda Pharmacy has accepted your prescription. Order #ord-9941 is now being prepared for doorstep dispatch.
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setShowRxToDoorModal(false);
                        navigate('/patient/orders');
                      }}
                      className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition-colors"
                    >
                      Track Delivery Live
                    </button>
                    <button
                      onClick={() => setShowRxToDoorModal(false)}
                      className="px-4 py-2.5 bg-white border border-stone-200 text-stone-700 font-bold rounded-xl transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PDF Mock Preview Modal */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 relative">
            <button
              onClick={() => setShowPdfModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-stone-200 pb-4 mb-4 text-center">
              <h3 className="font-extrabold text-lg text-emerald-900">GOVERNMENT OF INDIA • AYUSH SYSTEM</h3>
              <p className="text-xs text-stone-500">Official Clinical Consultation Record & Prescription</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex justify-between border-b pb-2">
                <div>
                  <p className="font-bold text-stone-900">{selectedRx.doctorName}</p>
                  <p className="text-stone-500">{selectedRx.doctorTitle}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-stone-900">Rx ID: {selectedRx.id}</p>
                  <p className="text-stone-500">{selectedRx.date}</p>
                </div>
              </div>

              <div className="bg-stone-50 p-3 rounded-xl">
                <p className="font-semibold text-stone-700">Patient: {selectedRx.patientName}, {selectedRx.patientAge} Yrs</p>
                <p className="font-bold text-stone-900 mt-1">Diagnosis: {selectedRx.diagnosis} ({selectedRx.ayurvedicDiagnosis})</p>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-stone-900 uppercase text-[10px]">Prescription Medicines:</p>
                {selectedRx.medicines.map((m, i) => (
                  <div key={i} className="flex justify-between border-b border-stone-100 py-1">
                    <span className="font-semibold">{m.name}</span>
                    <span className="text-stone-500">{m.dosage} - {m.frequency} ({m.duration})</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  onClick={() => {
                    showToast('PDF downloaded successfully', undefined, 'success');
                    setShowPdfModal(false);
                  }}
                  className="px-4 py-2 bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  Print / Save PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
