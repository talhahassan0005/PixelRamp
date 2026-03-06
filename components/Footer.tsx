"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();

  if (pathname && pathname.startsWith('/auth')) return null;

  return (
    <footer className="bg-slate-900 border-t border-slate-800 pl-12">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-600">PixelRamp</h3>
            <p className="text-slate-400 mb-4">{t('transforming_ideas')}</p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('quick_links')}</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-slate-400 hover:text-blue-600 transition-colors">{t('home')}</Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-blue-600 transition-colors">{t('about')}</Link></li>
              <li><Link href="/services" className="text-slate-400 hover:text-blue-600 transition-colors">{t('services')}</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-blue-600 transition-colors">{t('contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('services')}</h4>
            <ul className="space-y-2 text-slate-400">
              <li>{t('web_development')}</li>
              <li>{t('graphics_design')}</li>
              <li>{t('saas_solutions')}</li>
              <li>{t('mobile_apps')}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('contact')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-slate-400"><Mail size={18} className="mt-1 flex-shrink-0" /><span>contact@pixelramp.com</span></li>
              <li className="flex items-start gap-2 text-slate-400"><Phone size={18} className="mt-1 flex-shrink-0" /><span>+44 (0) 123 456 7890</span></li>
              <li className="flex items-start gap-2 text-slate-400"><MapPin size={18} className="mt-1 flex-shrink-0" /><span>London, United Kingdom</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} PixelRamp. {t('all_rights')}</p>
        </div>
      </div>
    </footer>
  );
}
