import { NextRequest, NextResponse } from 'next/server'
import { getServices } from '@/actions/service-actions'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '9')

  try {
    const data = await getServices(page, limit)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}