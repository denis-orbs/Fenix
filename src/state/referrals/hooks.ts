import { useAppDispatch, useAppSelector } from '..'
import { setReferralCode, setReferralSystemInitialized } from './actions'

export function useReferralCode() {
  const referralCode = useAppSelector((state) => state.referrals.referralCode)
  return referralCode
}
export function useSetReferralCodeCallback() {
  const dispatch = useAppDispatch()
  return (referralCode: string) => dispatch(setReferralCode({ referralCode }))
}

export function useIsReferralSystemInitialized() {
  const isReferralSystemInitialized = useAppSelector((state) => state.referrals.isReferralSystemInitialized)
  return isReferralSystemInitialized
}

export function useSetReferralSystemInitializedCallback() {
  const dispatch = useAppDispatch()
  return (isReferralSystemInitialized: boolean) =>
    dispatch(setReferralSystemInitialized({ isReferralSystemInitialized }))
}
