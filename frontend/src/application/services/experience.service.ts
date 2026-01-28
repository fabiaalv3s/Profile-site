import { ExperienceRepository } from '@/domain/interfaces/experience.repository'
import { Experience } from '@/domain/entities/experience.entity'

export class ExperienceService {
  constructor(private experienceRepository: ExperienceRepository) {}

  async getExperiences(): Promise<Experience[]> {
    return this.experienceRepository.getExperiences()
  }
}
