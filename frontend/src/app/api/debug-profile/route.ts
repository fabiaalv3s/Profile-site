import { NextResponse } from 'next/server'
import { STRAPI_URL, STRAPI_API_TOKEN } from '@/lib/constants'

export async function GET() {
  const baseUrl = STRAPI_URL
  const token = STRAPI_API_TOKEN

  const endpoints = [
    '/api/profile?populate=*',
    '/api/profile?populate[photo]=*&populate[cvPdf]=*',
    '/api/profile',
  ]

  const results: any[] = []

  for (const endpoint of endpoints) {
    try {
      const url = `${baseUrl}${endpoint}`
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: 'no-store',
      })

      const data = await response.json()

      results.push({
        endpoint,
        status: response.status,
        success: response.ok,
        cvPdf: data.data?.cvPdf || null,
        photo: data.data?.photo || null,
        rawCvPdf: JSON.stringify(data.data?.cvPdf, null, 2),
      })
    } catch (error) {
      results.push({
        endpoint,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  return NextResponse.json({
    message: 'Profile Debug - cvPdf Analysis',
    baseUrl,
    results,
  })
}
