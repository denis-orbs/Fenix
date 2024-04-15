import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '..'
import { resetUser, updateSlippageTolerance } from './actions'

export function useResetUser() {
  const dispatch = useAppDispatch()
  return useCallback(() => {
    dispatch(resetUser())
  }, [dispatch])
}

export function useSetSlippageToleranceCallback(): (slippageTolerance: number | 'auto') => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (slippageTolerance: number | 'auto') => {
      dispatch(updateSlippageTolerance({ slippageTolerance }))
    },
    [dispatch]
  )
}

export function useSlippageTolerance(): number | 'auto' {
  return useAppSelector((state) => state.user.slippageTolerance)
}
