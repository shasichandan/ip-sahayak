import React from 'react';
import { ConfidenceLevel } from '../../types';
import { ShieldCheck, AlertCircle, AlertTriangle } from 'lucide-react';

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  reason?: string;
  showIcon?: boolean;
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ level, reason, showIcon = true }) => {
  const configs = {
    high: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline mr-1" />,
      label: 'High Confidence (Classical Consensus)'
    },
    moderate: {
      bg: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-600 inline mr-1" />,
      label: 'Moderate Confidence'
    },
    low: {
      bg: 'bg-rose-50 text-rose-800 border-rose-200',
      icon: <AlertCircle className="w-3.5 h-3.5 text-rose-600 inline mr-1" />,
      label: 'Low / Limited Evidence'
    }
  };

  const config = configs[level] || configs.high;

  return (
    <span
      className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border ${config.bg}`}
      title={reason || config.label}
    >
      {showIcon && config.icon}
      {config.label}
    </span>
  );
};

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const map: Record<string, { bg: string; text: string }> = {
    active: { bg: 'bg-emerald-50 border-emerald-200 text-emerald-800', text: 'Active' },
    upcoming: { bg: 'bg-emerald-50 border-emerald-200 text-emerald-800', text: 'Upcoming' },
    completed: { bg: 'bg-blue-50 border-blue-200 text-blue-800', text: 'Completed' },
    cancelled: { bg: 'bg-stone-100 border-stone-200 text-stone-600', text: 'Cancelled' },
    placed: { bg: 'bg-blue-50 border-blue-200 text-blue-800', text: 'Order Placed' },
    accepted: { bg: 'bg-indigo-50 border-indigo-200 text-indigo-800', text: 'Pharmacy Accepted' },
    preparing: { bg: 'bg-amber-50 border-amber-200 text-amber-800', text: 'Dispensing' },
    dispatched: { bg: 'bg-purple-50 border-purple-200 text-purple-800', text: 'Dispatched' },
    out_for_delivery: { bg: 'bg-emerald-50 border-emerald-200 text-emerald-800', text: 'Out for Delivery' },
    delivered: { bg: 'bg-emerald-100 border-emerald-300 text-emerald-900', text: 'Delivered ✓' }
  };

  const item = map[status] || { bg: 'bg-stone-100 border-stone-200 text-stone-700', text: status };

  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full border ${item.bg}`}>
      {item.text}
    </span>
  );
};
