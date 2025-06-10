'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../context/LanguageContext'

const FAQCategory = ({ category, questions }: { category: string, questions: { q: string, a: string }[] }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const { t } = useLanguage()

  return (
    <div className="mb-8">
      <h2 className="font-heading text-2xl text-deepNavy mb-4">{t(category)}</h2>
      <div className="space-y-4">
        {questions.map((faq, index) => (
          <div key={faq.q} className="bg-warmIvory rounded-lg overflow-hidden">
            <button
              className="w-full px-6 py-4 text-left flex items-center justify-between"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <span className="font-medium text-deepNavy">{t(faq.q)}</span>
              <motion.div
                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDownIcon className="w-5 h-5 text-terracotta" />
              </motion.div>
            </button>
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-6 pb-4 text-gray-600">
                    {t(faq.a)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FAQs() {
  const { t } = useLanguage()

  const faqs = [
    {
      category: 'faqs.travel',
      questions: [
        {
          q: 'faqs.travel.airport',
          a: 'faqs.travel.airport.answer'
        },
        {
          q: 'faqs.travel.hotel',
          a: 'faqs.travel.hotel.answer'
        },
        {
          q: 'faqs.travel.transport',
          a: 'faqs.travel.transport.answer'
        }
      ]
    },
    {
      category: 'faqs.wedding.day',
      questions: [
        {
          q: 'faqs.wedding.arrival',
          a: 'faqs.wedding.arrival.answer'
        },
        {
          q: 'faqs.wedding.dress',
          a: 'faqs.wedding.dress.answer'
        },
        {
          q: 'faqs.wedding.photos',
          a: 'faqs.wedding.photos.answer'
        }
      ]
    },
    {
      category: 'faqs.things.to.do',
      questions: [
        {
          q: 'faqs.madrid.sights',
          a: 'faqs.madrid.sights.answer'
        },
        {
          q: 'faqs.day.trips',
          a: 'faqs.day.trips.answer'
        },
        {
          q: 'faqs.tapas',
          a: 'faqs.tapas.answer'
        }
      ]
    }
  ]

  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.h1 
          className="text-4xl md:text-6xl font-heading text-center text-deepNavy mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t('faqs.title')}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {faqs.map((category) => (
            <FAQCategory 
              key={category.category} 
              category={category.category} 
              questions={category.questions} 
            />
          ))}

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">{t('faqs.still.questions')}</p>
            <a 
              href="mailto:wedding@example.com" 
              className="text-terracotta hover:text-burntOrange transition-colors"
            >
              {t('faqs.contact.us')}
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  )
} 