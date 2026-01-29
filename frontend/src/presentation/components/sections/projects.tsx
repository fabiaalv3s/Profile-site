'use client'

import { useState } from 'react'
import { Project } from '@/domain/entities/project.entity'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import Image from 'next/image'
import { ExternalLink, Github, Star } from 'lucide-react'
import { SkillIcon } from '@/lib/skill-icons'

interface ProjectsProps {
  projects: Project[]
  featured?: boolean
}

export function ProjectsSection({ projects, featured = false }: ProjectsProps) {
  const t = useTranslations('sections.projects')
  const [selectedImage, setSelectedImage] = useState<{
    url: string
    alt: string
  } | null>(null)

  const displayProjects = featured
    ? projects.filter((p) => p.featured).slice(0, 3)
    : projects

  // Se featured=true mas não há projetos featured, mostrar todos os projetos
  const finalProjects = featured && displayProjects.length === 0 
    ? projects.slice(0, 3) 
    : displayProjects

  if (finalProjects.length === 0) {
    // Em vez de retornar null, mostrar mensagem informativa
    return (
      <section id="projects" className="container py-20">
        <h2 className="mb-4 text-3xl font-bold">{t('title')}</h2>
        <p className="text-muted-foreground">
          {featured 
            ? 'Nenhum projeto em destaque no momento.' 
            : 'Nenhum projeto cadastrado no momento.'}
        </p>
      </section>
    )
  }

  // Função para limpar HTML da descrição (SSR-safe)
  const stripHtml = (html: string) => {
    if (typeof window === 'undefined') {
      // Servidor: remover tags HTML simples
      return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim()
    }
    // Cliente: usar DOM
    const tmp = document.createElement('DIV')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  return (
    <section id="projects" className="container py-20">
      <div className="mb-12">
        <h2 className="text-3xl font-bold">
          {featured ? t('featured') : t('title')}
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {finalProjects.map((project, index) => {
          const description = project.description
            ? stripHtml(project.description)
            : ''

          return (
            <Card
              key={project.id}
              className="group relative flex flex-col overflow-hidden border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Badge Featured */}
              {project.featured && (
                <Badge className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-primary/90 text-primary-foreground shadow-lg">
                  <Star className="h-3 w-3 fill-current" />
                  Featured
                </Badge>
              )}

              {/* Imagem com overlay - sempre renderizada */}
              <div
                className={`relative h-56 w-full overflow-hidden bg-gradient-to-br from-muted to-muted/50 ${
                  project.image ? 'cursor-pointer' : ''
                }`}
                onClick={() => {
                  if (project.image) {
                    setSelectedImage({
                      url: project.image.url,
                      alt: project.image.alternativeText || project.name,
                    })
                  }
                }}
              >
                {project.image ? (
                  <>
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <Image
                      src={project.image.url}
                      alt={project.image.alternativeText || project.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay no hover */}
                    <div className="absolute inset-0 z-20 bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-muted/20">
                    <div className="text-center">
                      <div className="mx-auto mb-2 h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                        <ExternalLink className="h-8 w-8 text-primary/50" />
                      </div>
                      <p className="text-sm text-muted-foreground">Sem imagem</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Conteúdo */}
              <CardHeader className="flex-1">
                <CardTitle className="text-xl">{project.name}</CardTitle>
                {description && (
                  <CardDescription className="text-sm whitespace-pre-wrap">
                    {description}
                  </CardDescription>
                )}
              </CardHeader>

              {/* Stack com ícones */}
              {project.stack && project.stack.length > 0 && (
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="flex items-center gap-1.5 text-xs"
                      >
                        <SkillIcon name={tech} className="h-3 w-3" />
                        <span>{tech}</span>
                      </Badge>
                    ))}
                    {project.stack.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.stack.length - 4}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              )}

              {/* Botões de ação - apenas Demo e Code */}
              {(project.demoUrl || project.githubUrl) && (
                <CardFooter className="mt-auto flex flex-wrap gap-2 border-t pt-4">
                  {project.demoUrl && (
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="flex-1 transition-all hover:scale-105"
                    >
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover:rotate-[-10deg]" />
                        Demo
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="flex-1 transition-all hover:scale-105"
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                        Code
                      </a>
                    </Button>
                  )}
                </CardFooter>
              )}
            </Card>
          )
        })}
      </div>

      {/* Modal para exibir imagem em tamanho original */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-7xl w-full h-[90vh] max-h-[95vh] p-0 bg-background/98 border-2">
          <DialogTitle className="sr-only">
            {selectedImage?.alt || 'Imagem do projeto'}
          </DialogTitle>
          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center overflow-auto">
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                width={1920}
                height={1080}
                className="max-w-full max-h-full object-contain rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                priority
                quality={90}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
