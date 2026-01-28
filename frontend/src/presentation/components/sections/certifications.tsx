'use client'

import { Certification } from '@/domain/entities/certification.entity'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { Award } from 'lucide-react'

interface CertificationsProps {
  certifications: Certification[]
}

export function CertificationsSection({ certifications }: CertificationsProps) {
  const t = useTranslations('sections.certifications')

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <section id="certifications" className="container py-20">
      <h2 className="mb-12 text-3xl font-bold">{t('title')}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <Card key={cert.id}>
            {cert.image && (
              <div className="relative h-32 w-full overflow-hidden rounded-t-lg">
                <Image
                  src={cert.image.url}
                  alt={cert.image.alternativeText || cert.name}
                  fill
                  className="object-contain p-4"
                />
              </div>
            )}
            <CardHeader>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">{cert.name}</CardTitle>
              </div>
              <CardDescription>{cert.issuer}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {formatDate(cert.issueDate)}
              </p>
              {cert.link && (
                <Link
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-sm text-primary hover:underline"
                >
                  Ver certificado
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
