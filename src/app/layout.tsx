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
  description: "¡Nos casamos y nos encantaría que lo celebraras con nosotros!",
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
  openGraph: {
    title: "Miriam & Pablo - Nuestra Boda",
    description: "¡Nos casamos y nos encantaría que lo celebraras con nosotros!",
    images: [
      {
        url: 'https://molemann.github.io/wedding-website/images/MP-logo.png',
        width: 1200,
        height: 630,
        alt: 'Miriam & Pablo Wedding Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Miriam & Pablo - Nuestra Boda",
    description: "¡Nos casamos y nos encantaría que lo celebraras con nosotros!",
    images: ['/images/MP-logo.png'],
  },
  icons: {
    icon: [
      { url: '/images/MP-logo.png', type: 'image/png' }
    ],
    apple: [
      { url: '/images/MP-logo.png', sizes: '180x180', type: 'image/png' }
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
        <link rel="icon" type="image/png" sizes="32x32" href="/images/MP-logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/MP-logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/MP-logo.png" />
        <meta name="msapplication-TileImage" content="/images/MP-logo.png" />
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
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
