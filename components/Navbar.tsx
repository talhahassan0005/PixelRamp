'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import CalendlyWidget from './CalendlyWidget';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/services', key: 'services' },
  { href: '/why-choose-us', key: 'why_choose_us' },
  { href: '/how-it-works', key: 'how_it_works' },
  { href: '/contact', key: 'contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { t } = useLanguage();
  const pathname = usePathname();

  if (pathname && (pathname.startsWith('/auth') || pathname.startsWith('/dashboard') || pathname.startsWith('/projects'))) return null;

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/pixelramp-logo.svg" alt="PixelRamp" className="w-10 h-10" />
            <span className="text-2xl font-bold text-blue-600">PixelRamp</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  pathname === link.href
                    ? 'text-blue-500 font-semibold'
                    : 'text-slate-300 hover:text-blue-600'
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <CalendlyWidget buttonText="Book Meeting" className="hidden md:flex text-sm px-3 py-2" />
            <LanguageSelector />

            <Link
              href={user ? '/dashboard' : '/auth'}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <User size={18} />
              {user ? t('dashboard') : t('login')}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-slate-300 hover:text-blue-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block py-2 transition-colors ${
                  pathname === link.href
                    ? 'text-blue-500 font-semibold'
                    : 'text-slate-300 hover:text-blue-600'
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-700 mt-4">
              <CalendlyWidget buttonText="Book Meeting" className="w-full justify-center mb-3" />
              <Link
                href={user ? '/dashboard' : '/auth'}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <User size={18} />
                {user ? t('dashboard') : t('login')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
