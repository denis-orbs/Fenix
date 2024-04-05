/* eslint-disable @typescript-eslint/no-explicit-any */

import { Address, http } from 'viem'
import { multicall, writeContract } from '@wagmi/core'
import { createConfig, useAccount, useChainId, useContractWrite, useWriteContract } from 'wagmi'
import { ERC20_ABI, FACTORY_ABI, ROUTERV2_ABI } from '../../constants/abi'
import { blast, blastSepolia } from 'viem/chains'
import { ethers } from 'ethers'
import { contractAddressList } from '../../constants/contactAddresses'
import { injected } from 'wagmi/connectors'

import { polygonFork } from '@/src/app/layout'

export async function getTokenAllowance(token: Address, owner: Address, spender: Address) {
  if (!token || !owner || !spender) return '0'
  /**
   * This hook is used to get token aproved amount for spender
   */
  console.log(token, owner, spender, 'here')
  const allowance = await multicall(
    createConfig({
      chains: [blastSepolia, blast, polygonFork],
      transports: {
        [polygonFork.id]: http(),
        [blastSepolia.id]: http(),
        [blast.id]: http(),
      },
    }),
    {
      contracts: [
        {
          abi: ERC20_ABI,
          address: token,
          functionName: 'allowance',
          args: [owner, spender],
        },
      ],
    }
  )
  console.log(allowance, 'here')
  if (allowance[0].status === 'failure') return '0'
  const a: string = allowance[0].result as string

  return a
}

export async function getTokenReserve(token1: Address, token2: Address, stable: boolean) {
  /**
   * This hook is used to get token reserve for a v2 pool through RouterV2 using both token addresses
   */

  const reserves = await multicall(
    createConfig({
      chains: [blastSepolia],
      transports: {
        [blastSepolia.id]: http(),
      },
    }),
    {
      contracts: [
        {
          abi: ROUTERV2_ABI,
          address: contractAddressList.v2router as Address,
          functionName: 'getReserves',
          args: [token1, token2, stable],
        },
      ],
    }
  )

  if (reserves[0].status === 'failure') return [0, 0]
  return reserves[0].result
}

export async function getLiquidityRemoveQuote(amount: Number, token1: Address, token2: Address, stable: boolean) {
  /**
   * This hook is used to get estimated tokens from removing liquidity
   */

  const lpTokens = await multicall(
    createConfig({
      chains: [blastSepolia],
      transports: {
        [blastSepolia.id]: http(),
      },
    }),
    {
      contracts: [
        {
          abi: ROUTERV2_ABI,
          address: contractAddressList.v2router as Address,
          functionName: 'quoteRemoveLiquidity',
          args: [token1, token2, stable, ethers.parseUnits(amount.toString(), 'ether')],
        },
      ],
    }
  )

  if (lpTokens[0].status === 'failure') return [0, 0]
  return lpTokens[0].result
}

export async function getPair(token1: Address, token2: Address, stable: boolean) {
  if (!token1 || !token2) return '0x0'
  /**
   * This hook is used to get token aproved amount for spender
   */

  const pairAddress = await multicall(
    createConfig({
      chains: [blastSepolia],
      transports: {
        [blastSepolia.id]: http(),
      },
    }),
    {
      contracts: [
        {
          abi: FACTORY_ABI,
          address: contractAddressList.pairs_factory as Address,
          functionName: 'getPair',
          args: [token1, token2, stable],
        },
      ],
    }
  )

  if (pairAddress[0].status === 'failure') return '0x0'
  const a: string = pairAddress[0].result as string

  return a
}
