import { toBN } from '@/src/library/utils/numbers'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
const prisma = new PrismaClient()
BigInt.prototype.toJSON = function () {
  return this.toString()
}
export async function GET(request: NextRequest) {
  const users = await prisma.users.findMany({
    select: {
      id: true,
      accumulated_rings_points: true,
    },
    where: {
      accumulated_rings_points: {
        gt: 0,
      },
    },
    orderBy: {
      accumulated_rings_points: 'desc',
    },
  })

  return NextResponse.json(
    { ranking: users },
    {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=180',
        'CDN-Cache-Control': 'public, s-maxage=120, stale-while-revalidate=180',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=120, stale-while-revalidate=180',
      },
    }
  )
}
