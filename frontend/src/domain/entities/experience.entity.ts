export interface Experience {
  id: number
  company: string
  position: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  description?: string
  technologies?: string[]
  location?: string
  order: number
}
