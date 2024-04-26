import { createReducer } from '@reduxjs/toolkit'
import { UserState } from './types'
import { resetUser, updateSlippageTolerance, setChart } from './actions'

export const initialState: UserState = {
  userDarkMode: true,
  slippageTolerance: 0.5,
  showChart: true,
}

export default createReducer(initialState, (builder) => {
  builder
    .addCase(resetUser, (state) => {
      state = initialState
    })

    .addCase(updateSlippageTolerance, (state, action) => {
      state.slippageTolerance = action.payload.slippageTolerance
    })

    .addCase(setChart, (state, action) => {
      state.showChart = action.payload
    })
})
