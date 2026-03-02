'use client';

import Link from 'next/link';
import { Home, FileText, Users, MessageCircle, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardSidebar({ onOpenChat, activeTab, setActiveTab }: { onOpenChat?: () => void; activeTab?: string; setActiveTab?: (tab: string) => void }) {
  const { user, signOut } = useAuth();
  const displayName = (user as any)?.name || (user as any)?.email?.split?.('@')?.[0] || 'User';

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 left-0 bg-slate-900 border-r border-slate-800 p-4 flex flex-col justify-between">
      <div>
        <Link href="/dashboard" className="flex items-center gap-3 mb-6">
          <img src="/images/pixelramp-logo.svg" alt="logo" className="w-10 h-10" />
          <span className="text-lg font-bold text-blue-500">PixelRamp</span>
        </Link>

        <nav className="space-y-1">
          <button onClick={() => setActiveTab?.('overview')} className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800 ${activeTab === 'overview' ? 'bg-slate-800' : ''}`}>
            <Home size={18} />
            <span>Overview</span>
          </button>
          <button onClick={() => setActiveTab?.('projects')} className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800 ${activeTab === 'projects' ? 'bg-slate-800' : ''}`}>
            <FileText size={18} />
            <span>Projects</span>
          </button>
          <button onClick={() => setActiveTab?.('leads')} className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800 ${activeTab === 'leads' ? 'bg-slate-800' : ''}`}>
            <Users size={18} />
            <span>Leads</span>
          </button>
          <button onClick={() => onOpenChat?.()} className="w-full text-left flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800">
            <MessageCircle size={18} />
            <span>Chat</span>
          </button>
          <button onClick={() => setActiveTab?.('settings')} className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800 ${activeTab === 'settings' ? 'bg-slate-800' : ''}`}>
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-300">{(displayName || 'U')[0].toUpperCase()}</div>
          <div>
            <div className="text-sm font-medium">{displayName}</div>
            <div className="text-xs text-slate-400">Member</div>
          </div>
        </div>
        <button onClick={async () => { await signOut(); window.location.href = '/auth'; }} className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800 text-left">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
