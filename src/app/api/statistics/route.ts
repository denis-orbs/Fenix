import { NextResponse, NextRequest } from 'next/server'
import cache from 'memory-cache'
import { useV2PairsData } from '@/src/state/liquidity/hooks'
import { fetchTokens } from '@/src/library/common/getAvailableTokens'
import { fetchPoolData, fetchv2PoolData } from '@/src/state/liquidity/reducer'
import { V3PairInfo } from '@/src/state/liquidity/types'
import { toBN } from '@/src/library/utils/numbers'
export interface GlobalStatisticsData {
  totalVolume: number
  totalTVL: number
  totalFees: number
  lastUpdate: string
}
const DEFAULT_CACHE_EXPIRATION = 3600 * 2 // 2 hours
export async function GET(request: NextRequest) {
  const cacheKey = 'global-statistics'
  let cachedData = cache.get(cacheKey)
  if (!cachedData) {
    console.log('Performing heavy calculations...')
    const availablePairsV3 = (await fetchPoolData()) as V3PairInfo[]
    const totalVolume = availablePairsV3.reduce((acc, pair) => {
      return acc + toBN(pair.volumeUSD).toNumber()
    }, 0)
    const totalTVL = availablePairsV3.reduce((acc, pair) => {
      return acc + toBN(pair.totalValueLockedUSD).toNumber()
    }, 0)
    const totalFees = availablePairsV3.reduce((acc, pair) => {
      return acc + toBN(pair.feesUSD).toNumber()
    }, 0)
    const data: GlobalStatisticsData = { totalVolume, totalTVL, totalFees, lastUpdate: new Date().toISOString() }
    cache.put(cacheKey, data, DEFAULT_CACHE_EXPIRATION)
    cachedData = data
  }

  return NextResponse.json(cachedData, { status: 200 })
}
