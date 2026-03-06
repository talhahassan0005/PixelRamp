"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import enCommon from '@/locales/en/common.json';
import urCommon from '@/locales/ur/common.json';
import frCommon from '@/locales/fr/common.json';
import deCommon from '@/locales/de/common.json';
import esCommon from '@/locales/es/common.json';
import nlCommon from '@/locales/nl/common.json';
import itCommon from '@/locales/it/common.json';
import ptCommon from '@/locales/pt/common.json';
import ruCommon from '@/locales/ru/common.json';
import jaCommon from '@/locales/ja/common.json';

const translations: Record<string, Record<string, string>> = {
  en: enCommon,
  ur: urCommon,
  fr: frCommon,
  de: deCommon,
  es: esCommon,
  nl: nlCommon,
  it: itCommon,
  pt: ptCommon,
  ru: ruCommon,
  ja: jaCommon,
};

type Lang = "en" | "ur" | "fr" | "de" | "es" | "nl" | "it" | "pt" | "ru" | "ja";

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}>({ lang: "en", setLang: () => {}, t: (k) => k });

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    // First check localStorage for saved preference
    const saved = localStorage.getItem('language') as Lang;
    if (saved && ['en', 'ur', 'fr', 'de', 'es', 'nl', 'it', 'pt', 'ru', 'ja'].includes(saved)) {
      setLang(saved);
      return;
    }

    // If no saved preference, detect browser language
    const browserLang = navigator.language.toLowerCase();
    let detectedLang: Lang = 'en'; // default fallback
    
    if (browserLang.startsWith('ur') || browserLang.includes('pk')) {
      detectedLang = 'ur';
    } else if (browserLang.startsWith('fr')) {
      detectedLang = 'fr';
    } else if (browserLang.startsWith('de')) {
      detectedLang = 'de';
    } else if (browserLang.startsWith('es')) {
      detectedLang = 'es';
    } else if (browserLang.startsWith('nl')) {
      detectedLang = 'nl';
    } else if (browserLang.startsWith('it')) {
      detectedLang = 'it';
    } else if (browserLang.startsWith('pt')) {
      detectedLang = 'pt';
    } else if (browserLang.startsWith('ru')) {
      detectedLang = 'ru';
    } else if (browserLang.startsWith('ja')) {
      detectedLang = 'ja';
    }
    
    setLang(detectedLang);
    localStorage.setItem('language', detectedLang);
  }, []);

  const changeLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem('language', l);
  };

  const t = (key: string) => {
    return translations[lang]?.[key] ?? key;
  };

  return <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageProvider;
