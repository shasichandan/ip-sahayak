import React from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { X, Bell, Calendar, Pill, Truck, ShieldCheck, FileText, Sparkles } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead } = useApp();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-4 h-4 text-emerald-600" />;
      case 'order':
        return <Truck className="w-4 h-4 text-sky-600" />;
      case 'verification':
        return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
      case 'regulatory':
        return <FileText className="w-4 h-4 text-amber-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-sm bg-white shadow-2xl border-l border-stone-200 flex flex-col">
          <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-800" />
              <h3 className="text-sm font-bold text-stone-900">Care Notifications</h3>
              <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                {notifications.filter(n => !n.read).length} new
              </span>
            </div>
            <button onClick={onClose} className="p-1 rounded-md text-stone-400 hover:text-stone-700">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-stone-100 p-2">
            {notifications.map(n => (
              <div
                key={n.id}
                onClick={() => {
                  markNotificationRead(n.id);
                  if (n.actionUrl) {
                    navigate(n.actionUrl);
                    onClose();
                  }
                }}
                className={`p-3 rounded-xl transition-all cursor-pointer flex gap-3 ${
                  !n.read ? 'bg-emerald-50/40 hover:bg-emerald-50/80' : 'hover:bg-stone-50'
                }`}
              >
                <div className="p-2 rounded-lg bg-white border border-stone-200 shrink-0 self-start shadow-xs">
                  {getIcon(n.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <p className={`text-xs font-bold leading-tight truncate ${!n.read ? 'text-stone-900' : 'text-stone-700'}`}>
                      {n.title}
                    </p>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />}
                  </div>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">{n.message}</p>
                  <span className="text-[10px] text-stone-400 mt-1.5 block">{n.timestamp}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-stone-100 bg-stone-50 text-center text-xs text-stone-500">
            All notifications synced across mobile & clinic
          </div>
        </div>
      </div>
    </div>
  );
};
