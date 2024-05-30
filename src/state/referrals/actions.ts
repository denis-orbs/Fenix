import { createAction } from '@reduxjs/toolkit'

export const setReferralCode = createAction<{ referralCode: string }>('referrals/setReferralCode')
export const setReferralSystemInitialized = createAction<{ isReferralSystemInitialized: boolean }>(
  'referrals/setReferralSystemInitialized'
)
