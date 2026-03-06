"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

export default function LanguageSelector() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = languages.find(l => l.code === lang) || languages[0];

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-800 text-slate-200">
        {current.flag} {current.code.toUpperCase()} <ChevronDown size={14} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
            {languages.map(l => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code as any); setOpen(false); }}
                className={`w-full text-left px-3 py-2 hover:bg-slate-800 flex items-center gap-2 transition-colors ${
                  l.code === lang ? 'bg-slate-800 text-blue-400' : 'text-slate-200'
                } first:rounded-t-lg last:rounded-b-lg`}
              >
                {l.flag} {l.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
