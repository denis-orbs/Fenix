import { ApiState } from '@/src/library/types/connection'
import { useAppSelector } from '..'
import { LiquidityTableElement, LiquidityV2PairDetails, V3PairInfo } from './types'
import { PairInfoV3 } from '@/src/library/web3/apis/pairAPI'

export function useV2PairsData() {
  const v2Pairs: {
    state: ApiState
    tableData?: LiquidityTableElement[]
  } = useAppSelector((state) => state.liquidity.v2Pairs)
  const pairLoading: {
    state: ApiState
  } = useAppSelector((state) => state.liquidity.v2Pairs)

  return {
    loading: v2Pairs.state === ApiState.LOADING,
    data: v2Pairs.tableData,
  }
}
