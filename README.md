# DevAgency - Software Development Agency Platform

Modern, professional website with authentication, AI chatbot, and project tier selection.

## Features

✅ **Public Landing Pages** - Home, About, Services, Why Choose Us, How It Works, Contact
✅ **Authentication System** - Login/Signup with Supabase
✅ **Protected Dashboard** - Only accessible after login
✅ **Project Tier Selection** - Low/Medium/High tier categorization
✅ **Custom AI Chatbot** - Strict boundaries, only answers business queries
✅ **RAG System** - AI trained on business knowledge base
✅ **Lead Qualification** - Chatbot qualifies leads, never gives final quotes

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (Authentication)
- **OpenAI API** (Chatbot with GPT-4)
- **Framer Motion** (Animations)

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Supabase
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Get your project URL and anon key from Settings > API

### 3. Setup OpenAI
1. Get API key from [platform.openai.com](https://platform.openai.com)

### 4. Environment Variables
Create `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

### 5. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
├── app/
│   ├── page.tsx              # Home page
│   ├── auth/page.tsx         # Login/Signup
│   ├── dashboard/page.tsx    # Protected dashboard
│   ├── api/chat/route.ts     # Chatbot API
│   └── [other pages]
├── components/
│   ├── Navbar.tsx            # Navigation
│   ├── Chatbot.tsx           # AI Chat interface
│   ├── TierSelector.tsx      # Project tier selection
│   └── ui/                   # Reusable components
├── contexts/
│   └── AuthContext.tsx       # Auth state management
├── lib/
│   ├── supabase.ts           # Supabase client
│   └── tiers.ts              # Tier definitions
└── types/
    └── index.ts              # TypeScript types

```

## Chatbot System Prompt

The AI assistant has strict boundaries:
- Only answers DevAgency-related questions
- Refuses off-topic queries (cooking, politics, etc.)
- Never provides final quotes
- Qualifies leads by understanding requirements
- Guides users to appropriate tier selection
- Collects contact info for team follow-up

## Project Tiers

| Tier | Description | Budget |
|------|-------------|--------|
| **Low** | MVP / Basic Features | $500 - $2,000 |
| **Medium** | Growth / Professional | $2,000 - $8,000 |
| **High** | Scaling / Premium | $8,000+ |

## User Journey

1. **Public Pages** → Browse services and information
2. **Sign Up/Login** → Create account
3. **Select Tier** → Choose project budget level
4. **Chat with AI** → Discuss requirements
5. **Lead Qualified** → Team follows up with accurate quote

## Customization

### Update Business Info
Edit `app/api/chat/route.ts` - Update SYSTEM_PROMPT with your services

### Modify Tiers
Edit `lib/tiers.ts` - Change pricing and features

### Add Knowledge Base (RAG)
Use OpenAI Assistants API with file uploads for advanced RAG

## Deployment

```bash
npm run build
npm start
```

Deploy to Vercel for best Next.js experience.
