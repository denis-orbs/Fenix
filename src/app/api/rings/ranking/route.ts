export const revalidate = 600

import { toBN } from '@/src/library/utils/numbers'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/src/library/utils/db'
import { Contract, ethers } from 'ethers'
import { contractAddressList } from '@/src/library/constants/contactAddresses'
import { erc20Abi, erc721Abi } from 'viem'
import { RankingEntry } from '@/src/library/hooks/rings/useRingsPoints'
import { MAX_NFT_BONUS } from '@/src/library/constants/misc'
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
  const provider = new ethers.providers.JsonRpcProvider({
    url: 'https://ancient-powerful-emerald.blast-mainnet.quiknode.pro/e93288d60f12f4fbb136d310242ac46df10b8f74/',
    fetchOptions: {
      referrer: 'https://fenixfinance.io/',
    },
  })
  const gooldieNTF = new Contract(contractAddressList.goldies_NFT, erc20Abi, provider)
  const userDetails = await Promise.allSettled(
    users.map(async (user, index) => {
      const extraRingsData = await prisma.rings_extra_data.findFirst({
        where: {
          user_id: user.id,
        },
      })

      const balance = await gooldieNTF.functions.balanceOf(user.id)

      return {
        ...user,
        gold_potential_rewards: extraRingsData?.potential_gold_reward,
        gold_qualifying_rings: extraRingsData?.gold_qualifying_rings,
        nft_boost: toBN(balance.toString()).mod(MAX_NFT_BONUS).toString(),
      }
    })
  )
  return NextResponse.json(
    {
      ranking: userDetails
        .filter((result) => result.status === 'fulfilled')
        .map((result) => (result as PromiseFulfilledResult<any>).value),
    },

    {
      headers: {
        'Cache-Control': 'public, s-maxage=500, stale-while-revalidate=600',
        'CDN-Cache-Control': 'public, s-maxage=500, stale-while-revalidate=600',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=500, stale-while-revalidate=600',
      },
      status: 200,
    }
  )
}
