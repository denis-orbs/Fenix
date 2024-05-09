import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const currentTime = new Date().toISOString()
  console.log('testing')
  return NextResponse.json(currentTime, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=60',
      'CDN-Cache-Control': 'public, s-maxage=60',
      'Vercel-CDN-Cache-Control': 'public, s-maxage=60',
    },
  })
}
