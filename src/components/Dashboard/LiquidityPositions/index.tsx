'use client'

import { Button, TableSkeleton } from '@/src/components/UI'
import HeaderRow from '@/src/components/Liquidity/Tables/HeaderRow'
import { PROPS_CLASSIC_LIQUIDITY, PROPS_CONCENTRATED_LIQUIDITY } from '../types'
import INFO_API from '../data'
import { useV2PairsData } from '@/src/state/liquidity/hooks'
import { useEffect, useMemo, useState } from 'react'
import { PoolData } from '@/src/state/liquidity/types'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { fromWei } from '@/src/library/utils/numbers'

const LiquidityPositions = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const { address } = useAccount()
  const { loading: loadingV2Pairs, data: v2PairsData } = useV2PairsData()
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])

  useEffect(() => {
    // console.log('Loading ', loading)
    // console.log('v2PairsData ', v2PairsData)
  }, [v2PairsData, loading, address])

  const poolsData = useMemo<PoolData[]>(() => {
    if (loading || !v2PairsData) {
      return []
    }

    return v2PairsData.map((pair) => {
      const pd: PoolData = {
        pairDetails: pair,
      }

      return pd
    })
  }, [loading, v2PairsData, address])

  const poolsDataClassic = poolsData
    .filter((pool) => pool.pairDetails.pairSymbol !== 'Concentrated pool')
    .filter((row) => Number(fromWei(row.pairDetails.pairInformationV2?.account_lp_balance.toString(), 18)) !== 0)

  // poolsdata filter if Number(fromWei(row.pairDetails.pairInformationV2?.account_lp_balance.toString(), 18)) is === 0

  return (
    <>
      {poolsDataClassic.length !== 0 ? (
        <div className="mb-10">
          <div className="flex justify-between mb-4 items-center">
            <h1 className="text-white text-xl">Liquidity Positions</h1>
            <Button variant="tertiary" className="!py-3 xl:me-5 !text-xs !lg:text-sm" href="/liquidity">
              <span className="icon-logout"></span>New deposit
            </Button>
          </div>
          {/* <div className="dashboard-box"> */}
          <div className={`${poolsDataClassic.length > 0 ? 'dashboard-box' : 'box-dashboard'}`}>
            <div className="  rounded-lg z-10">
              <h1 className="text-white p-3">Classic liquidity</h1>
              {loading ? (
                <>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <TableSkeleton key={index} />
                  ))}
                </>
              ) : (
                <HeaderRow {...PROPS_CLASSIC_LIQUIDITY} poolData={poolsDataClassic} />
              )}
              {/* <div className="mt-2">
                <Button variant="tertiary" className="!py-3 flex gap-2 !text-xs !lg:text-sm">
                  Review more
                  <span className="icon-link"></span>
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 w-full lg:w-4/5 mx-auto">
          <div className="text-white flex justify-between items-center flex-wrap">
            <p className="flex gap-3 text-lg ms-2">Liquidity Positions</p>
            <Button variant="tertiary" className="flex gap-2  !py-2" href="/liquidity">
              <span className="icon-logout "></span>New Deposit
            </Button>
          </div>
          <div className="box-dashboard p-6">
            <p className="text-white text-sm">
              To receive emissions{' '}
              <Link href={'/liquidity'} className="text-green-400 underline">
                deposit and stake
              </Link>{' '}
              your liquidity first.
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default LiquidityPositions
