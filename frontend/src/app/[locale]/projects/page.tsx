import { ProjectService } from '@/application/services/project.service'
import { StrapiProjectRepository } from '@/infrastructure/repositories/strapi-project.repository'
import { ProjectsSection } from '@/presentation/components/sections/projects'
import { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Projetos - Portfolio',
  description: 'Lista de projetos desenvolvidos',
}

async function getProjects() {
  const projectRepository = new StrapiProjectRepository()
  const projectService = new ProjectService(projectRepository)
  return projectService.getProjects()
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <main className="min-h-screen">
      <ProjectsSection projects={projects} />
    </main>
  )
}
