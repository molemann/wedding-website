'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/app/context/LanguageContext'

interface Event {
  time: string;
  titleKey: string;
  locationKey: string;
  descriptionKey: string;
  icon: string;
  image: string;
}

interface InteractiveTimelineProps {
  events: Event[];
}

const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(events[0] || null)
  const { t } = useLanguage()

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-8 p-4 md:p-8 font-serif">
      <div className="w-full md:w-1/3 space-y-4">
        {events.map((event, index) => (
          <motion.div
            key={index}
            onClick={() => setSelectedEvent(event)}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
              selectedEvent?.titleKey === event.titleKey
                ? 'bg-[#8E354A] text-white shadow-lg scale-105'
                : 'bg-white/80 hover:bg-white/100'
            }`}
            whileHover={{ scale: selectedEvent?.titleKey === event.titleKey ? 1.05 : 1.02 }}
          >
            <div className="flex items-center gap-4">
              <div className="text-2xl">{event.icon}</div>
              <div>
                <div className="font-bold text-lg">{t(event.titleKey)}</div>
                <div className="text-sm">{event.time}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="w-full md:w-2/3">
        <AnimatePresence mode="wait">
          {selectedEvent && (
            <motion.div
              key={selectedEvent.titleKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 p-6 rounded-lg shadow-xl h-full flex flex-col"
            >
              <motion.img
                src={selectedEvent.image}
                alt={t(selectedEvent.titleKey)}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="flex-grow">
                <h3 className="text-2xl font-bold font-heading text-[#64564a] mb-2">{t(selectedEvent.titleKey)}</h3>
                <p className="text-lg text-gray-700 mb-2">{t(selectedEvent.locationKey)}</p>
                <p className="text-base text-gray-600">{t(selectedEvent.descriptionKey)}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default InteractiveTimeline; 