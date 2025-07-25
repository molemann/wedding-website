'use client'

import React from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import Image from 'next/image';

const Footer = () => {
  const { t } = useLanguage();
  
  const links = [
    { href: '#home', label: 'nav.home' },
    { href: '#details', label: 'nav.details' },
    { href: '#rsvp', label: 'nav.rsvp' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative bg-[url('/images/parchment-texture.png')] bg-cover bg-center bg-no-repeat mt-auto">
      {/* Background overlay to match itinerary section */}
      <div className="absolute inset-0 bg-white/80 pointer-events-none z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-6 pb-0">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex flex-col space-y-1">
            <span className="underline font-semibold">{t('footer.contactInfo')}</span>
            <span>Miriam: +34 676 93 04 14</span>
            <span>Pablo: +34 648 61 10 81</span>
          </div>
          <div className="flex items-center gap-4 mt-4 justify-center">
            <a href="#" aria-label="Facebook" className="hover:text-terracotta text-2xl"><i className="fab fa-facebook"></i></a>
            <a href="#" aria-label="Instagram" className="hover:text-terracotta text-2xl"><i className="fab fa-instagram"></i></a>
          </div>
          <div className="text-sm mt-2">{t('footer.copyright')}</div>
        </div>
      </div>
      <div className="relative z-20 w-full mt-[-20px] pointer-events-none">
        <Image
          src="/images/flower-border.png"
          alt="Flower border"
          width={2400}
          height={300}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </footer>
  );
};

export default Footer; 