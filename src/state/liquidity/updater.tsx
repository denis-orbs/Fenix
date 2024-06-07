import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '..'
import { getAllPools, getConcentratedPools, getGammaVaults, getRingsCampaigns } from './thunks'
import { getLiquidityTableElements, getLiquidityV2Pairs } from './thunks'
import { useAccount } from 'wagmi'
import { autoRefresh } from '@/src/library/utils/retry'

export default function LiquidityUpdater() {
  const thunkDispatch: AppThunkDispatch = useDispatch()
  const { address, chainId } = useAccount()

  useEffect(() => {
    if (address && chainId) thunkDispatch(getLiquidityV2Pairs({ address, chainId }))
    if (address && chainId) thunkDispatch(getLiquidityTableElements({ address, chainId }))
    thunkDispatch(getConcentratedPools())
  }, [thunkDispatch, address, chainId])

  useEffect(() => {
    if (chainId) thunkDispatch(getAllPools(chainId))

    thunkDispatch(getGammaVaults())
  }, [thunkDispatch])
  useEffect(() => {
    const fetchCampaigns = () => {
      thunkDispatch(getRingsCampaigns())
    }

    fetchCampaigns()
    const interval = setInterval(fetchCampaigns, 1000 * 60 * 5)

    return () => {
      clearInterval(interval)
    }
  }, [thunkDispatch])

  return null
}
