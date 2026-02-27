import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, collections } from '@/lib/db';
import { isNonEmptyString, isEmail, sanitizeString } from '@/lib/validation';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, name, email, phone, tier, requirements, qualified } = body;
    if (!isNonEmptyString(name) || !isEmail(email) || !isNonEmptyString(tier)) {
      return NextResponse.json({ error: 'Invalid input: name, email and tier are required' }, { status: 400 });
    }

    const db = await getDatabase();
    const lead = {
      userId: sanitizeString(userId) || null,
      name: sanitizeString(name),
      email: sanitizeString(email),
      phone: sanitizeString(phone) || null,
      tier: sanitizeString(tier),
      requirements: sanitizeString(requirements) || null,
      qualified: !!qualified,
      status: 'new',
      createdAt: new Date()
    };

    const result = await db.collection(collections.leads).insertOne(lead);
    return NextResponse.json({ success: true, leadId: result.insertedId });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const db = await getDatabase();
    const status = req.nextUrl.searchParams.get('status');
    
    const query = status ? { status } : {};
    const leads = await db.collection(collections.leads)
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ leads });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
