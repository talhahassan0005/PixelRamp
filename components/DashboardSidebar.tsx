'use client';

import Link from 'next/link';
import { LayoutDashboard, Zap, Settings, LogOut, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function DashboardSidebar({ onOpenChat, activeTab, setActiveTab }: { onOpenChat?: () => void; activeTab?: string; setActiveTab?: (tab: string) => void }) {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const displayName = (user as any)?.name || (user as any)?.email?.split?.('@')?.[0] || 'User';

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 left-0 bg-slate-900 border-r border-slate-800 p-4 flex flex-col justify-between">
      <div>
        <Link href="/dashboard" className="flex items-center gap-3 mb-6">
          <img src="/images/pixelramp-logo.svg" alt="logo" className="w-10 h-10" />
          <span className="text-lg font-bold text-blue-500">PixelRamp</span>
        </Link>

        <nav className="space-y-1">
          <button onClick={() => setActiveTab?.('dashboard')} className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800 ${activeTab === 'dashboard' ? 'bg-slate-800' : ''}`}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>
          <button onClick={() => setActiveTab?.('services')} className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800 ${activeTab === 'services' ? 'bg-slate-800' : ''}`}>
            <Zap size={18} />
            <span>{t('services')}</span>
          </button>
          <button onClick={() => setActiveTab?.('contact')} className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800 ${activeTab === 'contact' ? 'bg-slate-800' : ''}`}>
            <Mail size={18} />
            <span>{t('contact')}</span>
          </button>
          <button onClick={() => setActiveTab?.('settings')} className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800 ${activeTab === 'settings' ? 'bg-slate-800' : ''}`}>
            <Settings size={18} />
            <span>{t('settings')}</span>
          </button>
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-800">
        <button onClick={async () => { await signOut(); window.location.href = '/auth'; }} className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800 text-left">
          <LogOut size={18} />
          <span>{t('logout')}</span>
        </button>
      </div>
    </aside>
  );
}
