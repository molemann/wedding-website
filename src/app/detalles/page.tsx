'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DetallesPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to main page with details section
    router.replace('/#details-info')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg text-gray-600">Redirecting to details section...</p>
      </div>
    </div>
  )
} 