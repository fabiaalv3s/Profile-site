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
import { Hero } from '@/presentation/components/sections/hero'
import { About } from '@/presentation/components/sections/about'
import { ExperienceSection } from '@/presentation/components/sections/experience'
import { EducationSection } from '@/presentation/components/sections/education'
import { SkillsSection } from '@/presentation/components/sections/skills'
import { ProjectsSection } from '@/presentation/components/sections/projects'
import { CertificationsSection } from '@/presentation/components/sections/certifications'
import { ContactSection } from '@/presentation/components/sections/contact'
import { Footer } from '@/presentation/components/layout/footer'
import { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Portfolio - Fábia Alves',
  description: 'Desenvolvedora Full Stack - Portfolio profissional',
  openGraph: {
    title: 'Portfolio - Fábia Alves',
    description: 'Desenvolvedora Full Stack - Portfolio profissional',
    type: 'website',
  },
}

async function getPortfolioData() {
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

  return useCase.execute()
}

export default async function HomePage() {
  try {
    const portfolioData = await getPortfolioData()

    // Log para debug (apenas em desenvolvimento)
    if (process.env.NODE_ENV === 'development') {
      console.log('[HomePage] Projects count:', portfolioData.projects.length)
      console.log('[HomePage] Featured projects:', portfolioData.projects.filter(p => p.featured).length)
    }

    return (
      <main>
        <Hero profile={portfolioData.profile} />
        <About profile={portfolioData.profile} />
        <ExperienceSection experiences={portfolioData.experiences} />
        <EducationSection educations={portfolioData.educations} />
        <SkillsSection skills={portfolioData.skills} />
        {portfolioData.projects.length > 0 && (
          <ProjectsSection projects={portfolioData.projects} featured />
        )}
        <CertificationsSection certifications={portfolioData.certifications} />
        <ContactSection profile={portfolioData.profile} />
        <Footer profile={portfolioData.profile} />
      </main>
    )
  } catch (error) {
    return (
      <main className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-3xl font-bold">Erro ao carregar dados</h1>
          <p className="mb-4 text-muted-foreground">
            {error instanceof Error ? error.message : 'Erro desconhecido'}
          </p>
          <div className="rounded-lg border bg-muted p-6 text-left">
            <h2 className="mb-2 font-semibold">Verifique:</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              <li>O Strapi está rodando em http://localhost:1337?</li>
              <li>O content type Profile foi criado e publicado no Strapi?</li>
              <li>As permissões da API estão configuradas (Settings → Users & Permissions → Roles → Public)?</li>
              <li>O arquivo .env.local existe com NEXT_PUBLIC_STRAPI_URL=http://localhost:1337?</li>
            </ul>
          </div>
        </div>
      </main>
    )
  }
}
