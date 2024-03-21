/* eslint-disable @typescript-eslint/no-explicit-any */

import { Address, http } from 'viem'
import { multicall, writeContract } from '@wagmi/core'
import { createConfig, useAccount, useChainId, useContractWrite, useWriteContract } from 'wagmi'
import { ERC20_ABI, ROUTERV2_ABI } from '../../constants/abi'
import { blast } from 'viem/chains'
import { ethers } from 'ethers' 
import { contractAddressList } from '../../constants/contactAddresses'
import { injected } from 'wagmi/connectors'

export async function getTokenReserve(token1: Address, token2: Address, stable: boolean) {
  /**
   * This hook is used to get token reserve for a v2 pool through RouterV2 using both token addresses
   */

  const reserves = await multicall(
        createConfig({
            chains: [blast],
            transports: {
            [blast.id]: http()
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

    if((reserves)[0].status === 'failure') return [0, 0]
    return reserves[0].result;
}

export async function getLiquidityRemoveQuote(amount: Number, token1: Address, token2: Address, stable: boolean) {
    /**
     * This hook is used to get estimated tokens from removing liquidity
     */
  
    const lpTokens = await multicall(
        createConfig({
            chains: [blast],
            transports: {
            [blast.id]: http()
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

    if((lpTokens)[0].status === 'failure') return [0, 0]
    return lpTokens[0].result;
}