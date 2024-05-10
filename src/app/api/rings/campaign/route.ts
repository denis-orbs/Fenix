import { getAlgebraClient } from '@/src/library/apollo/client/protocolCoreClient'
import { POOLS_LIST, POOLS_TVL } from '@/src/library/apollo/queries/pools'
import { toBN } from '@/src/library/utils/numbers'

import { NextRequest, NextResponse } from 'next/server'

const POINTS_SUPLY = 12_500_000
const POINTS_TOTAL_VALUE = 33_500
const PRICE_PER_POINT = POINTS_TOTAL_VALUE / POINTS_SUPLY

export interface BoostedPool {
  id: string
  points: number
  multiplier: number
  apr: number
  pair: string
}

export interface RingCampaignData {
  boostedPools: BoostedPool[]
  totalPoints: number
  pricePerPoint: number
  pointsTotalValue: number
}

export async function GET(request: NextRequest) {
  const client = getAlgebraClient()

  const {
    data: { pools },
  } = await client.query({
    query: POOLS_TVL,
    fetchPolicy: 'cache-first',
  })
  const boostedPools: BoostedPool[] = [
    {
      pair: 'WETH/USDB',
      id: '0x1d74611f3ef04e7252f7651526711a937aa1f75e',
      points: 4000000,
      multiplier: 4,
      apr: 0,
    },
    {
      pair: 'WBTC/WETH',
      id: '0xc066a3e5d7c22bd3beaf74d4c0925520b455bb6f',
      points: 1000000,
      multiplier: 1,
      apr: 0,
    },
    {
      pair: 'USD+/WETH',
      id: '0xc5910a7f3b0119ac1a3ad7a268cce4a62d8c882d',
      points: 1000000,
      multiplier: 1,
      apr: 0,
    },
    {
      pair: 'USD+/USDB',
      id: '0x6a1de1841c5c3712e3bc7c75ce3d57dedec6915f',
      points: 1000000,
      multiplier: 1,
      apr: 0,
    },
    {
      pair: 'pxETH/WETH',
      id: '0x3bafe103742da10a4fece8fc5e800df07d645439',
      points: 3000000,
      multiplier: 3,
      apr: 0,
    },
    {
      pair: 'DEUS/WETH',
      id: '0x117106000ceb709ba3ec885027d111463204d6b6',
      points: 1000000,
      multiplier: 1,
    },
    {
      pair: 'DUSD/USDB',
      id: '0xce274e4ae83baadd1d3b88e1ed24886e05aca345',
      points: 333333,
      multiplier: 0.3,
      apr: 0,
    },
    {
      pair: 'DETH/WETH',
      id: '0xf2bb3403e80adc9272c43b386c76e54d5bb604a5',
      points: 333333,
      multiplier: 0.3,
      apr: 0,
    },
    {
      pair: 'DUSD/DETH',
      id: '0xce274e4ae83baadd1d3b88e1ed24886e05aca345',
      points: 333334,
      multiplier: 0.3,
      apr: 0,
    },
    // {
    //   pair: 'YES/WETH',
    //   id: '',
    //   points: 0,
    //   multiplier: 0,
    // },
    // {
    //   pair: 'axlUSDC/USDB',
    //   id: '',
    //   points: 0,
    //   multiplier: 0,
    // },
    // {
    //   pair: 'axlUSDC/WETH',
    //   id: '',
    //   points: 0,
    //   multiplier: 0,
    // },
    {
      pair: 'MCLB/WETH',
      id: '',
      points: 500000,
      multiplier: 0.5,
      apr: 0,
    },
  ]
  console.log('pools', pools, '')
  const enhancedBoostedPools = boostedPools.map((pool) => {
    console.log(pool.id)
    const poolData = pools.find(
      (p: { id: string; totalValueLockedUSD: string }) => p?.id?.toLowerCase() === pool?.id?.toLowerCase()
    )
    return {
      ...pool,
      apr: poolData?.totalValueLockedUSD
        ? toBN(pool.points)
            .multipliedBy(PRICE_PER_POINT)
            .multipliedBy(4 * 12)
            .dividedBy(poolData.totalValueLockedUSD)
            .multipliedBy(100)
            .toNumber()
        : 0,
    }
  })

  return NextResponse.json(
    {
      boostedPools: enhancedBoostedPools,
      totalPoints: POINTS_SUPLY,
      pricePerPoint: PRICE_PER_POINT,
      pointsTotalValue: POINTS_TOTAL_VALUE,
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=600',
        'CDN-Cache-Control': 'public, s-maxage=600',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=600',
      },
    }
  )
}
