import { NextRequest, NextResponse } from 'next/server'
import { getProjects } from '@/actions/project-actions'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '6')

  try {
    const data = await getProjects(page, limit)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}