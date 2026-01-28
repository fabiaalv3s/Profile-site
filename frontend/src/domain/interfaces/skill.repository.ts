import { Skill } from '../entities/skill.entity'

export interface SkillRepository {
  getSkills(): Promise<Skill[]>
}
