import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  PackageCheck,
  Truck,
  Building,
  CheckCircle2,
  Clock,
  MapPin,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Phone,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const OrdersView: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, createOrderFromCart, orders, showToast } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'orders' | 'basket'>('orders');
  const [selectedPharmacy, setSelectedPharmacy] = useState('Green Ayurveda Pharmacy');

  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    createOrderFromCart(selectedPharmacy);
    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
    setActiveTab('orders');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Orders & Prescription Basket
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Track live dispatch status of your Ayurvedic preparations and manage checkout.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200 self-start sm:self-auto text-xs">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'orders' ? 'bg-white text-emerald-950 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Active Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('basket')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'basket' ? 'bg-white text-emerald-950 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>Prescription Basket</span>
            {cart.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-800 text-white text-[10px] font-bold flex items-center justify-center">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* VIEW: BASKET CHECKOUT */}
      {activeTab === 'basket' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Items list */}
          <div className="lg:col-span-2 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
                <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto" />
                <h3 className="font-bold text-stone-700 text-sm">Your Prescription Basket is Empty</h3>
                <p className="text-xs text-stone-400 max-w-sm mx-auto">
                  Add prescribed formulations from your doctor’s prescription or the Ayurveda store.
                </p>
                <button
                  onClick={() => navigate('/patient/medicines')}
                  className="px-4 py-2 bg-emerald-800 text-white font-bold text-xs rounded-xl hover:bg-emerald-900 transition-colors inline-block"
                >
                  Browse Ayurveda Store
                </button>
              </div>
            ) : (
              <div className="p-5 bg-white rounded-2xl border border-stone-200/80 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-stone-900">
                  Prescription Formulations ({cart.length})
                </h3>

                <div className="divide-y divide-stone-100 text-xs">
                  {cart.map(item => (
                    <div key={item.product.id} className="py-3.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-14 h-14 rounded-xl object-cover border border-stone-200"
                        />
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm">{item.product.name}</h4>
                          <p className="text-stone-500 text-[11px]">{item.product.brand}</p>
                          {item.prescribedDose && (
                            <p className="text-emerald-800 font-medium text-[11px] mt-0.5">
                              Prescribed: {item.prescribedDose}
                            </p>
                          )}
                          <p className="font-extrabold text-stone-900 mt-1">₹{item.product.price}</p>
                        </div>
                      </div>

                      {/* Quantity Controls & Delete */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 p-0.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="p-1 text-stone-600 hover:text-stone-900"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-bold text-stone-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="p-1 text-stone-600 hover:text-stone-900"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 rounded-md"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Pharmacy selection & Checkout */}
          {cart.length > 0 && (
            <div className="space-y-4">
              <div className="p-5 bg-white rounded-2xl border border-stone-200/80 shadow-2xs space-y-4 text-xs">
                <h4 className="text-sm font-bold text-stone-900">Select Fulfillment Pharmacy</h4>

                {/* Pharmacy Picker */}
                <div className="space-y-2">
                  {[
                    { name: 'Green Ayurveda Pharmacy', dist: '1.2 km', time: '45 mins (Express)' },
                    { name: 'Vaidya Ratnam Aushadhalaya', dist: '1.8 km', time: 'Today by 6 PM' }
                  ].map(ph => (
                    <div
                      key={ph.name}
                      onClick={() => setSelectedPharmacy(ph.name)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        selectedPharmacy === ph.name
                          ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-600/10'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div>
                        <p className="font-bold text-stone-900">{ph.name}</p>
                        <p className="text-stone-500 text-[11px]">{ph.dist} • {ph.time}</p>
                      </div>
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    </div>
                  ))}
                </div>

                {/* Delivery Address */}
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-1.5 font-bold text-stone-900 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Delivery Address</span>
                  </div>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    Flat 402, Lotus Residency, 12th Main Indiranagar, Bengaluru - 560038
                  </p>
                </div>

                {/* Bill Summary */}
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <div className="flex justify-between text-stone-600">
                    <span>Items Subtotal</span>
                    <span>₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Eco-Delivery Fee</span>
                    <span className="text-emerald-700 font-bold">FREE (Care Plan)</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>AYUSH Batch Verification</span>
                    <span className="text-emerald-700 font-bold">Included</span>
                  </div>
                  <div className="flex justify-between text-stone-900 font-extrabold text-sm pt-2 border-t">
                    <span>Total Amount</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  <span>Place Prescription Order (Mock Checkout)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW: LIVE ORDERS TIMELINE */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.map(ord => (
            <div
              key={ord.id}
              className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-2xs space-y-6"
            >
              {/* Top Order Meta */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-stone-900">Order #{ord.id}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
                      {ord.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Placed on {ord.orderDate} • Fulfilled by {ord.pharmacyName}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-stone-400 uppercase font-semibold">Total Value</span>
                  <p className="text-lg font-extrabold text-stone-900">₹{ord.totalAmount}</p>
                </div>
              </div>

              {/* Order Status Timeline Stepper */}
              <div>
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4">
                  Live Dispatch Status & Chain of Custody
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {ord.trackingSteps.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      className={`p-3 rounded-xl border text-xs transition-all ${
                        step.completed
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                          : step.active
                          ? 'bg-amber-50 border-amber-300 text-amber-950 ring-2 ring-amber-500/20 shadow-xs'
                          : 'bg-stone-50 border-stone-200 text-stone-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono font-bold">0{sIdx + 1}</span>
                        {step.completed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                        ) : step.active ? (
                          <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
                        ) : (
                          <Clock className="w-3 h-3 text-stone-300" />
                        )}
                      </div>
                      <p className="font-bold leading-tight line-clamp-2">{step.title}</p>
                      <p className="text-[10px] text-stone-500 mt-1">{step.timestamp}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items in this order */}
              <div>
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                  Medicines in this Package ({ord.items.length})
                </h4>
                <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden text-xs">
                  {ord.items.map((item, iIdx) => (
                    <div key={iIdx} className="p-3 bg-stone-50/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-10 rounded-lg object-cover border border-stone-200"
                        />
                        <div>
                          <span className="font-bold text-stone-900">{item.product.name}</span>
                          <p className="text-stone-500 text-[11px]">
                            Qty: {item.quantity} • Batch: {item.product.batchNumber}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-stone-900">₹{item.product.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
