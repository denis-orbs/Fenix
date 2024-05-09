import { toBN } from '@/src/library/utils/numbers'
import { NextRequest, NextResponse } from 'next/server'

const POINTS_SUPLY = 10_000_000
const POINTS_TOTAL_VALUE = 33_500
const PRICE_PER_POINT = POINTS_TOTAL_VALUE / POINTS_SUPLY

export interface BoostedPool {
  id: string
  points: number
  multiplier: number
}

export interface RingCampaignData {
  boostedPools: BoostedPool[]
  totalPoints: number
  pricePerPoint: number
  pointsTotalValue: number
}

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      boostedPools: [
        {
          id: '0x1d74611f3ef04e7252f7651526711a937aa1f75e',
          points: 9_000_000,
          multiplier: 9,
        },
        {
          id: '0xc066a3e5d7c22bd3beaf74d4c0925520b455bb6f',
          points: 1_000_000,
          multiplier: 1,
        },
      ],
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
