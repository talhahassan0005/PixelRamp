import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PixelRamp — Digital Studio',
  description: 'PixelRamp — Web, Mobile & SaaS development for startups and SMEs',
  icons: {
    icon: '/images/pixelramp-logo.svg',
    apple: '/images/pixelramp-logo.svg',
    shortcut: '/images/pixelramp-logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 text-slate-100`}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Chatbot />
        </AuthProvider>
      </body>
    </html>
  );
}
