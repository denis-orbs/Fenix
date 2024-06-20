// helpers
import { toBN } from '@/src/library/utils/numbers'

// models
import { RingCampaignData } from '@/src/app/api/rings/campaign/route'
import { BasicPool } from '@/src/state/liquidity/types'

export const fetchRingsPoolApr = async (row: BasicPool) => {
  const response = await fetch('/api/rings/campaign')
  const data: RingCampaignData = await response.json()
  if (!row?.id) return 0
  if (data) {
    const pool = data?.boostedPools?.find((pool) => pool?.id?.toLowerCase() == row?.id?.toLowerCase()) || null
    if (!pool) return 0
    const apr = toBN(pool?.apr || 0).toString()
    return apr
  }
  return 0
}

export async function fetchRingsApr(): Promise<{ [key: string]: string }> {
  const response = await fetch('/api/rings/campaign')
  const data: RingCampaignData = await response.json()

  if (!data) {
    return {}
  }

  return data.boostedPools.reduce(
    (map, { id, apr }) => ({ ...map, [id]: toBN(apr || 0).toString() }),
    {},
  )
}
