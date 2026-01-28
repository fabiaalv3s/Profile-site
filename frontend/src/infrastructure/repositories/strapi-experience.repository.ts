import { ExperienceRepository } from '@/domain/interfaces/experience.repository'
import { Experience } from '@/domain/entities/experience.entity'
import { strapiClient } from '../clients/strapi.client'
import { strapiExperienceResponseSchema } from '../validators/experience.validator'
import { mapStrapiExperiencesToDomain } from '../mappers/experience.mapper'

export class StrapiExperienceRepository implements ExperienceRepository {
  async getExperiences(): Promise<Experience[]> {
    // Try with and without populate for Strapi 5.x compatibility
    const endpoints = [
    
      '/experiences',
    ]

    let lastError: Error | null = null

    for (const endpoint of endpoints) {
      try {
        const response = await strapiClient.get(endpoint)
        const validated = strapiExperienceResponseSchema.parse(response)
        return mapStrapiExperiencesToDomain(validated)
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error')
        continue
      }
    }

    throw new Error(
      `Failed to fetch experiences from Strapi. Tried: ${endpoints.join(', ')}. ` +
      `Error: ${lastError?.message || 'Unknown error'}`
    )
  }
}
