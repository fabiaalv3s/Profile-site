import { NextResponse } from 'next/server'
import { GetPortfolioDataUseCase } from '@/application/usecases/get-portfolio-data.usecase'
import { ProfileService } from '@/application/services/profile.service'
import { ExperienceService } from '@/application/services/experience.service'
import { ProjectService } from '@/application/services/project.service'
import { StrapiProfileRepository } from '@/infrastructure/repositories/strapi-profile.repository'
import { StrapiExperienceRepository } from '@/infrastructure/repositories/strapi-experience.repository'
import { StrapiEducationRepository } from '@/infrastructure/repositories/strapi-education.repository'
import { StrapiSkillRepository } from '@/infrastructure/repositories/strapi-skill.repository'
import { StrapiProjectRepository } from '@/infrastructure/repositories/strapi-project.repository'
import { StrapiCertificationRepository } from '@/infrastructure/repositories/strapi-certification.repository'

export const revalidate = 60

export async function GET() {
  try {
    const profileRepository = new StrapiProfileRepository()
    const experienceRepository = new StrapiExperienceRepository()
    const educationRepository = new StrapiEducationRepository()
    const skillRepository = new StrapiSkillRepository()
    const projectRepository = new StrapiProjectRepository()
    const certificationRepository = new StrapiCertificationRepository()

    const profileService = new ProfileService(profileRepository)
    const experienceService = new ExperienceService(experienceRepository)
    const projectService = new ProjectService(projectRepository)

    const useCase = new GetPortfolioDataUseCase(
      profileService,
      experienceService,
      educationRepository,
      skillRepository,
      projectService,
      certificationRepository
    )

    const data = await useCase.execute()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching portfolio data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    )
  }
}
