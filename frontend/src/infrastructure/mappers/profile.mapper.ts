import { Profile } from '@/domain/entities/profile.entity'
import { StrapiProfileResponse } from '../validators/profile.validator'
import { STRAPI_URL } from '@/lib/constants'

export function mapStrapiProfileToDomain(response: StrapiProfileResponse): Profile {
  const { data } = response

  return {
    id: data.id,
    name: data.name,
    headline: data.headline,
    summary: data.summary || undefined,
    location: data.location || undefined,
    phone: data.phone || undefined,
    email: data.email,
    linkedin: data.linkedin || undefined,
    github: data.github || undefined,
    photo: data.photo
      ? {
          url: data.photo.url.startsWith('http')
            ? data.photo.url
            : `${STRAPI_URL}${data.photo.url}`,
          alternativeText: data.photo.alternativeText,
        }
      : undefined,
    cvPdf: data.cvPdf
      ? {
          url: data.cvPdf.url.startsWith('http')
            ? data.cvPdf.url
            : `${STRAPI_URL}${data.cvPdf.url}`,
          name: data.cvPdf.name || '',
        }
      : undefined,
  }
}
