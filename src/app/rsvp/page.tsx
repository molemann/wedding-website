'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../context/LanguageContext'

export default function RSVPPage() {
  const router = useRouter()
  const { t, language } = useLanguage()

  useEffect(() => {
    // Redirect to main page with RSVP section
    router.replace('/#rsvp')
  }, [router])

  const redirectMessage = language === 'es' 
    ? 'Te estamos redirigiendo al formulario de confirmación...' 
    : 'We are taking you to the RSVP form...'

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg text-gray-600">{redirectMessage}</p>
      </div>
    </div>
  )
} 