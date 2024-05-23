import { getAlgebraClient } from '@/src/library/apollo/client/protocolCoreClient'
import { POOLS_LIST, POOLS_TVL } from '@/src/library/apollo/queries/pools'
import { toBN } from '@/src/library/utils/numbers'

import { NextRequest, NextResponse } from 'next/server'

const POINTS_SUPLY = 30000000
const POINTS_TOTAL_VALUE = 53600
const PRICE_PER_POINT = POINTS_TOTAL_VALUE / POINTS_SUPLY

export interface BoostedPool {
  id: string
  points: number
  multiplier: number
  apr: number
  pair: string
  distributionDays?: number
}

export interface RingCampaignData {
  boostedPools: BoostedPool[]
  totalPoints: number
  pricePerPoint: number
  pointsTotalValue: number
}

export const boostedPools: BoostedPool[] = [
  {
    pair: 'WETH/USDB',
    points: 15900000,
    multiplier: 52.0,
    id: '0x1d74611f3ef04e7252f7651526711a937aa1f75e',
    apr: 0,
  },
  {
    pair: 'WBTC/WETH',
    points: 420000,
    multiplier: 1.4,
    id: '0xc066a3e5d7c22bd3beaf74d4c0925520b455bb6f',
    apr: 0,
  },
  {
    pair: 'USD+/WETH',
    points: 300000,
    multiplier: 1.0,
    id: '0xc5910a7f3b0119ac1a3ad7a268cce4a62d8c882d',
    apr: 0,
  },
  {
    pair: 'USD+/USDB',
    points: 1500000,
    multiplier: 5.0,
    id: '0x6a1de1841c5c3712e3bc7c75ce3d57dedec6915f',
    apr: 0,
  },
  {
    pair: 'pxETH/WETH',
    points: 2400000,
    multiplier: 8.0,
    id: '0x3bafe103742da10a4fece8fc5e800df07d645439',
    apr: 0,
  },
  {
    pair: 'DEUS/WETH',
    points: 660000,
    multiplier: 2.2,
    id: '0x117106000ceb709ba3ec885027d111463204d6b6',
    apr: 0,
  },

  {
    pair: 'DETH/WETH',
    points: 30000,
    multiplier: 0.1,
    id: '0xf2bb3403e80adc9272c43b386c76e54d5bb604a5',
    apr: 0,
  },

  {
    pair: 'MCLB/WETH',
    points: 75000,
    multiplier: 0.25,
    id: '0xcf68cdfea89f9e6964d4c2bd8a42eba5da9f945d',
    apr: 0,
  },
  {
    pair: 'fDAO/WETH',
    points: 450000,
    multiplier: 1.5,
    id: '0x886369748d1d66747b8f51ab38de00dea13f0101',
    apr: 0,
  },
  {
    pair: 'PAC/WETH',
    points: 1230000,
    multiplier: 4.1,
    id: '0x8e57e61b7524a2f56fd01bbfe5de9bb96ed186b4',
    apr: 0,
  },
  {
    pair: 'BAJA/WETH',
    points: 240000,
    multiplier: 0.8,
    id: '0xe3fac59382987466d7f812df56c50739b99a907a',
    apr: 0,
  },
  {
    pair: 'PEW/WETH',
    points: 372000,
    multiplier: 1.24,
    id: '0x24b711e1d32e28a143e1a9cfdfe03a39d1acc771',
    apr: 0,
  },
  {
    pair: 'JUICE/WETH',
    points: 300000,
    multiplier: 1.0,
    id: '0x7113c00b5275b0b9c16686e5ac1164978b505c5d',
    apr: 0,
  },
  {
    pair: 'ORBIT/WETH',
    points: 225000,
    multiplier: 0.75,
    id: '0xbad7a5de96b7df589252ced73426d4b59f90b466',
    apr: 0,
  },
  {
    pair: 'OLE/WETH',
    points: 300000,
    multiplier: 1.0,
    id: '0x3a8fa7bdbb3bd2a523796b145e5dd23b45019dbe',
    apr: 0,
  },
  {
    pair: '$WAI/WETH',
    points: 60000,
    multiplier: 0.2,
    id: '0x21d5d5998c3d0feea70b5980fdac9dd6b8a12761',
    apr: 0,
  },
  {
    pair: 'KAP/WETH',
    points: 150000,
    multiplier: 0.5,
    id: '0xb50a80bba0ff07f4bc3434c593e86663fe05abe2',
    apr: 0,
  },
  {
    pair: 'EARLY/WETH',
    points: 258000,
    multiplier: 0.86,
    id: '0x54bb102e85ee68a234fa06ece299346941d68d07',
    apr: 0,
  },

  {
    pair: 'WETH/wrsETH',
    points: 600000,
    multiplier: 2.0,
    id: '0xe53b1da56f90c9529f2db1bb8711c3f1cc6f03bd',
    apr: 0,
  },
  {
    pair: 'ezETH/WETH',
    points: 300000,
    multiplier: 1.0,
    id: '0x635512a1333ad0822f5ba4fd6479daa1df8b77e1',
    apr: 0,
  },

  {
    pair: 'ANDY/WETH',
    points: 60000,
    multiplier: 0.2,
    id: '0x4a28f50f15efedf44af0d376fdc2e319fa8ccef8',
    apr: 0,
  },
  {
    pair: 'USDB/sFRAX',
    points: 300000,
    multiplier: 1.0,
    id: '0x28d7de5e9592cbd951dc3b22325fdfa89972f6db',
    apr: 0,
  },
  {
    pair: 'BAG/WETH',
    points: 30000,
    multiplier: 0.1,
    id: '0x5083e43b015296c75de0af519917c035309e80e4',
    apr: 0,
  },
  {
    pair: 'ESE/WETH',
    points: 30000,
    multiplier: 0.1,
    id: '0x28abbaadfacd46196217c23bc6402a0a458973a5',
    apr: 0,
  },
  {
    pair: 'ankrETH/WETH',
    points: 900000,
    multiplier: 3.0,
    id: '0xbcf0265f4bd3cb293b709fab0bf5c83c7eeb6b74',
    apr: 0,
  },
  {
    pair: 'sfrxETH/WETH',
    points: 600000,
    multiplier: 2.0,
    id: '0x1eba6f6cfdb86e965040bf9e75d3ded9a3fd22a5',
    apr: 0,
  },
  {
    pair: 'PUMP/WETH',
    points: 30000,
    multiplier: 0.1,
    id: '0x90f2eaf2db0d8400c9f565aa3c139ddffbe857d0',
    apr: 0,
  },
  {
    pair: 'BEPE/WETH',
    points: 30000,
    multiplier: 0.1,
    id: '0x3acde0b7f51703c2fbf0a382f831123560b742b9',
    apr: 0,
  },
  {
    pair: 'bWOOL/WETH',
    points: 390000,
    multiplier: 1.3,
    id: '0x9508122abdd654b68c7dbf5bdba329b852e4a512',
    apr: 0,
  },
  {
    pair: 'SSS/WETH',
    points: 60000,
    multiplier: 0.2,
    id: '0x047d5d8911d18aa5e64e666e53af2b47b46ab363',
    apr: 0,
  },
  {
    pair: 'inETH/WETH',
    points: 1500000,
    multiplier: 5.0,
    id: '0x46f2aa2aa7d31ddd237d620e52a33a8d5af2a5ab',
    apr: 0,
  },
  {
    pair: 'Yield/WETH',
    points: 300000,
    multiplier: 1.0,
    id: '0xc1fd5e0b3388c66dfad458ded01dcddae68cb03e',
    apr: 0,
  },
]

export async function GET(request: NextRequest) {
  const client = getAlgebraClient()

  const {
    data: { pools },
  } = await client.query({
    query: POOLS_TVL,
    fetchPolicy: 'cache-first',
  })

  const enhancedBoostedPools = boostedPools.map((pool) => {
    const poolData = pools.find(
      (p: { id: string; totalValueLockedUSD: string }) => p?.id?.toLowerCase() === pool?.id?.toLowerCase()
    )
    const annualFactor = 365 / (pool?.distributionDays || 7)

    return {
      ...pool,
      apr: poolData?.totalValueLockedUSD
        ? toBN(pool.points)
            .multipliedBy(PRICE_PER_POINT)
            .dividedBy(poolData.totalValueLockedUSD)
            .multipliedBy(annualFactor)
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
