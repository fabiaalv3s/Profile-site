'use client'

import { Skill, SkillCategory } from '@/domain/entities/skill.entity'
import { useTranslations } from 'next-intl'

interface SkillsProps {
  skills: Skill[]
}

const categoryLabels: Record<SkillCategory, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Ferramentas',
  languages: 'Linguagens',
  other: 'Outros',
}

export function SkillsSection({ skills }: SkillsProps) {
  const t = useTranslations('sections.skills')

  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<SkillCategory, Skill[]>
  )

  const getLevelLabel = (level: number) => {
    const labels = ['Iniciante', 'Básico', 'Intermediário', 'Avançado', 'Expert']
    return labels[level - 1] || 'Desconhecido'
  }

  return (
    <section id="skills" className="container py-20">
      <h2 className="mb-12 text-3xl font-bold">{t('title')}</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-xl font-semibold">
              {categoryLabels[category as SkillCategory]}
            </h3>
            <div className="space-y-3">
              {categorySkills.map((skill) => (
                <div key={skill.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {getLevelLabel(skill.level)}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
