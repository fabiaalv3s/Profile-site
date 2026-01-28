import { Skill } from '@/domain/entities/skill.entity'
import { StrapiSkillResponse } from '../validators/skill.validator'

export function mapStrapiSkillsToDomain(response: StrapiSkillResponse): Skill[] {
  return response.data.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    level: item.level,
    order: item.order,
  }))
}
