import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '..'
import { setChart } from './actions'

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
  return useAppSelector((state) => state.chart.showChart);
}
