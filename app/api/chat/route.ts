import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const userMessage = messages[messages.length - 1].content;
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are the PixelRamp Assistant. Answer ONLY about PixelRamp services.\n\nPixelRamp Services:\n- Web Development: £300-£2,200+\n- Graphics & Design: £149-£600\n- Mobile Apps: £500-£2,000+\n\nContact: contact@pixelramp.com\n\nUser: ${userMessage}`
            }]
          }]
        })
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      console.error('API Error:', data);
      return NextResponse.json({ message: 'Sorry, I am having trouble connecting. Please try again.' });
    }
    
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not process that.';

    return NextResponse.json({ message: text });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ error: 'API issue' }, { status: 500 });
  }
}
