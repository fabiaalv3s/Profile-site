'use client'

import { Profile } from '@/domain/entities/profile.entity'
import { Button } from '../ui/button'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Download, Mail, Database, Layers } from 'lucide-react'
import Link from 'next/link'
import { SkillIcon } from '@/lib/skill-icons'

interface HeroProps {
  profile: Profile
}

function splitName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = fullName.trim()
  const lastSpace = trimmed.lastIndexOf(' ')
  if (lastSpace <= 0) return { firstName: trimmed, lastName: '' }
  return {
    firstName: trimmed.slice(0, lastSpace),
    lastName: trimmed.slice(lastSpace + 1),
  }
}

const TECH_CHIPS = ['React', 'Node.js', 'TypeScript', 'SQL', 'Delphi'] as const
const SOFT_HEXAGON_CLIP =
  'polygon(50% 2%, 94% 24%, 94% 76%, 50% 98%, 6% 76%, 6% 24%)'

/** Badges estilo UI SaaS — não alteram a foto. */
const FLOATING_BADGES = [
  {
    id: 'apis',
    label: 'APIs REST',
    className:
      'top-[10%] left-[8%] sm:top-[9%] sm:left-[10%] md:top-[10%] md:left-[6%]',
    renderIcon: <SkillIcon name="api" className="h-4 w-4" />,
  },
  {
    id: 'integracoes',
    label: 'Integrações',
    className:
      'top-[22%] right-[2%] sm:top-[20%] sm:right-[4%] md:top-[20%] md:right-[0%]',
    renderIcon: <SkillIcon name="integracao" className="h-4 w-4" />,
  },
  {
    id: 'erp',
    label: 'Sistemas ERP',
    className:
      'bottom-[22%] left-[2%] sm:bottom-[20%] sm:left-[4%] md:bottom-[20%] md:left-[0%]',
    renderIcon: <Database className="h-4 w-4 text-primary" />,
  },
  {
    id: 'clean-arch',
    label: 'Arquitetura Limpa',
    className:
      'bottom-[10%] right-[0%] sm:bottom-[9%] sm:right-[3%] md:bottom-[8%] md:right-[-2%]',
    renderIcon: <Layers className="h-4 w-4 text-primary" />,
  },
] as const

export function Hero({ profile }: HeroProps) {
  const tHero = useTranslations('sections.hero')
  const { firstName, lastName } = splitName(profile.name)

  return (
    <section
      className="relative min-h-[70vh] max-h-[80vh] overflow-hidden rounded-b-2xl border-b border-border/50 bg-gradient-to-br from-background via-background to-muted/30 py-12 md:py-16"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 70% 60% at 80% 30%, hsl(var(--primary) / 0.06), transparent 50%), radial-gradient(ellipse 50% 40% at 20% 80%, hsl(262 83% 58% / 0.04), transparent 45%)',
      }}
    >
      <div className="container relative z-10 grid h-full min-h-[60vh] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        {/* Coluna esquerda: conteúdo */}
        <div className="order-2 flex flex-col justify-center text-center md:order-1 md:text-left">
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <p className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-foreground/90 shadow-sm">
              <span aria-hidden>👋</span>
              {tHero('greeting')}
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-6xl">
              {firstName}
              {lastName && (
                <>
                  {' '}
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    {lastName}
                  </span>
                </>
              )}
            </h1>
            <p className="text-xl font-semibold text-foreground md:text-2xl">{profile.headline}</p>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Construindo sistemas <span className="font-semibold text-foreground">escaláveis</span>, APIs robustas com foco em{' '}
              <span className="font-semibold text-foreground">performance</span> e boas práticas.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
            {TECH_CHIPS.map((tech) => (
              <span
                key={tech}
                className="rounded-xl border border-border/80 bg-card/80 px-3.5 py-1.5 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 rounded-2xl border border-border/50 bg-card/40 p-4 shadow-sm backdrop-blur-sm md:max-w-md">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground md:text-3xl">2+</p>
              <p className="text-xs text-muted-foreground md:text-sm">{tHero('statYears')}</p>
            </div>
            <div className="border-x border-border/50 text-center">
              <p className="text-2xl font-bold text-foreground md:text-3xl">10+</p>
              <p className="text-xs text-muted-foreground md:text-sm">{tHero('statProjects')}</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-foreground md:text-2xl">{tHero('statSpecialty')}</p>
              <p className="text-xs text-muted-foreground md:text-sm">{tHero('statSpecialtySub')}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            {profile.cvPdf && (
              <Button
                asChild
                size="lg"
                className="h-12 rounded-xl px-6 text-base shadow-lg transition-all hover:shadow-xl"
              >
                <a href="/api/download-cv" download="curriculo.pdf">
                  <Download className="mr-2 h-5 w-5" />
                  {tHero('downloadCvPdf')}
                </a>
              </Button>
            )}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-xl border-2 px-6 text-base"
            >
              <Link href="#contact">
                <Mail className="mr-2 h-5 w-5" />
                {tHero('enterContact')}
              </Link>
            </Button>
          </div>
        </div>

        {/* Coluna direita: imagem + composição visual
            Foto: sem filtros CSS no rosto (preserva identidade). Glow/bordas são só ao redor do hexágono. */}
        {profile.photo && (
          <div className="order-1 flex justify-center md:order-2">
            <div className="relative flex items-center justify-center p-8 md:p-10">
              {/* Glow azul/roxo atrás do container (não afeta pixels da foto) */}
              <div
                className="absolute inset-0 -z-10 scale-110 rounded-full opacity-70 blur-3xl"
                style={{
                  background:
                    'radial-gradient(circle at 40% 40%, hsl(217 91% 60% / 0.22) 0%, hsl(262 83% 58% / 0.18) 45%, transparent 68%)',
                }}
                aria-hidden
              />
              <div
                className="absolute -z-10 h-80 w-80 rounded-full opacity-40 blur-2xl md:h-[22rem] md:w-[22rem]"
                style={{
                  background:
                    'radial-gradient(circle, hsl(262 83% 58% / 0.2) 0%, hsl(var(--primary) / 0.08) 50%, transparent 70%)',
                }}
                aria-hidden
              />

              {/* Badges flutuantes — UI SaaS: sombra leve, bordas arredondadas */}
              {FLOATING_BADGES.map((badge) => (
                <span
                  key={badge.id}
                  className={`absolute z-20 flex min-w-[8rem] items-center justify-center gap-2 rounded-2xl border border-border/80 bg-background/95 px-3.5 py-2 text-sm font-semibold tracking-tight text-foreground shadow-md ring-1 ring-black/5 backdrop-blur-sm dark:bg-card/95 dark:ring-white/10 md:min-w-[9.25rem] md:px-4 md:py-2.5 ${badge.className}`}
                >
                  {badge.renderIcon}
                  <span className="leading-none">{badge.label}</span>
                </span>
              ))}

              {/* Elementos decorativos: dots */}
              <div className="absolute -right-4 top-1/4 h-2 w-2 rounded-full bg-primary/40 md:-right-6" aria-hidden />
              <div className="absolute -left-2 bottom-1/3 h-1.5 w-1.5 rounded-full bg-primary/30 md:-left-4" aria-hidden />
              <div className="absolute right-1/4 -top-2 h-1 w-1 rounded-full bg-primary/20" aria-hidden />

              {/* Hexágono + imagem (stroke glow azul/roxo) */}
              <div className="relative h-72 w-72 md:h-[25rem] md:w-[25rem]">
                {/* Stroke/Glow (fora da foto) */}
                <div
                  className="absolute inset-0 z-0 bg-gradient-to-br from-sky-500/30 via-indigo-500/22 to-violet-500/32 shadow-[0_0_54px_rgba(59,130,246,0.26),0_0_96px_rgba(147,51,234,0.22)]"
                  style={{ clipPath: SOFT_HEXAGON_CLIP }}
                  aria-hidden
                />

                {/* Conteúdo interno do hexágono (foto sem filtros) */}
                <div
                  className="absolute inset-[0.65rem] z-10 overflow-hidden"
                  style={{ clipPath: SOFT_HEXAGON_CLIP }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 z-[2]"
                    style={{
                      clipPath: SOFT_HEXAGON_CLIP,
                      background:
                        'radial-gradient(ellipse 90% 90% at 50% 40%, transparent 64%, rgba(0,0,0,0.18) 100%)',
                    }}
                    aria-hidden
                  />
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={profile.photo.url}
                      alt={profile.photo.alternativeText || profile.name}
                      fill
                      className="object-cover object-center"
                      priority
                      sizes="(max-width: 768px) 224px, 288px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
