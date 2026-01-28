'use client'

import { Profile } from '@/domain/entities/profile.entity'
import { Button } from '../ui/button'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Download, Mail } from 'lucide-react'
import Link from 'next/link'

interface HeroProps {
  profile: Profile
}

export function Hero({ profile }: HeroProps) {
  const t = useTranslations('common')
  const tHero = useTranslations('sections.hero')

  return (
    <section className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 py-20 md:flex-row md:gap-12">
      <div className="flex flex-1 flex-col items-center gap-6 text-center md:items-start md:text-left">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {profile.name}
        </h1>
        <p className="text-xl text-muted-foreground sm:text-2xl">
          {profile.headline}
        </p>
        <p className="text-lg text-muted-foreground">{tHero('subtitle')}</p>
        <div className="flex flex-wrap gap-4">
          {profile.cvPdf && (
            <Button asChild size="lg">
              <a href={profile.cvPdf.url} download>
                <Download className="mr-2 h-4 w-4" />
                {t('downloadCv')}
              </a>
            </Button>
          )}
          <Button asChild variant="outline" size="lg">
            <Link href="#contact">
              <Mail className="mr-2 h-4 w-4" />
              {t('contact')}
            </Link>
          </Button>
        </div>
      </div>
      {profile.photo && (
        <div className="relative h-64 w-64 flex-shrink-0 overflow-hidden rounded-full border-4 border-primary md:h-80 md:w-80">
          <Image
            src={profile.photo.url}
            alt={profile.photo.alternativeText || profile.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
    </section>
  )
}
