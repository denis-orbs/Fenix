import { createReducer } from '@reduxjs/toolkit'
import { UserState } from './types'
import { resetUser, updateSlippageTolerance } from './actions'

export const initialState: UserState = {
  userDarkMode: true,
  slippageTolerance: 0.5,
}

export default createReducer(initialState, (builder) => {
  builder
    .addCase(resetUser, (state) => {
      state = initialState
    })

    .addCase(updateSlippageTolerance, (state, action) => {
      state.slippageTolerance = action.payload.slippageTolerance
    })
})
