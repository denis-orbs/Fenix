import { ApiState } from '@/src/library/types/connection'
import { useAppDispatch, useAppSelector } from '..'
import { LiquidityV2PairDetails } from '@/src/library/types/liquidity'
import { useCallback } from 'react'
import { updateToken0, updateToken0Value, updateToken1, updateToken1Value } from './actions'
import { Address } from '@/src/library/types'

export function useV2PairsData() {
  const v2Pairs: {
    state: ApiState
    data: LiquidityV2PairDetails[]
  } = useAppSelector((state) => state.liquidity.v2Pairs)

  return {
    loading: v2Pairs.state === ApiState.LOADING,
    data: v2Pairs.data,
  }
}

export function useConcentratedPools() {
  const concentratedPools: {
    state: ApiState
    data: any
  } = useAppSelector((state) => state.liquidity.concentratedPools)

  return {
    loading: concentratedPools.state === ApiState.LOADING,
    data: concentratedPools.data,
  }
}

export function useToken0() {
  const token0 = useAppSelector((state) => state.liquidity.token0)
  return token0
}
export function useToken0Value() {
  const token0Value = useAppSelector((state) => state.liquidity.token0Value)
  return token0Value
}

export function useToken1() {
  const token1 = useAppSelector((state) => state.liquidity.token1)
  return token1
}
export function useToken1Value() {
  const token1Value = useAppSelector((state) => state.liquidity.token1Value)
  return token1Value
}
export function useClmProvider() {
  const clmProvider = useAppSelector((state) => state.liquidity.clmProvider)
  return clmProvider
}

export function useSelectedPair() {
  const token0 = useToken0()
  const token1 = useToken1()
  const clmProvider = useClmProvider()
  return {
    token0,
    token1,
    clmProvider,
  }
}

export function useSetToken0() {
  const dispatch = useAppDispatch()
  return useCallback(
    (token0: Address) => {
      dispatch(updateToken0(token0))
    },
    [dispatch]
  )
}
export function useSetToken0Value() {
  const dispatch = useAppDispatch()
  return useCallback(
    (token0Value: string) => {
      dispatch(updateToken0Value(token0Value))
    },
    [dispatch]
  )
}

export function useSetToken1() {
  const dispatch = useAppDispatch()
  return useCallback(
    (token1: Address) => {
      dispatch(updateToken1(token1))
    },
    [dispatch]
  )
}
export function useSetToken1Value() {
  const dispatch = useAppDispatch()
  return useCallback(
    (token1Value: string) => {
      dispatch(updateToken1Value(token1Value))
    },
    [dispatch]
  )
}
