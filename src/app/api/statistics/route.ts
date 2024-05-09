import { NextResponse, NextRequest } from 'next/server'
import cache from 'memory-cache'
import { fetchv3Factories } from '@/src/state/liquidity/reducer'
import { toBN } from '@/src/library/utils/numbers'
export interface GlobalStatisticsData {
  totalVolume: number
  totalTVL: number
  totalFees: number
  lastUpdate: string
}
const DEFAULT_CACHE_EXPIRATION = 60 * 45 // 2 hours
export async function GET(request: NextRequest) {
  const cacheKey = 'global-statistics'
  let cachedData = cache.get(cacheKey)
  if (!cachedData) {
    const fetchedFactoriesData = await fetchv3Factories()

    const totalVolume = toBN(fetchedFactoriesData[0].totalVolumeUSD).toNumber()
    const totalTVL = toBN(fetchedFactoriesData[0].totalValueLockedUSD).toNumber()
    const totalFees = toBN(fetchedFactoriesData[0].totalFeesUSD).toNumber()
    const data: GlobalStatisticsData = { totalVolume, totalTVL, totalFees, lastUpdate: new Date().toISOString() }
    cache.put(cacheKey, data, DEFAULT_CACHE_EXPIRATION)
    cachedData = data
  }

  return NextResponse.json(cachedData, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=600',
      'CDN-Cache-Control': 'public, s-maxage=600',
      'Vercel-CDN-Cache-Control': 'public, s-maxage=600',
    },
  })
}
