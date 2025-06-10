'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/app/context/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const pathname = usePathname()

  const links = [
    { href: '#home', label: 'nav.home' },
    { href: '#details-info', label: 'nav.details' },
    { href: '#rsvp', label: 'nav.rsvp' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      // Only set hasScrolled to true if we've scrolled more than 0 pixels
      setHasScrolled(scrollPosition > 0)

      // Update active section based on scroll position
      const sections = ['home', 'details', 'rsvp']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    // Check scroll position immediately
    handleScroll()

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Clean up
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname]) // Add pathname as dependency to re-run when route changes

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    
    if (href === '#home') {
      // Scroll to top of the page
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      
      // Force update hasScrolled state after scroll completes
      setTimeout(() => {
        setHasScrolled(false)
      }, 500) // Wait for scroll animation to complete
    } else {
      // Scroll to the target section
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
    
    setIsOpen(false)
  }

  return (
    <motion.nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 relative`}
      animate={{
        backgroundColor: hasScrolled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0)',
        backdropFilter: hasScrolled ? 'blur(8px)' : 'blur(0px)',
        boxShadow: hasScrolled ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'
      }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src="/images/parchment-texture.png"
        alt="Parchment Texture"
        fill
        className="object-cover opacity-60"
        priority
      />
      <div className="absolute inset-0 bg-white/80 pointer-events-none z-0"></div>
      <div className="relative max-w-7xl mx-auto flex items-center justify-between h-[80px] px-4 sm:px-6 lg:px-8 z-10">
        {/* Desktop Navigation - Left Side */}
        <AnimatePresence mode="wait">
          {hasScrolled ? (
            <motion.div 
              key="nav-links"
              className="hidden md:flex space-x-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {links.map((link) => {
                const isActive = activeSection === link.href.replace('#', '')
                
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="relative font-serif text-lg text-deepNavy hover:text-terracotta transition-colors duration-200"
                  >
                    {t(link.label)}
                    {isActive && (
                      <motion.div
                        layoutId="underline"
                        className="absolute left-0 right-0 h-0.5 bg-terracotta bottom-0"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30
                        }}
                      />
                    )}
                  </a>
                )
              })}
            </motion.div>
          ) : (
            <motion.div 
              key="action-buttons"
              className="hidden md:flex space-x-4 absolute right-0 items-center h-[60px] mt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <a 
                href="#details-info" 
                onClick={(e) => handleLinkClick(e, '#details-info')}
                className="px-4 py-2 border border-[#64564a] text-[#64564a] hover:bg-[#64564a] hover:text-white transition-all duration-300 rounded-md font-serif text-base"
              >
                {t('view.details')}
              </a>
              <a 
                href="#rsvp" 
                onClick={(e) => handleLinkClick(e, '#rsvp')}
                className="px-4 py-2 border border-[#64564a] text-[#64564a] hover:bg-[#64564a] hover:text-white transition-all duration-300 rounded-md font-serif text-base"
              >
                {t('rsvp')}
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Centered Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="block">
            <Image
              src="/images/MP-logo.png"
              alt="M & P"
              width={60}
              height={60}
              className="w-auto h-[60px] mt-[10px]"
              priority
              sizes="(max-width: 768px) 60px, 60px"
            />
          </a>
        </div>

        {/* Mobile Menu Button - Right Side */}
        <div className="ml-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-warmIvory/50 transition-colors"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6 text-deepNavy" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-deepNavy" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/90 backdrop-blur-sm"
          >
            <div className="px-4 py-2 space-y-2">
              {links.map((link) => {
                const isActive = activeSection === link.href.replace('#', '')
                
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`block py-2 px-4 rounded-lg font-serif text-lg transition-colors ${
                      isActive 
                        ? 'bg-terracotta/10 text-terracotta'
                        : 'text-deepNavy hover:bg-warmIvory/50'
                    }`}
                  >
                    {t(link.label)}
                  </a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
} 