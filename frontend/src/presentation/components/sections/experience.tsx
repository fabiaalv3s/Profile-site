'use client'

import { Experience } from '@/domain/entities/experience.entity'
import { useTranslations } from 'next-intl'
import { Calendar } from 'lucide-react'

interface ExperienceProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceProps) {
  const t = useTranslations('sections.experience')
  const tCommon = useTranslations('common')

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <section id="experience" className="container py-20">
      <h2 className="mb-12 text-3xl font-bold">{t('title')}</h2>
      <div className="space-y-8">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="relative border-l-2 border-primary pl-8 pb-8 last:pb-0"
          >
            <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary" />
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold">{exp.position}</h3>
              <p className="text-lg text-muted-foreground">{exp.company}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {formatDate(exp.startDate)} -{' '}
                  {exp.isCurrent ? tCommon('current') : formatDate(exp.endDate!)}
                </span>
              </div>
              {exp.location && (
                <p className="text-sm text-muted-foreground">{exp.location}</p>
              )}
              {exp.description && (
                <div
                  className="prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: exp.description }}
                />
              )}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {exp.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="rounded-md bg-secondary px-2 py-1 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
