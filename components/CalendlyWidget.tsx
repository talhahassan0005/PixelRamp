'use client';

import { useEffect, useState } from 'react';
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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Load Calendly CSS
    if (!document.getElementById('calendly-css')) {
      const link = document.createElement('link');
      link.id = 'calendly-css';
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(link);
    }

    // Load Calendly JS
    if (!document.getElementById('calendly-js')) {
      const script = document.createElement('script');
      script.id = 'calendly-js';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => setReady(true);
      document.head.appendChild(script);
    } else {
      // Script already loaded
      if (window.Calendly) setReady(true);
      else {
        const interval = setInterval(() => {
          if (window.Calendly) { setReady(true); clearInterval(interval); }
        }, 100);
      }
    }
  }, []);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/info-pixelramp/30min',
      });
    }
  };

  return (
    <button
      onClick={openCalendly}
      disabled={!ready}
      className={`inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-wait text-white px-6 py-3 rounded-lg font-medium transition-colors ${className}`}
    >
      <Calendar size={20} />
      {ready ? buttonText : 'Loading...'}
    </button>
  );
}
