import { ProjectRepository } from '@/domain/interfaces/project.repository'
import { Project } from '@/domain/entities/project.entity'
import { strapiClient } from '../clients/strapi.client'
import {
  strapiProjectResponseSchema,
  strapiSingleProjectResponseSchema,
} from '../validators/project.validator'
import {
  mapStrapiProjectsToDomain,
  mapStrapiProjectToDomain,
} from '../mappers/project.mapper'

export class StrapiProjectRepository implements ProjectRepository {
  async getProjects(): Promise<Project[]> {
    const endpoints = [
      
      '/projects',
    ]

    let lastError: Error | null = null

    for (const endpoint of endpoints) {
      try {
        const response = await strapiClient.get(endpoint)
        const validated = strapiProjectResponseSchema.parse(response)
        return mapStrapiProjectsToDomain(validated)
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error')
        continue
      }
    }

    throw new Error(
      `Failed to fetch projects from Strapi. Tried: ${endpoints.join(', ')}. ` +
      `Error: ${lastError?.message || 'Unknown error'}`
    )
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    const endpoints = [
      `/projects?filters[slug][$eq]=${slug}&populate=*`,
      `/projects?filters[slug][$eq]=${slug}`,
    ]

    for (const endpoint of endpoints) {
      try {
        const response = await strapiClient.get(endpoint)
        const validated = strapiProjectResponseSchema.parse(response)
        const projects = mapStrapiProjectsToDomain(validated)
        return projects[0] || null
      } catch {
        continue
      }
    }

    return null
  }

  async getFeaturedProjects(): Promise<Project[]> {
    const endpoints = [
      '/projects?filters[featured][$eq]=true&populate=*&sort=order:asc',
      '/projects?filters[featured][$eq]=true&sort=order:asc',
      '/projects?filters[featured][$eq]=true',
    ]

    let lastError: Error | null = null

    for (const endpoint of endpoints) {
      try {
        const response = await strapiClient.get(endpoint)
        const validated = strapiProjectResponseSchema.parse(response)
        return mapStrapiProjectsToDomain(validated)
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error')
        continue
      }
    }

    throw new Error(
      `Failed to fetch featured projects from Strapi. Tried: ${endpoints.join(', ')}. ` +
      `Error: ${lastError?.message || 'Unknown error'}`
    )
  }
}
