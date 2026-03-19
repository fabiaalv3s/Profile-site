import { Certification } from '@/domain/entities/certification.entity'
import { StrapiCertificationResponse } from '../validators/certification.validator'
import { STRAPI_URL } from '@/lib/constants'

function normalizeImageUrl(url: string): string {
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
}

export function mapStrapiCertificationsToDomain(
  response: StrapiCertificationResponse
): Certification[] {
  return response.data.map((item) => {
    // Strapi 4: image.data; Strapi 5: image objeto ou array (populate=* retorna array)
    const raw = item.image
    let media: { url: string; alternativeText?: string } | null = null
    if (raw && 'data' in raw) {
      media = raw.data ?? null
    } else if (Array.isArray(raw) && raw.length > 0) {
      media = raw[0]
    } else if (raw && typeof raw === 'object' && 'url' in raw) {
      media = raw
    }
    const image =
      media && media.url
        ? {
            url: normalizeImageUrl(media.url),
            alternativeText: media.alternativeText,
          }
        : undefined

    return {
      id: item.id,
      name: item.name,
      issuer: item.issuer,
      issueDate: item.issueDate,
      link: item.link || undefined,
      image,
      order: item.order,
    }
  })
}
