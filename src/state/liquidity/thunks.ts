import getProtocolCoreClient from '@/src/library/apollo/client/protocolCoreClient'
import { GET_V2_PAIRS } from '@/src/library/apollo/queries/LIQUIDITY'
import { queryAllForClient } from '@/src/library/apollo/utils'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { LiquidityTableElement, LiquidityV2PairDetails } from './types'
import { Address } from 'viem'
import { BigDecimal } from '@/src/library/common/BigDecimal'
import { fetchTokens } from '@/src/library/common/getAvailableTokens'
import { getAllPairsForUser } from '@/src/library/web3/apis/PairAPIV3'
import { AddressZero } from '@/src/library/constants/misc'
import { FNXTokenAddress } from '@/src/library/web3/ContractAddresses'
import { fetchPoolData, fetchv2PoolData } from './reducer'

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
  const client = getProtocolCoreClient()
  //  console.log('liqElement11', 'liqElements')
  if (!client) return []
  const pairsV2 = await getAllPairsForUser(address)
  const availablePairsV2 = pairsV2.filter((pair) => pair.pair_address.toLowerCase() != AddressZero)
  const availableTokenData = await fetchTokens()
  const availablePairsV3 = await fetchPoolData()
  const availablePairsV2Subgraph = await fetchv2PoolData()
  console.log(availablePairsV2, availablePairsV3, 'liqElements', 'liqElements')
  if (!availablePairsV2 && !availableTokenData) return []

  let pairs: { [pair: Address]: LiquidityTableElement } = {}
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

      // console.log(apr, pair, 'liqElements')
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
        fee: pair.feeAmount.toString(),
        volumeUSD: matchedPair?.volumeUSD || '0',
        volumeToken0: matchedPair?.volumeToken0 || '0',
        volumeToken1: matchedPair?.volumeToken1 || '0',
        isInactiveGauge: false,
        totalPoolAmountValue,
        myPoolAmountValue,
        myStackedAmountValueV2,
        myStackedAmountValueV3: new BigDecimal(0n, 18),
        apr,
        maxAPR,
        tvl: tvl,
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

      //  if (!fnxToken) return

      /*const lp100 = 100 / parseFloat(
              getParsedTokenBalance(
                tokenA.price_quote! * pair.reserve0 + tokenB.price_quote! * pair.reserve1, 18)) / pair.total_supply);*/

      let apr = 0.0
      let maxAPR = 0.0
      let tvl = new BigDecimal(0n, 18)
      // Calculating emissions APR
      tvl = new BigDecimal(BigInt(Number(pair.totalValueLockedToken0).toFixed(0)), Number(pair.token0.decimals))
        .mulNumber(tokenAprice)
        .add(
          new BigDecimal(
            BigInt(Number(pair.totalValueLockedToken1).toFixed(0)),
            Number(pair.token1.decimals)
          ).mulNumber(tokenBprice)
        )
        .withDecimalPrecision(18)

      apr = (Number(pair.feesUSD) / Number(tvl) === 0 ? 1 : Number(tvl)) * 100
      maxAPR = apr * 2

      // if (BLACKLISTED.includes(tokenA.symbol) || BLACKLISTED.includes(tokenB.symbol)) {
      //   apr = 0.0
      //   maxAPR = 0.0
      // }

      const totalPoolAmountValue = new BigDecimal(
        BigInt(Number(pair.totalValueLockedToken0).toFixed(0)),
        Number(pair.token0.decimals)
      )
        .mulNumber(tokenAprice || 0)
        .add(
          new BigDecimal(
            BigInt(Number(pair.totalValueLockedToken1).toFixed(0)),
            Number(pair.token1.decimals)
          ).mulNumber(tokenBprice || 0)
        )
        .withDecimalPrecision(18)

      const myPoolAmountValue = new BigDecimal(0n, 18).withDecimalPrecision(18)

      const myStackedAmountValueV2 = new BigDecimal(0n, 18).withDecimalPrecision(18)

      pairs[pair.id!] = {
        pairAddress: pair.id,
        pairSymbol: 'Concentrated pool',
        pairInformationV2: { token0: tokenA, token1: tokenB },
        priceA: tokenAprice ? tokenAprice : 0,
        priceB: tokenBprice ? tokenBprice : 0,
        isInactiveGauge: false,
        fee: pair.fee,
        volumeUSD: pair.volumeUSD,
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

  liqElements.sort((a, b) => {
    const pairInfoA = a.pairInformationV3 || a.pairInformationV2
    const pairInfoB = b.pairInformationV3 || b.pairInformationV2
    if (!pairInfoA || !pairInfoB) return -1
    if (a.totalPoolAmountValue.lt(b.totalPoolAmountValue)) {
      return 1
    } else {
      return -1
    }
  })

  let _totalUSDValue = new BigDecimal(0n, 18)
  Object.values(pairs).forEach((e) => {
    const pairInfoA = e.pairInformationV3 || e.pairInformationV2
    if (e.priceA && e.priceB && pairInfoA) {
      _totalUSDValue = _totalUSDValue.add(e.totalPoolAmountValue)
    }
  })

  // setTotalUSDValue(_totalUSDValue)

  return liqElements
})
