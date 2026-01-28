import { Education } from '@/domain/entities/education.entity'
import { StrapiEducationResponse } from '../validators/education.validator'

export function mapStrapiEducationsToDomain(
  response: StrapiEducationResponse
): Education[] {
  return response.data.map((item) => ({
    id: item.id,
    institution: item.institution,
    course: item.course,
    startDate: item.startDate,
    endDate: item.endDate || undefined,
    description: item.description || undefined,
    order: item.order,
  }))
}
