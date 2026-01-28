import { NextResponse } from 'next/server'
import { STRAPI_URL, STRAPI_API_TOKEN } from '@/lib/constants'

export async function GET() {
  const baseUrl = STRAPI_URL
  const token = STRAPI_API_TOKEN

  // Test basic connectivity
  const connectivityTest = await testConnectivity(baseUrl)
  
  // Test token validity
  const tokenTest = await testToken(baseUrl, token)

  // Test specific endpoints
  const endpointTests = await testEndpoints(baseUrl, token)

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: {
      baseUrl,
      hasToken: !!token,
      tokenPrefix: token ? `${token.substring(0, 20)}...` : 'Not set',
      nodeEnv: process.env.NODE_ENV,
    },
    connectivity: connectivityTest,
    token: tokenTest,
    endpoints: endpointTests,
    recommendations: generateRecommendations(connectivityTest, tokenTest, endpointTests),
  })
}

async function testConnectivity(baseUrl: string) {
  try {
    const response = await fetch(`${baseUrl}/api`, {
      method: 'GET',
      cache: 'no-store',
    })
    return {
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      message: response.ok
        ? 'Strapi is reachable'
        : `Strapi responded with ${response.status}`,
    }
  } catch (error) {
    return {
      success: false,
      status: 0,
      statusText: 'Connection failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      error: 'Cannot connect to Strapi. Is it running?',
    }
  }
}

async function testToken(baseUrl: string, token: string | undefined) {
  if (!token) {
    return {
      success: false,
      message: 'No token provided',
      error: 'NEXT_PUBLIC_STRAPI_API_TOKEN is not set in .env.local',
    }
  }

  try {
    // Try to access a protected endpoint
    const response = await fetch(`${baseUrl}/api/profile`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    })

    const data = await response.json().catch(() => ({}))

    return {
      success: response.ok,
      status: response.status,
      message: response.ok
        ? 'Token is valid and working'
        : `Token test returned ${response.status}`,
      error: response.ok ? undefined : data.error?.message || response.statusText,
      errorDetails: response.ok ? undefined : data.error,
    }
  } catch (error) {
    return {
      success: false,
      status: 0,
      message: 'Token test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

async function testEndpoints(baseUrl: string, token: string | undefined) {
  const endpoints = [
    { name: 'Profile (single)', path: '/api/profile', type: 'single' },
    { name: 'Profile (plural)', path: '/api/profiles', type: 'single' },
    { name: 'Experiences', path: '/api/experiences', type: 'collection' },
    { name: 'Educations', path: '/api/educations', type: 'collection' },
    { name: 'Skills', path: '/api/skills', type: 'collection' },
  ]

  const results = []

  for (const endpoint of endpoints) {
    try {
      const url = `${baseUrl}${endpoint.path}`
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }

      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch(url, {
        headers,
        cache: 'no-store',
      })

      let responseData: any = null
      try {
        responseData = await response.json()
      } catch {
        responseData = { raw: await response.text() }
      }

      results.push({
        name: endpoint.name,
        path: endpoint.path,
        type: endpoint.type,
        url,
        success: response.ok,
        status: response.status,
        statusText: response.statusText,
        hasData: response.ok && responseData?.data !== null && responseData?.data !== undefined,
        error: response.ok ? undefined : responseData?.error,
        message: response.ok
          ? `✅ Working - ${responseData?.data ? 'Has data' : 'No data'}`
          : `❌ Failed - ${responseData?.error?.message || response.statusText}`,
      })
    } catch (error) {
      results.push({
        name: endpoint.name,
        path: endpoint.path,
        type: endpoint.type,
        success: false,
        status: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: `❌ Error - ${error instanceof Error ? error.message : 'Unknown'}`,
      })
    }
  }

  return results
}

function generateRecommendations(
  connectivity: any,
  token: any,
  endpoints: any[]
): string[] {
  const recommendations: string[] = []

  if (!connectivity.success) {
    recommendations.push(
      '1. Start Strapi: cd cms/Profile && npm run develop'
    )
  }

  if (!token.success && !token.hasToken) {
    recommendations.push(
      '2. Create .env.local with NEXT_PUBLIC_STRAPI_API_TOKEN'
    )
  }

  if (!token.success && token.hasToken) {
    recommendations.push(
      '3. Verify token is correct in Strapi admin (Settings → API Tokens)'
    )
  }

  const failedEndpoints = endpoints.filter((e) => !e.success)
  if (failedEndpoints.length > 0) {
    recommendations.push(
      '4. Configure API permissions: Settings → Users & Permissions → Roles → Public → Enable find/findOne for all content types'
    )
    recommendations.push(
      '5. Rebuild Strapi: cd cms/Profile && npm run build && npm run develop'
    )
    recommendations.push(
      '6. Ensure all content types are published in Content Manager'
    )
  }

  if (recommendations.length === 0) {
    recommendations.push('✅ Everything looks good!')
  }

  return recommendations
}
