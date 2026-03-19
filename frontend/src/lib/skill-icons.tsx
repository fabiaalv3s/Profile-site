import * as React from 'react'
import {
  // Simple Icons
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiMysql,
  SiGithub,
  SiDelphi,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiNextdotjs,
  SiGit,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiLinux,
} from 'react-icons/si'
import { FaGithub, FaReact, FaCode, FaLink } from 'react-icons/fa'

// Tipo para o componente de ícone
type IconComponent = React.ComponentType<{ className?: string; size?: number | string }>

// Mapeamento de nomes de skills para ícones
const skillIconMap: Record<string, IconComponent> = {
  // Frontend
  react: SiReact,
  'react.js': SiReact,
  typescript: SiTypescript,
  javascript: SiJavascript,
  'node.js': SiNodedotjs,
  nodejs: SiNodedotjs,
  'next.js': SiNextdotjs,
  nextjs: SiNextdotjs,
  html: SiHtml5,
  html5: SiHtml5,
  css: SiCss3,
  css3: SiCss3,
  tailwind: SiTailwindcss,
  'tailwind css': SiTailwindcss,
  tailwindcss: SiTailwindcss,

  // Backend
  delphi: SiDelphi,
  horse: SiDelphi,
  java: FaCode,
  'java script': SiJavascript,

  // Databases
  mysql: SiMysql,
  'sql server': FaCode,
  sqlserver: FaCode,
  'microsoft sql server': FaCode,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  mongodb: SiMongodb,
  mongo: SiMongodb,

  // Tools
  github: SiGithub,
  git: SiGit,
  scrum: FaCode,
  docker: SiDocker,
  linux: SiLinux,
  windows: FaCode,
  vscode: FaCode,
  'visual studio code': FaCode,

  // Patterns/Concepts
  solid: FaCode,
  mvc: FaCode,
  'clean code': FaCode,
  api: FaCode,
  apis: FaCode,
  "api's": FaCode,
  integracoes: FaLink,
  'integrações': FaLink,
  integracao: FaLink,
  'integração': FaLink,
}

/**
 * Obtém o ícone para uma skill baseado no nome
 */
export function getSkillIcon(skillName: string): IconComponent | null {
  // Normalizar o nome: lowercase, remover espaços extras, etc.
  const normalized = skillName.toLowerCase().trim()

  // Tentar match exato primeiro
  if (skillIconMap[normalized]) {
    return skillIconMap[normalized]
  }

  // Tentar match parcial
  for (const [key, icon] of Object.entries(skillIconMap)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return icon
    }
  }

  // Fallback: ícone genérico baseado na categoria
  return null
}

/**
 * Componente de ícone de skill com fallback
 */
export function SkillIcon({
  name,
  className = 'h-5 w-5',
  size,
}: {
  name: string
  className?: string
  size?: number | string
}) {
  const IconComponent = getSkillIcon(name)

  if (!IconComponent) {
    // Fallback: ícone genérico
    return <FaCode className={className} size={size} />
  }

  return <IconComponent className={className} size={size} />
}
