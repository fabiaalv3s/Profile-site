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

// Strapi 5.x: campos vêm diretamente em cada item do array, sem wrapper attributes
export const strapiCertificationResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      documentId: z.string().optional(),
      name: z.string(),
      issuer: z.string(),
      issueDate: z.string(),
      link: z.string().optional().nullable(),
      image: z.object({
        data: strapiMediaSchema.nullable().optional(),
      }).nullable().optional(),
      order: z.number().nullable().transform((val) => val ?? 0),
      createdAt: z.string().optional(),
      updatedAt: z.string().optional(),
      publishedAt: z.string().optional(),
    })
  ),
  meta: z.object({
    pagination: z.object({
      page: z.number(),
      pageSize: z.number(),
      pageCount: z.number(),
      total: z.number(),
    }).optional(),
  }).optional(),
})

export type StrapiCertificationResponse = z.infer<typeof strapiCertificationResponseSchema>
