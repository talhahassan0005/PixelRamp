'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, CalendarDays, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/why-choose-us', label: 'Why Choose Us' },
  { href: '/how-it-works', label: 'How It Works' },
];

// Brand scheduling link — update if the Calendly handle changes.
const CALENDLY_URL = 'https://calendly.com/info-pixelramp/30min';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <img src="/images/pixelramp-logo.svg" alt="PixelRamp" className="w-10 h-10" />
            <span className="text-2xl font-bold text-blue-600">PixelRamp</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
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
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions: Contact + Book Meeting + Login */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <Link
              href="/contact"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                pathname === '/contact'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-slate-700 text-slate-200 hover:border-blue-500 hover:text-blue-400'
              }`}
            >
              <Mail size={18} />
              Contact
            </Link>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/20 transition-all"
            >
              <CalendarDays size={18} />
              Book Meeting
            </a>
            <Link
              href={user ? '/dashboard' : '/auth'}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
            >
              <User size={18} />
              {user ? 'Dashboard' : 'Login'}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-300 hover:text-blue-600"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
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
                {link.label}
              </Link>
            ))}

            <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-200 hover:border-blue-500 hover:text-blue-400 transition-colors"
              >
                <Mail size={18} />
                Contact
              </Link>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all"
              >
                <CalendarDays size={18} />
                Book Meeting
              </a>
              <Link
                href={user ? '/dashboard' : '/auth'}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
              >
                <User size={18} />
                {user ? 'Dashboard' : 'Login'}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
