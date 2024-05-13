import { RingCampaignData } from '@/src/app/api/rings/campaign/route'
import { BasicPool } from '@/src/state/liquidity/types'
import { toBN } from '../../../../library/utils/numbers'

export const fetchRingsPoolApr = async (row: BasicPool) => {
  const response = await fetch('/api/rings/campaign')
  const data: RingCampaignData = await response.json()
  console.log('data >> ', data)
  console.log('row >> ', row)
  if (!row?.id) return 0
  if (data) {
    const pool = data?.boostedPools?.find((pool) => pool?.id?.toLowerCase() == row?.id?.toLowerCase()) || null
    if (!pool) return 0
    const apr = toBN(pool?.apr || 0).toString()
    return apr
  }
  return 0
}