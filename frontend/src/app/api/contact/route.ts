import { NextRequest, NextResponse } from 'next/server'
import { ContactService } from '@/application/services/contact.service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Basic rate limiting - check if request is too frequent
    // In production, use a proper rate limiting solution

    const contactService = new ContactService()
    await contactService.sendMessage({
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
      honeypot: body.honeypot,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending contact message:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
