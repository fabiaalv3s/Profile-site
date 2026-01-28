'use client'

import { useTranslations } from 'next-intl'
import { useContactForm } from '../../hooks/use-contact-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { useState, useEffect } from 'react'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  subject: z.string().min(1, 'Assunto é obrigatório'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
})

export function ContactSection() {
  const t = useTranslations('sections.contact')
  const tCommon = useTranslations('common')
  const { submit, loading, error, success } = useContactForm()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (success) {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        honeypot: '',
      })
    }
  }, [success])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    try {
      const validated = contactSchema.parse(formData)
      await submit({
        ...validated,
        honeypot: formData.honeypot,
      })
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        err.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0].toString()] = error.message
          }
        })
        setErrors(fieldErrors)
      }
    }
  }

  return (
    <section id="contact" className="container py-20">
      <h2 className="mb-4 text-3xl font-bold">{t('title')}</h2>
      <p className="mb-8 text-muted-foreground">{t('description')}</p>
      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />
        <div className="space-y-2">
          <Label htmlFor="name">{tCommon('name')}</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{tCommon('email')}</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">{tCommon('subject')}</Label>
          <Input
            id="subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
          />
          {errors.subject && (
            <p className="text-sm text-destructive">{errors.subject}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">{tCommon('message')}</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={6}
            required
          />
          {errors.message && (
            <p className="text-sm text-destructive">{errors.message}</p>
          )}
        </div>
        {error && (
          <p className="text-sm text-destructive">{tCommon('errorSending')}</p>
        )}
        {success && (
          <p className="text-sm text-green-600">{tCommon('messageSent')}</p>
        )}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? tCommon('sending') : tCommon('sendMessage')}
        </Button>
      </form>
    </section>
  )
}
