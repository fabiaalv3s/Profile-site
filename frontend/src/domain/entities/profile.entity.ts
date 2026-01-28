export interface Profile {
  id: number
  name: string
  headline: string
  summary?: string
  location?: string
  phone?: string
  email: string
  linkedin?: string
  github?: string
  photo?: {
    url: string
    alternativeText?: string
  }
  cvPdf?: {
    url: string
    name?: string
  }
}
