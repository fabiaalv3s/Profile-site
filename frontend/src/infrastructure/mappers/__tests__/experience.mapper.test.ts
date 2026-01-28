import { describe, it, expect } from 'vitest'
import { mapStrapiExperiencesToDomain } from '../experience.mapper'
import { StrapiExperienceResponse } from '../../validators/experience.validator'

describe('Experience Mapper', () => {
  it('should map Strapi experiences to domain correctly', () => {
    const strapiResponse: StrapiExperienceResponse = {
      data: [
        {
          id: 1,
          attributes: {
            company: 'Company A',
            position: 'Developer',
            startDate: '2024-01-01',
            endDate: null,
            isCurrent: true,
            description: 'Test description',
            technologies: ['React', 'TypeScript'],
            location: 'São Paulo',
            order: 0,
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          pageSize: 25,
          pageCount: 1,
          total: 1,
        },
      },
    }

    const result = mapStrapiExperiencesToDomain(strapiResponse)

    expect(result).toHaveLength(1)
    expect(result[0].company).toBe('Company A')
    expect(result[0].position).toBe('Developer')
    expect(result[0].isCurrent).toBe(true)
    expect(result[0].technologies).toEqual(['React', 'TypeScript'])
  })

  it('should handle empty technologies array', () => {
    const strapiResponse: StrapiExperienceResponse = {
      data: [
        {
          id: 1,
          attributes: {
            company: 'Company A',
            position: 'Developer',
            startDate: '2024-01-01',
            endDate: null,
            isCurrent: false,
            description: null,
            technologies: null,
            location: null,
            order: 0,
          },
        },
      ],
      meta: {},
    }

    const result = mapStrapiExperiencesToDomain(strapiResponse)

    expect(result[0].technologies).toBeUndefined()
    expect(result[0].description).toBeUndefined()
  })
})
