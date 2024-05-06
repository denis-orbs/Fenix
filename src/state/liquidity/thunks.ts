import getProtocolCoreClient, { getAlgebraClient } from '@/src/library/apollo/client/protocolCoreClient'
import { GET_V2_PAIRS } from '@/src/library/apollo/queries/LIQUIDITY'
import { queryAllForClient } from '@/src/library/apollo/utils'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { BasicPool, LiquidityTableElement, LiquidityV2PairDetails } from './types'
import { Address } from 'viem'
import { BigDecimal } from '@/src/library/common/BigDecimal'
import { fetchTokens } from '@/src/library/common/getAvailableTokens'
import { getAllPairsForUser } from '@/src/library/web3/apis/PairAPIV3'
import { AddressZero } from '@/src/library/constants/misc'
import { FNXTokenAddress } from '@/src/library/web3/ContractAddresses'
import { fetchPoolData, fetchV3PoolDayData, fetchv2PoolData } from './reducer'
import { GlobalStatisticsData } from '@/src/app/api/statistics/route'
import cache from 'memory-cache'
import { BASIC_POOLS_LIST, POOLS_ID_LIST, POOLS_LIST, POOL_FRAGMENT } from '@/src/library/apollo/queries/pools'
import { algebra_client } from '@/src/library/apollo/client'
import { gql } from '@apollo/client'

export const getLiquidityV2Pairs = createAsyncThunk('liquidity/getV2Pairs', async (address: Address) => {
  try {
    const client = getProtocolCoreClient()
    if (!client) return []

    const availablePairsV2 = await getAllPairsForUser(address)
    const pairsV2 = availablePairsV2.filter((pair) => pair.pair_address.toLowerCase() != AddressZero)

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

export const getLiquidityTableElements = createAsyncThunk('liquidity/getPairInfo', async (address: Address) => {
  try {
    const client = getProtocolCoreClient()
    if (!client) return []
    const pairsV2 = await getAllPairsForUser(address)
    const availableTokenData = await fetchTokens()
    const availablePairsV3 = await fetchPoolData()
    const availablePairsV2Subgraph = await fetchv2PoolData()

    // const [pairsV2, availableTokenData, availablePairsV3, availablePairsV2Subgraph] = await Promise.all([
    //   getAllPairsForUser(address),
    //   fetchTokens(),
    //   fetchPoolData(),
    //   fetchv2PoolData(),
    // ])
    const availablePairsV2 = pairsV2.filter((pair) => pair.pair_address.toLowerCase() != AddressZero)

    if (!availablePairsV2 && !availableTokenData) return []
    const pairs: { [pair: Address]: LiquidityTableElement } = {}
    availablePairsV2.forEach((pair) => {
      // console.log(pair)
      const tokenA = pair.token0
      const tokenB = pair.token1
      const tokenAprice = Number(
        availableTokenData.find((t) => t.tokenAddress.toLowerCase() === tokenA.toLowerCase())?.priceUSD
      )
      const tokenBprice = Number(
        availableTokenData.find((t) => t.tokenAddress.toLowerCase() === tokenB.toLowerCase())?.priceUSD
      )

      const token0Symbol = pair.token0_symbol
      const token1Symbol = pair.token1_symbol

      if (tokenA && tokenB) {
        const fnxToken = availableTokenData.find((t) => t.tokenAddress.toLowerCase() === FNXTokenAddress.toLowerCase())

        //  if (!fnxToken) return

        /*const lp100 = 100 / parseFloat(
                getParsedTokenBalance(
                  tokenA.price_quote! * pair.reserve0 + tokenB.price_quote! * pair.reserve1, 18)) / pair.total_supply);*/

        let apr = 0.0
        let maxAPR = 0.0
        let tvl = new BigDecimal(0n, 18)

        // Calculating emissions APR
        tvl = new BigDecimal(pair.reserve0, pair.token0_decimals)
          .mulNumber(tokenAprice ?? 0)
          .add(new BigDecimal(pair.reserve1, pair.token1_decimals).mulNumber(tokenBprice ?? 0))
          .withDecimalPrecision(18)
        if (pair.gauge !== AddressZero) {
          apr = (Number(pair.feeAmount) / Number(tvl) === 0 ? 1 : Number(tvl)) * 100
          maxAPR = apr * 2
        }

        const totalPoolAmountValue = new BigDecimal(pair.reserve0, pair.token0_decimals)
          .mulNumber(tokenAprice || 0)
          .add(new BigDecimal(pair.reserve1, pair.token1_decimals).mulNumber(tokenBprice || 0))
          .withDecimalPrecision(18)

        const myPoolAmountValue = new BigDecimal(pair.account_lp_balance, 18)
          .mul(totalPoolAmountValue)
          .div(new BigDecimal(pair.total_supply, 18))
          .withDecimalPrecision(18)

        const myStackedAmountValueV2 = new BigDecimal(pair.account_gauge_balance, 18)
          .mul(totalPoolAmountValue)
          .div(new BigDecimal(pair.total_supply, 18))
          .withDecimalPrecision(18)

        const matchedPair = availablePairsV2Subgraph.find((t) => t.id.toLowerCase() === pair.pair_address.toLowerCase())

        pairs[pair.pair_address] = {
          pairAddress: pair.pair_address,
          pairSymbol: pair.symbol,
          pairInformationV2: pair,
          priceA: tokenAprice ? tokenAprice : 0,
          priceB: tokenBprice ? tokenBprice : 0,
          fee: (Number(pair.feeAmount) / 100).toString(),
          volumeUSD: matchedPair?.volumeUSD || '0',
          volumeToken0: matchedPair?.volumeToken0 || '0',
          volumeToken1: matchedPair?.volumeToken1 || '0',
          isInactiveGauge: false,
          totalPoolAmountValue: totalPoolAmountValue.toString(),
          myPoolAmountValue,
          myStackedAmountValueV2,
          myStackedAmountValueV3: new BigDecimal(0n, 18),
          apr,
          maxAPR,
          tvl: tvl.toString(),
          token0Symbol,
          token1Symbol,
          unmigrated: pair.account_gauge_balance > 0n,
        }
      }
    })

    availablePairsV3.forEach((pair) => {
      const tokenA = pair.token0.id
      const tokenB = pair.token1.id
      const tokenAprice = Number(
        availableTokenData.find((t) => t.tokenAddress.toLowerCase() === tokenA?.toLowerCase())?.priceUSD
      )

      const tokenBprice = Number(
        availableTokenData.find((t) => t.tokenAddress.toLowerCase() === tokenB?.toLowerCase())?.priceUSD
      )
      const token0Symbol = pair.token0.symbol
      const token1Symbol = pair.token1.symbol

      if (tokenA && tokenB) {
        const fnxToken = availableTokenData.find((t) => t.tokenAddress.toLowerCase() === FNXTokenAddress.toLowerCase())

        let apr = 0.0
        let maxAPR = 0.0
        const tvl = (
          Number(pair.totalValueLockedToken0) * tokenAprice +
          Number(pair.totalValueLockedToken1) * tokenBprice
        ).toFixed(2)

        const volumeUSD = Number(pair.volumeToken0) * tokenAprice + Number(pair.volumeToken1) * tokenBprice

        apr = ((Number(volumeUSD) * (Number(pair.fee) / 1000000)) / Number(tvl)) * 100
        maxAPR = apr * 2
        console.log(
          'apr',
          volumeUSD.toFixed(2).toString(),
          Number(volumeUSD),
          Number(volumeUSD) * (Number(pair.fee) / 1000000),
          Number(tvl)
        )
        // if (BLACKLISTED.includes(tokenA.symbol) || BLACKLISTED.includes(tokenB.symbol)) {
        //   apr = 0.0
        //   maxAPR = 0.0
        // }

        const totalPoolAmountValue = (
          Number(pair.totalValueLockedToken0) * tokenAprice +
          Number(pair.totalValueLockedToken1) * tokenBprice
        ).toFixed(2)

        const myPoolAmountValue = new BigDecimal(0n, 18).withDecimalPrecision(18)

        const myStackedAmountValueV2 = new BigDecimal(0n, 18).withDecimalPrecision(18)
        pairs[pair.id!] = {
          pairAddress: pair.id,
          pairSymbol: 'Concentrated pool',
          // FIXME: STARK
          pairInformationV2: { token0: pair.token0, token1: tokenB },
          priceA: tokenAprice ? tokenAprice : 0,
          priceB: tokenBprice ? tokenBprice : 0,
          isInactiveGauge: false,
          fee: (Number(pair.fee) / 10000).toString(),
          volumeUSD: volumeUSD.toFixed(2).toString(),
          volumeToken0: pair.volumeToken0,
          volumeToken1: pair.volumeToken1,
          totalPoolAmountValue,
          myPoolAmountValue,
          myStackedAmountValueV2,
          myStackedAmountValueV3: new BigDecimal(0n, 18),
          apr,
          maxAPR,
          tvl: tvl,
          token0Symbol,
          token1Symbol,
          unmigrated: false,
        }
      }
    })

    const liqElements: LiquidityTableElement[] = Object.values(pairs)

    // liqElements.sort((a, b) => {
    //   const pairInfoA = a.pairInformationV3 || a.pairInformationV2
    //   const pairInfoB = b.pairInformationV3 || b.pairInformationV2
    //   if (!pairInfoA || !pairInfoB) return -1
    //   if (a.totalPoolAmountValue.lt(b.totalPoolAmountValue)) {
    //     return 1
    //   } else {
    //     return -1
    //   }
    // })

    // let _totalUSDValue = new BigDecimal(0n, 18)
    // Object.values(pairs).forEach((e) => {
    //   const pairInfoA = e.pairInformationV3 || e.pairInformationV2
    //   if (e.priceA && e.priceB && pairInfoA) {
    //     _totalUSDValue = _totalUSDValue.add(e.totalPoolAmountValue)
    //   }
    // })

    // setTotalUSDValue(_totalUSDValue)

    return liqElements
  } catch (e) {
    // console.log(e, 'error')
  }
})
// here
export const fetchGlobalStatistics = async (): Promise<GlobalStatisticsData> => {
  const cacheKey = 'global-statistics'
  let cachedData = cache.get(cacheKey)
  if (!cachedData) {
    try {
      const response = await fetch('/api/statistics')
      const responseData = await response.json()
      cachedData = responseData
      cache.put(cacheKey, responseData, 1000 * 60 * 20)
    } catch (error) {
      console.error('Error fetching global statistics:', error)
      return {
        totalVolume: 0,
        totalTVL: 0,
        totalFees: 0,
        lastUpdate: new Date().toISOString(),
      }
    }
  }
  return cachedData
}

export const getAllPools = createAsyncThunk('liquidity/getAllPools', async () => {
  const client = getAlgebraClient()
  try {
    const { data } = await client.query({
      query: POOLS_LIST,
      fetchPolicy: 'cache-first',
    })
    const data2 = await fetchV3PoolDayData()
    const weekFeesUsd = data2.poolDayDatas.reduce((acc: any, current: any) => {
      acc += Number(current.feesUSD)
      return acc
    }, 0)

    console.log(data2, weekFeesUsd, 'huhuh')

    const pools = data.pools.map((pool: BasicPool) => ({
      id: pool.id,
      volumeUSD: pool.volumeUSD,
      feesUSD: pool.feesUSD,
      liquidity: pool.liquidity,
      totalValueLockedUSD: pool.totalValueLockedUSD,
      poolType: 'concentrated', // CHANGE
      token0Price: pool.token0Price,
      token1Price: pool.token1Price,
      feesToken0: pool.feesToken0,
      feesToken1: pool.feesToken1,
      volumeToken0: pool.volumeToken0,
      volumeToken1: pool.volumeToken1,
      fee: pool.fee,
      token0: {
        id: pool.token0.id,
        decimals: pool.token0.decimals,
        symbol: pool.token0.symbol,
        name: pool.token0.name,
      },
      token1: {
        id: pool.token1.id,
        decimals: pool.token1.decimals,
        symbol: pool.token1.symbol,
        name: pool.token1.name,
      },
      apr: ((weekFeesUsd / 7) * 365 * 100) / Number(pool.totalValueLockedUSD),
    }))

    return pools
  } catch (error) {
    console.log(error)
    throw new Error(`Unable to query data from Client`)
  }
})
