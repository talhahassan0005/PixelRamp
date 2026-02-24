'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bell, CreditCard, Zap, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ProjectTier } from '@/types';
import TierSelector from '@/components/TierSelector';
import Chatbot from '@/components/Chatbot';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import Sparkline from '@/components/ui/Sparkline';

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const [selectedTier, setSelectedTier] = useState<ProjectTier | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [projects, setProjects] = useState<Array<{ id: string; name: string; status: string; updated: string }>>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 'n1', text: 'Invoice #102 is due in 3 days', time: '3d' },
    { id: 'n2', text: 'New message from Project Lead', time: '1d' },
    { id: 'n3', text: 'Deployment succeeded for Website Refresh', time: '2h' },
  ]);
  const [invoices] = useState([
    { id: 'inv1', name: 'Invoice #101', amount: '£420', status: 'Due' },
    { id: 'inv2', name: 'Invoice #100', amount: '£1,200', status: 'Paid' },
  ]);
  const [activities] = useState([
    { id: 'a1', title: 'Commit pushed to repo', time: '2 hours ago' },
    { id: 'a2', title: 'Client uploaded assets', time: '1 day ago' },
  ]);
  const [showComingSoon, setShowComingSoon] = useState<null | 'billing' | 'accounting'>(null);
  const router = useRouter();
  const displayName = user?.email
    ? user.email.split('@')[0]
    : ((user as any)?.user_metadata?.full_name ?? (user as any)?.name ?? 'User');
  const monthlySpend = (user as any)?.user_metadata?.monthly_spend ?? (user as any)?.metadata?.monthly_spend ?? '0';

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return null;

  return (
    <Section className="min-h-screen">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Welcome back, <span className="text-blue-400">{displayName}</span></h1>
          <p className="text-slate-400 mt-2">Overview of your projects, billing and quick actions</p>
        </div>

        <div className="flex items-center gap-3 relative">
          <button aria-label="Notifications" onClick={() => setShowNotifications(s => !s)} className="relative p-2 rounded hover:bg-slate-800/50">
            <Bell className="text-slate-300" />
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full px-1">{notifications.length}</span>
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-12 w-80 bg-slate-900 border border-slate-800 rounded shadow-lg z-50">
              <div className="p-3 border-b border-slate-800">
                <p className="font-semibold">Notifications</p>
              </div>
              <div className="p-3 space-y-2">
                {notifications.map(n => (
                  <div key={n.id} className="text-sm text-slate-300">
                    <p>{n.text}</p>
                    <p className="text-xs text-slate-500">{n.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-slate-800 text-center">
                <button className="text-sm text-blue-400">View all</button>
              </div>
            </div>
          )}

          <Button onClick={() => router.push('/contact')} className="hidden sm:inline-flex">Get Support</Button>
          <Button onClick={signOut} variant="secondary">Logout</Button>
        </div>
      </div>

      {/* Overview stats */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
          <p className="text-sm text-slate-400">Active Projects</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">{projects.length || 3}</p>
            <Sparkline data={[5, 9, 7, 12, 10, 14, 13]} />
          </div>
        </div>
        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
          <p className="text-sm text-slate-400">Open Tickets</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">{2}</p>
            <Sparkline data={[2, 3, 2, 4, 1, 2]} stroke="#34d399" fill="rgba(52,211,153,0.08)" />
          </div>
        </div>
        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
          <p className="text-sm text-slate-400">Monthly Spend</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">£{monthlySpend}</p>
            <Sparkline data={[400, 500, 450, 600, 520, 480]} stroke="#f97316" fill="rgba(249,115,22,0.08)" />
          </div>
        </div>
        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
          <p className="text-sm text-slate-400">Support Level</p>
          <p className="text-2xl font-bold">Standard</p>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-slate-800 rounded-lg border border-slate-700">
            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            <div className="space-y-3">
              {/* Placeholder recent projects */}
              {[{ id: 'p1', name: 'Website Refresh', status: 'In Progress', updated: '2 days ago', progress: 62 }, { id: 'p2', name: 'Mobile MVP', status: 'Planning', updated: '1 week ago', progress: 12 }].map(p => (
                <div key={p.id} className="flex items-center justify-between p-3 bg-slate-900/30 rounded">
                  <div className="w-3/4">
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-sm text-slate-400">{p.status} · Updated {p.updated}</p>
                    <div className="mt-2 bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div className="h-2 bg-emerald-500" style={{ width: `${p.progress}%` }}></div>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Progress: {p.progress}%</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" onClick={() => router.push('/services')}>View</Button>
                    <Button onClick={() => setShowChat(true)}>Chat</Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-slate-800 rounded-lg border border-slate-700">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {activities.map(a => (
                <div key={a.id} className="text-sm text-slate-300">
                  <p className="font-medium">{a.title}</p>
                  <p className="text-xs text-slate-500">{a.time}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <aside className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-slate-800 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
            <div className="flex flex-col gap-3">
              <Button onClick={() => router.push('/contact')} className="w-full flex items-center justify-center gap-2"><CreditCard className="text-slate-200" /> Request Quote</Button>
              <Button variant="secondary" onClick={() => router.push('/contact')} className="w-full flex items-center justify-center gap-2"><Zap className="text-slate-200" /> Manage Billing</Button>
              <Button variant="ghost" onClick={() => router.push('/auth')} className="w-full flex items-center justify-center gap-2"><Clock className="text-slate-200" /> Account Settings</Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-slate-800 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold mb-3">Billing</h3>
            <div className="space-y-3">
              {invoices.map(inv => (
                <div key={inv.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{inv.name}</p>
                    <p className="text-xs text-slate-500">{inv.status}</p>
                  </div>
                  <div className="text-sm text-slate-200">{inv.amount}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Button className="flex-1" onClick={() => setShowComingSoon('billing')}>View Billing</Button>
              <Button variant="secondary" onClick={() => setShowComingSoon('accounting')}>Open Accounting</Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-slate-800 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold mb-3">AI Assistant</h3>
            <div>
              <Chatbot />
            </div>
          </motion.div>
        </aside>
      </div>
      {/* Coming Soon modal */}
      {showComingSoon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowComingSoon(null)} />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }} className="relative z-50 w-[min(90%,520px)] p-6 bg-slate-900 rounded-lg border border-slate-800 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600/10 rounded flex items-center justify-center">
                <CreditCard className="text-blue-400" />
              </div>
              <div className="flex-1">
                <motion.h3 initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-2xl font-bold">{showComingSoon === 'billing' ? 'Billing' : 'Accounting'} — Coming Soon</motion.h3>
                <motion.p initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-slate-400 mt-2">We're working on adding full {showComingSoon === 'billing' ? 'billing and invoice management' : 'accounting and reports'} inside your dashboard. Stay tuned — this feature will be available shortly.</motion.p>
                <div className="mt-4 flex items-center gap-3">
                  <Button onClick={() => setShowComingSoon(null)}>Okay</Button>
                  <Button variant="ghost" onClick={() => { setShowComingSoon(null); router.push('/contact'); }}>Contact Support</Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </Section>
  );
}
