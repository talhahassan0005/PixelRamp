import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const res = NextResponse.json({ success: true });
    res.cookies.set('token', '', { httpOnly: true, path: '/', maxAge: 0 });
    return res;
  } catch (err) {
    console.error('Logout error', err);
    return NextResponse.json({ error: 'Failed to logout' }, { status: 500 });
  }
}
