import { EducationRepository } from '@/domain/interfaces/education.repository'
import { Education } from '@/domain/entities/education.entity'
import { strapiClient } from '../clients/strapi.client'
import { strapiEducationResponseSchema } from '../validators/education.validator'
import { mapStrapiEducationsToDomain } from '../mappers/education.mapper'

export class StrapiEducationRepository implements EducationRepository {
  async getEducations(): Promise<Education[]> {
    const endpoints = [
      '/educations?sort=order:asc,endDate:desc',
      '/educations?populate=*&sort=order:asc,endDate:desc',
      '/educations',
    ]

    let lastError: Error | null = null

    for (const endpoint of endpoints) {
      try {
        const response = await strapiClient.get(endpoint)
        const validated = strapiEducationResponseSchema.parse(response)
        return mapStrapiEducationsToDomain(validated)
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error')
        continue
      }
    }

    throw new Error(
      `Failed to fetch educations from Strapi. Tried: ${endpoints.join(', ')}. ` +
      `Error: ${lastError?.message || 'Unknown error'}`
    )
  }
}
