import { z } from 'zod'

// Strapi 5.x: campos vêm diretamente em cada item do array, sem wrapper attributes
export const strapiSkillResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      documentId: z.string().optional(),
      name: z.string(),
      category: z.enum(['frontend', 'backend', 'tools', 'languages', 'other']),
      level: z.number().min(1).max(5),
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

export type StrapiSkillResponse = z.infer<typeof strapiSkillResponseSchema>
