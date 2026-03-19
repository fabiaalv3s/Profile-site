import { CertificationRepository } from '@/domain/interfaces/certification.repository'
import { Certification } from '@/domain/entities/certification.entity'
import { strapiClient } from '../clients/strapi.client'
import { strapiCertificationResponseSchema } from '../validators/certification.validator'
import { mapStrapiCertificationsToDomain } from '../mappers/certification.mapper'

export class StrapiCertificationRepository implements CertificationRepository {
  async getCertifications(): Promise<Certification[]> {
    const endpoints = [
      '/certifications?populate=*',
      '/certifications',
    ]

    let lastError: Error | null = null

    for (const endpoint of endpoints) {
      try {
        const response = await strapiClient.get(endpoint)
        const validated = strapiCertificationResponseSchema.parse(response)
        return mapStrapiCertificationsToDomain(validated)
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error')
        continue
      }
    }

    throw new Error(
      `Failed to fetch certifications from Strapi. Tried: ${endpoints.join(', ')}. ` +
      `Error: ${lastError?.message || 'Unknown error'}`
    )
  }
}
