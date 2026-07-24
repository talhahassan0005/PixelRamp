'use client';

import { Calendar } from 'lucide-react';

interface CalendlyWidgetProps {
  buttonText?: string;
  className?: string;
  requireLogin?: boolean;
}

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

export default function CalendlyWidget({
  buttonText = 'Book a Free Consultation',
  className = '',
  requireLogin = false,
}: CalendlyWidgetProps) {

  const openCalendly = () => {
    if (typeof window !== 'undefined' && window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/info-pixelramp/30min',
      });
    }
  };

  return (
    <button
      onClick={openCalendly}
      className={`inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors ${className}`}
    >
      <Calendar size={20} />
      {buttonText}
    </button>
  );
}
