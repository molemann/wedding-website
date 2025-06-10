'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import { motion } from 'framer-motion'

const countryFlags = {
  // Using regional indicator symbols that combine to form flags
  en: '🇬🇧',
  es: '🇪🇸'
}

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div 
        className="bg-white/80 backdrop-blur-sm rounded-full shadow-lg px-3 py-2 flex gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={() => setLanguage('en')}
          className={`relative px-3 py-1 rounded-full transition-all duration-300 ${
            language === 'en'
              ? 'bg-terracotta text-white'
              : 'text-deepNavy hover:bg-terracotta/10'
          }`}
        >
          <motion.div
            className="flex items-center gap-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: language === 'en' ? 1 : 0.9 }}
          >
            <img src="/images/flag-uk.png" alt="UK Flag" width={24} height={24} style={{ display: 'inline-block' }} />
          </motion.div>
          {language === 'en' && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </button>
        <button
          onClick={() => setLanguage('es')}
          className={`relative px-3 py-1 rounded-full transition-all duration-300 ${
            language === 'es'
              ? 'bg-terracotta text-white'
              : 'text-deepNavy hover:bg-terracotta/10'
          }`}
        >
          <motion.div
            className="flex items-center gap-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: language === 'es' ? 1 : 0.9 }}
          >
            <img src="/images/flag-es.png" alt="Spain Flag" width={24} height={24} style={{ display: 'inline-block' }} />
          </motion.div>
          {language === 'es' && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      </motion.div>
    </div>
  )
} 