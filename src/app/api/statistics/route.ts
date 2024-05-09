import { NextResponse, NextRequest } from 'next/server'
import { fetchv3Factories } from '@/src/state/liquidity/reducer'
import { toBN } from '@/src/library/utils/numbers'
export interface GlobalStatisticsData {
  totalVolume: number
  totalTVL: number
  totalFees: number
  lastUpdate: string
}

export async function GET(request: NextRequest) {
  const fetchedFactoriesData = await fetchv3Factories()

  const totalVolume = toBN(fetchedFactoriesData[0].totalVolumeUSD).toNumber()
  const totalTVL = toBN(fetchedFactoriesData[0].totalValueLockedUSD).toNumber()
  const totalFees = toBN(fetchedFactoriesData[0].totalFeesUSD).toNumber()
  const data: GlobalStatisticsData = { totalVolume, totalTVL, totalFees, lastUpdate: new Date().toISOString() }

  return NextResponse.json(data, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=1800',
      'CDN-Cache-Control': 'public, s-maxage=1800',
      'Vercel-CDN-Cache-Control': 'public, s-maxage=1800',
    },
  })
}
