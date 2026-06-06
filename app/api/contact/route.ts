import { NextRequest, NextResponse } from 'next/server';

// Lightweight contact endpoint for the homepage hero lead form.
// Validates input and accepts the submission. Email/DB delivery can be
// wired in later (this branch has no mailer/DB dependencies installed).
export async function POST(req: NextRequest) {
  try {
    const { name, email, message, service } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Server-side record of the lead (replace with email/DB integration).
    console.log('[contact] New enquiry:', {
      name,
      email,
      service: service || 'Not specified',
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll be in touch within 24 hours.",
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    );
  }
}
