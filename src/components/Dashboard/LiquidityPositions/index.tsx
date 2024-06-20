'use client'
import { useMemo } from 'react'

// api
import { buildAprRingsMap } from '@/src/library/utils/build-apr-rings-map'

// hooks
import { useRingsCampaignsBoostedPools, useV2PairsData } from '@/src/state/liquidity/hooks'

// helpers
import { fromWei } from '@/src/library/utils/numbers'

// components
import { Button, TableSkeleton } from '@/src/components/UI'
import HeaderRow from '@/src/components/Liquidity/Tables/HeaderRow'
import NotFoundLock from '@/src/components/Lock/NotFoundLock'

// models
import { PROPS_CLASSIC_LIQUIDITY } from '@/src/components/Dashboard/types'
import { PoolData } from '@/src/state/liquidity/types'

const LiquidityPositions = () => {
  // common
  const { data: v2PairsData } = useV2PairsData()
  const { data: ringsList, loading: ringsLoading } = useRingsCampaignsBoostedPools()

  // computed
  const aprRingsMap = useMemo(
    () => (ringsLoading ? buildAprRingsMap(ringsList) : null),
    [ringsLoading, ringsList],
  )
  const poolsDataClassic = useMemo(() => (
    (v2PairsData || [])
      .filter((pool) => pool.pairSymbol !== 'Concentrated pool')
      .filter((row) => Number(fromWei(row.pairInformationV2?.account_lp_balance.toString(), 18)) !== 0)
      .map((row) => ({ pairDetails: row }))
  ), [v2PairsData])
  const poolsDataClassicRing = useMemo<PoolData[]>(() => (
    aprRingsMap
      ? poolsDataClassic.map((pool) => ({
          ...pool,
          ...(pool.pairDetails?.pairSymbol
            ? {
                pairDetails: {
                  ...pool.pairDetails,
                  maxAPR: (+(aprRingsMap[pool.pairDetails.id!] ?? 0) + +(isNaN(pool.pairDetails.apr) ? 0 : pool.pairDetails.apr ?? 0)),
                },
              }
            : {}),
        }))
      : poolsDataClassic
  ), [poolsDataClassic, aprRingsMap])

  // lifecycle hooks
  const renderContent = () => {
    if (ringsLoading) {
      return Array.from({ length: 5 }).map((_, index) => <TableSkeleton key={index} />)
    }

    if (poolsDataClassicRing.length > 0) {
      return <HeaderRow {...PROPS_CLASSIC_LIQUIDITY} poolData={poolsDataClassicRing} />
    }

    return (
      <div className="box-dashboard p-6">
        <NotFoundLock info={'No Pools Found.'} />
      </div>
    )
  }

  return (
    <>
      <div className="mb-10">
        <div className="flex justify-between mb-4 items-center">
          <h1 className="text-white text-xl">Classic Liquidity Positions</h1>
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
