import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai'; // Naya Unified SDK

// Client initialize karein
const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || ""
});

// Aapka Pura Document (Context)
const PIXELRAMP_CONTEXT = `
# 🎨 PixelRamp - Digital Studio
Professional Web, Mobile & Design Solutions for Modern Businesses

## 📋 Quick Overview
| Service | Starting Price | Delivery Time |
|---------|---------------|---------------|
| 🌐 Web Development | £300 | 5-7 days |
| 🎨 Graphics & Design | £149 | 3-5 days |
| 📱 Mobile Apps | £500 | 2-3 weeks |

## 🌐 WEB DEVELOPMENT PACKAGES
### Starter Website - £300
- 1 Page, Responsive, Mobile-First, Contact Form, Basic SEO.
### Business Website - £1,199
- Up to 10 Pages, WordPress/Custom CMS, Advanced SEO, Blog, Live Chat.
### Enterprise Web Solution - £2,200+
- Custom App, E-commerce, Payment Gateway (Stripe/PayPal), API Integration.

## 🎨 GRAPHICS & DESIGN PACKAGES
- Essential (£149): 2 Logo Concepts, Brand Colors, Stationery.
- Corporate (£299): 3 Concepts, Brand Identity Kit, Social Media Kit.
- Elite (£600): UI/UX Design, 3D Graphics, Animated Logo, Marketing Materials.

## 📱 MOBILE APP DEVELOPMENT
- Basic (£500): iOS or Android, 3-5 Screens, Push Notifications.
- Pro (£999): Cross-Platform (Flutter/React Native), Auth, Cloud Database.
- Advanced (£2,000+): Real-time (WebSockets), Geolocation, Admin Panel.

## 📞 CONTACT US
- Email: contact@pixelramp.com
- Phone: +44 (0) 123 456 7890
- Hours: Mon-Fri, 9 AM - 6 PM GMT
- Location: London, United Kingdom

## 💳 PAYMENT & TERMS
- 50% Upfront, 50% On Delivery.
- Methods: Bank Transfer, PayPal, Stripe, Crypto.
- Refund: Full refund if project not started.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const userMessage = messages[messages.length - 1].content;

    // UPDATE: Hum "gemini-2.5-flash" use kar rahe hain jo 2026 ka latest stable model hai
    // Agar ye na chale to 'gemini-2.0-flash' use karein
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{
            text: `
              You are the PixelRamp Assistant. Answer ONLY using the following context.
              If the user says 'hi' or 'hello', greet them warmly.
              If information is missing, ask them to email contact@pixelramp.com.

              CONTEXT:
              ${PIXELRAMP_CONTEXT}

              USER QUESTION:
              ${userMessage}
            `
          }]
        }
      ]
    });

    // Naye SDK mein text nikalne ka tareeqa ye hai:
    const responseText = response.text || "I'm sorry, I couldn't process that.";

    return NextResponse.json({ message: responseText });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Detailed error message for debugging
    return NextResponse.json(
      { error: "API issue", details: error.message },
      { status: 500 }
    );
  }
}