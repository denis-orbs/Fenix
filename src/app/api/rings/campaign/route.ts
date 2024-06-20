export const revalidate = 60
import getProtocolCoreClient, { getAlgebraClient } from '@/src/library/apollo/client/protocolCoreClient'
import { POOLSV2_LIST, POOLS_LIST, POOLS_TVL } from '@/src/library/apollo/queries/pools'
import { fetchTokens } from '@/src/library/common/getAvailableTokens'
import { TokenDataProvider } from '@/src/library/providers/TokenDataProvider'
import { totalCampaigns } from '@/src/library/utils/campaigns'
import { toBN } from '@/src/library/utils/numbers'

import { NextRequest, NextResponse } from 'next/server'

const POINTS_SUPLY = 30000000
const POINTS_TOTAL_VALUE = 49224
const PRICE_PER_POINT = POINTS_TOTAL_VALUE / POINTS_SUPLY
export interface extraPoints {
  tokenAddress: string
  name: string
  points: number
  apr: number
}
export interface BoostedPool {
  id: string
  points: number
  blastGold: number
  multiplier?: number
  apr: number
  pair?: string
  distributionDays?: number
  extraPoints?: extraPoints[]
  poolType: 'v2' | 'v3'
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
    points: 20205000,
    blastGold: 0,
    id: '0x1d74611f3ef04e7252f7651526711a937aa1f75e',
    apr: 0,
    poolType: 'v3',
  },
  {
    pair: 'WBTC/WETH',
    points: 150_000,
    blastGold: 0,
    id: '0xc066a3e5d7c22bd3beaf74d4c0925520b455bb6f',
    apr: 0,
    poolType: 'v3',
  },
  {
    pair: 'pxETH/ETH',
    points: 1_500_000,
    blastGold: 0,
    id: '0x3bafe103742da10a4fece8fc5e800df07d645439',
    apr: 0,
    poolType: 'v3',
  },
  {
    pair: 'WETH/wrsETH',
    points: 1_500_000,
    blastGold: 0,
    id: '0xe53b1da56f90c9529f2db1bb8711c3f1cc6f03bd',
    apr: 0,
    poolType: 'v3',
  },
  {
    pair: 'ezETH/WETH',
    points: 1_200_000,
    blastGold: 0,
    id: '0x635512a1333ad0822f5ba4fd6479daa1df8b77e1',
    apr: 0,
    poolType: 'v3',
  },
  // {
  //   pair: 'ankrETH/WETH',
  //   points: 300000,
  //   id: '0xbcf0265f4bd3cb293b709fab0bf5c83c7eeb6b74',
  //   apr: 0,
  //  poolType: 'v3',
  // },
  {
    pair: 'sfrxETH/WETH',
    points: 1_200_000,
    blastGold: 0,
    id: '0x1eba6f6cfdb86e965040bf9e75d3ded9a3fd22a5',
    apr: 0,
    poolType: 'v3',
  },
  {
    pair: 'inETH/WETH',
    points: 450_000,
    blastGold: 0,
    id: '0x46f2aa2aa7d31ddd237d620e52a33a8d5af2a5ab',
    apr: 0,
    poolType: 'v3',
  },
  {
    pair: 'weETH/WETH',
    points: 1_500_000,
    blastGold: 0,
    id: '0x9304ba542df9bc61dd1c97c073ed35f81cab6149',
    apr: 0,
    poolType: 'v3',
  },
  {
    pair: 'USD+/USDB',
    points: 600_000,
    blastGold: 0,
    id: '0x6a1de1841c5c3712e3bc7c75ce3d57dedec6915f',
    apr: 0,
    poolType: 'v3',
  },
  {
    pair: 'USDB/sFRAX',
    points: 30000,
    id: '0x28d7de5e9592cbd951dc3b22325fdfa89972f6db',
    apr: 0,
    poolType: 'v3',
    blastGold: 0,
  },
  {
    pair: 'USDe/USDB',
    points: 150_000,
    blastGold: 0,
    id: '0xd0cd894c605a9eedacbc0fa9bd8440627a5d37b1',
    apr: 0,
    poolType: 'v3',
  },
  {
    pair: 'DEUS/WETH',
    points: 300_000,
    blastGold: 0,
    id: '0x117106000ceb709ba3ec885027d111463204d6b6',
    apr: 0,
    poolType: 'v3',
  },
  // {
  //   pair: 'MCLB/WETH',
  //   points: 37500,
  //   id: '0xcf68cdfea89f9e6964d4c2bd8a42eba5da9f945d',
  //   apr: 0,
  //  poolType: 'v3',
  // },
  {
    pair: 'fDAO/WETH',
    points: 375_000,
    blastGold: 0,
    extraPoints: [
      {
        tokenAddress: '0x3b0cffda9a5ab64135c227638e777ceec0c243a8',
        name: 'fDAO Emissions',
        points: 12_500,
        apr: 0,
      },
    ],
    id: '0x886369748d1d66747b8f51ab38de00dea13f0101',
    apr: 0,
    poolType: 'v3',
  },
  // {
  //   pair: 'axlUSDC/USDB',
  //   points: 0,
  //   id: '0x1fe38ea700f0b8b013be01e58b02b1da3956379a',
  //   apr: 0,
  //  poolType: 'v3',
  // },
  // {
  //   pair: 'axlUSDC/WETH',
  //   points: 0,
  //   id: '0x86d1da56fc79accc0daf76ca75668a4d98cb90a7',
  //   apr: 0,
  //  poolType: 'v3',
  // },
  // {
  //   pair: 'DUSD/DETH',
  //   points: 0,
  //   id: '0xce274e4ae83baadd1d3b88e1ed24886e05aca345',
  //   apr: 0,
  //  poolType: 'v3',
  // },
  // {
  //   pair: 'DETH/WETH',
  //   points: 30000,
  //   id: '0xf2bb3403e80adc9272c43b386c76e54d5bb604a5',
  //   apr: 0,
  //  poolType: 'v3',
  // },
  // {
  //   pair: 'DUSD/USDB',
  //   points: 0,
  //   id: '0xf63e385e854e082c78df0627b411fdb78877faa1',
  //   apr: 0,
  //  poolType: 'v3',
  // },
  {
    pair: 'DOLA/USDB',
    points: 420_000,
    blastGold: 0,
    id: '0xd49ad1dd6c5eae53abdafeaed1866330c42ccae4',
    apr: 0,
    poolType: 'v2',
  },
  {
    pair: 'PAC/WETH',
    points: 300_000,
    blastGold: 0,
    id: '0x8e57e61b7524a2f56fd01bbfe5de9bb96ed186b4',
    apr: 0,
    poolType: 'v3',
  },
  // {
  //   pair: 'BAJA/WETH',
  //   points: 45000,
  //   id: '0xe3fac59382987466d7f812df56c50739b99a907a',
  //   apr: 0,
  //  poolType: 'v3',
  // },
  // {
  //   pair: 'PEW/WETH',
  //   points: 45000,
  //   id: '0x24b711e1d32e28a143e1a9cfdfe03a39d1acc771',
  //   apr: 0,
  //  poolType: 'v3',
  // },
  // {
  //   pair: 'ANDY/WETH',
  //   points: 20700,
  //   id: '0x4a28f50f15efedf44af0d376fdc2e319fa8ccef8',
  //   apr: 0,
  //  poolType: 'v3',
  // },
  // {
  //   pair: 'BAG/WETH',
  //   points: 15000,
  //   id: '0x5083e43b015296c75de0af519917c035309e80e4',
  //   apr: 0,
  //  poolType: 'v3',
  // },
  // {
  //   pair: 'PUMP/WETH',
  //   points: 15000,
  //   id: '0x90f2eaf2db0d8400c9f565aa3c139ddffbe857d0',
  //   apr: 0,
  //  poolType: 'v3',
  // },
  // {
  //   pair: 'BEPE/WETH',
  //   points: 15000,
  //   id: '0x3acde0b7f51703c2fbf0a382f831123560b742b9',
  //   apr: 0,
  //  poolType: 'v3',
  // },
  // {
  //   pair: 'ESE/WETH',
  //   points: 45000,
  //   id: '0x28abbaadfacd46196217c23bc6402a0a458973a5',
  //   apr: 0,
  //  poolType: 'v3',
  // },
  // {
  //   pair: 'JUICE/WETH',
  //   points: 45000,
  //   id: '0x7113c00b5275b0b9c16686e5ac1164978b505c5d',
  //   apr: 0,
  //  poolType: 'v3',
  // },
  // {
  //   pair: 'ORBIT/WETH',
  //   points: 45000,
  //   id: '0xbad7a5de96b7df589252ced73426d4b59f90b466',
  //   apr: 0,
  //  poolType: 'v3',
  // },
  // {
  //   pair: 'OLE/WETH',
  //   points: 45000,
  //   id: '0x3a8fa7bdbb3bd2a523796b145e5dd23b45019dbe',
  //   apr: 0,
  //  poolType: 'v3',
  // },
  // {
  //   pair: 'WAI/WETH',
  //   points: 15000,
  //   id: '0x21d5d5998c3d0feea70b5980fdac9dd6b8a12761',
  //   apr: 0,
  //  poolType: 'v3',
  // },
  // {
  //   pair: 'KAP/WETH',
  //   points: 30000,
  //   id: '0xb50a80bba0ff07f4bc3434c593e86663fe05abe2',
  //   apr: 0,
  //  poolType: 'v3',
  // },
  // {
  //   pair: 'EARLY/WETH',
  //   points: 45000,
  //   id: '0x54bb102e85ee68a234fa06ece299346941d68d07',
  //   apr: 0,
  //  poolType: 'v3',
  // },
  // {
  //   pair: 'bWOOL/WETH',
  //   points: 45000,
  //   id: '0x9508122abdd654b68c7dbf5bdba329b852e4a512',
  //   apr: 0,
  //  poolType: 'v3',
  // },
  // {
  //   pair: 'SSS/WETH',
  //   points: 10000,
  //   id: '0x047d5d8911d18aa5e64e666e53af2b47b46ab363',
  //   apr: 0,
  //  poolType: 'v3',
  // },
  // {
  //   pair: 'Yield/WETH',
  //   points: 25000,
  //   id: '0xc1fd5e0b3388c66dfad458ded01dcddae68cb03e',
  //   apr: 0,
  //  poolType: 'v3',
  // },
]

export async function GET(request: NextRequest) {
  const client = getAlgebraClient()
  const protocolClient = getProtocolCoreClient()

  const {
    data: { pools },
  } = await client.query({
    query: POOLS_TVL,
    fetchPolicy: 'cache-first',
  })
  const {
    data: { pairs: pairs2 },
  } = await protocolClient.query({
    query: POOLSV2_LIST,
    fetchPolicy: 'cache-first',
  })

  const tokenData = await TokenDataProvider.getTokenPrices()
  let poolData: any
  const enhancedBoostedPools = boostedPools.map((pool) => {
    if (pool.poolType === 'v2') {
      // sacar tvl con la resever
      poolData = pairs2.find((p) => p?.id?.toLowerCase() === pool?.id?.toLowerCase())

      const token0Price =
        tokenData.find((t) => t.tokenAddress.toLowerCase() === poolData?.token0?.id?.toLowerCase())?.priceUSD || 0
      const token1Price =
        tokenData.find((t) => t.tokenAddress.toLowerCase() === poolData?.token1?.id?.toLowerCase())?.priceUSD || 0
      console.log(token0Price)
      console.log(token1Price)
      const reserve0USD = toBN(poolData.reserve0).multipliedBy(token0Price)
      const reserve1USD = toBN(poolData.reserve1).multipliedBy(token1Price)
      poolData = { ...poolData, totalValueLockedUSD: reserve0USD.plus(reserve1USD).toNumber() }
      // poolData.totalValueLockedUSD =
    } else if (pool.poolType === 'v3') {
      poolData = pools.find(
        (p: { id: string; totalValueLockedUSD: string }) => p?.id?.toLowerCase() === pool?.id?.toLowerCase()
      )
    }

    const annualFactor = 365 / (pool?.distributionDays || 7)

    const updatedPool = {
      ...pool,
      blastGold: toBN(
        totalCampaigns.find((c) => c.pairAddress.toLowerCase() === pool.id.toLowerCase())?.blastGoldAmount || 0
      ).toNumber(),
      apr: poolData?.totalValueLockedUSD
        ? toBN(pool.points)
            .multipliedBy(PRICE_PER_POINT)
            .dividedBy(poolData.totalValueLockedUSD)
            .multipliedBy(annualFactor)
            .multipliedBy(100)
            .toNumber()
        : 0,
    }

    if (pool.extraPoints && pool.extraPoints.length > 0) {
      updatedPool.extraPoints = pool.extraPoints.map((extra) => {
        const tokenPrice = tokenData?.find((t) => t.tokenAddress.toLowerCase() === extra.tokenAddress.toLowerCase())
        return {
          ...extra,
          apr: poolData?.totalValueLockedUSD
            ? toBN(extra.points)
                .multipliedBy(tokenPrice?.priceUSD || 0)
                .dividedBy(poolData.totalValueLockedUSD)
                .multipliedBy(annualFactor)
                .multipliedBy(100)
                .toNumber()
            : 0,
        }
      })
    }
    return updatedPool
  })

  return NextResponse.json(
    {
      totalPoints: POINTS_SUPLY,
      pricePerPoint: PRICE_PER_POINT,
      pointsTotalValue: POINTS_TOTAL_VALUE,
      boostedPools: enhancedBoostedPools,
    },
    {
      status: 200,
    }
  )
}
