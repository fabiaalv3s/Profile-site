import { z } from 'zod'

// Strapi 5.x: mídia vem diretamente com todos os campos
// Aceitamos todos os campos que o Strapi retorna, mas só usamos os necessários
const strapiMediaSchema = z.object({
  id: z.number(),
  url: z.string(),
  name: z.string().optional().nullable(),
  alternativeText: z.string().optional().nullable(),
  // Campos adicionais que o Strapi pode retornar (ignorados, mas aceitos)
  documentId: z.string().optional(),
  caption: z.string().optional().nullable(),
  width: z.number().optional().nullable(),
  height: z.number().optional().nullable(),
  formats: z.any().optional().nullable(),
  hash: z.string().optional(),
  ext: z.string().optional(),
  mime: z.string().optional(),
  size: z.number().optional(),
  previewUrl: z.string().optional().nullable(),
  provider: z.string().optional(),
  provider_metadata: z.any().optional().nullable(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  publishedAt: z.string().optional(),
}).passthrough() // Permite campos adicionais que não estão definidos

// Strapi 5.x: campos vêm diretamente em data, sem wrapper attributes
export const strapiProfileResponseSchema = z.object({
  data: z.object({
    id: z.number(),
    documentId: z.string().optional(),
    name: z.string(),
    headline: z.string(),
    summary: z.string().optional().nullable(),
    location: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    email: z.string().email(),
    linkedin: z.string().optional().nullable(),
    github: z.string().optional().nullable(),
    photo: strapiMediaSchema.nullable().optional(),
    cvPdf: strapiMediaSchema.nullable().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    publishedAt: z.string().optional(),
  }),
  meta: z.object({}).optional(),
})

export type StrapiProfileResponse = z.infer<typeof strapiProfileResponseSchema>
