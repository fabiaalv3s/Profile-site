import { z } from 'zod'

// Strapi 5.x: campos vêm diretamente em cada item do array, sem wrapper attributes
export const strapiExperienceResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      documentId: z.string().optional(),
      company: z.string(),
      position: z.string(),
      startDate: z.string(),
      endDate: z.string().optional().nullable(),
      isCurrent: z.boolean().nullable().transform((val) => val ?? false),
      description: z.string().optional().nullable(),
      technologies: z.array(z.string()).optional().nullable(),
      location: z.string().optional().nullable(),
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

export type StrapiExperienceResponse = z.infer<typeof strapiExperienceResponseSchema>
