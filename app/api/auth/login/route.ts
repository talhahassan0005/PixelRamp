import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, collections } from '@/lib/db';
import { isEmail, isNonEmptyString, sanitizeString } from '@/lib/validation';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!isEmail(email) || !isNonEmptyString(password)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const db = await getDatabase();
    const user = await db.collection(collections.users).findOne({ email: sanitizeString(email) });
    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const match = user.password ? bcrypt.compareSync(password, user.password) : false;
    if (!match) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const safeUser = { _id: user._id.toString(), email: user.email, name: user.name };
    const token = jwt.sign({ user: safeUser }, process.env.JWT_SECRET || '');
    const res = NextResponse.json({ user: safeUser });
    res.cookies.set('token', token, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 });
    return res;
  } catch (err) {
    console.error('Login error', err);
    return NextResponse.json({ error: 'Failed to login' }, { status: 500 });
  }
}
