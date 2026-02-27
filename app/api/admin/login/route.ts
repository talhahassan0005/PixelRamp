import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, collections } from '@/lib/db';
import { sanitizeString, isNonEmptyString } from '@/lib/validation';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    // Prefer checking environment admin credentials first
    const envEmail = process.env.ADMIN_EMAIL;
    const envPassword = process.env.ADMIN_PASSWORD;
    if (envEmail && envPassword) {
      if (sanitizeString(email) === envEmail && sanitizeString(password) === envPassword) {
        return NextResponse.json({ admin: { email: envEmail, role: 'admin' } });
      }
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Fallback: check admins collection in MongoDB
    const db = await getDatabase();
    const admin = await db.collection(collections.admins).findOne({ email: sanitizeString(email) });
    if (!admin) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    // Very basic password check (assumes stored in plain-text - replace with proper hashing)
    if (admin.password && admin.password === password) {
      return NextResponse.json({ admin: { email: admin.email, role: 'admin' } });
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (err) {
    console.error('Admin login error', err);
    return NextResponse.json({ error: 'Failed to process login' }, { status: 500 });
  }
}
