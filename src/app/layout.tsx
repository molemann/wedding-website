import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";
import { LanguageProvider } from './context/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'
import Image from 'next/image';

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Miriam & Pablo",
  description: "Join us for our wedding celebration in Madrid",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  icons: {
    icon: [
      { url: '/images/doge-favicon.png', type: 'image/png' }
    ],
    apple: [
      { url: '/images/doge-favicon.png', sizes: '180x180', type: 'image/png' }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/images/doge-favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/doge-favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/doge-favicon.png" />
        <meta name="msapplication-TileImage" content="/images/doge-favicon.png" />
        <link rel="preload" href="/fonts/TAN-Pearl.otf" as="font" type="font/otf" crossOrigin="anonymous" />
      </head>
      <body className="font-body text-deepNavy relative min-h-screen flex flex-col">
        {/* Parchment Background for all pages */}
        <div className="fixed inset-0 z-0">
          <Image
            src="/images/parchment-texture.png"
            alt="Parchment texture"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        
        <LanguageProvider>
          <div className="relative z-10 flex flex-col min-h-screen">
            <LanguageToggle />
            <Navigation />
            <main className="flex-grow pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
