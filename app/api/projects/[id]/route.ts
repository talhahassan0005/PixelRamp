import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, collections } from '@/lib/db';
import { sanitizeString, isNonEmptyString } from '@/lib/validation';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;
    const parts = pathname.split('/');
    const id = parts[parts.length - 1];
    if (!isNonEmptyString(id)) return NextResponse.json({ error: 'Missing project id' }, { status: 400 });

    const db = await getDatabase();
    const proj = await db.collection(collections.projects).findOne({ _id: new ObjectId(id) });
    return NextResponse.json({ project: proj });
  } catch (err) {
    console.error('Project details error', err);
    return NextResponse.json({ error: 'Failed to load project' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;
    const parts = pathname.split('/');
    const id = parts[parts.length - 1];
    if (!isNonEmptyString(id)) return NextResponse.json({ error: 'Missing project id' }, { status: 400 });

    const body = await req.json();
    const update: any = {};
    if (body.title) update.title = sanitizeString(body.title);
    if (body.description) update.description = sanitizeString(body.description);
    if (body.status) update.status = sanitizeString(body.status);
    if (body.tier) update.tier = sanitizeString(body.tier);
    if (Object.keys(update).length === 0) return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });

    update.updatedAt = new Date();

    const db = await getDatabase();
    const result = await db.collection(collections.projects).updateOne({ _id: new ObjectId(id) }, { $set: update });
    if (result.matchedCount === 0) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Project update error', err);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;
    const parts = pathname.split('/');
    const id = parts[parts.length - 1];
    if (!isNonEmptyString(id)) return NextResponse.json({ error: 'Missing project id' }, { status: 400 });

    const db = await getDatabase();
    const result = await db.collection(collections.projects).deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Project delete error', err);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}