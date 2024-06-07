export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { pathname, search } = new URL(request.url)
  const apiUrl = `https://open-api.openocean.finance/v4${pathname.replace('/api/aggregator', '')}${search}`

  const response = await fetch(apiUrl, {
    headers: {
      ...request.headers,
      apikey: process.env.OPENOCEAN_API_KEY,
    },
    cache: 'no-cache',
  })

  const data = await response.json()

  return NextResponse.json(data)
}
