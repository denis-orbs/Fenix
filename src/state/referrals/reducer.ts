import { createReducer } from '@reduxjs/toolkit'
import { setReferralCode, setReferralSystemInitialized } from './actions'
import { ReferralState } from './types'

export const initialState: ReferralState = {
  isReferralSystemInitialized: false,
  referralCode: '',
}

export default createReducer(initialState, (builder) => {
  builder
    .addCase(setReferralCode, (state, action) => {
      state.referralCode = action.payload.referralCode
    })
    .addCase(setReferralSystemInitialized, (state, action) => {
      state.isReferralSystemInitialized = action.payload.isReferralSystemInitialized
    })
})
