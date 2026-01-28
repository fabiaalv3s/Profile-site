export interface Project {
  id: number
  name: string
  slug: string
  description?: string
  stack?: string[]
  demoUrl?: string
  githubUrl?: string
  image?: {
    url: string
    alternativeText?: string
  }
  featured: boolean
  order: number
}
