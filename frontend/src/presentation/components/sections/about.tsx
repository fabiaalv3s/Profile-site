'use client'

import { Profile } from '@/domain/entities/profile.entity'
import { useTranslations } from 'next-intl'

interface AboutProps {
  profile: Profile
}

export function About({ profile }: AboutProps) {
  const t = useTranslations('sections.about')

  return (
    <section id="about" className="container py-20">
      <h2 className="mb-8 text-3xl font-bold">{t('title')}</h2>
      {profile.summary && (
        <div
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: profile.summary }}
        />
      )}
    </section>
  )
}
