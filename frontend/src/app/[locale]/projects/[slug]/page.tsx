import { ProjectService } from '@/application/services/project.service'
import { StrapiProjectRepository } from '@/infrastructure/repositories/strapi-project.repository'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/presentation/components/ui/card'
import { Button } from '@/presentation/components/ui/button'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ExternalLink, Github } from 'lucide-react'
import { Metadata } from 'next'

export const revalidate = 60

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

async function getProject(slug: string) {
  const projectRepository = new StrapiProjectRepository()
  const projectService = new ProjectService(projectRepository)
  return projectService.getProjectBySlug(slug)
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return {
      title: 'Projeto não encontrado',
    }
  }

  return {
    title: `${project.name} - Portfolio`,
    description: project.description || `Detalhes do projeto ${project.name}`,
  }
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="container py-20">
      <div className="mx-auto max-w-4xl">
        {project.image && (
          <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg md:h-96">
            <Image
              src={project.image.url}
              alt={project.image.alternativeText || project.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{project.name}</CardTitle>
            {project.description && (
              <CardDescription
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {project.stack && project.stack.length > 0 && (
              <div>
                <h3 className="mb-2 text-lg font-semibold">Tecnologias</h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, index) => (
                    <span
                      key={index}
                      className="rounded-md bg-secondary px-3 py-1 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-4">
              {project.demoUrl && (
                <Button asChild>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Ver Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button asChild variant="outline">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Ver Código
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
