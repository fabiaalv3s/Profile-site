import { strapiClient } from '@/infrastructure/clients/strapi.client'

export interface ContactMessage {
  name: string
  email: string
  subject: string
  message: string
  honeypot?: string
}

export class ContactService {
  async sendMessage(message: ContactMessage): Promise<void> {
    // Check honeypot
    if (message.honeypot) {
      throw new Error('Spam detected')
    }

    await strapiClient.post('/contact-messages', {
      name: message.name,
      email: message.email,
      subject: message.subject,
      message: message.message,
      honeypot: message.honeypot || '',
    })
  }
}
