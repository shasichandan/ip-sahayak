import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Bot,
  Scale,
  Layers,
  BookOpen
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const tabs = [
    { path: '/chatbot', label: 'AI Sahayak', icon: Bot, isHighlighted: true },
    { path: '/regimes', label: '10 Regimes', icon: Scale },
    { path: '/formulation-analysis', label: 'Formulation', icon: Layers },
    { path: '/tkdl', label: 'TKDL Prior Art', icon: BookOpen }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200/80 px-2 py-1.5 shadow-lg safe-area-bottom">
      <div className="flex items-center justify-around">
        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={idx}
              to={tab.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
                  isActive
                    ? 'text-emerald-900 font-bold'
                    : 'text-stone-500 hover:text-stone-800'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1.5 rounded-xl transition-colors ${
                      tab.isHighlighted && !isActive
                        ? 'bg-emerald-50 text-emerald-800'
                        : tab.isHighlighted && isActive
                        ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20'
                        : isActive
                        ? 'bg-emerald-100/70 text-emerald-900'
                        : ''
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[70px] text-center font-medium">
                    {tab.label}
                  </span>
                  {isActive && !tab.isHighlighted && (
                    <span className="w-1 h-1 rounded-full bg-emerald-700 mt-0.5 absolute bottom-0" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
