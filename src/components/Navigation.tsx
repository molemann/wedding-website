'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/app/context/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { usePathname, useRouter } from 'next/navigation'

export default function Navigation() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isManualNavigation, setIsManualNavigation] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Debug effect to log state changes
  useEffect(() => {
    console.log('State changed - hasScrolled:', hasScrolled, 'activeSection:', activeSection)
  }, [hasScrolled, activeSection])

  // Handle direct URL navigation
  useEffect(() => {
    if (pathname === '/detalles') {
      // Scroll to details section
      const target = document.querySelector('#details-info')
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        setActiveSection('details')
        setHasScrolled(true)
        setIsManualNavigation(true)
        setTimeout(() => setIsManualNavigation(false), 1000)
      }
    } else if (pathname === '/rsvp') {
      // Scroll to RSVP section
      const target = document.querySelector('#rsvp')
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        setActiveSection('rsvp')
        setHasScrolled(true)
        setIsManualNavigation(true)
        setTimeout(() => setIsManualNavigation(false), 1000)
      }
    } else if (pathname === '/') {
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveSection('home')
      setHasScrolled(false)
      setIsManualNavigation(true)
      setTimeout(() => setIsManualNavigation(false), 1000)
    }
  }, [pathname])

  const links = [
    { href: '#home', label: 'nav.home' },
    { href: '#details-info', label: 'nav.details' },
    { href: '#rsvp', label: 'nav.rsvp' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const shouldShowScrolledState = scrollPosition > 10
      
      setHasScrolled(shouldShowScrolledState)

      if (isManualNavigation) {
        return // Don't update section while a manual scroll is in progress
      }

      // Only update active section if we're not at the very top
      if (shouldShowScrolledState) {
        const sections = [
          { name: 'home', id: 'home' },
          { name: 'details', id: 'details-info' },
          { name: 'rsvp', id: 'rsvp' }
        ]
        const currentSection = sections.find(section => {
          const element = document.getElementById(section.id)
          if (!element) return false
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        })
        if (currentSection) {
          setActiveSection(currentSection.name)
          
          // Update URL to reflect current section
          if (currentSection.name === 'details' && pathname !== '/detalles') {
            window.history.pushState({}, '', '/detalles')
          } else if (currentSection.name === 'rsvp' && pathname !== '/rsvp') {
            window.history.pushState({}, '', '/rsvp')
          } else if (currentSection.name === 'home' && pathname !== '/') {
            window.history.pushState({}, '', '/')
          }
        }
      } else {
        // Reset active section when at the top
        setActiveSection('home')
        
        // Update URL to home when at the top
        if (pathname !== '/') {
          window.history.pushState({}, '', '/')
        }
      }
    }

    // Check scroll position immediately
    handleScroll()

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Clean up
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname, isManualNavigation]) // Add isManualNavigation to dependencies

  const handleActionButtonClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    console.log('Action button clicked:', href)
    
    // Simple scroll to section
    const target = document.querySelector(href)
    if (target) {
      console.log('Found target, scrolling...')
      target.scrollIntoView({ behavior: 'smooth' })
      
      // Update URL
      if (href === '#details-info') {
        window.history.pushState({}, '', '/detalles')
      } else if (href === '#rsvp') {
        window.history.pushState({}, '', '/rsvp')
      }
    } else {
      console.log('Target not found for:', href)
    }
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    
    setIsManualNavigation(true)
    
    if (href === '#home') {
      // Scroll to top of the page
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      
      window.history.pushState({}, '', '/')
      setHasScrolled(false)
      setActiveSection('home')
      
      setTimeout(() => {
        setIsManualNavigation(false)
      }, 1000)
    } else {
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        
        const sectionName = href.replace('#', '')
        if (sectionName === 'details-info') {
          window.history.pushState({}, '', '/detalles')
          setActiveSection('details')
        } else if (sectionName === 'rsvp') {
          window.history.pushState({}, '', '/rsvp')
          setActiveSection('rsvp')
        }
        
        setHasScrolled(true)
        
        setTimeout(() => {
          setIsManualNavigation(false)
        }, 1000)
      }
    }
    
    // Delay closing the menu on mobile to ensure the scroll action fires
    if (isOpen) {
      setTimeout(() => setIsOpen(false), 300);
    }
  }

  return (
    <motion.nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300`}
      animate={{
        backgroundColor: (hasScrolled || isOpen) ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0)',
        backdropFilter: (hasScrolled || isOpen) ? 'blur(8px)' : 'blur(0px)',
        boxShadow: (hasScrolled || isOpen) ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="absolute inset-0 bg-white/80 pointer-events-none z-0"
        animate={{ opacity: (hasScrolled || isOpen) ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative max-w-7xl mx-auto flex items-center justify-between h-[80px] px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Desktop Navigation - Left Side */}
        <div className="hidden md:flex space-x-8 transition-all duration-300 ease-in-out" 
             style={{ 
               opacity: hasScrolled ? 1 : 0, 
               transform: hasScrolled ? 'translateX(0)' : 'translateX(-20px)',
               pointerEvents: hasScrolled ? 'auto' : 'none'
             }}>
          {links.map((link) => {
            // Map href to activeSection for proper highlighting
            const hrefToSectionMap: { [key: string]: string } = {
              '#home': 'home',
              '#details-info': 'details',
              '#rsvp': 'rsvp'
            }
            const isActive = activeSection === hrefToSectionMap[link.href]
            
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
        </div>
        
        {/* Action Buttons - Right Side */}
        <div className="hidden md:flex space-x-4 absolute right-0 items-center h-[60px] mt-5 transition-all duration-300 ease-in-out z-20"
             style={{ 
               opacity: hasScrolled ? 0 : 1, 
               transform: hasScrolled ? 'translateX(20px)' : 'translateX(0)',
               pointerEvents: hasScrolled ? 'none' : 'auto'
             }}>
          <a 
            href="#details-info" 
            onClick={(e) => handleLinkClick(e, '#details-info')}
            className="px-4 py-2 bg-white/80 border border-white/30 text-[#64564a] hover:bg-white hover:shadow-lg hover:border-terracotta/50 transition-all duration-300 rounded-md font-serif text-base cursor-pointer shadow-md"
          >
            {t('view.details')}
          </a>
          <a 
            href="#rsvp" 
            onClick={(e) => handleLinkClick(e, '#rsvp')}
            className="px-4 py-2 bg-white/80 border border-white/30 text-[#64564a] hover:bg-white hover:shadow-lg hover:border-terracotta/50 transition-all duration-300 rounded-md font-serif text-base cursor-pointer shadow-md"
          >
            {t('rsvp')}
          </a>
        </div>

        {/* Centered Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
          <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="block">
            <Image
              src="/images/MP-logo.png"
              alt="M & P"
              width={60}
              height={60}
              className="w-auto h-[60px] mt-[10px]"
              priority
            />
          </a>
        </div>

        {/* Mobile Menu Button - Right Side */}
        <div className="ml-auto z-20">
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
            className="md:hidden bg-white relative z-30"
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