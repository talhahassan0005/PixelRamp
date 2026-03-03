import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
// Chatbot component removed (static chatbot) per request
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
          {/* Tawk.to live chat widget */}
          <Script id="tawk-init" strategy="afterInteractive">
{`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/699d471d6516101c346b7a3b/1ji75ritb';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();`}
          </Script>
        </AuthProvider>
      </body>
    </html>
  );
}
