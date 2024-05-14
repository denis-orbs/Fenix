import { toBN } from '@/src/library/utils/numbers'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const authorizationHeader = request.headers.get('Authorization')
  if (authorizationHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  const users = await prisma.users.findMany()

  for (const user of users) {
    const wallet = user.id
    try {
      const merklPoints = await fetch(`https://api.merkl.xyz/v3/userRewards?user=${wallet}&chainId=81457`, {
        cache: 'no-cache',
      })
      const merklPointsData = await merklPoints.json()
      const merklPointsBalance = BigInt(
        merklPointsData?.['0xA7c167f58833c5e25848837f45A1372491A535eD']?.['accumulated'] || 0n
      )

      // console.log(merklPointsBalance, 'merklPointsBalance')
      console.log(`Data introduced for wallet ${wallet}. Points: ${merklPointsBalance / 10n ** 6n}`)
      await prisma.users.update({
        where: { id: wallet },
        data: {
          accumulated_rings_points: merklPointsBalance / 10n ** 6n,
        },
      })
      await new Promise((resolve) => setTimeout(resolve, 200)) // Delay
    } catch (error) {
      console.error('There was an error with ', error)
    }
  }
  return NextResponse.json({ ok: true })
}
