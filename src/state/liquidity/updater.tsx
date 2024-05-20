import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '..'
import { getAllPools, getConcentratedPools } from './thunks'
import { getLiquidityTableElements, getLiquidityV2Pairs } from './thunks'
import { useAccount } from 'wagmi'

export default function LiquidityUpdater() {
  const thunkDispatch: AppThunkDispatch = useDispatch()
  const { address, chainId } = useAccount()

  useEffect(() => {
    if (address && chainId) thunkDispatch(getLiquidityV2Pairs({ address, chainId }))
    if (address && chainId) thunkDispatch(getLiquidityTableElements({ address, chainId }))
    thunkDispatch(getConcentratedPools())
  }, [thunkDispatch, address, chainId])

  useEffect(() => {
    thunkDispatch(getAllPools())
  }, [thunkDispatch])

  return null
}
