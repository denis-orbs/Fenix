import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '..'
import { getConcentratedPools, getLiquidityV2Pairs } from './thunks'

export default function LiquidityUpdater() {
  const thunkDispatch: AppThunkDispatch = useDispatch()

  useEffect(() => {
    thunkDispatch(getLiquidityV2Pairs())
    thunkDispatch(getConcentratedPools())
  }, [thunkDispatch])

  return null
}
