'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bell, CreditCard, Zap, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ProjectTier } from '@/types';
import TierSelector from '@/components/TierSelector';
import Chatbot from '@/components/Chatbot';
import DashboardSidebar from '@/components/DashboardSidebar';
import Button from '@/components/ui/Button';
// replaced Section with native div wrapper to avoid JSX parse issue
import Sparkline from '@/components/ui/Sparkline';

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const [selectedTier, setSelectedTier] = useState(null as ProjectTier | null);
  const [showChat, setShowChat] = useState(false);
  const [projects, setProjects] = useState([] as { id: string; name: string; status: string; updated: string }[]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectsError, setProjectsError] = useState(null as string | null);
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
  const [showComingSoon, setShowComingSoon] = useState(null as null | 'billing' | 'accounting');
  const [leads, setLeads] = useState([] as { id: string; name: string; email: string }[]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadsError, setLeadsError] = useState(null as string | null);
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [profileTier, setProfileTier] = useState(null as string | null);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState(null as string | null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(null as string | null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newTier, setNewTier] = useState('');
  const [newBudget, setNewBudget] = useState('');
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null as string | null);
  const [activeTab, setActiveTab] = useState('overview');
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

  useEffect(() => {
    // fetch projects for current user
    if (!user) return;
    const fetchProjects = async () => {
      setProjectsLoading(true);
      setProjectsError(null);
      try {
        const res = await fetch(`/api/projects?userId=${(user as any)?._id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load projects');
        const p = (data.projects || []).map((pr: any) => ({
          id: String(pr._id || pr.id),
          name: pr.title || pr.name || 'Untitled',
          status: pr.status || 'unknown',
          updated: pr.updatedAt ? new Date(pr.updatedAt).toLocaleString() : (pr.createdAt ? new Date(pr.createdAt).toLocaleString() : '')
        }));
        setProjects(p);
      } catch (err: any) {
        setProjectsError(err.message || 'Error');
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  useEffect(() => {
    // fetch new leads (showing a few) for dashboard
    const fetchLeads = async () => {
      setLeadsLoading(true);
      setLeadsError(null);
      try {
        const res = await fetch('/api/leads?status=new');
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load leads');
        const list = (data.leads || []).slice(0, 5).map((L: any) => ({ id: String(L._id || L.id), name: L.name, email: L.email }));
        setLeads(list);
      } catch (err: any) {
        setLeadsError(err.message || 'Error');
      } finally {
        setLeadsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  useEffect(() => {
    // populate profile form from user
    if (!user) return;
    setProfileName((user as any)?.name || (user as any)?.user_metadata?.full_name || '');
    setProfileEmail((user as any)?.email || '');
    setProfileTier((user as any)?.tier || (user as any)?.user_metadata?.tier || null);
  }, [user]);

  const saveProfile = async () => {
    if (!profileName.trim()) { setProfileMessage('Name is required'); return; }
    if (!profileEmail.includes('@')) { setProfileMessage('Please enter a valid email'); return; }
    setProfileSaving(true);
    setProfileMessage(null);
    try {
      const userId = (user as any)?._id;
      if (!userId) throw new Error('User ID not found');
      const payload: any = { userId, email: profileEmail, name: profileName, tier: profileTier };

      const res = await fetch('/api/users', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save profile');
      setProfileMessage('Profile saved');
    } catch (err: any) {
      setProfileMessage(err.message || 'Save failed');
    } finally {
      setProfileSaving(false);
    }
  };

  const changePassword = async () => {
    if (!currentPassword) { setPasswordMessage('Current password is required'); return; }
    if (!newPassword || newPassword.length < 6) { setPasswordMessage('New password must be at least 6 characters'); return; }
    if (newPassword !== confirmPassword) { setPasswordMessage('Passwords do not match'); return; }
    setPasswordLoading(true);
    setPasswordMessage(null);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to change password');
      setPasswordMessage('Password changed successfully');
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
    } catch (err: any) {
      setPasswordMessage(err.message || 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
  };

  const createProject = async () => {
    setCreateError(null);
    if (!newTitle.trim()) { setCreateError('Title is required'); return; }
    if (!newDescription.trim()) { setCreateError('Description is required'); return; }
    setCreateLoading(true);
    try {
      const payload = { userId: (user as any)?._id || null, title: newTitle, description: newDescription, tier: newTier, budget: newBudget };
      const res = await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Create failed');
      setShowCreateModal(false);
      setNewTitle(''); setNewDescription(''); setNewTier(''); setNewBudget('');
      // refresh dashboard projects
      router.refresh();
    } catch (err: any) {
      setCreateError(err.message || 'Create failed');
    } finally {
      setCreateLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">Loading...</div>
    );
  }
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="flex">
        <DashboardSidebar onOpenChat={() => window.dispatchEvent(new CustomEvent('openChatbot'))} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 px-6 py-8">
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

              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-300">{(displayName || 'U')[0].toUpperCase()}</div>
            </div>
          </div>

          {activeTab === 'overview' && (
            <>
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
              {projectsLoading && <div className="text-sm text-slate-400">Loading projects...</div>}
              {projectsError && <div className="text-sm text-rose-400">{projectsError}</div>}
              {!projectsLoading && projects.length === 0 && (
                <div className="text-sm text-slate-400">You have no projects yet. Start by requesting a quote.</div>
              )}
              {projects.map(p => (
                <div key={p.id} className="flex items-center justify-between p-3 bg-slate-900/30 rounded">
                  <div className="w-3/4">
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-sm text-slate-400">{p.status} · Updated {p.updated}</p>
                    <div className="mt-2 bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div className="h-2 bg-emerald-500" style={{ width: `40%` }}></div>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Status: {p.status}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" onClick={() => router.push('/services')}>View</Button>
                    <Button onClick={() => window.dispatchEvent(new CustomEvent('openChatbot', { detail: { projectName: p.name } }))}>Chat</Button>
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
            <h3 className="text-lg font-semibold mb-3">New Leads</h3>
            <div className="space-y-3">
              {leadsLoading && <div className="text-sm text-slate-400">Loading leads...</div>}
              {leadsError && <div className="text-sm text-rose-400">{leadsError}</div>}
              {!leadsLoading && leads.length === 0 && <div className="text-sm text-slate-400">No new leads</div>}
              {leads.map(l => (
                <div key={l.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{l.name}</p>
                    <p className="text-xs text-slate-500">{l.email}</p>
                  </div>
                  <div>
                    <Button variant="ghost" onClick={() => router.push('/contact')}>View</Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
            </aside>
          </div>
            </>
          )}

          {activeTab === 'projects' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-slate-800 rounded-lg border border-slate-700">
              <h2 className="text-xl font-semibold mb-4">Projects</h2>
              <div className="space-y-3">
                {projectsLoading && <div className="text-sm text-slate-400">Loading projects...</div>}
                {projectsError && <div className="text-sm text-rose-400">{projectsError}</div>}
                {!projectsLoading && projects.length === 0 && (
                  <div className="text-sm text-slate-400">You have no projects yet. Start by requesting a quote.</div>
                )}
                {projects.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-3 bg-slate-900/30 rounded">
                    <div className="w-3/4">
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-sm text-slate-400">{p.status} · Updated {p.updated}</p>
                      <div className="mt-2 bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div className="h-2 bg-emerald-500" style={{ width: `40%` }}></div>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Status: {p.status}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" onClick={() => router.push('/services')}>View</Button>
                      <Button onClick={() => window.dispatchEvent(new CustomEvent('openChatbot', { detail: { projectName: p.name } }))}>Chat</Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'leads' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-slate-800 rounded-lg border border-slate-700">
              <h3 className="text-lg font-semibold mb-3">New Leads</h3>
              <div className="space-y-3">
                {leadsLoading && <div className="text-sm text-slate-400">Loading leads...</div>}
                {leadsError && <div className="text-sm text-rose-400">{leadsError}</div>}
                {!leadsLoading && leads.length === 0 && <div className="text-sm text-slate-400">No new leads</div>}
                {leads.map(l => (
                  <div key={l.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{l.name}</p>
                      <p className="text-xs text-slate-500">{l.email}</p>
                    </div>
                    <div>
                      <Button variant="ghost" onClick={() => router.push('/contact')}>View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-slate-800 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold mb-3">Profile Settings</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400">Name</label>
                    <input value={profileName} onChange={(e) => setProfileName(e.target.value)} className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">Email</label>
                    <input value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">Tier</label>
                    <input value={profileTier || ''} onChange={(e) => setProfileTier(e.target.value || null)} className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button onClick={saveProfile} disabled={profileSaving}>{profileSaving ? 'Saving...' : 'Save Profile'}</Button>
                    {profileMessage && <p className="text-sm text-slate-300">{profileMessage}</p>}
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-slate-800 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold mb-3">Change Password</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400">Current Password</label>
                    <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">New Password</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button onClick={changePassword} disabled={passwordLoading}>{passwordLoading ? 'Changing...' : 'Change Password'}</Button>
                    {passwordMessage && <p className="text-sm text-slate-300">{passwordMessage}</p>}
                  </div>
                </div>
              </motion.div>
            </div>
          )}

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

      {/* Create Project modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowCreateModal(false)} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-50 w-[min(90%,720px)] p-6 bg-slate-900 rounded-lg border border-slate-800 shadow-xl">
            <div className="flex items-start justify-between">
              <h3 className="text-2xl font-bold">Create Project</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400">Close</button>
            </div>
            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs text-slate-400">Title</label>
                <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded" />
              </div>
              <div>
                <label className="text-xs text-slate-400">Description</label>
                <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded h-32" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400">Tier</label>
                  <input value={newTier} onChange={(e) => setNewTier(e.target.value)} className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded" />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Budget</label>
                  <input value={newBudget} onChange={(e) => setNewBudget(e.target.value)} className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded" />
                </div>
              </div>
              {createError && <p className="text-rose-400">{createError}</p>}
              <div className="flex items-center gap-2 mt-3">
                <Button onClick={createProject} disabled={createLoading}>{createLoading ? 'Creating...' : 'Create'}</Button>
                <Button variant="ghost" onClick={() => setShowCreateModal(false)}>Cancel</Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
}
