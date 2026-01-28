import { Experience } from '@/domain/entities/experience.entity'
import { StrapiExperienceResponse } from '../validators/experience.validator'

export function mapStrapiExperiencesToDomain(
  response: StrapiExperienceResponse
): Experience[] {
  return response.data.map((item) => ({
    id: item.id,
    company: item.company,
    position: item.position,
    startDate: item.startDate,
    endDate: item.endDate || undefined,
    isCurrent: item.isCurrent,
    description: item.description || undefined,
    technologies: item.technologies || undefined,
    location: item.location || undefined,
    order: item.order,
  }))
}
