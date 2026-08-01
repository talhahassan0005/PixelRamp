'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Zap, Settings, LogOut, Mail, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

type Props = {
  onOpenChat?: () => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
};

export default function DashboardSidebar({ onOpenChat, activeTab, setActiveTab }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { signOut } = useAuth();
  const { t } = useLanguage();

  const handleTab = (tab: string) => {
    setActiveTab?.(tab);
    setMobileOpen(false);
  };

  const handleLogout = async () => {
    setMobileOpen(false);
    await signOut();
    window.location.href = '/auth';
  };

  const navItems = [
    { tab: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { tab: 'services', icon: Zap, label: t('services') },
    { tab: 'contact', icon: Mail, label: t('contact') },
    { tab: 'settings', icon: Settings, label: t('settings') },
  ];

  const SidebarBody = ({ onNavigate }: { onNavigate?: () => void }) => (
    <>
      <div>
        <Link href="/dashboard" className="flex items-center gap-3 mb-6" onClick={onNavigate}>
          <img src="/images/pixelramp-logo.svg" alt="logo" className="w-10 h-10" />
          <span className="text-lg font-bold text-blue-500">PixelRamp</span>
        </Link>

        <nav className="space-y-1">
          {navItems.map(({ tab, icon: Icon, label }) => (
            <button
              key={tab}
              onClick={() => handleTab(tab)}
              className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800 ${activeTab === tab ? 'bg-slate-800' : ''}`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-800">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800 text-left">
          <LogOut size={18} />
          <span>{t('logout')}</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between bg-slate-900 border-b border-slate-800 px-4 py-3">
        <Link href="/dashboard" className="flex items-center gap-2">
          <img src="/images/pixelramp-logo.svg" alt="logo" className="w-8 h-8" />
          <span className="font-bold text-blue-500">PixelRamp</span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="p-2 -mr-2 text-slate-300 hover:text-blue-500"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative w-72 max-w-[85%] h-full bg-slate-900 border-r border-slate-800 p-4 flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-bold text-blue-500">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="p-2 -mr-2 text-slate-300 hover:text-blue-500"
              >
                <X size={20} />
              </button>
            </div>
            <SidebarBody onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 h-screen sticky top-0 left-0 bg-slate-900 border-r border-slate-800 p-4 flex-col">
        <SidebarBody />
      </aside>
    </>
  );
}
