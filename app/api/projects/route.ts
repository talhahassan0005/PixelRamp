import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, collections } from '@/lib/db';
import { isNonEmptyString, sanitizeString } from '@/lib/validation';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, title, description, tier, budget } = body;
    if (!isNonEmptyString(title) || !isNonEmptyString(description)) {
      return NextResponse.json({ error: 'Invalid input: title and description are required' }, { status: 400 });
    }

    const db = await getDatabase();
    const project = {
      userId: sanitizeString(userId) || null,
      title: sanitizeString(title),
      description: sanitizeString(description),
      tier: sanitizeString(tier) || null,
      budget: sanitizeString(budget) || null,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection(collections.projects).insertOne(project);
    return NextResponse.json({ success: true, projectId: result.insertedId });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId');
    if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });

    const db = await getDatabase();
    const projects = await db.collection(collections.projects)
      .find({ userId: sanitizeString(userId) })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
