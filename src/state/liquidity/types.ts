import { ApiState } from '@/src/library/types/connection'

export type PoolData = {
  pairDetails: LiquidityV2PairDetails
}
export interface LiquidityState {
  // Liquidity V2 Pairs
  v2Pairs: {
    state: ApiState
    data: LiquidityV2PairDetails[]
  }
  concentratedPools: { state: ApiState; data: any }
}
export type LiquidityV2PairDetails = {
  id: string
  isStable: boolean
  token0: {
    name: string
    id: string
    symbol: string
  }
  token1: {
    id: string
    symbol: string
    name: string
  }
}
