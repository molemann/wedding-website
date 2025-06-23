import { NextResponse } from 'next/server'
import { config, isWebhookConfigured } from '@/config/env'

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log('RSVP submission received:', data)
    
    // Send the data to Integromat webhook if configured
    if (isWebhookConfigured()) {
      console.log('Webhook configured, sending to:', config.webhookUrl)
      
      const response = await fetch(config.webhookUrl!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      console.log('Webhook response status:', response.status)
      console.log('Webhook response ok:', response.ok)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Webhook error response:', errorText)
        throw new Error(`Failed to send data to webhook: ${response.status} ${errorText}`)
      }

      const responseData = await response.text()
      console.log('Webhook success response:', responseData)
    } else {
      // Fallback: log the data to console for development
      console.log('RSVP Data (webhook not configured):', data)
      console.log('To configure webhook, create .env.local with: INTEGROMAT_WEBHOOK_URL=https://your-webhook-url')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('RSVP submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit RSVP', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 