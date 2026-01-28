import { Certification } from '@/domain/entities/certification.entity'
import { StrapiCertificationResponse } from '../validators/certification.validator'
import { STRAPI_URL } from '@/lib/constants'

export function mapStrapiCertificationsToDomain(
  response: StrapiCertificationResponse
): Certification[] {
  return response.data.map((item) => ({
    id: item.id,
    name: item.name,
    issuer: item.issuer,
    issueDate: item.issueDate,
    link: item.link || undefined,
    image: item.image?.data
      ? {
          url: item.image.data.url.startsWith('http')
            ? item.image.data.url
            : `${STRAPI_URL}${item.image.data.url}`,
          alternativeText: item.image.data.alternativeText,
        }
      : undefined,
    order: item.order,
  }))
}
