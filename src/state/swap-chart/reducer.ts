import { createReducer } from '@reduxjs/toolkit'
import { ChartSwapState } from './types'
import { setChart } from './actions'

export const initialState: ChartSwapState = {
  showChart: false,
}

export default createReducer(initialState, (builder) => {
  builder
    .addCase(setChart, (state, action) => {
      state.showChart = action.payload
    })
})