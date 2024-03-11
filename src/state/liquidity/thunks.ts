import getProtocolCoreClient from '@/src/library/apollo/client/protocolCoreClient'
import { GET_V2_PAIRS } from '@/src/library/apollo/queries/LIQUIDITY'
import { queryAllForClient } from '@/src/library/apollo/utils'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { LiquidityV2PairDetails } from './types'

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
