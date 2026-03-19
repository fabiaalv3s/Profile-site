'use client'

import { Profile } from '@/domain/entities/profile.entity'
import { Button } from '../ui/button'
import { useTranslations } from 'next-intl'
import { FaWhatsapp } from 'react-icons/fa'

interface ContactSectionProps {
  profile: Profile
}

export function ContactSection({ profile }: ContactSectionProps) {
  const t = useTranslations('sections.contact')
  const tCommon = useTranslations('common')

  // Função para formatar telefone para WhatsApp
  const formatPhoneForWhatsApp = (phone?: string): string | null => {
    if (!phone) return null

    // Remove caracteres não numéricos
    const numbers = phone.replace(/\D/g, '')

    // Se já começa com 55 (Brasil), retorna como está
    if (numbers.startsWith('55')) {
      return numbers
    }

    // Se começa com 0, remove o 0 e adiciona 55
    if (numbers.startsWith('0')) {
      return `55${numbers.substring(1)}`
    }

    // Adiciona código do país
    return `55${numbers}`
  }

  const whatsappNumber = formatPhoneForWhatsApp(profile.phone)
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de entrar em contato.')}`
    : null

  if (!whatsappUrl) {
    return null // Não renderiza se não houver telefone
  }

  return (
    <section id="contact" className="container py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 text-3xl font-bold">{t('title')}</h2>
        <p className="mb-8 text-muted-foreground">{t('description')}</p>
        <Button
          asChild
          size="lg"
          className="h-12 rounded-xl bg-emerald-600 px-6 text-base text-white shadow-lg transition-all hover:bg-emerald-500 hover:shadow-xl"
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="mr-2 h-5 w-5" />
            {t('whatsappButton') || 'Fale comigo no WhatsApp'}
          </a>
        </Button>
      </div>
    </section>
  )
}
