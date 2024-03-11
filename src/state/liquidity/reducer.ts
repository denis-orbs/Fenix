import { ApiState } from '@/src/library/types/connection'
import { createReducer } from '@reduxjs/toolkit'
import { getLiquidityV2Pairs } from './thunks'
import { LiquidityV2PairDetails } from './types'

export interface LiquidityState {
  // Liquidity V2 Pairs
  v2Pairs: {
    state: ApiState
    data: LiquidityV2PairDetails[]
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
    .addCase(getLiquidityV2Pairs.rejected, (state) => {
      state.v2Pairs.state = ApiState.ERROR
    })
})
