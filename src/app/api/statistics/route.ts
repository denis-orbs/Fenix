import { NextResponse, NextRequest } from 'next/server'
import { fetchv3Factories } from '@/src/state/liquidity/reducer'
import { toBN } from '@/src/library/utils/numbers'
import { PrismaClient } from '@prisma/client'
export interface GlobalStatisticsData {
  totalVolume: number
  totalTVL: number
  totalFees: number
  lastUpdate: string
  totalUsers: number
}
const prisma = new PrismaClient()

export async function GET(request: NextRequest): Promise<GlobalStatisticsData | NextResponse> {
  const [factoriesResult, usersResult] = await Promise.allSettled([fetchv3Factories(), prisma.users.count()])
  const fetchedFactoriesData = factoriesResult.status === 'fulfilled' ? factoriesResult.value : null
  const totalUsers = usersResult.status === 'fulfilled' ? usersResult.value : null

  if (!fetchedFactoriesData || !totalUsers) {
    return NextResponse.json({ error: 'Could not fetch data' }, { status: 500 })
  }

  const totalVolume = toBN(fetchedFactoriesData[0].totalVolumeUSD).toNumber()
  const totalTVL = toBN(fetchedFactoriesData[0].totalValueLockedUSD).toNumber()
  const totalFees = toBN(fetchedFactoriesData[0].totalFeesUSD).toNumber()
  const data: GlobalStatisticsData = {
    totalVolume,
    totalTVL,
    totalFees,
    lastUpdate: new Date().toISOString(),
    totalUsers,
  }

  return NextResponse.json(data, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=2000',
      'CDN-Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=2000',
      'Vercel-CDN-Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=2000',
    },
  })
}
