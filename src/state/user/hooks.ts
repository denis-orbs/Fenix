import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '..'
import { resetUser, updateSlippageTolerance, setChart } from './actions'

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

export function useSetChart() {
  const dispatch = useAppDispatch()
  return useCallback(
    (showChart: boolean) => {
      dispatch(setChart(showChart))
    },
    [dispatch]
  )
}

export function useShowChart(): boolean {
  return useAppSelector((state) => state.user.showChart)
}