'use client'
import { useMemo, useState, useEffect } from 'react'

import { buildAprRingsMap } from '@/src/library/utils/build-apr-rings-map'

import { useRingsCampaignsBoostedPools, useV2PairsData } from '@/src/state/liquidity/hooks'

import { fromWei } from '@/src/library/utils/numbers'

import { Button, TableSkeleton } from '@/src/components/UI'
import HeaderRow from '@/src/components/Liquidity/Tables/HeaderRow'
import NotFoundLock from '@/src/components/Lock/NotFoundLock'

import { PROPS_CLASSIC_LIQUIDITY } from '@/src/components/Dashboard/types'
import { PoolData } from '@/src/state/liquidity/types'
import { useAccount } from 'wagmi'
import Spinner from '../../Common/Spinner'

const LiquidityPositions = () => {
  const { data: v2PairsData, loading: pairsLoading } = useV2PairsData()
  const { data: ringsList, loading: ringsLoading } = useRingsCampaignsBoostedPools()
  const { address } = useAccount()
  const [loading, setLoading] = useState(false)
  const aprRingsMap = useMemo(() => (ringsLoading ? null : buildAprRingsMap(ringsList)), [ringsLoading, ringsList])
  const poolsDataClassic = useMemo(
    () =>
      (v2PairsData || [])
        .filter((pool) => pool.pairSymbol !== 'Concentrated pool')
        .filter((row) => Number(fromWei(row.pairInformationV2?.account_lp_balance.toString(), 18)) !== 0)
        .map((row) => ({ pairDetails: row })),
    [v2PairsData]
  )
  const poolsDataClassicRing = useMemo<PoolData[]>(
    () =>
      aprRingsMap
        ? poolsDataClassic.map((pool) => ({
            ...pool,
            ...(pool.pairDetails?.pairSymbol
              ? {
                  pairDetails: {
                    ...pool.pairDetails,
                    maxAPR:
                      +(aprRingsMap[`${pool.pairDetails.id}`.toLowerCase()] ?? 0) +
                      +(isNaN(pool.pairDetails.apr) ? 0 : pool.pairDetails.apr ?? 0),
                  },
                }
              : {}),
          }))
        : poolsDataClassic,
    [poolsDataClassic, aprRingsMap]
  )

  useEffect(() => {
    setLoading(pairsLoading || ringsLoading)
  }, [pairsLoading, ringsLoading])

  const renderContent = () => {
    if (loading && address) {
      return (
        <div className="flex flex-col gap-3 w-full mb-10 mt-10 mx-auto">
          <div className="p-6 flex gap-8 justify-center items-center">
            <p className="text-white text-sm flex items-center gap-3">
              <Spinner /> Loading
            </p>
          </div>
        </div>
      )
    }

    if (poolsDataClassicRing.length > 0 && address) {
      return <HeaderRow {...PROPS_CLASSIC_LIQUIDITY} poolData={poolsDataClassicRing} />
    }

    if ((poolsDataClassicRing.length === 0 && !loading) || !address) {
      return (
        <div className="box-dashboard p-6">
          <NotFoundLock info={'No Pools Found.'} />
        </div>
      )
    }
  }

  return (
    <>
      <div className="mb-10">
        <div className="flex justify-between mb-4 items-center">
          <h2 className="text-white text-base font-medium">Classic Liquidity Positions</h2>
          <Button variant="tertiary" className="!py-3 xl:me-5 !text-xs !lg:text-sm" href="/liquidity">
            <span className="icon-logout"></span>New deposit
          </Button>
        </div>
        <div className={`${poolsDataClassicRing.length > 0 ? 'dashboard-box' : 'box-dashboard'}`}>
          <div className="rounded-lg z-10">
            <h1 className="text-white p-3">Classic liquidity</h1>
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  )
}

export default LiquidityPositions
