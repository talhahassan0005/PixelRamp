import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, collections } from '@/lib/db';
import { isEmail, isNonEmptyString, sanitizeString } from '@/lib/validation';
// @ts-ignore
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, phone } = await req.json();
    if (!isEmail(email) || !isNonEmptyString(password) || !isNonEmptyString(phone)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const db = await getDatabase();
    const existing = await db.collection(collections.users).findOne({ email: sanitizeString(email) });
    if (existing) return NextResponse.json({ error: 'User already exists' }, { status: 409 });

    const hashed = bcrypt.hashSync(password, 10);
    const user = {
      email: sanitizeString(email),
      name: sanitizeString(name) || null,
      phone: sanitizeString(phone),
      password: hashed,
      createdAt: new Date(),
    };

    const result = await db.collection(collections.users).insertOne(user);
    const inserted = await db.collection(collections.users).findOne({ _id: result.insertedId });
    if (!inserted) return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });

    // Don't return password
    const safeUser = { _id: inserted._id.toString(), email: inserted.email, name: inserted.name, phone: inserted.phone };
    const token = jwt.sign({ user: safeUser }, process.env.JWT_SECRET || '');
    const res = NextResponse.json({ user: safeUser });
    res.cookies.set('token', token, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 });
    return res;
  } catch (err) {
    console.error('Signup error', err);
    // Detect common MongoDB authentication errors and return a clearer message
    const message = (err && (err as any).message) || '';
    if (message.toLowerCase().includes('bad auth') || message.toLowerCase().includes('authentication failed')) {
      return NextResponse.json({ error: 'Database authentication failed. Check MONGODB_URI credentials in .env.local' }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
