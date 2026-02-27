import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, collections } from '@/lib/db';
import { sanitizeString } from '@/lib/validation';

export async function GET(req: NextRequest) {
  try {
    // Very small auth check: require simple token or local admin flag in query for dev
    const token = req.nextUrl.searchParams.get('token') || process.env.ADMIN_STATS_TOKEN;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const db = await getDatabase();
    const totalUsers = await db.collection(collections.users).countDocuments();
    const totalProjects = await db.collection(collections.projects).countDocuments();
    const totalLeads = await db.collection(collections.leads).countDocuments();
    const newLeads = await db.collection(collections.leads).countDocuments({ status: 'new' });

    return NextResponse.json({ totalUsers, totalProjects, totalLeads, newLeads });
  } catch (err) {
    console.error('Admin stats error', err);
    return NextResponse.json({ error: 'Failed to load stats' }, { status: 500 });
  }
}
