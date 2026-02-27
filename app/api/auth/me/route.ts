import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ user: null });

    const secret = process.env.JWT_SECRET || '';
    try {
      const payload = jwt.verify(token, secret) as any;
      return NextResponse.json({ user: payload.user || null });
    } catch (err) {
      return NextResponse.json({ user: null });
    }
  } catch (err) {
    console.error('Me error', err);
    return NextResponse.json({ user: null });
  }
}
