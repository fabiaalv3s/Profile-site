import { Profile } from '@/domain/entities/profile.entity'
import { Experience } from '@/domain/entities/experience.entity'
import { Education } from '@/domain/entities/education.entity'
import { Skill } from '@/domain/entities/skill.entity'
import { Project } from '@/domain/entities/project.entity'
import { Certification } from '@/domain/entities/certification.entity'
import { ProfileService } from '../services/profile.service'
import { ExperienceService } from '../services/experience.service'
import { EducationRepository } from '@/domain/interfaces/education.repository'
import { SkillRepository } from '@/domain/interfaces/skill.repository'
import { ProjectService } from '../services/project.service'
import { CertificationRepository } from '@/domain/interfaces/certification.repository'

export interface PortfolioData {
  profile: Profile
  experiences: Experience[]
  educations: Education[]
  skills: Skill[]
  projects: Project[]
  certifications: Certification[]
}

export class GetPortfolioDataUseCase {
  constructor(
    private profileService: ProfileService,
    private experienceService: ExperienceService,
    private educationRepository: EducationRepository,
    private skillRepository: SkillRepository,
    private projectService: ProjectService,
    private certificationRepository: CertificationRepository
  ) {}

  async execute(): Promise<PortfolioData> {
    const [profile, experiences, educations, skills, projects, certifications] =
      await Promise.all([
        this.profileService.getProfile(),
        this.experienceService.getExperiences(),
        this.educationRepository.getEducations(),
        this.skillRepository.getSkills(),
        this.projectService.getProjects(),
        this.certificationRepository.getCertifications(),
      ])

    return {
      profile,
      experiences,
      educations,
      skills,
      projects,
      certifications,
    }
  }
}
