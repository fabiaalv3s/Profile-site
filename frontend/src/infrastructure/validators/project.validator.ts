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

// Strapi 5.x: campos vêm diretamente em cada item do array, sem wrapper attributes
export const strapiProjectResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      documentId: z.string().optional(),
      name: z.string(),
      slug: z.string(),
      description: z.string().optional().nullable(),
      stack: z.array(z.string()).optional().nullable(),
      demoUrl: z.string().optional().nullable(),
      githubUrl: z.string().optional().nullable(),
      image: z
        .union([
          // Formato direto (Strapi 5.x com populate=*)
          strapiMediaSchema.nullable().optional(),
          // Formato com wrapper data (fallback)
          z.object({
            data: strapiMediaSchema.nullable().optional(),
          }).nullable().optional(),
        ])
        .nullable()
        .optional(),
      featured: z.boolean().nullable().transform((val) => val ?? false),
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

export const strapiSingleProjectResponseSchema = z.object({
  data: z.object({
    id: z.number(),
    documentId: z.string().optional(),
    name: z.string(),
    slug: z.string(),
    description: z.string().optional().nullable(),
    stack: z.array(z.string()).optional().nullable(),
    demoUrl: z.string().optional().nullable(),
    githubUrl: z.string().optional().nullable(),
    image: z
      .union([
        // Formato direto (Strapi 5.x com populate=*)
        strapiMediaSchema.nullable().optional(),
        // Formato com wrapper data (fallback)
        z.object({
          data: strapiMediaSchema.nullable().optional(),
        }).nullable().optional(),
      ])
      .nullable()
      .optional(),
    featured: z.boolean().nullable().transform((val) => val ?? false),
    order: z.number().nullable().transform((val) => val ?? 0),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    publishedAt: z.string().optional(),
  }),
  meta: z.object({}).optional(),
})

export type StrapiProjectResponse = z.infer<typeof strapiProjectResponseSchema>
export type StrapiSingleProjectResponse = z.infer<typeof strapiSingleProjectResponseSchema>
