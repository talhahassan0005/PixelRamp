"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on auth pages (login/signup)
  if (pathname && pathname.startsWith('/auth')) return null;

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-600">DevAgency</h3>
            <p className="text-slate-400 mb-4">
              Transforming ideas into powerful digital solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-slate-400 hover:text-blue-600 transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-blue-600 transition-colors">About</Link></li>
              <li><Link href="/services" className="text-slate-400 hover:text-blue-600 transition-colors">Services</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-blue-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-slate-400">
              <li>Web Development</li>
              <li>Graphics Design</li>
              <li>SaaS Solutions</li>
              <li>Mobile Apps</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-slate-400">
                <Mail size={18} className="mt-1 flex-shrink-0" />
                <span>contact@devagency.com</span>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <Phone size={18} className="mt-1 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>123 Tech Street, Silicon Valley, CA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} DevAgency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
