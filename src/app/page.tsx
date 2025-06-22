'use client'

import { motion } from 'framer-motion'
import { useLanguage } from './context/LanguageContext'
import Image from 'next/image'
import InteractiveTimeline from '@/components/InteractiveTimeline'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { MapIcon, CalendarIcon, ClockIcon, SunIcon } from '@heroicons/react/24/outline'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const scheduleEvents = [
  {
    time: '12:30',
    titleKey: 'schedule.departure',
    locationKey: 'schedule.departure.location',
    descriptionKey: 'schedule.departure.description',
    icon: '🚌',
    image: '/images/autocar-ida.png'
  },
  {
    time: '13:30',
    titleKey: 'schedule.guest.reception',
    locationKey: 'schedule.guest.reception.location',
    descriptionKey: 'schedule.guest.reception.description',
    icon: '👥',
    image: '/images/ceremonia.png'
  },
  {
    time: '14:00',
    titleKey: 'schedule.ceremony',
    locationKey: 'schedule.ceremony.location',
    descriptionKey: 'schedule.ceremony.description',
    icon: '💒',
    image: '/images/ceremonia.png'
  },
  {
    time: '14:30',
    titleKey: 'schedule.cocktail',
    locationKey: 'schedule.cocktail.location',
    descriptionKey: 'schedule.cocktail.description',
    icon: '🍸',
    image: '/images/cocktail.png'
  },
  {
    time: '16:00',
    titleKey: 'schedule.banquet',
    locationKey: 'schedule.banquet.location',
    descriptionKey: 'schedule.banquet.description',
    icon: '🍽️',
    image: '/images/banquete.png'
  },
  {
    time: '18:00',
    titleKey: 'schedule.party',
    locationKey: 'schedule.party.location',
    descriptionKey: 'schedule.party.description',
    icon: '💃',
    image: '/images/fiesta.png'
  },
  {
    time: '22:15',
    titleKey: 'schedule.return',
    locationKey: 'schedule.return.location',
    descriptionKey: 'schedule.return.description',
    icon: '🚌',
    image: '/images/autocar-vuelta.png'
  }
]

const WeatherInfo = () => {
  const { t } = useLanguage()
  return (
    <motion.div
      className="bg-warmIvory p-6 rounded-lg shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-2 text-terracotta mb-4">
        <SunIcon className="w-6 h-6" />
        <h3 className="text-xl font-heading">{t('weather.title')}</h3>
      </div>
      <p className="text-gray-600">{t('weather.info')}</p>
    </motion.div>
  )
}

const DressCode = () => {
  const { t } = useLanguage()
  return (
    <motion.div
      className="bg-warmIvory p-6 rounded-lg shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-2 text-terracotta mb-4">
        <h3 className="text-xl font-heading">{t('dress.code.title')}</h3>
      </div>
      <p className="text-gray-600">{t('dress.code.info')}</p>
    </motion.div>
  )
}

export default function Home() {
  const { t } = useLanguage()
  const { width, height } = useWindowSize()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [formData, setFormData] = useState({
    name: '',
    attending: '',
    transport: '',
    dietaryRestrictions: '',
    songRequest: '',
    extraInfo: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showLeaves, setShowLeaves] = useState(false)
  const { language, setLanguage } = useLanguage()

  // Handle hash-based navigation
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash
      if (hash) {
        // Wait a bit for the page to load, then scroll to the section
        setTimeout(() => {
          const target = document.querySelector(hash)
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' })
          }
        }, 500)
      }
    }

    handleHashNavigation()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit RSVP')
      }

      setSubmitted(true)
      if (formData.attending === 'yes') {
        setShowLeaves(true)
        setTimeout(() => setShowLeaves(false), 5000) // Hide leaves after 5 seconds
      }
    } catch (err) {
      setError('Failed to submit RSVP. Please try again.')
      console.error('RSVP submission error:', err)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const isAttending = formData.attending === 'yes'

  return (
    <div className="relative">
      {/* Hero Section */}
      <section 
        id="home" 
        className={`relative flex flex-col items-center overflow-hidden ${
          isMobile 
            ? 'h-screen justify-center' 
            : 'justify-between pt-[250px] pb-[450px]'
        }`}
      >
        {/* Background Video */}
        <video 
          key={isMobile ? 'mobile' : 'desktop'}
          className="absolute top-0 left-0 w-full h-full object-cover object-bottom"
          autoPlay
          loop
          muted
          playsInline
        >
          <source 
            src={isMobile ? '/images/mobile-video.mp4' : '/images/desktop-video.mp4'} 
            type="video/mp4" 
          />
        </video>

        <div className="relative z-10 w-full h-full">
          <div className="relative z-10 container mx-auto flex flex-col items-center justify-between h-full pt-4 pb-0 md:py-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex flex-col items-center justify-center flex-grow max-w-2xl mx-auto px-4"
            >
              <div className="text-center mb-4 md:mb-6">
                <h2 className="font-tan-pearl text-4xl md:text-6xl text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.4)] leading-tight tracking-wide">
                  MIRIAM <span className="text-3xl md:text-4xl font-tan-pearl">&</span> PABLO
                </h2>
                <div className="mt-2 mb-2">
                  <span className="font-serif text-3xl md:text-5xl text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]">{t('we.say')}</span>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-center mb-0 relative z-20"
                style={{ marginBottom: 'clamp(-2rem, -5vh, -1rem)' }}
              >
                  <p className="text-2xl md:text-4xl text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.4)] mb-4 font-serif">{t('wedding.date')}</p>
                </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="flex flex-col md:flex-row w-full">
        {/* Details Info Section */}
        <section id="details-info" className="w-full md:w-1/2 px-4 sm:px-6 lg:px-8 text-deepNavy relative bg-[url('/images/parchment-texture.png')] bg-cover bg-center bg-no-repeat" style={{ paddingTop: 50 }}>
          {/* Background overlay */}
          <div className="absolute inset-0 bg-[rgba(244,241,222,0.9)]"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-6xl font-serif text-center text-deepNavy mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {t('wedding.details')}
            </motion.h1>

            <motion.div
              className="mb-0 text-center text-deepNavy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-6 text-xl text-center text-deepNavy">
                {t('wedding.subtitle')}
              </div>
            </motion.div>

            <motion.div
              className="mb-16 text-deepNavy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl border-2 border-terracotta/20">
                <iframe
                  title="Finca Miravalle Map"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6054.239442272923!2d-4.0510803079658935!3d40.649291257262206!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd41735dfd5c9b83%3A0x4e6c0cac8f01aabf!2sFinca%20Miravalle%20-%20Restaurante%20Miravalle%20en%20la%20Sierra%20de%20Guadarrama!5e0!3m2!1ses!2sus!4v1746990810721!5m2!1ses!2sus"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[350px] md:h-[400px] rounded-2xl border-none"
                ></iframe>
              </div>
              <div className="text-center font-serif text-xl mt-4 text-deepNavy">
                <span className="font-serif font-bold text-deepNavy">Dirección:</span> Carretera de la Coruña, km 44. 28440, Guadarrama (Madrid)
              </div>
            </motion.div>
          </div>
        </section>
        {/* Our Picture Section */}
        <section id="our-picture" className="w-full md:w-1/2 min-h-[500px] md:min-h-[600px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/our-picture.jpg')" }}>
          {/* Optionally, add overlay or content here */}
        </section>
      </section>

      <section id="details-itinerary" className="px-4 sm:px-6 lg:px-8 pt-10 pb-1 bg-[url('/images/parchment-texture.png')] bg-cover bg-center bg-no-repeat relative">
        <div className="absolute inset-0 bg-white/80 pointer-events-none z-0"></div>
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mx-auto mb-16">
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-6xl font-serif text-center text-deepNavy mb-2">{t('schedule.title')}</h1>
                <div className="text-terracotta mb-6 text-xl text-center">{t('schedule.subtitle')}</div>
                <InteractiveTimeline events={scheduleEvents} className="w-full" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-[url('/images/parchment-texture.png')] bg-cover bg-center bg-no-repeat">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-[rgba(244,241,222,0.9)]"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-7xl font-serif text-center text-deepNavy mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t('rsvp.title')}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-center text-deepNavy mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('rsvp.subtitle.line1')}
            <br />
            {t('rsvp.subtitle.line2')}
          </motion.p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                className="relative p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{ backgroundImage: "url('/images/parchment-texture.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="absolute inset-0 bg-white/80 z-0 rounded-lg pointer-events-none"></div>
                <div className="relative z-10">
                  {error && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                      {error}
                    </div>
                  )}
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-deepNavy mb-2 font-bold">{t('rsvp.full.name')}</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder={t('rsvp.full.name.placeholder')}
                        className="w-full p-3 rounded-md border border-terracotta/20 focus:border-terracotta focus:ring-1 focus:ring-terracotta"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="block text-deepNavy mb-2 font-bold">{t('rsvp.attending')}</label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="attending-yes"
                            name="attending"
                            value="yes"
                            required
                            className="h-4 w-4 text-terracotta focus:ring-terracotta"
                            checked={formData.attending === 'yes'}
                            onChange={handleChange}
                          />
                          <label htmlFor="attending-yes" className="ml-2 block text-deepNavy">
                            {t('rsvp.attending.yes')}
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="attending-no"
                            name="attending"
                            value="no"
                            required
                            className="h-4 w-4 text-terracotta focus:ring-terracotta"
                            checked={formData.attending === 'no'}
                            onChange={handleChange}
                          />
                          <label htmlFor="attending-no" className="ml-2 block text-deepNavy">
                            {t('rsvp.attending.no')}
                          </label>
                        </div>
                      </div>
                    </div>

                    {isAttending && (
                      <>
                        <div>
                          <label className="block text-deepNavy mb-2 font-bold">{t('rsvp.transport')}</label>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="transport-own"
                                name="transport"
                                value="own"
                                required
                                className="h-4 w-4 text-terracotta focus:ring-terracotta"
                                checked={formData.transport === 'own'}
                                onChange={handleChange}
                              />
                              <label htmlFor="transport-own" className="ml-2 block text-deepNavy">
                                {t('rsvp.transport.own')}
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="transport-bus"
                                name="transport"
                                value="bus"
                                required
                                className="h-4 w-4 text-terracotta focus:ring-terracotta"
                                checked={formData.transport === 'bus'}
                                onChange={handleChange}
                              />
                              <label htmlFor="transport-bus" className="ml-2 block text-deepNavy">
                                {t('rsvp.transport.bus')}
                              </label>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="dietaryRestrictions" className="block text-deepNavy mb-2 font-bold">{t('rsvp.dietary')}</label>
                          <textarea
                            id="dietaryRestrictions"
                            name="dietaryRestrictions"
                            placeholder={t('rsvp.dietary.placeholder')}
                            className="w-full p-3 rounded-md border border-terracotta/20 focus:border-terracotta focus:ring-1 focus:ring-terracotta"
                            value={formData.dietaryRestrictions}
                            onChange={handleChange}
                          />
                        </div>

                        <div>
                          <label htmlFor="songRequest" className="block text-deepNavy mb-2 font-bold">{t('rsvp.song')}</label>
                          <input
                            type="text"
                            id="songRequest"
                            name="songRequest"
                            placeholder={t('rsvp.song.placeholder')}
                            className="w-full p-3 rounded-md border border-terracotta/20 focus:border-terracotta focus:ring-1 focus:ring-terracotta"
                            value={formData.songRequest}
                            onChange={handleChange}
                          />
                        </div>

                        <div>
                          <label htmlFor="extraInfo" className="block text-deepNavy mb-2 font-bold">{t('rsvp.extra')}</label>
                          <textarea
                            id="extraInfo"
                            name="extraInfo"
                            placeholder={t('rsvp.extra.placeholder')}
                            className="w-full p-3 rounded-md border border-terracotta/20 focus:border-terracotta focus:ring-1 focus:ring-terracotta"
                            value={formData.extraInfo}
                            onChange={handleChange}
                          />
                        </div>
                      </>
                    )}

                    <button
                      type="submit"
                      className="w-full px-6 py-3 border border-[#64564a] text-[#64564a] hover:bg-[#64564a] hover:text-white transition-all duration-300 rounded-md font-serif text-lg md:text-xl"
                    >
                      {t('rsvp.submit')}
                    </button>
                  </div>
                </div>
              </motion.form>
            ) : (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-serif font-bold text-deepNavy mb-4">
                  {isAttending ? t('rsvp.thanks.yes') : t('rsvp.thanks.no')}
                </h2>
                <p className="text-lg md:text-xl text-center text-deepNavy mb-0 font-serif">
                  {!isAttending && t('rsvp.miss.you')}
                </p>
                <button
                  className="mt-6 px-6 py-2 bg-white text-terracotta font-serif rounded-md shadow hover:bg-terracotta hover:text-white transition-colors"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      attending: '',
                      transport: '',
                      dietaryRestrictions: '',
                      songRequest: '',
                      extraInfo: ''
                    });
                  }}
                >
                  {language === 'es' ? 'Rellenar otro formulario' : 'Fill another form'}
                </button>
                {showLeaves && (
                  <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={100}
                    gravity={0.3}
                    wind={0.05}
                    confettiSource={{
                      x: 0,
                      y: 0,
                      w: width,
                      h: 0
                    }}
                    colors={['#8B4513', '#A0522D', '#D2691E', '#CD853F', '#DEB887']}
                    drawShape={(ctx) => {
                      ctx.beginPath()
                      ctx.moveTo(0, 0)
                      ctx.lineTo(10, 0)
                      ctx.lineTo(5, 15)
                      ctx.closePath()
                      ctx.fill()
                    }}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
