import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building,
  PackageCheck,
  Truck,
  CheckCircle2,
  Clock,
  QrCode,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Search,
  Plus,
  Send,
  Boxes
} from 'lucide-react';
import { mockProducts } from '../../data/mockData';
import confetti from 'canvas-confetti';

export const PharmacyDashboard: React.FC = () => {
  const { showToast, orders } = useApp();

  // Active pharmacy orders state
  const [pharmacyOrders, setPharmacyOrders] = useState([
    {
      id: 'ord-9941',
      patient: 'Anjali Sharma',
      doctor: 'Dr. S. Kumar',
      rxId: 'rx-2026-091',
      date: 'Today, 10:45 AM',
      items: [
        { name: 'Organic Triphala Churna', qty: 1, batch: 'BTC-2026-TRP-09', verified: true },
        { name: 'Avipattikar Churna', qty: 1, batch: 'BTC-2026-AVI-12', verified: true },
        { name: 'Ashwagandha Lehyam', qty: 1, batch: 'BTC-2026-ASH-44', verified: true }
      ],
      total: 685,
      status: 'preparing' as 'pending' | 'preparing' | 'dispatched' | 'delivered'
    },
    {
      id: 'ord-9940',
      patient: 'Rajesh Verma',
      doctor: 'Dr. Ananya Roy',
      rxId: 'rx-2026-088',
      date: 'Today, 09:30 AM',
      items: [
        { name: 'Shallaki Joint Oil', qty: 2, batch: 'BTC-2026-SHL-01', verified: true }
      ],
      total: 440,
      status: 'dispatched' as 'pending' | 'preparing' | 'dispatched' | 'delivered'
    }
  ]);

  // Inventory state
  const [inventoryList, setInventoryList] = useState(mockProducts);
  const [searchInv, setSearchInv] = useState('');

  const handleUpdateOrderStatus = (orderId: string, newStatus: 'preparing' | 'dispatched' | 'delivered') => {
    setPharmacyOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (newStatus === 'dispatched') {
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
      showToast(`Order #${orderId} Dispatched`, 'Assigned to Eco-Rider Ramesh (Vehicle KA-04-EV-209)', 'success');
    } else {
      showToast(`Order #${orderId} status updated to ${newStatus}`, undefined, 'info');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Pharmacy Header Banner */}
      <div className="p-6 bg-white rounded-3xl border border-stone-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shadow-xs">
            <Building className="w-8 h-8 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-stone-900">Green Ayurveda Pharmacy</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                AYUSH Schedule T Certified
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              License: AYUSH-DISP-KA-2024-918 • Indiranagar Hub Dispensary
            </p>
            <p className="text-[11px] text-emerald-800 font-semibold mt-0.5">
              Chief Pharmacist: K. Ramanathan, D.Pharm (Ayu)
            </p>
          </div>
        </div>

        {/* Quick KPI stats */}
        <div className="flex items-center gap-4 text-xs border-t md:border-t-0 pt-3 md:pt-0 border-stone-100">
          <div className="text-center px-3 py-1.5 bg-stone-50 rounded-xl border border-stone-100">
            <span className="font-extrabold text-amber-800 text-base block">2</span>
            <span className="text-stone-400 text-[10px] font-bold uppercase">To Prepare</span>
          </div>
          <div className="text-center px-3 py-1.5 bg-stone-50 rounded-xl border border-stone-100">
            <span className="font-extrabold text-emerald-800 text-base block">18</span>
            <span className="text-stone-400 text-[10px] font-bold uppercase">Dispatched</span>
          </div>
          <div className="text-center px-3 py-1.5 bg-stone-50 rounded-xl border border-stone-100">
            <span className="font-extrabold text-stone-900 text-base block">100%</span>
            <span className="text-stone-400 text-[10px] font-bold uppercase">AYUSH Batch</span>
          </div>
        </div>
      </div>

      {/* Main Sections: Prescription Dispensing Terminal & Batch Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Incoming Orders & Dispensing Queue */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-stone-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
                <PackageCheck className="w-5 h-5 text-emerald-800" />
                Prescription Dispensing Terminal
              </h3>
              <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Live Rx Queue Active
              </span>
            </div>

            <div className="space-y-4">
              {pharmacyOrders.map(order => (
                <div
                  key={order.id}
                  className="p-4 bg-stone-50/60 rounded-2xl border border-stone-200 space-y-3 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-stone-200">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-stone-900 text-sm">Order #{order.id}</span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-white border border-stone-200 text-stone-700">
                          {order.status}
                        </span>
                      </div>
                      <p className="text-stone-500 text-[11px] mt-0.5">
                        Patient: <strong>{order.patient}</strong> • Prescribed by {order.doctor} ({order.rxId})
                      </p>
                    </div>
                    <span className="font-mono text-stone-400">{order.date}</span>
                  </div>

                  {/* Formulations & Batch checklist */}
                  <div className="space-y-1.5">
                    <p className="font-bold text-stone-700 uppercase text-[10px]">Formulations to Dispense:</p>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-white rounded-xl border border-stone-200">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                          <span className="font-semibold text-stone-900">{item.name}</span>
                          <span className="text-stone-400">×{item.qty}</span>
                        </div>
                        <span className="font-mono text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                          Batch: {item.batch}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Pharmacy Actions */}
                  <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase font-semibold">Total Value</span>
                      <p className="font-extrabold text-stone-900 text-sm">₹{order.total}</p>
                    </div>

                    <div className="flex gap-2">
                      {order.status === 'preparing' && (
                        <button
                          onClick={() => handleUpdateOrderStatus(order.id, 'dispatched')}
                          className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
                        >
                          <Truck className="w-3.5 h-3.5 text-emerald-300" />
                          Dispatch to Eco-Rider
                        </button>
                      )}

                      {order.status === 'dispatched' && (
                        <button
                          onClick={() => handleUpdateOrderStatus(order.id, 'delivered')}
                          className="px-4 py-2 bg-stone-100 hover:bg-emerald-50 text-stone-800 hover:text-emerald-900 font-bold rounded-xl transition-colors flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          Mark Delivered
                        </button>
                      )}

                      {order.status === 'delivered' && (
                        <span className="text-emerald-800 font-bold flex items-center gap-1 py-1">
                          <CheckCircle2 className="w-4 h-4" /> Delivered to Doorstep
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Batch & Inventory Registry */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-stone-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
                <Boxes className="w-5 h-5 text-emerald-800" />
                Live Dispensary Stock
              </h3>
              <button
                onClick={() => showToast('Stock audit report exported to CSV', undefined, 'info')}
                className="text-xs text-stone-500 hover:text-stone-800 font-semibold"
              >
                Export CSV
              </button>
            </div>

            {/* Search items */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInv}
                onChange={e => setSearchInv(e.target.value)}
                placeholder="Filter stock by name or batch..."
                className="w-full pl-8 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
              />
            </div>

            {/* Inventory table */}
            <div className="divide-y divide-stone-100 border border-stone-200 rounded-2xl overflow-hidden text-xs">
              {inventoryList
                .filter(p => p.name.toLowerCase().includes(searchInv.toLowerCase()) || p.batchNumber.toLowerCase().includes(searchInv.toLowerCase()))
                .map(prod => (
                  <div key={prod.id} className="p-3 bg-stone-50/30 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-stone-900">{prod.name}</p>
                      <p className="text-[10px] font-mono text-stone-400">{prod.batchNumber} • AYUSH Certified</p>
                    </div>

                    <div className="text-right">
                      <span className={`font-bold block ${prod.stockCount < 20 ? 'text-amber-700' : 'text-emerald-800'}`}>
                        {prod.stockCount} units
                      </span>
                      <span className="text-[10px] text-stone-400">₹{prod.price}</span>
                    </div>
                  </div>
                ))}
            </div>

            {/* QR Quick scan trigger */}
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/80 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-emerald-950 block">Inward Barcode Scanner</span>
                <span className="text-[11px] text-stone-600">Scan incoming medicine carton QR code</span>
              </div>
              <button
                onClick={() => showToast('Dispensary Barcode Terminal Ready', 'Awaiting batch barcode scanner input', 'info')}
                className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1"
              >
                <QrCode className="w-3.5 h-3.5" />
                Scan Inward
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
