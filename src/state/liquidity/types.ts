import { Address } from '@/src/library/types'
import { ApiState } from '@/src/library/types/connection'
import { ClmProvider, LiquidityV2PairDetails } from '@/src/library/types/liquidity'

export interface LiquidityState {
  // Liquidity V2 Pairs
  token0: Address
  token0TypedValue: string
  token1: Address
  token1TypedValue: string
  clmProvider: ClmProvider
  v2Pairs: {
    state: ApiState
    data: LiquidityV2PairDetails[]
  }
  concentratedPools: { state: ApiState; data: any }
}

// TODO: Move this type to types/liquidity.ts
export type PoolData = {
  pairDetails: LiquidityV2PairDetails
}
