import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, collections } from '@/lib/db';
import { isNonEmptyString, isEmail, sanitizeString } from '@/lib/validation';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, supabaseId, tier } = body;
    if (!isNonEmptyString(supabaseId) || !isEmail(email)) {
      return NextResponse.json({ error: 'Invalid input: supabaseId and valid email are required' }, { status: 400 });
    }

    const db = await getDatabase();
    const result = await db.collection(collections.users).updateOne(
      { supabaseId: sanitizeString(supabaseId) },
      {
        $set: { email: sanitizeString(email), name: sanitizeString(name) || null, tier: sanitizeString(tier) || null, updatedAt: new Date() },
        $setOnInsert: { createdAt: new Date() }
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true, userId: result.upsertedId || null });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save user' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabaseId = req.nextUrl.searchParams.get('supabaseId');
    if (!supabaseId) return NextResponse.json({ error: 'Missing supabaseId' }, { status: 400 });

    const db = await getDatabase();
    const user = await db.collection(collections.users).findOne({ supabaseId: sanitizeString(supabaseId) });

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, supabaseId, email, name, tier } = body;
    if (!userId && !supabaseId) return NextResponse.json({ error: 'Missing user identifier' }, { status: 400 });

    const update: any = {};
    if (email) update.email = sanitizeString(email);
    if (name) update.name = sanitizeString(name);
    if (tier) update.tier = sanitizeString(tier);
    if (Object.keys(update).length === 0) return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
    update.updatedAt = new Date();

    const db = await getDatabase();
    const filter = userId ? { _id: sanitizeString(userId) } : { supabaseId: sanitizeString(supabaseId) };
    const result = await db.collection(collections.users).updateOne(filter, { $set: update });
    if (result.matchedCount === 0) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
