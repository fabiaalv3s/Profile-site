import { z } from 'zod'

// Strapi 5.x: campos vêm diretamente em cada item do array, sem wrapper attributes
export const strapiEducationResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      documentId: z.string().optional(),
      institution: z.string(),
      course: z.string(),
      startDate: z.string(),
      endDate: z.string().optional().nullable(),
      description: z.string().optional().nullable(),
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

export type StrapiEducationResponse = z.infer<typeof strapiEducationResponseSchema>
