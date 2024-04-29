import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '..'
import { getAllPools, getConcentratedPools } from './thunks'
import { getLiquidityTableElements, getLiquidityV2Pairs } from './thunks'
import { useAccount } from 'wagmi'

export default function LiquidityUpdater() {
  const thunkDispatch: AppThunkDispatch = useDispatch()
  const { address } = useAccount()

  useEffect(() => {
    if (address) thunkDispatch(getLiquidityV2Pairs(address))
    if (address) thunkDispatch(getLiquidityTableElements(address))
    thunkDispatch(getConcentratedPools())
  }, [thunkDispatch, address])

  useEffect(() => {
    thunkDispatch(getAllPools())
  }, [thunkDispatch])

  return null
}
