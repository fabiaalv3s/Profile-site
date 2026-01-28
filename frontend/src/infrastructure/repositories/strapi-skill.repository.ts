import { SkillRepository } from '@/domain/interfaces/skill.repository'
import { Skill } from '@/domain/entities/skill.entity'
import { strapiClient } from '../clients/strapi.client'
import { strapiSkillResponseSchema } from '../validators/skill.validator'
import { mapStrapiSkillsToDomain } from '../mappers/skill.mapper'

export class StrapiSkillRepository implements SkillRepository {
  async getSkills(): Promise<Skill[]> {
    const endpoints = [
      
      '/skills',
    ]

    let lastError: Error | null = null

    for (const endpoint of endpoints) {
      try {
        const response = await strapiClient.get(endpoint)
        const validated = strapiSkillResponseSchema.parse(response)
        return mapStrapiSkillsToDomain(validated)
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error')
        continue
      }
    }

    throw new Error(
      `Failed to fetch skills from Strapi. Tried: ${endpoints.join(', ')}. ` +
      `Error: ${lastError?.message || 'Unknown error'}`
    )
  }
}
