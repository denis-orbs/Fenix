/* eslint-disable @typescript-eslint/no-explicit-any */

import { Address, http } from 'viem'
import { multicall } from '@wagmi/core'
import { createConfig } from 'wagmi'
import { ERC20_ABI } from '../../constants/abi'
import { blastSepolia } from 'viem/chains'
import { ethers } from 'ethers'

export async function getTokenBalance(token1: Address, user: Address) {
  if (!token1 || !user) return '0'
  /**
   * This hook is used to get token balance for a user address
   */

  const balance = await multicall(
    createConfig({
      chains: [blastSepolia],
      transports: {
        [blastSepolia.id]: http(),
      },
    }),
    {
      contracts: [
        {
          abi: ERC20_ABI,
          address: token1,
          functionName: 'balanceOf',
          args: [user],
        },
      ],
    }
  )

  if (balance[0].status === 'failure') return '0'

  const b: string = balance[0].result as string
  return b
}

export async function getTokensBalance(tokens: Address[], user: Address) {
  if (tokens.length < 1 || !user) return {}

  /**
   * This hook is used to get tokens balance for a user address
   */

  const contractsList = tokens.map((item) => {
    return {
      abi: ERC20_ABI,
      address: item,
      functionName: 'balanceOf',
      args: [user],
    }
  })

  const balance = await multicall(
    createConfig({
      chains: [blastSepolia],
      transports: {
        [blastSepolia.id]: http(),
      },
    }),
    {
      contracts: contractsList,
    }
  )

  const balances: any = {}
  for (let i = 0; i < balance.length; i++) {
    balances[tokens[i]] = balance[i].result
  }

  if (balance.length == 0 || balance[0].status === 'failure') return {}
  return balances
}
