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
    image: item.image?.data
      ? {
          url: item.image.data.url.startsWith('http')
            ? item.image.data.url
            : `${STRAPI_URL}${item.image.data.url}`,
          alternativeText: item.image.data.alternativeText,
        }
      : undefined,
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
    image: data.image?.data
      ? {
          url: data.image.data.url.startsWith('http')
            ? data.image.data.url
            : `${STRAPI_URL}${data.image.data.url}`,
          alternativeText: data.image.data.alternativeText,
        }
      : undefined,
    featured: data.featured,
    order: data.order,
  }
}
