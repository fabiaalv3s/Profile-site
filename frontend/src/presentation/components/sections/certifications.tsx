'use client'

import { useState } from 'react'
import { Certification } from '@/domain/entities/certification.entity'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import Image from 'next/image'
import Link from 'next/link'
import { Award } from 'lucide-react'

interface CertificationsProps {
  certifications: Certification[]
}

export function CertificationsSection({ certifications }: CertificationsProps) {
  const t = useTranslations('sections.certifications')
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null)

  const formatDate = (dateString: string) => {
    const isoMatch = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateString)
    const date = isoMatch
      ? new Date(
          parseInt(isoMatch[1], 10),
          parseInt(isoMatch[2], 10) - 1,
          parseInt(isoMatch[3], 10)
        )
      : new Date(dateString)
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
          <Card key={cert.id} className="overflow-hidden">
            {cert.image && (
              <button
                type="button"
                className="relative block w-full border-b border-primary/20 bg-primary/5 p-4 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                onClick={() =>
                  setSelectedImage({
                    url: cert.image!.url,
                    alt: cert.image!.alternativeText || cert.name,
                  })
                }
                aria-label={t('viewCertificate')}
              >
                <div className="relative mx-auto aspect-[4/3] max-h-40 w-full max-w-xs overflow-hidden rounded-lg">
                  <Image
                    src={cert.image.url}
                    alt={cert.image.alternativeText || cert.name}
                    fill
                    className="object-contain transition-opacity hover:opacity-90"
                    sizes="(max-width: 768px) 100vw, 320px"
                    unoptimized
                  />
                </div>
              </button>
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

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full max-h-[90vh] p-0 bg-background/98 border-2">
          <DialogTitle className="sr-only">
            {selectedImage?.alt || t('viewCertificate')}
          </DialogTitle>
          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center overflow-auto p-4">
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                width={800}
                height={565}
                className="max-w-full max-h-full object-contain rounded-lg"
                sizes="(max-width: 768px) 100vw, 800px"
                unoptimized
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
