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
    photo: data.photo?.data
      ? {
          url: data.photo.data.url.startsWith('http')
            ? data.photo.data.url
            : `${STRAPI_URL}${data.photo.data.url}`,
          alternativeText: data.photo.data.alternativeText,
        }
      : undefined,
    cvPdf: data.cvPdf?.data
      ? {
          url: data.cvPdf.data.url.startsWith('http')
            ? data.cvPdf.data.url
            : `${STRAPI_URL}${data.cvPdf.data.url}`,
          name: data.cvPdf.data.name || '',
        }
      : undefined,
  }
}
