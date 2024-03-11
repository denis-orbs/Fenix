import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getLiquidityV2Pairs } from './thunks'
import { AppThunkDispatch } from '..'

export default function LiquidityUpdater() {
  const thunkDispatch: AppThunkDispatch = useDispatch()

  useEffect(() => {
    thunkDispatch(getLiquidityV2Pairs())
  }, [])
  return null
}
