import { NextResponse } from 'next/server'
import { STRAPI_URL, STRAPI_API_TOKEN } from '@/lib/constants'

export async function GET() {
  const baseUrl = STRAPI_URL
  const token = STRAPI_API_TOKEN

  const endpointsToTest = [
    // Single type variations
    '/api/profile',
    '/api/profile?populate=*',
    '/api/profile?populate[photo]=*&populate[cvPdf]=*',
    '/api/profile?populate=photo,cvPdf',
    '/api/profiles', // Plural variation
    '/api/profiles?populate=*',
    // Collection type test
    '/api/experiences',
    '/api/experiences?populate=*',
  ]

  const results: Array<{
    endpoint: string
    fullUrl: string
    status: number
    success: boolean
    error?: string
    errorDetails?: any
    data?: any
    headers?: Record<string, string>
  }> = []

  for (const endpoint of endpointsToTest) {
    try {
      const url = `${baseUrl}${endpoint}`
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }

      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch(url, {
        headers,
        cache: 'no-store', // Don't cache test requests
      })

      let responseData: any = null
      try {
        responseData = await response.json()
      } catch {
        responseData = { raw: await response.text() }
      }

      results.push({
        endpoint,
        fullUrl: url,
        status: response.status,
        success: response.ok,
        data: response.ok ? responseData : undefined,
        error: response.ok ? undefined : responseData?.error?.message || response.statusText,
        errorDetails: response.ok ? undefined : responseData?.error,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? 'Bearer ***' : 'Not set',
        },
      })
    } catch (error) {
      results.push({
        endpoint,
        fullUrl: `${baseUrl}${endpoint}`,
        status: 0,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? 'Bearer ***' : 'Not set',
        },
      })
    }
  }

  const successfulEndpoints = results.filter((r) => r.success)
  const failedEndpoints = results.filter((r) => !r.success)

  return NextResponse.json({
    config: {
      baseUrl,
      hasToken: !!token,
      tokenLength: token?.length || 0,
    },
    summary: {
      total: results.length,
      successful: successfulEndpoints.length,
      failed: failedEndpoints.length,
    },
    results,
    recommendation: successfulEndpoints.length > 0
      ? `✅ Use: ${successfulEndpoints[0].endpoint}`
      : `❌ None of the ${results.length} endpoints worked. ` +
        `Check: 1) Strapi is running, 2) Content types are published, ` +
        `3) API permissions are configured, 4) Token is correct, 5) Strapi was rebuilt after creating content types.`,
    troubleshooting: {
      checkStrapiRunning: `Test manually: ${baseUrl}/api/profile with header: Authorization: Bearer ${token?.substring(0, 20)}...`,
      checkPermissions: 'Settings → Users & Permissions Plugin → Roles → Public → Enable find/findOne',
      checkRebuild: 'Run: cd cms/Profile && npm run build && npm run develop',
    },
  })
}
