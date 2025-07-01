'use client'

import { useLanguage } from './context/LanguageContext'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const { t, language } = useLanguage()
  const router = useRouter()

  const content = {
    en: {
      title: "Oops! This is a bit uncomfortable, but it looks like you're lost!",
      subtitle: "Don't worry, even the best wedding guests get confused sometimes!",
      suggestion: "Let's get you back on track:",
      homeButton: "Back to Home",
      rsvpButton: "RSVP Now",
      detailsButton: "Wedding Details"
    },
    es: {
      title: "¡Ups! ¡Esto es un poco incómodo, pero creo que te has perdido!",
      subtitle: "¡No te preocupes, hasta los mejores invitados se confunden a veces!",
      suggestion: "Deja que te eche una mano para volver:",
      homeButton: "Volver al Inicio",
      rsvpButton: "Confirmar Asistencia",
      detailsButton: "Detalles de la Boda"
    }
  }

  const currentContent = content[language as keyof typeof content]

  return (
    <div className="min-h-screen bg-gradient-to-b from-warmIvory to-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Doge Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="relative w-64 h-64 mx-auto mb-6">
            <Image
              src="/images/404-doge.png"
              alt="404 Doge"
              width={256}
              height={256}
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-deepNavy font-bold">
            {currentContent.title}
          </h2>
          
          <p className="text-lg text-terracotta font-medium">
            {currentContent.subtitle}
          </p>
          
          <p className="text-sm text-gray-500 mb-4">
            {currentContent.suggestion}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-terracotta text-white rounded-md font-serif hover:bg-burntOrange transition-colors duration-200 shadow-md"
              >
                {currentContent.homeButton}
              </motion.button>
            </Link>
            
            <Link href="/#rsvp">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border-2 border-terracotta text-terracotta rounded-md font-serif hover:bg-terracotta hover:text-white transition-colors duration-200"
              >
                {currentContent.rsvpButton}
              </motion.button>
            </Link>
            
            <Link href="/#details-info">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border-2 border-deepNavy text-deepNavy rounded-md font-serif hover:bg-deepNavy hover:text-white transition-colors duration-200"
              >
                {currentContent.detailsButton}
              </motion.button>
            </Link>
          </div>
          

        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 flex justify-center space-x-4 text-2xl"
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🌸
          </motion.span>
          <motion.span
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            🌹
          </motion.span>
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            🌸
          </motion.span>
        </motion.div>
      </div>
    </div>
  )
} 