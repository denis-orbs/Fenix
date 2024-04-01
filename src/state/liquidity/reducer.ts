import { ApiState } from '@/src/library/types/connection'
import { createReducer } from '@reduxjs/toolkit'
import { getConcentratedPools, getLiquidityV2Pairs } from './thunks'
import { LiquidityState } from './types'
import { ClmProvider } from '@/src/library/types/liquidity'
import {
  updateToken0,
  updateToken0TypedValue,
  updateToken1,
  updateToken1TypedValue,
  updateClmProvider,
} from './actions'

export const initialState: LiquidityState = {
  v2Pairs: {
    state: ApiState.LOADING,
    data: [],
  },
  concentratedPools: {
    state: ApiState.LOADING,
    data: [],
  },
  token0: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', // WETH
  token0TypedValue: '',
  token1: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', // WMATIC
  token1TypedValue: '',
  clmProvider: ClmProvider.ICHI,
}

export default createReducer(initialState, (builder) => {
  builder
    .addCase(updateToken0, (state, action) => {
      state.token0 = action.payload
    })
    .addCase(updateToken0TypedValue, (state, action) => {
      state.token0TypedValue = action.payload
    })
    .addCase(updateToken1, (state, action) => {
      state.token1 = action.payload
    })
    .addCase(updateToken1TypedValue, (state, action) => {
      state.token1TypedValue = action.payload
    })
    .addCase(updateClmProvider, (state, action) => {
      state.clmProvider = action.payload
    })
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
