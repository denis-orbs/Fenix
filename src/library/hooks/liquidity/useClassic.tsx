/* eslint-disable @typescript-eslint/no-explicit-any */

import { Address, http } from 'viem'
import { multicall } from '@wagmi/core'
import { createConfig } from 'wagmi'
import { ERC20_ABI } from '../../constants/abi'
import { blast, blastSepolia } from 'viem/chains'
import { polygonFork } from '@/src/app/layout'

export async function getTokenAllowance(token: Address, owner: Address, spender: Address) {
  if (!token || !owner || !spender) return '0'
  /**
   * This hook is used to get token aproved amount for spender
   */

  const allowance = await multicall(
    createConfig({
      chains: [polygonFork],
      transports: {
        [polygonFork.id]: http(),
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

  if (allowance[0].status === 'failure') return '0'
  const a: string = allowance[0].result as string

  return a
}
