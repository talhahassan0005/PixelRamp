import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { isNonEmptyString } from '@/lib/validation';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are an assistant for DevAgency, a professional software development company.

STRICT RULES:
1. ONLY answer questions about DevAgency services, pricing, and project inquiries
2. If asked about unrelated topics (cooking, politics, etc.), respond: "I can only assist with project-related inquiries about DevAgency services."
3. NEVER provide final quotes - always say: "Let me connect you with our team for accurate pricing."
4. Focus on qualifying leads by understanding their requirements
5. Guide users to select appropriate tier (Lower/Medium/High) based on their needs

SERVICES:

1. WEB DEVELOPMENT:
- Starter (Lower): Single page landing, contact form, social media integration, 1 month support
- Business (Medium): 10 custom pages, SEO, CMS, speed optimization
- Enterprise (High): Full-stack app, e-commerce, authentication, high security

2. GRAPHICS & CREATIVE DESIGN:
- Essential (Lower): Logo (2 concepts), business card, letterhead
- Corporate (Medium): Brand identity kit, social media branding, flyer/brochure, vector files
- Elite (High): 3D assets, motion graphics, premium UI/UX, brand style guide, custom illustrations

3. SAAS & SOFTWARE:
- MVP Launch (Lower): Core features (1-2 functions), basic database, standard UI
- Scale-Up (Medium): Multi-user architecture, subscription management, advanced dashboard, notifications
- Custom Enterprise (High): Cloud infrastructure, AI/ML integration, analytics, multi-tenant scaling

4. MOBILE APP:
- Basic (Lower): Single platform, simple UI, push notifications
- Pro (Medium): Cross-platform, API integration, in-app purchases
- Advanced (High): Real-time features, complex backend, offline functionality

TIERS:
- Lower: $500-$2,000 (MVP/Basic)
- Medium: $2,000-$8,000 (Professional/Growth)
- High: $8,000+ (Premium/Enterprise)

Your goal: Understand requirements, suggest appropriate tier, and collect contact info for team follow-up.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid input: messages array required' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const text = completion.choices?.[0]?.message?.content || '';
    return NextResponse.json({ message: text });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
