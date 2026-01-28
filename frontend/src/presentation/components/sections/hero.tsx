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
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/20 py-20">
      <div className="container flex flex-col items-center gap-8 md:flex-row md:gap-12">
        <div className="flex flex-1 flex-col items-center gap-6 text-center md:items-start md:text-left">
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              {profile.name}
            </h1>
            <p className="text-xl font-semibold text-primary sm:text-2xl md:text-3xl">
              {profile.headline}
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {tHero('subtitle')}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
            {profile.cvPdf && (
              <Button asChild size="lg" className="text-base px-6 py-6 h-auto shadow-lg hover:shadow-xl transition-all">
                <a href={profile.cvPdf.url} download>
                  <Download className="mr-2 h-5 w-5" />
                  {t('downloadCv')}
                </a>
              </Button>
            )}
            <Button asChild variant="outline" size="lg" className="text-base px-6 py-6 h-auto">
              <Link href="#contact">
                <Mail className="mr-2 h-5 w-5" />
                {t('contact')}
              </Link>
            </Button>
          </div>
        </div>
        {profile.photo && (
          <div className="relative h-64 w-64 flex-shrink-0 overflow-hidden rounded-full border-4 border-primary shadow-2xl md:h-80 md:w-80 animate-in fade-in zoom-in-95 duration-700 delay-500">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full" />
            <Image
              src={profile.photo.url}
              alt={profile.photo.alternativeText || profile.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>
    </section>
  )
}
