import { Token, Route } from '@cryptoalgebra/integral-sdk'
import { PoolState, usePool } from './usePool'
import { useEffect, useMemo, useState } from 'react'
import { IToken } from '@/src/library/types'
import { Address } from 'viem'
// const client = getActivityApolloClient(chainId)
// const client = getAlgebraClient()

// const getPoolsIds = async () => {
//   const data = await client.query({
//     query: POOLS_ID_LIST,
//     fetchPolicy: 'cache-first',
//   })
//   return data
// }
export const useAlgebraMultiRouting = (tokenGet: IToken, tokenSell: IToken) => {
  const TOKEN_USDB = useMemo(
    () => new Token(81457, '0x4300000000000000000000000000000000000003', 18, 'USDB', 'USDB'),
    []
  )
  const TOKEN_WBTC = useMemo(
    () => new Token(81457, '0xF7bc58b8D8f97ADC129cfC4c9f45Ce3C0E1D2692', 8, 'WBTC', 'Wrapped Bitcoin'),
    []
  )

  const [pool1State, POOL_USDB_WETH] = usePool('0x1d74611f3ef04e7252f7651526711a937aa1f75e')
  const [pool2State, POOL_WETH_WBTC] = usePool('0xc066a3e5d7c22bd3beaf74d4c0925520b455bb6f')

  if (!POOL_USDB_WETH || !POOL_WETH_WBTC) return null

  let swapRoute
  if (
    tokenGet?.address?.toLowerCase() === TOKEN_USDB.address.toLowerCase() &&
    tokenSell?.address?.toLowerCase() === TOKEN_WBTC.address.toLowerCase()
  ) {
    swapRoute = new Route([POOL_WETH_WBTC, POOL_USDB_WETH], TOKEN_WBTC, TOKEN_USDB)
  } else if (
    tokenGet?.address?.toLowerCase() === TOKEN_WBTC.address.toLowerCase() &&
    tokenSell?.address?.toLowerCase() === TOKEN_USDB.address.toLowerCase()
  ) {
    swapRoute = new Route([POOL_USDB_WETH, POOL_WETH_WBTC], TOKEN_USDB, TOKEN_WBTC)
  } else {
    swapRoute = null
  }
  // console.log(swapRoute?.tokenPath)
  return { swapRoute }
}
