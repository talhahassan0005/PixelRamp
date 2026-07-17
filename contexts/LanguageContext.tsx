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
    // Default to English; only override if the visitor previously chose a language themselves
    const saved = localStorage.getItem('language') as Lang;
    if (saved && ['en', 'ur', 'fr', 'de', 'es', 'nl', 'it', 'pt', 'ru', 'ja'].includes(saved)) {
      setLang(saved);
    }
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
