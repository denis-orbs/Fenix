export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const gastPrice = await fetch('https://open-api.openocean.finance/v4/blast/gasPrice', {
    cache: 'no-cache',
  })
  const gasPrice = (await gastPrice.json()).data.instant

  const { pathname, search } = new URL(request.url)
  const gasPriceParam = `&gasPrice=${encodeURIComponent(gasPrice)}`

  const apiUrl = `https://open-api.openocean.finance/v4${pathname.replace('/api/aggregator', '')}${search}${gasPriceParam}`
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
