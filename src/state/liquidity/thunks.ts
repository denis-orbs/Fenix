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
require('dotenv').config

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

export const getLiquidityTableElements = createAsyncThunk('liquidity/getPairInfo', async (address: Address) => {
  const client = getProtocolCoreClient()
  if (!client) return []
  const pairsV2 = await getAllPairsForUser(address)
  const availablePairsV2 = pairsV2.filter((pair) => pair.pair_address.toLowerCase() != AddressZero)
  const availableTokenData = await fetchTokens()

  if (!availablePairsV2 && !availableTokenData) return []

  let pairs: { [pair: Address]: LiquidityTableElement } = {}
  let ap: LiquidityTableElement[] = []
  availablePairsV2.forEach((pair) => {
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
        .mulNumber(tokenAprice)
        .add(new BigDecimal(pair.reserve1, pair.token1_decimals).mulNumber(tokenBprice))
        .withDecimalPrecision(18)
      if (pair.gauge !== AddressZero) {
        const lp100 = new BigDecimal(100n * 10n ** 18n, 18).div(tvl.div(new BigDecimal(pair.total_supply, 18)))

        const totalWeight = new BigDecimal(pair.gauge_total_weight, 18)
        const emissionsPerSecond = new BigDecimal(pair.emissions, 18)

        apr = totalWeight
          ? lp100.mul(emissionsPerSecond).div(totalWeight).toRoundedFloat() * Number(fnxToken?.priceUSD ?? 0) * 31536000
          : 0.0
        maxAPR = apr * 2
        // if (BLACKLISTED.includes(tokenA.symbol) || BLACKLISTED.includes(tokenB.symbol)) {
        //   apr = 0.0
        //   maxAPR = 0.0
        // }
      }

      let totalPoolAmountValue = new BigDecimal(pair.reserve0, pair.token0_decimals)
        .mulNumber(tokenAprice || 0)
        .add(new BigDecimal(pair.reserve1, pair.token1_decimals).mulNumber(tokenBprice || 0))
        .withDecimalPrecision(18)

      let myPoolAmountValue = new BigDecimal(pair.account_lp_balance, 18)
        .mul(totalPoolAmountValue)
        .div(new BigDecimal(pair.total_supply, 18))
        .withDecimalPrecision(18)

      let myStackedAmountValueV2 = new BigDecimal(pair.account_gauge_balance, 18)
        .mul(totalPoolAmountValue)
        .div(new BigDecimal(pair.total_supply, 18))
        .withDecimalPrecision(18)
      console.log(totalPoolAmountValue, 'totalPoolAmountValue')
      pairs[pair.pair_address] = {
        pairAddress: pair.pair_address,
        pairSymbol: pair.symbol,
        pairInformationV2: pair,
        priceA: tokenAprice ? tokenAprice : 0,
        priceB: tokenBprice ? tokenBprice : 0,
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

  // ap.sort((a, b) => {
  //   if (
  //     new BigDecimal(a.pairInformation.reserve0, a.pairInformation.token0_decimals)
  //       .mulNumber(a.priceA)
  //       .add(
  //         new BigDecimal(a.pairInformation.reserve1, a.pairInformation.token1_decimals).mulNumber(
  //           a.priceB
  //         )
  //       )
  //       .lt(
  //         new BigDecimal(b.pairInformation.reserve0, b.pairInformation.token0_decimals)
  //           .mulNumber(b.priceA)
  //           .add(
  //             new BigDecimal(
  //               b.pairInformation.reserve1,
  //               b.pairInformation.token1_decimals
  //             ).mulNumber(b.priceB)
  //           )
  //       )
  //   ) {
  //     return 1;
  //   } else {
  //     return -1;
  //   }
  // });

  // Appending in the end the inactive gauges
  // inactiveGaugesPairsV2.forEach((gauge) => {
  //   const tokenA = availableTokenData.tokens.find((t) => t.address.toLowerCase() === gauge.token0.toLowerCase())
  //   const tokenB = availableTokenData.tokens.find((t) => t.address.toLowerCase() === gauge.token1.toLowerCase())

  //   let totalPoolAmountValue = pairs[gauge.pair_address]?.totalPoolAmountValue || new BigDecimal(0n, 18)
  //   if (totalPoolAmountValue._value === 0n && tokenA && tokenB) {
  //     totalPoolAmountValue = new BigDecimal(gauge.reserve0, gauge.token0_decimals)
  //       .mulNumber(tokenA.price_quote || 0)
  //       .add(new BigDecimal(gauge.reserve1, gauge.token1_decimals).mulNumber(tokenB.price_quote || 0))
  //       .withDecimalPrecision(18)
  //   }

  //   let myPoolAmountValue = pairs[gauge.pair_address]?.myPoolAmountValue || new BigDecimal(0n, 18)
  //   if (myPoolAmountValue._value === 0n || gauge.account_lp_balance > 0n) {
  //     myPoolAmountValue = new BigDecimal(gauge.account_lp_balance, 18)
  //       .mul(totalPoolAmountValue)
  //       .div(new BigDecimal(gauge.total_supply, 18))
  //       .withDecimalPrecision(18)
  //   }

  //   let myStackedAmountValueV2 = pairs[gauge.pair_address]?.myStackedAmountValueV2 || new BigDecimal(0n, 18)
  //   if (myStackedAmountValueV2._value === 0n || gauge.account_gauge_balance > 0n) {
  //     myStackedAmountValueV2 = new BigDecimal(gauge.account_gauge_balance, 18)
  //       .mul(totalPoolAmountValue)
  //       .div(new BigDecimal(gauge.total_supply, 18))
  //       .withDecimalPrecision(18)
  //   }

  //   pairs[gauge.pair_address] = {
  //     ...pairs[gauge.pair_address],
  //     pairAddress: gauge.pair_address,
  //     pairSymbol: gauge.symbol,
  //     pairInformationV2: gauge,
  //     priceA: tokenA?.price_quote ? tokenA.price_quote : 0,
  //     priceB: tokenB?.price_quote ? tokenB.price_quote : 0,
  //     isInactiveGauge: true,
  //     apr: 0.0,
  //     maxAPR: 0.0,
  //     token0Symbol: tokenA?.symbol ? tokenA.symbol : gauge.token0_symbol,
  //     token1Symbol: tokenB?.symbol ? tokenB.symbol : gauge.token1_symbol,
  //     totalPoolAmountValue,
  //     myPoolAmountValue,
  //     myStackedAmountValueV2,
  //     myStackedAmountValueV3: new BigDecimal(0n, 18),
  //   }
  //   pairs[gauge.pair_address].unmigrated = pairs[gauge.pair_address].unmigrated ?? false
  // })

  // FETCHING LIQUIDITY PAIRS OF NEW GAUGES
  // let ap3: LiquidityTableElementV3[] = [];
  /*
  availablePairsV3.forEach((pair) => {
    const tokenA = availableTokenData.tokensDictionary[pair.token0.toLowerCase()];
    const tokenB = availableTokenData.tokensDictionary[pair.token1.toLowerCase()];

    const token0Symbol = tokenA ? tokenA.symbol : pair.token0_symbol;
    const token1Symbol = tokenB ? tokenB.symbol : pair.token1_symbol;

    if (tokenA && tokenB) {
      const chrToken = availableTokenData.tokensDictionary[CHRToken.address.toLowerCase()];

      if (!chrToken) return;

      let reserve0, reserve1;
      if (pair.dysonPool === NULL_ADDRESS) {
        // Not CL
        reserve0 = pair.reserve0;
        reserve1 = pair.reserve1;
      } else {
        // CL
        reserve0 = pair._a0Expect;
        reserve1 = pair._a1Expect;
      }

      let totalPoolAmountValue = new BigDecimal(reserve0, pair.token0_decimals)
        .mulNumber(tokenA.price_quote || 0)
        .add(new BigDecimal(reserve1, pair.token1_decimals).mulNumber(tokenB.price_quote || 0))
        .withDecimalPrecision(18);

      // debugger;
      let apr = 0.0;
      let maxAPR = 0.0;

      // Calculating emissions APR
      if (pair.gauge !== NULL_ADDRESS) {
        const totalSupply = new BigDecimal(pair.total_supply, 18).toRoundedFloat();
        const emissionsPerSecond = new BigDecimal(pair.emissions, 18);
        const emissionsPerYear =
          emissionsPerSecond.mulNumber(31536000).toRoundedFloat() * chrToken.price_quote!;
        const gaugeTotalWeight = new BigDecimal(pair.gauge_total_weight, 18).toRoundedFloat();
        const gaugeTotalSupply = new BigDecimal(pair.gauge_total_supply, 18).toRoundedFloat();

        let lp100 = 0.0;
        apr = lp100 * (emissionsPerYear / (totalSupply + lp100));
        maxAPR = apr * 3;

        if (BLACKLISTED.includes(tokenA.symbol) || BLACKLISTED.includes(tokenB.symbol)) {
          apr = 0.0;
          maxAPR = 0.0;
        }

        if (totalPoolAmountValue._value !== 0n)
          lp100 =
            (100 * 10 ** 18 * Number(pair.total_supply)) / Number(totalPoolAmountValue._value);

        apr = lp100 * (emissionsPerYear / (Number(pair.gauge_total_weight) / 10 ** 18 + lp100));
        maxAPR = apr * 3;
      }

      let myPoolAmountValue =
        pairs[pair.pair_address]?.myPoolAmountValue || new BigDecimal(0n, 18);
      if (myPoolAmountValue._value === 0n || pair.account_lp_balance > 0n) {
        myPoolAmountValue = new BigDecimal(pair.account_lp_balance, 18)
          .mul(totalPoolAmountValue)
          .div(new BigDecimal(pair.total_supply, 18))
          .withDecimalPrecision(18);
      }

      let myStackedAmountValueV3 =
        pairs[pair.pair_address]?.myStackedAmountValueV3 || new BigDecimal(0n, 18);
      if (myStackedAmountValueV3._value === 0n || pair.account_gauge_balance > 0n) {
        myStackedAmountValueV3 = new BigDecimal(pair.account_gauge_balance, 18)
          .mul(totalPoolAmountValue)
          .div(new BigDecimal(pair.total_supply, 18))
          .withDecimalPrecision(18);
      }

      pairs[pair.pair_address] = {
        ...pairs[pair.pair_address],
        pairAddress: pair.pair_address,
        pairSymbol: pair.symbol,
        pairInformationV3: pair,
        priceA: tokenA.price_quote ? tokenA.price_quote : 0,
        priceB: tokenB.price_quote ? tokenB.price_quote : 0,
        isInactiveGauge: false,
        apr,
        maxAPR,
        token0Symbol,
        token1Symbol,
        totalPoolAmountValue,
        myPoolAmountValue,
        myStackedAmountValueV3,
        myStackedAmountValueV2:
          pairs[pair.pair_address]?.myStackedAmountValueV2 || new BigDecimal(0n, 18),
      };
      pairs[pair.pair_address].unmigrated = pairs[pair.pair_address].unmigrated ?? false;
    }
  });*/

  // setLiquidityTableElementsDict(pairs)

  const liqElements: LiquidityTableElement[] = Object.values(pairs)
  liqElements.sort((a, b) => {
    let pairInfoA = a.pairInformationV3 || a.pairInformationV2
    let pairInfoB = b.pairInformationV3 || b.pairInformationV2
    if (!pairInfoA || !pairInfoB) return -1
    if (a.totalPoolAmountValue.lt(b.totalPoolAmountValue)) {
      return 1
    } else {
      return -1
    }
  })

  let _totalUSDValue = new BigDecimal(0n, 18)
  Object.values(pairs).forEach((e) => {
    let pairInfoA = e.pairInformationV3 || e.pairInformationV2
    if (e.priceA && e.priceB && pairInfoA) {
      _totalUSDValue = _totalUSDValue.add(e.totalPoolAmountValue)
    }
  })

  // setTotalUSDValue(_totalUSDValue)
  console.log(liqElements, 'liqElements')
  return liqElements
})
