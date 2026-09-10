import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  className?: string;
  fallbackPath?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  className = '',
  fallbackPath = '/chatbot'
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide Back button on the main AI Chatbot home page
  const isChatbotPage =
    location.pathname === '/chatbot' ||
    location.pathname === '/assistant' ||
    location.pathname === '/';

  if (isChatbotPage) {
    return null;
  }

  const handleBack = () => {
    // Check if there is navigation history within the app
    const hasHistory =
      typeof window !== 'undefined' &&
      window.history?.state &&
      typeof window.history.state.idx === 'number' &&
      window.history.state.idx > 0;

    if (hasHistory) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };

  // Align with content container max-widths
  const maxWidthClass =
    location.pathname === '/settings' || location.pathname === '/help'
      ? 'max-w-4xl'
      : 'max-w-6xl';

  return (
    <div className={`w-full ${maxWidthClass} mx-auto mb-4 ${className}`}>
      <button
        type="button"
        onClick={handleBack}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900 bg-white hover:bg-stone-50 border border-stone-200/90 shadow-2xs hover:border-stone-300 transition-all cursor-pointer group"
        aria-label="Back"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-stone-500 group-hover:-translate-x-0.5 transition-transform" />
        <span>Back</span>
      </button>
    </div>
  );
};
