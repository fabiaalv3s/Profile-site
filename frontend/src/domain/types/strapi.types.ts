export interface StrapiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiMedia {
  id: number
  attributes: {
    name: string
    alternativeText?: string
    caption?: string
    width?: number
    height?: number
    formats?: any
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl?: string
    provider: string
    provider_metadata?: any
    createdAt: string
    updatedAt: string
  }
}

export interface StrapiSingleTypeResponse<T> {
  data: {
    id: number
    attributes: T
  }
  meta: {}
}

export interface StrapiCollectionResponse<T> {
  data: Array<{
    id: number
    attributes: T
  }>
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
