import { ProjectRepository } from '@/domain/interfaces/project.repository'
import { Project } from '@/domain/entities/project.entity'

export class ProjectService {
  constructor(private projectRepository: ProjectRepository) {}

  async getProjects(): Promise<Project[]> {
    return this.projectRepository.getProjects()
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    return this.projectRepository.getProjectBySlug(slug)
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return this.projectRepository.getFeaturedProjects()
  }
}
