import { ApiState } from '@/src/library/types/connection'
import { LiquidityV2PairData } from './types'
import { createReducer } from '@reduxjs/toolkit'
import { getLiquidityV2Pairs } from './thunks'

export interface LiquidityState {
  // Liquidity V2 Pairs
  v2Pairs: {
    state: ApiState
    data: LiquidityV2PairData[]
  }
}

export const initialState: LiquidityState = {
  v2Pairs: {
    state: ApiState.LOADING,
    data: [],
  },
}

export default createReducer(initialState, (builder) => {
  builder
    .addCase(getLiquidityV2Pairs.pending, (state) => {
      state.v2Pairs.state = ApiState.LOADING
    })
    .addCase(getLiquidityV2Pairs.fulfilled, (state, action) => {
      state.v2Pairs.state = ApiState.SUCCESS
      state.v2Pairs.data = action.payload
    })
})
