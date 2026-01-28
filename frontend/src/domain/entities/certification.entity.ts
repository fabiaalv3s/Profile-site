export interface Certification {
  id: number
  name: string
  issuer: string
  issueDate: string
  link?: string
  image?: {
    url: string
    alternativeText?: string
  }
  order: number
}
