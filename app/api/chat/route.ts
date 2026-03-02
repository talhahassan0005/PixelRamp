import { NextRequest, NextResponse } from 'next/server';
import { getSimpleResponse } from '@/lib/simple-chatbot';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    const response = getSimpleResponse(lastMessage.content);

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
