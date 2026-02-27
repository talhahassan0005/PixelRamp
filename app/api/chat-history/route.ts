import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, collections } from '@/lib/db';
import { isNonEmptyString, sanitizeString } from '@/lib/validation';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, sessionId, role, content } = body;
    if (!isNonEmptyString(sessionId) || !isNonEmptyString(role) || !isNonEmptyString(content)) {
      return NextResponse.json({ error: 'Invalid input: sessionId, role and content are required' }, { status: 400 });
    }

    const db = await getDatabase();
    const message = {
      userId: sanitizeString(userId) || null,
      sessionId: sanitizeString(sessionId),
      role: sanitizeString(role),
      content: sanitizeString(content),
      timestamp: new Date()
    };

    await db.collection(collections.chatHistory).insertOne(message);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get('sessionId');
    if (!sessionId) return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });

    const db = await getDatabase();
    const messages = await db.collection(collections.chatHistory)
      .find({ sessionId: sanitizeString(sessionId) })
      .sort({ timestamp: 1 })
      .toArray();

    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
