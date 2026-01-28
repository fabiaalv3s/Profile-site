import { NextResponse } from 'next/server'
import { ProjectService } from '@/application/services/project.service'
import { StrapiProjectRepository } from '@/infrastructure/repositories/strapi-project.repository'

export const revalidate = 60

export async function GET() {
  try {
    const projectRepository = new StrapiProjectRepository()
    const projectService = new ProjectService(projectRepository)

    const projects = await projectService.getProjects()

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}
