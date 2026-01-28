import { Project } from '../entities/project.entity'

export interface ProjectRepository {
  getProjects(): Promise<Project[]>
  getProjectBySlug(slug: string): Promise<Project | null>
  getFeaturedProjects(): Promise<Project[]>
}
