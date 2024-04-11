/* eslint-disable @typescript-eslint/no-explicit-any */

import { Address, http } from 'viem'
import { multicall, writeContract } from '@wagmi/core'
import { createConfig, useAccount, useChainId, useContractWrite, useWriteContract } from 'wagmi'
import {
  ALGEBRA_ABI,
  ALGEBRA_FACTORY_ABI,
  ERC20_ABI,
  FACTORY_ABI,
  ROUTERV2_ABI,
  TICK_MATH_ABI,
} from '../../constants/abi'
import { blast, blastSepolia } from 'viem/chains'
import { ethers } from 'ethers'
import { contractAddressList } from '../../constants/contactAddresses'
import { injected } from 'wagmi/connectors'

export async function getAlgebraPoolPrice(token1: Address, token2: Address) {
  /**
   * This hook is used to get token current price on an AlgebraPool
   */

  const pool = await multicall(
    createConfig({
      chains: [blastSepolia],
      transports: {
        [blastSepolia.id]: http(),
      },
    }),
    {
      contracts: [
        {
          abi: ALGEBRA_FACTORY_ABI,
          address: contractAddressList.cl_factory as Address,
          functionName: 'poolByPair',
          args: [token1, token2],
        },
      ],
    }
  )

  const state = await multicall(
    createConfig({
      chains: [blastSepolia],
      transports: {
        [blastSepolia.id]: http(),
      },
    }),
    {
      contracts: [
        {
          abi: ALGEBRA_ABI,
          address: pool[0].result as Address,
          functionName: 'globalState',
          args: [],
        },
      ],
    }
  )

  if (state[0].status === 'failure') return [0, 0, 0, 0, 0, false]
  const result: [number, number, number, number, number, boolean] = state[0].result as [
    number,
    number,
    number,
    number,
    number,
    boolean,
  ]

  return {
    price: sqrtPriceToPrice(result[0].toString()),
    currentTick: result[1],
  }
}

export async function getTickToPrice(tick: any) {
  /**
   * This hook is used to change tick into price on AlgebraPool
   */

  const price = await multicall(
    createConfig({
      chains: [blastSepolia],
      transports: {
        [blastSepolia.id]: http(),
      },
    }),
    {
      contracts: [
        {
          abi: TICK_MATH_ABI,
          address: contractAddressList.tick_math as Address,
          functionName: 'getSqrtRatioAtTick',
          args: [tick],
        },
      ],
    }
  )

  if (price[0].status === 'failure') return 0
  return sqrtPriceToPrice(price[0].result as string)
}

export async function getPriceToTick(price: any) {
  price = priceToSqrtPrice(parseInt((price * 1e18).toString()))
  /**
   * This hook is used to change price into tick on AlgebraPool
   */

  const tick = await multicall(
    createConfig({
      chains: [blastSepolia],
      transports: {
        [blastSepolia.id]: http(),
      },
    }),
    {
      contracts: [
        {
          abi: TICK_MATH_ABI,
          address: contractAddressList.tick_math as Address,
          functionName: 'getTickAtSqrtRatio',
          args: [price],
        },
      ],
    }
  )

  if (tick[0].status === 'failure') return 0
  return tick[0].result
}

export async function getPriceAndTick(price: any) {
  if (price == 0) return { price: 0, tick: 0 }
  price = priceToSqrtPrice(parseInt((price * 1e18).toString()))
  /**
   * This hook is used to change tick into price on AlgebraPool
   */

  const tick = await multicall(
    createConfig({
      chains: [blastSepolia],
      transports: {
        [blastSepolia.id]: http(),
      },
    }),
    {
      contracts: [
        {
          abi: TICK_MATH_ABI,
          address: contractAddressList.tick_math as Address,
          functionName: 'getPriceAndTick',
          args: [price],
        },
      ],
    }
  )

  if (tick[0].status === 'failure') {
    console.log('Failed')
    return { price: 0, tick: 0 }
  }
  const result: [number, number] = tick[0].result as [number, number]

  return {
    price: sqrtPriceToPrice(result[1].toString()),
    tick: result[0],
  }
}

export async function getAmounts(cTick: any, hTick: any, lTick: any, amount0: any, amount1: any) {
  const amounts = await multicall(
    createConfig({
      chains: [blastSepolia],
      transports: {
        [blastSepolia.id]: http(),
      },
    }),
    {
      contracts: [
        {
          abi: TICK_MATH_ABI,
          address: contractAddressList.tick_math as Address,
          functionName: 'getAmounts',
          args: [
            cTick,
            hTick,
            lTick,
            ethers.utils.parseUnits(parseFloat(amount0).toFixed(10), 'ether'),
            ethers.utils.parseUnits(parseFloat(amount1).toFixed(10), 'ether'),
          ],
        },
      ],
    }
  )

  if (amounts[0].status === 'failure') {
    console.log('Failed')
    return { amount0: amount0, amount1: amount1 }
  }
  const result: [number, number] = amounts[0].result as [number, number]

  return {
    amount0: result[0],
    amount1: result[1],
  }
}

export async function getRatio(cTick: any, hTick: any, lTick: any) {
  const amounts = await multicall(
    createConfig({
      chains: [blastSepolia],
      transports: {
        [blastSepolia.id]: http(),
      },
    }),
    {
      contracts: [
        {
          abi: TICK_MATH_ABI,
          address: contractAddressList.tick_math as Address,
          functionName: 'getAmounts',
          args: [cTick, hTick, lTick, ethers.utils.parseUnits('1', 'ether'), ethers.utils.parseUnits('1', 'ether')],
        },
      ],
    }
  )

  if (amounts[0].status === 'failure') {
    console.log('Failed')
    return '1'
  }
  const result: [number, number] = amounts[0].result as [number, number]
  // console.log("6 dec", sqrtPriceToPrice("79228162514264337593543950336000000"))
  // console.log("6 dec", sqrtPriceToPrice("1331612774277006712758282194"))

  return (Number(result[0]) / Number(result[1])).toString()
}

function sqrtPriceToPrice(sqrtPrice: string) {
  const priceQ64_96 = BigInt(sqrtPrice) * BigInt(sqrtPrice) * BigInt(1e18)
  const price = priceQ64_96 >> BigInt(2 * 96)
  const priceNumber = Number(price)

  return priceNumber
}

function priceToSqrtPrice(priceNumber: number): string {
  if (priceNumber == 0) return '0'
  const priceBigInt: bigint = BigInt(priceNumber) << BigInt(2 * 96)
  const sqrted = sqrtBigInt(priceBigInt / BigInt(1e18))
  return sqrted.toString()
}

function sqrtBigInt(value: bigint): bigint {
  if (value < (BigInt(0) as bigint)) {
    return BigInt(0)
  }

  if (value < (BigInt(0) as bigint)) {
    return value
  }

  const newtonIteration = (n: bigint, x0: bigint): bigint => {
    const x1: bigint = (n / x0 + x0) >> (BigInt(1) as bigint)
    if (x0 === x1 || x0 === x1 - (BigInt(1) as bigint)) {
      return x0
    }
    return newtonIteration(n, x1)
  }

  return newtonIteration(value, BigInt(1) as bigint)
}