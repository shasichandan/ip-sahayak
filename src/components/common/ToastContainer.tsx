import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
          info: <Info className="w-5 h-5 text-sky-600 shrink-0" />
        };

        const borders = {
          success: 'border-emerald-200 bg-white shadow-emerald-900/10',
          error: 'border-rose-200 bg-white shadow-rose-900/10',
          warning: 'border-amber-200 bg-white shadow-amber-900/10',
          info: 'border-sky-200 bg-white shadow-sky-900/10'
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg transition-all duration-300 transform translate-y-0 ${borders[toast.type || 'info']}`}
          >
            {icons[toast.type || 'info']}
            <div className="flex-1 pr-2">
              <h4 className="text-xs font-bold text-stone-900 leading-tight">{toast.title}</h4>
              {toast.message && <p className="text-xs text-stone-600 mt-0.5">{toast.message}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-stone-700 p-1 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
