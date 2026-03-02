const knowledgeBase = {
  greetings: [
    "Hello! I'm PixelRamp assistant. How can I help you today?",
    "Hi there! Looking for web development, design, or mobile app services?",
    "Welcome to PixelRamp! What service are you interested in?"
  ],
  
  webDevelopment: {
    keywords: ['web', 'website', 'site', 'landing', 'page', 'development'],
    response: `🌐 **Web Development Packages:**

**Starter Website** - From £300
✔ One Page Website
✔ Basic SEO Setup
✔ Mobile Friendly
✔ Contact Form

**Business Website** - From £1,199
✔ Up to 10 Pages
✔ CMS Integration
✔ Google Analytics
✔ Lead Forms

**Enterprise Solution** - From £2,200
✔ Custom Web App
✔ E-commerce Support
✔ Advanced SEO
✔ 3rd Party Integration

Which package interests you?`
  },

  design: {
    keywords: ['design', 'logo', 'graphic', 'brand', 'ui', 'ux', 'creative'],
    response: `🎨 **Graphics & Design Packages:**

**Essential Design** - £149
✔ Logo Design
✔ Brand Colors
✔ Business Card

**Corporate Brand** - £299
✔ Full Brand Identity
✔ Social Media Templates
✔ Brand Guidelines

**Elite Design** - £600
✔ Advanced UI/UX
✔ 3D Graphics
✔ Animated Logo

What type of design do you need?`
  },

  mobileApp: {
    keywords: ['app', 'mobile', 'android', 'ios', 'application'],
    response: `📱 **Mobile App Packages:**

**Basic App** - £500
✔ Single Platform (iOS or Android)
✔ Basic UI
✔ App Store Submission

**Pro App** - £999
✔ Cross-Platform (iOS + Android)
✔ API Integration
✔ Push Notifications

**Advanced App** - £2,000
✔ Real-Time Features
✔ Database Integration
✔ Backend Dashboard

Which platform are you targeting?`
  },

  pricing: {
    keywords: ['price', 'cost', 'budget', 'how much', 'pricing', 'quote'],
    response: `💰 **Our Pricing:**

**Web Development:** £300 - £2,200+
**Design Services:** £149 - £600
**Mobile Apps:** £500 - £2,000+

Prices vary based on requirements. Share your project details for accurate quote!`
  },

  contact: {
    keywords: ['contact', 'email', 'phone', 'reach', 'talk', 'speak'],
    response: `📞 **Contact Us:**

Email: contact@pixelramp.com
Phone: +44 (0) 123 456 7890
Hours: Mon-Fri, 9 AM - 6 PM GMT

Or share your email here and we'll reach out!`
  },

  services: {
    keywords: ['service', 'what do you', 'offer', 'provide'],
    response: `✨ **Our Services:**

1. 🌐 Web Development
2. 🎨 Graphics & Design
3. 📱 Mobile App Development

Type the service name to learn more!`
  }
};

export function getSimpleResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();

  // Check greetings
  if (msg.match(/\b(hi|hello|hey|greetings)\b/)) {
    return knowledgeBase.greetings[Math.floor(Math.random() * knowledgeBase.greetings.length)];
  }

  // Check each category
  for (const [key, data] of Object.entries(knowledgeBase)) {
    if (key === 'greetings') continue;
    
    const category = data as { keywords: string[], response: string };
    if (category.keywords.some(keyword => msg.includes(keyword))) {
      return category.response;
    }
  }

  // Default response
  return `I can help you with:
  
🌐 Web Development
🎨 Graphics & Design  
📱 Mobile App Development
💰 Pricing Information
📞 Contact Details

What would you like to know?`;
}
