export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'tools'
  | 'languages'
  | 'banco_de_dados'
  | 'other'

export interface Skill {
  id: number
  name: string
  category: SkillCategory
  level?: number // 1-5, opcional
  order: number
}
