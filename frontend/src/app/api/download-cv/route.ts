import { NextResponse } from 'next/server'
import { ProfileService } from '@/application/services/profile.service'
import { StrapiProfileRepository } from '@/infrastructure/repositories/strapi-profile.repository'

/**
 * GET /api/download-cv
 * Busca o perfil no Strapi, obtém a URL do PDF do CV, faz o proxy do arquivo
 * e retorna com Content-Disposition: attachment para forçar o download no navegador
 * (o atributo "download" em links é ignorado para URLs cross-origin).
 */
export async function GET() {
  try {
    const profileRepository = new StrapiProfileRepository()
    const profileService = new ProfileService(profileRepository)
    const profile = await profileService.getProfile()

    if (!profile.cvPdf?.url) {
      return NextResponse.json(
        { error: 'CV não configurado' },
        { status: 404 }
      )
    }

    const pdfResponse = await fetch(profile.cvPdf.url, {
      cache: 'no-store',
      headers: {
        Accept: 'application/pdf',
      },
    })

    if (!pdfResponse.ok) {
      return NextResponse.json(
        { error: 'Não foi possível obter o arquivo do CV' },
        { status: 502 }
      )
    }

    const blob = await pdfResponse.arrayBuffer()
    const safeName =
      profile.cvPdf.name && /\.pdf$/i.test(profile.cvPdf.name)
        ? profile.cvPdf.name
        : 'curriculo.pdf'

    return new NextResponse(blob, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${safeName}"`,
        'Cache-Control': 'private, no-cache',
      },
    })
  } catch (error) {
    console.error('Error in download-cv:', error)
    return NextResponse.json(
      { error: 'Erro ao preparar download do CV' },
      { status: 500 }
    )
  }
}
