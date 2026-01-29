import { Project } from '@/domain/entities/project.entity'
import {
  StrapiProjectResponse,
  StrapiSingleProjectResponse,
} from '../validators/project.validator'
import { STRAPI_URL } from '@/lib/constants'

export function mapStrapiProjectsToDomain(
  response: StrapiProjectResponse
): Project[] {
  return response.data.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    description: item.description || undefined,
    stack: item.stack || undefined,
    demoUrl: item.demoUrl || undefined,
    githubUrl: item.githubUrl || undefined,
    image: (() => {
      // Tenta formato direto primeiro (Strapi 5.x com populate=*)
      if (item.image && 'url' in item.image && typeof item.image.url === 'string') {
        return {
          url: item.image.url.startsWith('http')
            ? item.image.url
            : `${STRAPI_URL}${item.image.url}`,
          alternativeText: item.image.alternativeText,
        }
      }
      // Fallback para formato com wrapper data
      if (item.image && typeof item.image === 'object' && 'data' in item.image && item.image.data) {
        return {
          url: item.image.data.url.startsWith('http')
            ? item.image.data.url
            : `${STRAPI_URL}${item.image.data.url}`,
          alternativeText: item.image.data.alternativeText,
        }
      }
      return undefined
    })(),
    featured: item.featured,
    order: item.order,
  }))
}

export function mapStrapiProjectToDomain(
  response: StrapiSingleProjectResponse
): Project {
  const { data } = response

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description || undefined,
    stack: data.stack || undefined,
    demoUrl: data.demoUrl || undefined,
    githubUrl: data.githubUrl || undefined,
    image: (() => {
      // Tenta formato direto primeiro (Strapi 5.x com populate=*)
      if (data.image && 'url' in data.image && typeof data.image.url === 'string') {
        return {
          url: data.image.url.startsWith('http')
            ? data.image.url
            : `${STRAPI_URL}${data.image.url}`,
          alternativeText: data.image.alternativeText,
        }
      }
      // Fallback para formato com wrapper data
      if (data.image && typeof data.image === 'object' && 'data' in data.image && data.image.data) {
        return {
          url: data.image.data.url.startsWith('http')
            ? data.image.data.url
            : `${STRAPI_URL}${data.image.data.url}`,
          alternativeText: data.image.data.alternativeText,
        }
      }
      return undefined
    })(),
    featured: data.featured,
    order: data.order,
  }
}
