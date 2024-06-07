import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '..'
import { getAllPools, getConcentratedPools, getGammaVaults, getRingsCampaigns } from './thunks'
import { getLiquidityTableElements, getLiquidityV2Pairs } from './thunks'
import { useAccount } from 'wagmi'
import { autoRefresh } from '@/src/library/utils/retry'

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
