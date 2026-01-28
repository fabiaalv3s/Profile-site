'use client'

import { Education } from '@/domain/entities/education.entity'
import { useTranslations } from 'next-intl'
import { GraduationCap } from 'lucide-react'

interface EducationProps {
  educations: Education[]
}

export function EducationSection({ educations }: EducationProps) {
  const t = useTranslations('sections.education')

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <section id="education" className="container py-20">
      <h2 className="mb-12 text-3xl font-bold">{t('title')}</h2>
      <div className="space-y-8">
        {educations.map((edu) => (
          <div
            key={edu.id}
            className="relative border-l-2 border-primary pl-8 pb-8 last:pb-0"
          >
            <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary" />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">{edu.course}</h3>
              </div>
              <p className="text-lg text-muted-foreground">{edu.institution}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>
                  {formatDate(edu.startDate)} -{' '}
                  {edu.endDate ? formatDate(edu.endDate) : 'Atual'}
                </span>
              </div>
              {edu.description && (
                <div
                  className="prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: edu.description }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
