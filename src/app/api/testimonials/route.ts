import { NextRequest, NextResponse } from 'next/server'
import { getTestimonials } from '@/actions/testimonial-actions'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '6')

  try {
    const data = await getTestimonials(page, limit)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}