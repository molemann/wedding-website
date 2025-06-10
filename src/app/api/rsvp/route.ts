import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Send the data to Integromat webhook
    const webhookUrl = process.env.INTEGROMAT_WEBHOOK_URL
    
    if (!webhookUrl) {
      throw new Error('Webhook URL not configured')
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to send data to webhook')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('RSVP submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit RSVP' },
      { status: 500 }
    )
  }
} 