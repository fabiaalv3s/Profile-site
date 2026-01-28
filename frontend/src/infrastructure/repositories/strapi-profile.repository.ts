import { ProfileRepository } from '@/domain/interfaces/profile.repository'
import { Profile } from '@/domain/entities/profile.entity'
import { strapiClient } from '../clients/strapi.client'
import { strapiProfileResponseSchema } from '../validators/profile.validator'
import { mapStrapiProfileToDomain } from '../mappers/profile.mapper'

export class StrapiProfileRepository implements ProfileRepository {
  async getProfile(): Promise<Profile> {
    // Try different endpoint variations for Strapi 5.x compatibility
    // Single types in Strapi 5.x may use singular or plural endpoints
    const endpoints = [
  
      '/profile', // Plural without populate
    ]

    let lastError: Error | null = null
    const attemptedEndpoints: string[] = []

    for (const endpoint of endpoints) {
      attemptedEndpoints.push(endpoint)
      try {
        const response = await strapiClient.get(endpoint)
        const validated = strapiProfileResponseSchema.parse(response)
        return mapStrapiProfileToDomain(validated)
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error')
        // Continue to next endpoint if this one fails
        continue
      }
    }

    // If all endpoints failed, throw detailed error
    throw new Error(
      `Failed to fetch profile from Strapi after trying ${endpoints.length} endpoint variations. ` +
      `Tried: ${attemptedEndpoints.join(', ')}. ` +
      `Last error: ${lastError?.message || 'Unknown error'}. ` +
      `\n\nTroubleshooting steps:\n` +
      `1. Check if Strapi is running: http://localhost:1337/admin\n` +
      `2. Verify Profile is published in Content Manager\n` +
      `3. Check API permissions: Settings → Users & Permissions → Roles → Public → Profile: find, findOne\n` +
      `4. Verify token in .env.local matches Strapi admin\n` +
      `5. Rebuild Strapi: cd cms/Profile && npm run build && npm run develop\n` +
      `6. Test manually: http://localhost:1337/api/profile with header: Authorization: Bearer {token}`
    )
  }
}
