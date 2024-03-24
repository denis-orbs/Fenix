import { ApiState } from '@/src/library/types/connection'
import { createReducer } from '@reduxjs/toolkit'
import { getConcentratedPools, getLiquidityV2Pairs } from './thunks'
import { LiquidityState, LiquidityV2PairDetails } from './types'

export const initialState: LiquidityState = {
  v2Pairs: {
    state: ApiState.LOADING,
    data: [],
  },
  concentratedPools: {
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
    .addCase(getConcentratedPools.pending, (state) => {
      state.concentratedPools.state = ApiState.LOADING
    })
    .addCase(getConcentratedPools.fulfilled, (state, action) => {
      state.concentratedPools.state = ApiState.SUCCESS
      state.concentratedPools.data = action.payload
    })
    .addCase(getConcentratedPools.rejected, (state) => {
      state.concentratedPools.state = ApiState.ERROR
    })
})
