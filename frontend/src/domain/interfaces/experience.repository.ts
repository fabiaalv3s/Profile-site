import { Experience } from '../entities/experience.entity'

export interface ExperienceRepository {
  getExperiences(): Promise<Experience[]>
}
