import { Education } from '../entities/education.entity'

export interface EducationRepository {
  getEducations(): Promise<Education[]>
}
