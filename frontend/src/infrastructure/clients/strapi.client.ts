import { STRAPI_URL, STRAPI_API_TOKEN } from '@/lib/constants'

export class StrapiClient {
  private baseUrl: string
  private apiToken: string

  constructor(baseUrl: string = STRAPI_URL, apiToken: string = STRAPI_API_TOKEN) {
    this.baseUrl = baseUrl
    this.apiToken = apiToken
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (this.apiToken) {
      headers['Authorization'] = `Bearer ${this.apiToken}`
    }

    return headers
  }

  private getUrl(endpoint: string): string {
    return `${this.baseUrl}/api${endpoint}`
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = this.getUrl(endpoint)
    const headers = {
      ...this.getHeaders(),
      ...options?.headers,
    }

    // Debug logs (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('[StrapiClient] GET Request:', {
        url,
        headers: {
          ...headers,
          Authorization: headers.Authorization ? 'Bearer ***' : 'Not set',
        },
        hasToken: !!this.apiToken,
      })
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        next: {
          revalidate: 60, // Revalidate every 60 seconds
        },
      })

      // Log response details in development
      if (process.env.NODE_ENV === 'development') {
        console.log('[StrapiClient] Response:', {
          url,
          status: response.status,
          statusText: response.statusText,
          ok: response.ok,
        })
      }

      if (!response.ok) {
        let errorBody: any = null
        try {
          errorBody = await response.json()
        } catch {
          // Ignore JSON parse errors
        }

        if (process.env.NODE_ENV === 'development') {
          console.error('[StrapiClient] Error Response:', {
            url,
            status: response.status,
            statusText: response.statusText,
            body: errorBody,
          })
        }

        if (response.status === 404) {
          throw new Error(
            `Strapi endpoint not found: ${url}. ` +
            `Status: ${response.status} ${response.statusText}. ` +
            `Error: ${errorBody?.error?.message || 'Not Found'}. ` +
            `Please check: 1) Is Strapi running on ${this.baseUrl}? ` +
            `2) Is the content type created and published? ` +
            `3) Are API permissions configured? ` +
            `4) Is the API token correct?`
          )
        }
        throw new Error(
          `Failed to fetch ${endpoint}: ${response.statusText} (${response.status}). ` +
          `Error: ${errorBody?.error?.message || 'Unknown error'}`
        )
      }

      const data = await response.json()
      return data as T
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error(
          `Cannot connect to Strapi at ${this.baseUrl}. ` +
          `Please ensure Strapi is running and the URL is correct. ` +
          `Original error: ${error.message}`
        )
      }
      throw error
    }
  }

  async post<T>(endpoint: string, data: unknown, options?: RequestInit): Promise<T> {
    const url = this.getUrl(endpoint)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...this.getHeaders(),
        ...options?.headers,
      },
      body: JSON.stringify({ data }),
    })

    if (!response.ok) {
      throw new Error(`Failed to post ${endpoint}: ${response.statusText}`)
    }

    return response.json()
  }
}

export const strapiClient = new StrapiClient()
