import { useDispatch } from 'react-redux'
import { useAppSelector } from '..'
import { LiquidityState } from './reducer'
import { ApiState } from '@/src/library/types/connection'
import { LiquidityV2PairData } from './types'

export function useV2PairsData() {
  const v2Pairs: {
    state: ApiState
    data: LiquidityV2PairData[]
  } = useAppSelector((state) => state.liquidity.v2Pairs)

  return {
    loading: v2Pairs.state === ApiState.LOADING,
    data: v2Pairs.data,
  }
}
