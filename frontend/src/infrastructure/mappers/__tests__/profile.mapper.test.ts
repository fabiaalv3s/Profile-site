import { describe, it, expect } from 'vitest'
import { mapStrapiProfileToDomain } from '../profile.mapper'
import { StrapiProfileResponse } from '../../validators/profile.validator'

describe('Profile Mapper', () => {
  it('should map Strapi profile to domain correctly', () => {
    const strapiResponse: StrapiProfileResponse = {
      data: {
        id: 1,
        attributes: {
          name: 'John Doe',
          headline: 'Full Stack Developer',
          summary: 'Test summary',
          location: 'São Paulo',
          phone: '(11) 99999-9999',
          email: 'john@example.com',
          linkedin: 'https://linkedin.com/in/johndoe',
          github: 'https://github.com/johndoe',
          photo: {
            data: {
              id: 1,
              attributes: {
                name: 'photo.jpg',
                url: '/uploads/photo.jpg',
              },
            },
          },
          cvPdf: {
            data: {
              id: 2,
              attributes: {
                name: 'cv.pdf',
                url: '/uploads/cv.pdf',
              },
            },
          },
        },
      },
      meta: {},
    }

    const result = mapStrapiProfileToDomain(strapiResponse)

    expect(result.id).toBe(1)
    expect(result.name).toBe('John Doe')
    expect(result.headline).toBe('Full Stack Developer')
    expect(result.email).toBe('john@example.com')
    expect(result.photo?.url).toContain('http://localhost:1337')
  })

  it('should handle missing optional fields', () => {
    const strapiResponse: StrapiProfileResponse = {
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

    const result = mapStrapiProfileToDomain(strapiResponse)

    expect(result.summary).toBeUndefined()
    expect(result.location).toBeUndefined()
    expect(result.photo).toBeUndefined()
    expect(result.cvPdf).toBeUndefined()
  })
})
