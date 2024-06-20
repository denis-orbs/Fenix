import { useMemo } from 'react'

// hooks
import { useRingsCampaignsBoostedPools } from '@/src/state/liquidity/hooks'

// helpers
import { buildAprRingsMap } from '@/src/library/utils/build-apr-rings-map'

// models
import { BasicPool } from '@/src/state/liquidity/types'

export const useRingsPoolApr = (row: BasicPool | string) => {
  const poolId = typeof row === 'string' ? row : row?.id

  // common
  const { data: ringsList, loading: ringsLoading } = useRingsCampaignsBoostedPools()

  // computed
  const aprRingsMap = useMemo(
    () => (ringsLoading ? buildAprRingsMap(ringsList) : null),
    [ringsLoading, ringsList],
  )
  return useMemo(() => ({
    data: aprRingsMap?.[poolId] ?? 0,
    isLoading: ringsLoading,
  }), [ringsLoading, poolId, aprRingsMap])
}
