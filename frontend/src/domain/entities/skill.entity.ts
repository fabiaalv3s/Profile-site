export type SkillCategory = 'frontend' | 'backend' | 'tools' | 'languages' | 'other'

export interface Skill {
  id: number
  name: string
  category: SkillCategory
  level?: number // 1-5, opcional
  order: number
}
