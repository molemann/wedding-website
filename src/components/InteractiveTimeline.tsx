import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'
import Image from 'next/image'

type TimelineEvent = {
  time: string
  titleKey: string
  locationKey: string
  descriptionKey: string
  icon: string
  image: string
}

interface TimelineProps {
  events: TimelineEvent[]
  className?: string
}

export default function InteractiveTimeline({ events, className = '' }: TimelineProps) {
  const { t } = useLanguage()
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const goTo = (idx: number) => {
    if (idx < 0) setCurrent(0)
    else if (idx >= events.length) setCurrent(events.length - 1)
    else setCurrent(idx)
  }

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (delta > 50) goTo(current - 1)
    else if (delta < -50) goTo(current + 1)
    touchStartX.current = null
  }

  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Left arrow */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-warmIvory/80 rounded-full p-2 shadow-md border border-terracotta/20 hover:bg-warmIvory transition disabled:opacity-30"
        onClick={() => goTo(current - 1)}
        disabled={current === 0}
        aria-label="Previous event"
        style={{ display: current === 0 ? 'none' : 'block' }}
      >
        <span className="text-3xl text-terracotta">&#8592;</span>
      </button>
      {/* Right arrow */}
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-warmIvory/80 rounded-full p-2 shadow-md border border-terracotta/20 hover:bg-warmIvory transition disabled:opacity-30"
        onClick={() => goTo(current + 1)}
        disabled={current === events.length - 1}
        aria-label="Next event"
        style={{ display: current === events.length - 1 ? 'none' : 'block' }}
      >
        <span className="text-3xl text-terracotta">&#8594;</span>
      </button>
      {/* Carousel slides */}
      <div className="overflow-hidden w-full">
        {/* Desktop carousel with side peeks */}
        <div className="hidden md:flex w-full justify-center items-center gap-8 overflow-x-visible" style={{ minHeight: 420 }}>
          {/* Previous item (if exists) */}
          {current > 0 && (
            <div className="flex justify-end">
              <div className="bg-warmIvory/90 rounded-lg shadow-lg border border-terracotta/20 px-6 py-8 flex flex-col items-center opacity-60 scale-90 transition-all duration-500 max-w-xs w-[260px]">
                <div className="w-20 h-20 relative mb-4">
                  <Image 
                    src={events[current - 1].image} 
                    alt={t(events[current - 1].titleKey)} 
                    fill 
                    className="object-contain rounded-xl"
                    sizes="(max-width: 768px) 80px, 80px"
                    priority={current === 1}
                  />
                </div>
                <div className="text-xl font-heading text-terracotta mb-2">{events[current - 1].time}</div>
                <div className="text-base font-bold text-deepNavy mb-1 text-center">{t(events[current - 1].titleKey)}</div>
              </div>
            </div>
          )}
          {/* Current item */}
          <div className="flex justify-center z-10">
            <div className="bg-warmIvory/90 rounded-lg shadow-lg border border-terracotta/20 px-8 py-8 flex flex-col items-center transition-all duration-500 max-w-md w-[350px]">
              <div className="w-24 h-24 relative mb-4">
                <Image 
                  src={events[current].image} 
                  alt={t(events[current].titleKey)} 
                  fill 
                  className="object-contain rounded-xl"
                  sizes="(max-width: 768px) 96px, 96px"
                  priority
                />
              </div>
              <div className="text-2xl font-heading text-terracotta mb-2">{events[current].time}</div>
              <div className="text-lg font-bold text-deepNavy mb-1 text-center">{t(events[current].titleKey)}</div>
              {events[current].locationKey && <div className="text-sm text-terracotta mb-1 text-center">{t(events[current].locationKey)}</div>}
              {events[current].descriptionKey && <div className="text-xs text-gray-600 mb-2 text-center">{t(events[current].descriptionKey)}</div>}
              {/* RSVP link for bus events */}
              {(events[current].titleKey.toLowerCase().includes('bus') || events[current].titleKey.toLowerCase().includes('autocar')) && (
                <a href="#rsvp" className="text-xs text-blue-700 underline hover:text-blue-900 transition mt-2">{t('schedule.bus.confirmation') || 'Puedes confirmar aquí si vas a necesitarlo'}</a>
              )}
            </div>
          </div>
          {/* Next item (if exists) */}
          {current < events.length - 1 && (
            <div className="flex justify-start">
              <div className="bg-warmIvory/90 rounded-lg shadow-lg border border-terracotta/20 px-6 py-8 flex flex-col items-center opacity-60 scale-90 transition-all duration-500 max-w-xs w-[260px]">
                <div className="w-20 h-20 relative mb-4">
                  <Image 
                    src={events[current + 1].image} 
                    alt={t(events[current + 1].titleKey)} 
                    fill 
                    className="object-contain rounded-xl"
                    sizes="(max-width: 768px) 80px, 80px"
                    priority={current === events.length - 2}
                  />
                </div>
                <div className="text-xl font-heading text-terracotta mb-2">{events[current + 1].time}</div>
                <div className="text-base font-bold text-deepNavy mb-1 text-center">{t(events[current + 1].titleKey)}</div>
              </div>
            </div>
          )}
        </div>
        {/* Mobile: keep single slide */}
        <div className="md:hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={current}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full flex justify-center"
            >
              <div className="bg-warmIvory/90 rounded-lg shadow-lg border border-terracotta/20 px-8 py-8 flex flex-col items-center w-full max-w-md mx-auto">
                <div className="w-24 h-24 relative mb-4">
                  <Image 
                    src={events[current].image} 
                    alt={t(events[current].titleKey)} 
                    fill 
                    className="object-contain rounded-xl"
                    sizes="(max-width: 768px) 96px, 96px"
                    priority
                  />
                </div>
                <div className="text-2xl font-heading text-terracotta mb-2">{events[current].time}</div>
                <div className="text-lg font-bold text-deepNavy mb-1 text-center">{t(events[current].titleKey)}</div>
                {events[current].locationKey && <div className="text-sm text-terracotta mb-1 text-center">{t(events[current].locationKey)}</div>}
                {events[current].descriptionKey && <div className="text-xs text-gray-600 mb-2 text-center">{t(events[current].descriptionKey)}</div>}
                {/* RSVP link for bus events */}
                {(events[current].titleKey.toLowerCase().includes('bus') || events[current].titleKey.toLowerCase().includes('autocar')) && (
                  <a href="#rsvp" className="text-xs text-blue-700 underline hover:text-blue-900 transition mt-2">{t('schedule.bus.confirmation') || 'Puedes confirmar aquí si vas a necesitarlo'}</a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {/* Dots navigation */}
      <div className="flex justify-center gap-2 mt-6">
        {events.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full border-2 border-terracotta ${current === idx ? 'bg-terracotta' : 'bg-warmIvory'}`}
            onClick={() => goTo(idx)}
            aria-label={`Go to event ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
} 