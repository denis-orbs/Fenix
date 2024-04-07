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
import { getLiquidityTableElements } from './thunks'
import { LiquidityTableElement, LiquidityV2PairDetails, V2PairInfo, V3PairInfo, v3PoolData } from './types'
import { PairInfoV3 } from '@/src/library/web3/apis/pairAPI'
import { GET_POSITIONV3_USER, GET_V2_PAIRS, GET_V3_ALGEBRA_DATA } from '@/src/library/apollo/queries/LIQUIDITY'
import client, { algebra_client } from '@/src/library/apollo/client'
import { blastClient } from '@/src/library/apollo/client/protocolCoreClient'
import { Address } from 'viem'
import { positions } from '@/src/components/Dashboard/MyStrategies/Strategy'

export interface LiquidityState {
  // Liquidity V2 Pairs
  v2Pairs: {
    state: ApiState
    data: PairInfoV3[]
    tableData?: LiquidityTableElement[]
  }
}

export const initialState: LiquidityState = {
  v2Pairs: {
    state: ApiState.LOADING,
    data: [],
    tableData: [],
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
      state.v2Pairs.state = ApiState.LOADING
      state.v2Pairs.data = action.payload
      state.v2Pairs.state = ApiState.SUCCESS
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
    .addCase(getLiquidityTableElements.pending, (state) => {
      state.v2Pairs.state = ApiState.LOADING
    })
    .addCase(getLiquidityTableElements.fulfilled, (state, action) => {
      state.v2Pairs.state = ApiState.LOADING
      state.v2Pairs.tableData = action.payload
      state.v2Pairs.state = ApiState.SUCCESS
    })
    .addCase(getLiquidityTableElements.rejected, (state) => {
      state.v2Pairs.state = ApiState.ERROR
    })
})

// Function to fetch v3 algebra pool data
export const fetchPoolData = async () => {
  try {
    const { data } = await algebra_client.query({
      query: GET_V3_ALGEBRA_DATA,
    })
    // Data is available in `data.pools`
    console.log(data)
    return data.pools as V3PairInfo[]
  } catch (error) {
    console.error('Error fetching pool data:', error)
    return []
  }
}

// Function to fetch v3 algebra positions of user data
export const fetchV3Positions = async (user: Address) => {
  try {
    const { data } = await algebra_client.query({
      query: GET_POSITIONV3_USER,
      variables: { owner: user }, // Pass the user variable as owner
    })
    // Data is available in `data.positions`
    return data.positions as positions[]
  } catch (error) {
    console.error('Error fetching positions:', error)
    return []
  }
}

// Function to fetch v2 algebra pool data
export const fetchv2PoolData = async () => {
  try {
    const { data } = await blastClient.query({
      query: GET_V2_PAIRS,
    })
    // Data is available in `data.pools`
    return data.pairs as V2PairInfo[]
  } catch (error) {
    console.error('Error fetching pool data:', error)
    return []
  }
}

GET_V2_PAIRS
