import { ApiState } from '@/src/library/types/connection'
import { useAppSelector } from '..'
import { LiquidityV2PairDetails } from './types'

export function useV2PairsData() {
  const v2Pairs: {
    state: ApiState
    data: LiquidityV2PairDetails[]
  } = useAppSelector((state) => state.liquidity.v2Pairs)

  return {
    loading: v2Pairs.state === ApiState.LOADING,
    data: v2Pairs.data,
  }
}

export function useConcentratedPools() {
  const concentratedPools: {
    state: ApiState
    data: any
  } = useAppSelector((state) => state.liquidity.concentratedPools)

  return {
    loading: concentratedPools.state === ApiState.LOADING,
    data: concentratedPools.data,
  }
}
