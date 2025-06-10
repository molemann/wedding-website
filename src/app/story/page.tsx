'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

const TimelineEvent = ({ event, index }: { 
  event: { 
    dateKey: string
    titleKey: string
    descriptionKey: string
    icon: string 
  }, 
  index: number 
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  return (
    <motion.div
      ref={ref}
      className={`flex gap-8 items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <div className={`w-1/2 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
        <h3 className="font-heading text-2xl text-deepNavy mb-2">{t(event.titleKey)}</h3>
        <p className="text-terracotta mb-1">{t(event.dateKey)}</p>
        <p className="text-gray-600">{t(event.descriptionKey)}</p>
      </div>
      <div className="relative flex items-center justify-center w-16 h-16">
        <div className="absolute w-1 h-full bg-terracotta/20"></div>
        <div className="relative z-10 w-16 h-16 rounded-full bg-warmIvory border-2 border-terracotta flex items-center justify-center text-2xl">
          {event.icon}
        </div>
      </div>
      <div className="w-1/2"></div>
    </motion.div>
  )
}

export default function Story() {
  const { t } = useLanguage()
  
  const timelineEvents = [
    {
      dateKey: 'story.first.meeting.date',
      titleKey: 'story.first.meeting.title',
      descriptionKey: 'story.first.meeting.desc',
      icon: '☕'
    },
    {
      dateKey: 'story.first.trip.date',
      titleKey: 'story.first.trip.title',
      descriptionKey: 'story.first.trip.desc',
      icon: '✈️'
    },
    {
      dateKey: 'story.moving.date',
      titleKey: 'story.moving.title',
      descriptionKey: 'story.moving.desc',
      icon: '🏠'
    },
    {
      dateKey: 'story.proposal.date',
      titleKey: 'story.proposal.title',
      descriptionKey: 'story.proposal.desc',
      icon: '💍'
    }
  ]

  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-4xl md:text-6xl font-heading text-center text-deepNavy mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t('our.story')}
        </motion.h1>
        
        <div className="space-y-20">
          {timelineEvents.map((event, index) => (
            <TimelineEvent key={event.titleKey} event={event} index={index} />
          ))}
        </div>

        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <p className="text-xl text-terracotta italic">
            {t('story.continue')}
          </p>
        </motion.div>
      </div>
    </main>
  )
} 