import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  QrCode,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Calendar,
  Building,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { mockProducts } from '../../data/mockData';

export const MedicineVerificationView: React.FC = () => {
  const { setInspectSourceChain, showToast } = useApp();
  const [batchInput, setBatchInput] = useState('BTC-2026-TRP-09');
  const [isScanning, setIsScanning] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>({
    productName: 'Organic Triphala Churna (Standardized)',
    brand: 'Kottakkal Arya Vaidya Sala',
    batchNumber: 'BTC-2026-TRP-09',
    ayushLicense: 'AYUSH-KL-GMP-2022-81',
    mfgDate: '12 Jan 2026',
    expiryDate: '11 Jan 2028',
    status: 'Authentic & Verified',
    tests: [
      { name: 'Heavy Metals (Lead, Cadmium, Arsenic, Mercury)', result: 'PASSED (Below detection limits)', status: 'safe' },
      { name: 'Botanical Authenticity (DNA Barcoding)', result: 'PASSED (100% Emblica, Terminalia chebula, Terminalia bellirica)', status: 'safe' },
      { name: 'Microbial Contamination & Aflatoxins', result: 'PASSED (Negative)', status: 'safe' },
      { name: 'GMP Clean-room Certificate', result: 'VALID (AYUSH Schedule T Compliant)', status: 'safe' }
    ]
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchInput.trim()) return;

    showToast('Consulting AYUSH National Drug Registry...', undefined, 'info');

    setTimeout(() => {
      setVerificationResult({
        productName: 'Verified Ayurvedic Formulation',
        brand: 'Authentic AYUSH Licensed Manufacturer',
        batchNumber: batchInput.toUpperCase(),
        ayushLicense: 'AYUSH-GMP-VERIFIED-2026',
        mfgDate: '15 Feb 2026',
        expiryDate: '14 Feb 2028',
        status: 'Authentic & Verified',
        tests: [
          { name: 'Heavy Metals (Lead, Cadmium, Arsenic, Mercury)', result: 'PASSED (Schedule T Verified)', status: 'safe' },
          { name: 'Botanical HPTLC Fingerprinting', result: 'PASSED (Authentic Phytochemical Spectrum)', status: 'safe' },
          { name: 'Microbial & Yeast Count', result: 'PASSED (Within AYUSH Limits)', status: 'safe' },
          { name: 'Purity & Residual Solvents', result: 'PASSED (Zero Contaminants)', status: 'safe' }
        ]
      });
      showToast('Batch Authenticity Confirmed', 'Laboratory report verified', 'success');
    }, 700);
  };

  const simulateQrScan = () => {
    setIsScanning(true);
    showToast('Simulating Camera QR Scan...', 'Pointed at medicine container barcode', 'info');
    setTimeout(() => {
      setIsScanning(false);
      setBatchInput('BTC-2026-ASH-44');
      setVerificationResult({
        productName: 'Ashwagandha Rasayana Granules',
        brand: 'Dabur Vedic Health Ltd.',
        batchNumber: 'BTC-2026-ASH-44',
        ayushLicense: 'AYUSH-DL-GMP-2023-102',
        mfgDate: '01 Feb 2026',
        expiryDate: '31 Jan 2028',
        status: 'Authentic & Verified',
        tests: [
          { name: 'Withanolide Content Assay', result: 'PASSED (2.5% Withaferin-A verified)', status: 'safe' },
          { name: 'Heavy Metals (AAS Spectrometry)', result: 'PASSED (< 0.1 ppm)', status: 'safe' },
          { name: 'Pesticide Residue Analysis', result: 'PASSED (Organic certified)', status: 'safe' }
        ]
      });
      showToast('QR Code Decoded', 'Batch BTC-2026-ASH-44 authentic', 'success');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Ayurvedic Medicine Authenticity Verification
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Verify genuine AYUSH Schedule-T GMP batches, laboratory heavy-metal tests, and botanical purity.
        </p>
      </div>

      {/* Input Box: Scan or Type */}
      <div className="p-6 bg-white rounded-3xl border border-stone-200/80 shadow-2xs space-y-4">
        <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-emerald-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={batchInput}
              onChange={e => setBatchInput(e.target.value)}
              placeholder="Enter Batch Number (e.g. BTC-2026-TRP-09)..."
              className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-mono text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/20"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
          >
            Verify Batch
          </button>

          <button
            type="button"
            onClick={simulateQrScan}
            disabled={isScanning}
            className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <QrCode className="w-4 h-4 text-emerald-800" />
            <span>{isScanning ? 'Scanning...' : 'Scan QR Code'}</span>
          </button>
        </form>

        {/* Quick batch presets */}
        <div className="flex items-center gap-1.5 text-xs text-stone-500">
          <span className="text-[11px] font-bold text-stone-400">Sample Batches:</span>
          {['BTC-2026-TRP-09', 'BTC-2026-ASH-44', 'BTC-2026-BRH-18'].map(b => (
            <button
              key={b}
              onClick={() => setBatchInput(b)}
              className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 font-mono text-[11px] rounded-md transition-colors"
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Verification Result Card */}
      {verificationResult && (
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-stone-200/80 shadow-md space-y-6 animate-in zoom-in-95 duration-150">
          {/* Result Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  {verificationResult.status}
                </span>
                <span className="text-xs text-stone-400 font-mono">Batch #{verificationResult.batchNumber}</span>
              </div>
              <h2 className="text-xl font-extrabold text-stone-900 mt-2">{verificationResult.productName}</h2>
              <p className="text-xs text-stone-500">{verificationResult.brand}</p>
            </div>

            <div className="text-left sm:text-right text-xs text-stone-500 space-y-0.5">
              <p><span className="font-semibold text-stone-700">License:</span> {verificationResult.ayushLicense}</p>
              <p><span className="font-semibold text-stone-700">Mfg:</span> {verificationResult.mfgDate} • <span className="font-semibold text-stone-700">Exp:</span> {verificationResult.expiryDate}</p>
            </div>
          </div>

          {/* Laboratory Quality Tests Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Mandatory Pharmacopeial Lab Reports
            </h4>
            <div className="divide-y divide-stone-100 border border-stone-200 rounded-2xl overflow-hidden text-xs">
              {verificationResult.tests.map((test: any, idx: number) => (
                <div key={idx} className="p-3.5 bg-stone-50/40 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="font-bold text-stone-800">{test.name}</span>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {test.result}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Classical Traceability Citation trigger */}
          <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/60 flex items-center justify-between gap-3">
            <div className="text-xs text-emerald-950">
              <span className="font-bold block">Classical Standard & AYUSH Pharmacopeia Compliance</span>
              <span className="text-stone-600">Referenced against Ayurvedic Pharmacopoeia of India (API) Part I, Vol II.</span>
            </div>

            <button
              onClick={() =>
                setInspectSourceChain({
                  claim: `${verificationResult.productName} Batch Quality`,
                  source: 'Ayurvedic Pharmacopoeia of India (API)',
                  document: 'Part I, Vol II, Monograph #44',
                  section: 'Standardization and Heavy Metals Protocol',
                  authority: 'Ministry of AYUSH, Govt of India',
                  confidence: 'high'
                })
              }
              className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs transition-colors shrink-0 shadow-xs"
            >
              Verify Traceability Chain
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
