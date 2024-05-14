import { RINGS_TOKEN_DECIMALS } from '@/src/library/constants/misc'
import { totalCampaigns } from '@/src/library/utils/campaigns'
import { notificationService } from '@/src/library/utils/notificationService/factory'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
interface Reward {
  recipient: string
  reason: string
  rewardToken: string
  amount: string
}
const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const authorizationHeader = request.headers.get('Authorization')
  if (authorizationHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  const campaignsId = totalCampaigns.map((campaign) => campaign.campaignId)

  for (const campaignId of campaignsId) {
    try {
      const response = await fetch(`https://api.merkl.xyz/v3/rewardsReport?chainId=81457&campaignId=${campaignId}`, {
        cache: 'no-cache',
      })
      const data: Reward[] = await response.json()
      for (const reward of data) {
        const rewardAmount = BigInt(reward.amount) / 10n ** BigInt(RINGS_TOKEN_DECIMALS)
        await prisma.users.upsert({
          where: { id: reward.recipient.toLowerCase() },
          update: {
            accumulated_rings_points: {
              increment: rewardAmount,
            },
          },
          create: {
            id: reward.recipient.toLowerCase(),
            accumulated_rings_points: rewardAmount,
          },
        })
        console.log('Data introduced for wallet', reward.recipient, 'Points:', rewardAmount)
      }
    } catch (error) {
      await notificationService.sendNotification(
        `There was an error with the rewards distribution: ${campaignId} - ${error}`
      )
    }
  }
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return NextResponse.json({ ok: true }, { status: 200 })
}
