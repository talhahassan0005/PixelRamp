'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bell, CreditCard, Zap, Clock, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProjectTier } from '@/types';
import TierSelector from '@/components/TierSelector';
import DashboardSidebar from '@/components/DashboardSidebar';
import Button from '@/components/ui/Button';
// replaced Section with native div wrapper to avoid JSX parse issue
import Sparkline from '@/components/ui/Sparkline';
import LanguageSelector from '@/components/LanguageSelector';
import CalendlyWidget from '@/components/CalendlyWidget';

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const { t } = useLanguage();
  const [selectedTier, setSelectedTier] = useState(null as ProjectTier | null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  
  const [projects, setProjects] = useState([] as { id: string; name: string; status: string; updated: string }[]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectsError, setProjectsError] = useState(null as string | null);
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
  const [activeTab, setActiveTab] = useState('dashboard');
  const [contactFormData, setContactFormData] = useState({ name: '', email: '', message: '', service: '', budget: '' });
  const [contactFormErrors, setContactFormErrors] = useState<Partial<typeof contactFormData>>({});
  const [contactFormLoading, setContactFormLoading] = useState(false);
  const [contactFormSuccess, setContactFormSuccess] = useState(false);
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

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactFormData.name.trim()) {
      setContactFormErrors({ ...contactFormErrors, name: 'Name is required' });
      return;
    }
    if (!contactFormData.email.trim()) {
      setContactFormErrors({ ...contactFormErrors, email: 'Email is required' });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(contactFormData.email)) {
      setContactFormErrors({ ...contactFormErrors, email: 'Email is invalid' });
      return;
    }
    if (!contactFormData.message.trim()) {
      setContactFormErrors({ ...contactFormErrors, message: 'Message is required' });
      return;
    }
    
    setContactFormLoading(true);
    setContactFormErrors({});
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactFormData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setContactFormErrors({ message: data.error || 'Failed to send message' });
        return;
      }
      
      setContactFormSuccess(true);
      setContactFormData({ name: '', email: '', message: '', service: '', budget: '' });
      setTimeout(() => setContactFormSuccess(false), 5000);
    } catch (error: any) {
      setContactFormErrors({ message: 'Failed to send message. Please try again.' });
    } finally {
      setContactFormLoading(false);
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
              <h1 className="text-3xl md:text-4xl font-bold">{t('welcome_back_user')}, <span className="text-blue-400">{displayName}</span></h1>
            </div>

            <div className="flex items-center gap-3 relative">
              <LanguageSelector />
              <div className="relative">
                <button 
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  {(displayName || 'U')[0].toUpperCase()}
                </button>
                {showProfileDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowProfileDropdown(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-50">
                      <button
                        onClick={() => { setActiveTab('settings'); setShowProfileDropdown(false); }}
                        className="w-full text-left px-4 py-3 hover:bg-slate-800 flex items-center gap-3 transition-colors first:rounded-t-lg"
                      >
                        <Settings size={16} />
                        {t('settings')}
                      </button>
                      <button
                        onClick={async () => { await signOut(); window.location.href = '/auth'; }}
                        className="w-full text-left px-4 py-3 hover:bg-slate-800 flex items-center gap-3 transition-colors last:rounded-b-lg text-red-400 hover:text-red-300"
                      >
                        <LogOut size={16} />
                        {t('logout')}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {activeTab === 'dashboard' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl">
              <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="p-6 bg-gradient-to-br from-blue-600/20 to-blue-600/5 rounded-lg border border-blue-600/30">
                  <p className="text-sm text-slate-400 mb-2">Active Services</p>
                  <p className="text-3xl font-bold text-blue-400">6</p>
                  <p className="text-xs text-slate-500 mt-2">Professional services available</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-green-600/20 to-green-600/5 rounded-lg border border-green-600/30">
                  <p className="text-sm text-slate-400 mb-2">Client Satisfaction</p>
                  <p className="text-3xl font-bold text-green-400">98%</p>
                  <p className="text-xs text-slate-500 mt-2">Based on client feedback</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-600/20 to-purple-600/5 rounded-lg border border-purple-600/30">
                  <p className="text-sm text-slate-400 mb-2">Projects Completed</p>
                  <p className="text-3xl font-bold text-purple-400">250+</p>
                  <p className="text-xs text-slate-500 mt-2">Successfully delivered</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-orange-600/20 to-orange-600/5 rounded-lg border border-orange-600/30">
                  <p className="text-sm text-slate-400 mb-2">Team Members</p>
                  <p className="text-3xl font-bold text-orange-400">45+</p>
                  <p className="text-xs text-slate-500 mt-2">Expert professionals</p>
                </div>
              </div>

              {/* Features Section */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-semibold mb-4">Why Choose PixelRamp?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">✓</span>
                      <div>
                        <p className="font-medium">Expert Team</p>
                        <p className="text-sm text-slate-400">Experienced developers and designers</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">✓</span>
                      <div>
                        <p className="font-medium">Custom Solutions</p>
                        <p className="text-sm text-slate-400">Tailored to your specific needs</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">✓</span>
                      <div>
                        <p className="font-medium">On-Time Delivery</p>
                        <p className="text-sm text-slate-400">Always meet project deadlines</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">✓</span>
                      <div>
                        <p className="font-medium">24/7 Support</p>
                        <p className="text-sm text-slate-400">Round-the-clock customer support</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-semibold mb-4">Our Process</h3>
                  <ol className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 font-bold bg-blue-600/20 w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">1</span>
                      <div>
                        <p className="font-medium">Discovery</p>
                        <p className="text-sm text-slate-400">Understand your requirements</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 font-bold bg-blue-600/20 w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">2</span>
                      <div>
                        <p className="font-medium">Planning</p>
                        <p className="text-sm text-slate-400">Create detailed project plan</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 font-bold bg-blue-600/20 w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">3</span>
                      <div>
                        <p className="font-medium">Development</p>
                        <p className="text-sm text-slate-400">Build your solution</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 font-bold bg-blue-600/20 w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">4</span>
                      <div>
                        <p className="font-medium">Launch & Support</p>
                        <p className="text-sm text-slate-400">Deploy and provide ongoing support</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>

              {/* Technology Stack */}
              <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
                <h3 className="text-xl font-semibold mb-4">Technologies We Use</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-900/50 rounded border border-slate-700 text-center">
                    <p className="font-medium">React/Next.js</p>
                    <p className="text-xs text-slate-400 mt-1">Frontend</p>
                  </div>
                  <div className="p-4 bg-slate-900/50 rounded border border-slate-700 text-center">
                    <p className="font-medium">Node.js</p>
                    <p className="text-xs text-slate-400 mt-1">Backend</p>
                  </div>
                  <div className="p-4 bg-slate-900/50 rounded border border-slate-700 text-center">
                    <p className="font-medium">MongoDB</p>
                    <p className="text-xs text-slate-400 mt-1">Database</p>
                  </div>
                  <div className="p-4 bg-slate-900/50 rounded border border-slate-700 text-center">
                    <p className="font-medium">AWS/Cloud</p>
                    <p className="text-xs text-slate-400 mt-1">Infrastructure</p>
                  </div>
                  <div className="p-4 bg-slate-900/50 rounded border border-slate-700 text-center">
                    <p className="font-medium">TypeScript</p>
                    <p className="text-xs text-slate-400 mt-1">Language</p>
                  </div>
                  <div className="p-4 bg-slate-900/50 rounded border border-slate-700 text-center">
                    <p className="font-medium">Tailwind CSS</p>
                    <p className="text-xs text-slate-400 mt-1">Styling</p>
                  </div>
                  <div className="p-4 bg-slate-900/50 rounded border border-slate-700 text-center">
                    <p className="font-medium">Docker</p>
                    <p className="text-xs text-slate-400 mt-1">Deployment</p>
                  </div>
                  <div className="p-4 bg-slate-900/50 rounded border border-slate-700 text-center">
                    <p className="font-medium">GraphQL</p>
                    <p className="text-xs text-slate-400 mt-1">API</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'services' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
              <h2 className="text-3xl font-bold mb-8">{t('services')}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Web Development */}
                <div className="p-6 bg-slate-800 rounded-lg border border-slate-700 hover:border-blue-600 transition-colors">
                  <h3 className="text-xl font-semibold mb-2">Web Development</h3>
                  <p className="text-slate-400 text-sm mb-4">Custom websites and web applications tailored to your needs</p>
                  <div className="space-y-2 mb-4">
                    <div className="text-sm"><span className="text-slate-400">Starter:</span> <span className="text-blue-400">£300-£500</span></div>
                    <div className="text-sm"><span className="text-slate-400">Business:</span> <span className="text-blue-400">£1,199-£2,000</span></div>
                    <div className="text-sm"><span className="text-slate-400">Enterprise:</span> <span className="text-blue-400">£2,200+</span></div>
                  </div>
                  <Button onClick={() => setActiveTab('contact')} className="w-full mt-4">Get Quote</Button>
                </div>

                {/* Graphics & Design */}
                <div className="p-6 bg-slate-800 rounded-lg border border-slate-700 hover:border-purple-600 transition-colors">
                  <h3 className="text-xl font-semibold mb-2">Graphics & Design</h3>
                  <p className="text-slate-400 text-sm mb-4">Professional branding and design services</p>
                  <div className="space-y-2 mb-4">
                    <div className="text-sm"><span className="text-slate-400">Essential:</span> <span className="text-purple-400">£149-£200</span></div>
                    <div className="text-sm"><span className="text-slate-400">Corporate:</span> <span className="text-purple-400">£299-£400</span></div>
                    <div className="text-sm"><span className="text-slate-400">Elite:</span> <span className="text-purple-400">£600-£1,000</span></div>
                  </div>
                  <Button onClick={() => setActiveTab('contact')} className="w-full mt-4" variant="secondary">Get Quote</Button>
                </div>

                {/* SaaS Solutions */}
                <div className="p-6 bg-slate-800 rounded-lg border border-slate-700 hover:border-green-600 transition-colors">
                  <h3 className="text-xl font-semibold mb-2">SaaS Solutions</h3>
                  <p className="text-slate-400 text-sm mb-4">Build and scale your software as a service</p>
                  <div className="space-y-2 mb-4">
                    <div className="text-sm"><span className="text-slate-400">MVP:</span> <span className="text-green-400">£1,500-£2,000</span></div>
                    <div className="text-sm"><span className="text-slate-400">Scale-Up:</span> <span className="text-green-400">£2,300-£3,000</span></div>
                    <div className="text-sm"><span className="text-slate-400">Enterprise:</span> <span className="text-green-400">£3,000+</span></div>
                  </div>
                  <Button onClick={() => setActiveTab('contact')} className="w-full mt-4">Get Quote</Button>
                </div>

                {/* Mobile Apps */}
                <div className="p-6 bg-slate-800 rounded-lg border border-slate-700 hover:border-orange-600 transition-colors">
                  <h3 className="text-xl font-semibold mb-2">Mobile Apps</h3>
                  <p className="text-slate-400 text-sm mb-4">Native and cross-platform mobile applications</p>
                  <div className="space-y-2 mb-4">
                    <div className="text-sm"><span className="text-slate-400">Basic:</span> <span className="text-orange-400">£500-£700</span></div>
                    <div className="text-sm"><span className="text-slate-400">Pro:</span> <span className="text-orange-400">£999-£1,500</span></div>
                    <div className="text-sm"><span className="text-slate-400">Advanced:</span> <span className="text-orange-400">£2,000+</span></div>
                  </div>
                  <Button onClick={() => setActiveTab('contact')} className="w-full mt-4" variant="secondary">Get Quote</Button>
                </div>

                {/* E-commerce */}
                <div className="p-6 bg-slate-800 rounded-lg border border-slate-700 hover:border-pink-600 transition-colors">
                  <h3 className="text-xl font-semibold mb-2">E-commerce</h3>
                  <p className="text-slate-400 text-sm mb-4">Online stores and marketplace solutions</p>
                  <div className="space-y-2 mb-4">
                    <div className="text-sm"><span className="text-slate-400">Startup:</span> <span className="text-pink-400">£800-£1,200</span></div>
                    <div className="text-sm"><span className="text-slate-400">Growth:</span> <span className="text-pink-400">£1,500-£2,500</span></div>
                    <div className="text-sm"><span className="text-slate-400">Enterprise:</span> <span className="text-pink-400">£3,000+</span></div>
                  </div>
                  <Button onClick={() => setActiveTab('contact')} className="w-full mt-4">Get Quote</Button>
                </div>

                {/* Consulting */}
                <div className="p-6 bg-slate-800 rounded-lg border border-slate-700 hover:border-cyan-600 transition-colors">
                  <h3 className="text-xl font-semibold mb-2">Consulting</h3>
                  <p className="text-slate-400 text-sm mb-4">Expert advice and strategic planning</p>
                  <div className="space-y-2 mb-4">
                    <div className="text-sm"><span className="text-slate-400">Hourly:</span> <span className="text-cyan-400">£100-£150</span></div>
                    <div className="text-sm"><span className="text-slate-400">Daily:</span> <span className="text-cyan-400">£800-£1,200</span></div>
                    <div className="text-sm"><span className="text-slate-400">Project:</span> <span className="text-cyan-400">Custom Quote</span></div>
                  </div>
                  <Button onClick={() => setActiveTab('contact')} className="w-full mt-4" variant="secondary">Get Quote</Button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'overview' && (
            <>
          {/* Overview stats */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
              <p className="text-sm text-slate-400">{t('active_projects')}</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">{projects.length || 3}</p>
                <Sparkline data={[5, 9, 7, 12, 10, 14, 13]} />
              </div>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
              <p className="text-sm text-slate-400">{t('open_tickets')}</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">{2}</p>
                <Sparkline data={[2, 3, 2, 4, 1, 2]} stroke="#34d399" fill="rgba(52,211,153,0.08)" />
              </div>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
              <p className="text-sm text-slate-400">{t('monthly_spend')}</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">£{monthlySpend}</p>
                <Sparkline data={[400, 500, 450, 600, 520, 480]} stroke="#f97316" fill="rgba(249,115,22,0.08)" />
              </div>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
              <p className="text-sm text-slate-400">{t('support_level')}</p>
              <p className="text-2xl font-bold">Standard</p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-slate-800 rounded-lg border border-slate-700">
            <h2 className="text-xl font-semibold mb-4">{t('projects')}</h2>
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
            <h2 className="text-xl font-semibold mb-4">{t('recent_activity')}</h2>
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
            <h3 className="text-lg font-semibold mb-3">{t('quick_actions')}</h3>
            <div className="flex flex-col gap-3">
              <Button onClick={() => router.push('/contact')} className="w-full flex items-center justify-center gap-2"><CreditCard className="text-slate-200" /> {t('request_quote')}</Button>
              <Button variant="secondary" onClick={() => router.push('/contact')} className="w-full flex items-center justify-center gap-2"><Zap className="text-slate-200" /> {t('manage_billing')}</Button>
              <Button variant="ghost" onClick={() => router.push('/auth')} className="w-full flex items-center justify-center gap-2"><Clock className="text-slate-200" /> {t('account_settings')}</Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-slate-800 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold mb-3">{t('billing')}</h3>
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
            <h3 className="text-lg font-semibold mb-3">{t('new_leads')}</h3>
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
              <h2 className="text-xl font-semibold mb-4">{t('projects')}</h2>
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
              <h3 className="text-lg font-semibold mb-3">{t('new_leads')}</h3>
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

          {activeTab === 'contact' && (
            <div className="max-w-4xl">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* CalendlyWidget Section */}
                <div className="p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-600/30">
                  <h3 className="text-xl font-bold mb-2">Schedule a Meeting</h3>
                  <p className="text-slate-300 mb-4">Book a 30-minute consultation to discuss your project</p>
                  <CalendlyWidget buttonText="Book Free Consultation" className="w-full justify-center" />
                </div>

                {/* Contact Form Section */}
                <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-semibold mb-4">{t('send_message')}</h3>
                  
                  {contactFormSuccess && (
                    <div className="p-4 bg-green-600/20 border border-green-600/50 rounded-lg text-green-400 mb-4">
                      <p>Message sent successfully! We'll get back to you soon.</p>
                    </div>
                  )}

                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs text-slate-400">{t('name')}</label>
                      <input 
                        type="text"
                        value={contactFormData.name} 
                        onChange={(e) => setContactFormData({ ...contactFormData, name: e.target.value })}
                        className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded"
                        placeholder="Your name"
                      />
                      {contactFormErrors.name && <p className="text-xs text-rose-400 mt-1">{contactFormErrors.name}</p>}
                    </div>

                    <div>
                      <label className="text-xs text-slate-400">{t('email')}</label>
                      <input 
                        type="email"
                        value={contactFormData.email} 
                        onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
                        className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded"
                        placeholder="your@email.com"
                      />
                      {contactFormErrors.email && <p className="text-xs text-rose-400 mt-1">{contactFormErrors.email}</p>}
                    </div>

                    <div>
                      <label className="text-xs text-slate-400">Service</label>
                      <input 
                        type="text"
                        value={contactFormData.service} 
                        onChange={(e) => setContactFormData({ ...contactFormData, service: e.target.value })}
                        className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded"
                        placeholder="e.g., Web Design, Development"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-400">Budget</label>
                      <input 
                        type="text"
                        value={contactFormData.budget} 
                        onChange={(e) => setContactFormData({ ...contactFormData, budget: e.target.value })}
                        className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded"
                        placeholder="e.g., £5,000"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-400">{t('message')}</label>
                      <textarea 
                        value={contactFormData.message} 
                        onChange={(e) => setContactFormData({ ...contactFormData, message: e.target.value })}
                        className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded h-32"
                        placeholder="Tell us about your project..."
                      />
                      {contactFormErrors.message && <p className="text-xs text-rose-400 mt-1">{contactFormErrors.message}</p>}
                    </div>

                    {contactFormErrors.message && !contactFormErrors.name && !contactFormErrors.email && (
                      <p className="text-sm text-rose-400">{contactFormErrors.message}</p>
                    )}

                    <Button onClick={handleContactSubmit} disabled={contactFormLoading} className="w-full">
                      {contactFormLoading ? 'Sending...' : t('send_message')}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-slate-800 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold mb-3">{t('profile_settings')}</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400">{t('name')}</label>
                    <input value={profileName} onChange={(e) => setProfileName(e.target.value)} className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">{t('email')}</label>
                    <input value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">{t('tier')}</label>
                    <input value={profileTier || ''} onChange={(e) => setProfileTier(e.target.value || null)} className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button onClick={saveProfile} disabled={profileSaving}>{profileSaving ? 'Saving...' : t('save_profile')}</Button>
                    {profileMessage && <p className="text-sm text-slate-300">{profileMessage}</p>}
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-slate-800 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold mb-3">{t('change_password')}</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400">{t('current_password')}</label>
                    <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">{t('new_password')}</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">{t('confirm_password')}</label>
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
