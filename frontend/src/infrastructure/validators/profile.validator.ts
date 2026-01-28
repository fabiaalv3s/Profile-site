import { z } from 'zod'

// Strapi 5.x: mídia pode vir em formato direto ou com attributes, dependendo do populate
const strapiMediaSchema = z.object({
  id: z.number(),
  url: z.string(),
  name: z.string().optional(),
  alternativeText: z.string().optional(),
  // Suporte para formato antigo (com attributes) caso ainda exista
  attributes: z.object({
    name: z.string(),
    alternativeText: z.string().optional(),
    url: z.string(),
  }).optional(),
}).transform((media) => ({
  id: media.id,
  url: media.url || media.attributes?.url || '',
  name: media.name || media.attributes?.name || '',
  alternativeText: media.alternativeText || media.attributes?.alternativeText,
}))

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
    photo: z.object({
      data: strapiMediaSchema.nullable().optional(),
    }).nullable().optional(),
    cvPdf: z.object({
      data: strapiMediaSchema.nullable().optional(),
    }).nullable().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    publishedAt: z.string().optional(),
  }),
  meta: z.object({}).optional(),
})

export type StrapiProfileResponse = z.infer<typeof strapiProfileResponseSchema>
