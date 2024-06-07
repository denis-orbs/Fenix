import { RingCampaignData } from '@/src/app/api/rings/campaign/route'
import { BasicPool } from '@/src/state/liquidity/types'
import { useQuery } from '@tanstack/react-query'
import { toBN } from '../../utils/numbers'

export const useRingsPoolApr = (row: BasicPool | string) => {
  const poolId = typeof row === 'string' ? row : row.id
  return useQuery({
    queryKey: ['ringsPointsCampaign', poolId],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const response = await fetch('/api/rings/campaign')
      return response.json()
    },
    select: (data: RingCampaignData) => {
      if (!poolId) return 0
      const pool = data?.boostedPools?.find((pool) => pool?.id?.toLowerCase() == poolId?.toLowerCase()) || null
      if (!pool) return 0
      const apr = toBN(pool?.apr || 0).toString()
      return apr
    },
  })
}
