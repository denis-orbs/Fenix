import getProtocolCoreClient from '@/src/library/apollo/client/protocolCoreClient'
import { GET_V2_PAIRS } from '@/src/library/apollo/queries/LIQUIDITY'
import { queryAllForClient } from '@/src/library/apollo/utils'
import { LiquidityV2PairDetails } from '@/src/library/types/liquidity'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getLiquidityV2Pairs = createAsyncThunk('liquidity/getV2Pairs', async () => {
  try {
    const client = getProtocolCoreClient()
    if (!client) return []

    const pairsV2 = await queryAllForClient<LiquidityV2PairDetails>(client, GET_V2_PAIRS, {})

    return pairsV2
  } catch (error) {
    console.error(error)
    throw new Error(`Unable to query data from Client`)
  }
})

export const getConcentratedPools = createAsyncThunk('liquidity/getConcentratedPools', async () => {
  const response = await fetch('https://api.steer.finance/getSmartPools?chainId=56&dexName=pancake')
  const data = await response.json()
  const poolsArray = Object.values(data.pools).reduce((acc: any, current: any) => {
    if (current.length > 0) {
      acc.push(...current)
    }
    return acc
  }, [])
  return poolsArray
})
