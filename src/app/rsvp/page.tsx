'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RSVPPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to main page with RSVP section
    router.replace('/#rsvp')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg text-gray-600">Redirecting to RSVP section...</p>
      </div>
    </div>
  )
} 