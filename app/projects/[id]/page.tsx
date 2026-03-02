"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import DashboardSidebar from '@/components/DashboardSidebar';

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [project, setProject] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [tier, setTier] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/projects/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load');
        setProject(data.project);
        setTitle(data.project?.title || '');
        setDescription(data.project?.description || '');
        setStatus(data.project?.status || '');
        setTier(data.project?.tier || '');
      } catch (err: any) {
        setError(err.message || 'Error');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const validate = () => {
    if (!title.trim()) return 'Title is required';
    if (!description.trim()) return 'Description is required';
    return null;
  };

  const save = async () => {
    const v = validate();
    if (v) return setError(v);
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, status, tier }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!confirm('Delete this project? This action cannot be undone.')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed');
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Delete failed');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-rose-400">{error}</div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center">Project not found</div>;

  return (
    <Section className="min-h-screen">
      <div className="flex">
        <DashboardSidebar onOpenChat={() => window.dispatchEvent(new CustomEvent('openChatbot'))} />
        <div className="flex-1 max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Edit Project</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => router.push('/dashboard')}>Back</Button>
            <Button variant="secondary" onClick={remove}>Delete</Button>
          </div>
        </div>

        <div className="p-6 bg-slate-800 rounded border border-slate-700">
          <label className="text-xs text-slate-400">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mt-2 p-2 bg-slate-900 border border-slate-700 rounded" />

          <label className="text-xs text-slate-400 mt-4 block">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full mt-2 p-2 bg-slate-900 border border-slate-700 rounded h-36" />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-xs text-slate-400">Status</label>
              <input value={status} onChange={(e) => setStatus(e.target.value)} className="w-full mt-2 p-2 bg-slate-900 border border-slate-700 rounded" />
            </div>
            <div>
              <label className="text-xs text-slate-400">Tier</label>
              <input value={tier} onChange={(e) => setTier(e.target.value)} className="w-full mt-2 p-2 bg-slate-900 border border-slate-700 rounded" />
            </div>
          </div>

          {error && <p className="text-rose-400 mt-3">{error}</p>}

          <div className="mt-4 flex gap-2">
            <Button onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
            <Button variant="ghost" onClick={() => router.push('/dashboard')}>Cancel</Button>
          </div>
        </div>
      </div>
      </div>
    </Section>
  );
}
