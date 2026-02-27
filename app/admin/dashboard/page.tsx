'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Section from '@/components/ui/Section';

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [stats, setStats] = useState({ totalUsers: 0, totalProjects: 0, totalLeads: 0, newLeads: 0 });
  const [leads, setLeads] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const adminData = localStorage.getItem('admin');
    if (!adminData) {
      router.push('/auth');
      return;
    }
    setAdmin(JSON.parse(adminData));

    fetch('/api/admin/stats').then(r => r.json()).then(setStats);
    fetch('/api/leads').then(r => r.json()).then(d => setLeads(d.leads));
    fetch('/api/projects').then(r => r.json()).then(d => setProjects(d.projects));
  }, [router]);

  const logout = () => {
    localStorage.removeItem('admin');
    router.push('/auth');
  };

  if (!admin) return null;

  return (
    <Section className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <button onClick={logout} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">
            Logout
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-slate-400 mb-2">Total Users</h3>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-slate-400 mb-2">Total Projects</h3>
            <p className="text-3xl font-bold">{stats.totalProjects}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-slate-400 mb-2">Total Leads</h3>
            <p className="text-3xl font-bold">{stats.totalLeads}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-slate-400 mb-2">New Leads</h3>
            <p className="text-3xl font-bold text-green-500">{stats.newLeads}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h2 className="text-2xl font-bold mb-4">Recent Leads</h2>
            <div className="space-y-3">
              {leads.slice(0, 5).map((lead: any) => (
                <div key={lead._id} className="bg-slate-900 p-4 rounded">
                  <p className="font-semibold">{lead.name}</p>
                  <p className="text-sm text-slate-400">{lead.email}</p>
                  <p className="text-xs text-slate-500 mt-1">Tier: {lead.tier} | Status: {lead.status}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h2 className="text-2xl font-bold mb-4">Recent Projects</h2>
            <div className="space-y-3">
              {projects.slice(0, 5).map((project: any) => (
                <div key={project._id} className="bg-slate-900 p-4 rounded">
                  <p className="font-semibold">{project.title}</p>
                  <p className="text-sm text-slate-400">{project.description?.substring(0, 50)}...</p>
                  <p className="text-xs text-slate-500 mt-1">Tier: {project.tier} | Status: {project.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
