import { describe, it, expect } from 'vitest'
import { strapiProfileResponseSchema } from '../profile.validator'

describe('Profile Validator', () => {
  it('should validate correct profile response', () => {
    const validResponse = {
      data: {
        id: 1,
        attributes: {
          name: 'John Doe',
          headline: 'Developer',
          email: 'john@example.com',
          summary: null,
          location: null,
          phone: null,
          linkedin: null,
          github: null,
          photo: {
            data: null,
          },
          cvPdf: {
            data: null,
          },
        },
      },
      meta: {},
    }

    const result = strapiProfileResponseSchema.safeParse(validResponse)
    expect(result.success).toBe(true)
  })

  it('should reject invalid email', () => {
    const invalidResponse = {
      data: {
        id: 1,
        attributes: {
          name: 'John Doe',
          headline: 'Developer',
          email: 'invalid-email',
          summary: null,
          location: null,
          phone: null,
          linkedin: null,
          github: null,
          photo: {
            data: null,
          },
          cvPdf: {
            data: null,
          },
        },
      },
      meta: {},
    }

    const result = strapiProfileResponseSchema.safeParse(invalidResponse)
    expect(result.success).toBe(false)
  })

  it('should reject missing required fields', () => {
    const invalidResponse = {
      data: {
        id: 1,
        attributes: {
          name: 'John Doe',
          // missing headline and email
        },
      },
      meta: {},
    }

    const result = strapiProfileResponseSchema.safeParse(invalidResponse)
    expect(result.success).toBe(false)
  })
})
