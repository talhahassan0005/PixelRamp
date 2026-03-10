'use client';

import { useState } from 'react';
import { Calendar, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface CalendlyWidgetProps {
  buttonText?: string;
  className?: string;
  requireLogin?: boolean;
}

export default function CalendlyWidget({ 
  buttonText = "Book a Meeting", 
  className = "",
  requireLogin = true
}: CalendlyWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const openCalendly = () => {
    if (requireLogin && !user) {
      alert('Please login first to book a meeting');
      return;
    }
    setIsOpen(true);
  };

  const closeCalendly = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Book Meeting Button */}
      <button
        onClick={openCalendly}
        className={`inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors ${className}`}
      >
        <Calendar size={20} />
        {buttonText}
      </button>

      {/* Modal Overlay */}
      {isOpen && (!requireLogin || user) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] relative">
            {/* Close Button */}
            <button
              onClick={closeCalendly}
              className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            
            {/* Calendly Iframe */}
            <iframe
              src="https://calendly.com/info-pixelramp/30min"
              width="100%"
              height="100%"
              frameBorder="0"
              className="rounded-lg"
              title="Schedule a meeting"
            />
          </div>
        </div>
      )}
    </>
  );
}