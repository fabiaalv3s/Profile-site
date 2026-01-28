'use client'

import { Project } from '@/domain/entities/project.entity'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Github } from 'lucide-react'

interface ProjectsProps {
  projects: Project[]
  featured?: boolean
}

export function ProjectsSection({ projects, featured = false }: ProjectsProps) {
  const t = useTranslations('sections.projects')
  const tCommon = useTranslations('common')

  const displayProjects = featured
    ? projects.filter((p) => p.featured).slice(0, 3)
    : projects

  if (displayProjects.length === 0) {
    return null
  }

  return (
    <section id="projects" className="container py-20">
      <div className="mb-12 flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          {featured ? t('featured') : t('title')}
        </h2>
        {featured && (
          <Button asChild variant="outline">
            <Link href="/projects">{tCommon('viewAllProjects')}</Link>
          </Button>
        )}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayProjects.map((project) => (
          <Card key={project.id} className="flex flex-col">
            {project.image && (
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <Image
                  src={project.image.url}
                  alt={project.image.alternativeText || project.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              {project.description && (
                <CardDescription
                  className="line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: project.description.substring(0, 150) + '...',
                  }}
                />
              )}
            </CardHeader>
            {project.stack && project.stack.length > 0 && (
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.stack.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="rounded-md bg-secondary px-2 py-1 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            )}
            <CardFooter className="mt-auto flex gap-2">
              {project.demoUrl && (
                <Button asChild size="sm" variant="outline">
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button asChild size="sm" variant="outline">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </a>
                </Button>
              )}
              <Button asChild size="sm">
                <Link href={`/projects/${project.slug}`}>
                  {tCommon('viewProject')}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
