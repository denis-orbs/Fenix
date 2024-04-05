/* eslint-disable @typescript-eslint/no-explicit-any */

import { Address, http } from 'viem'
import { multicall, writeContract } from '@wagmi/core'
import { createConfig, useAccount, useChainId, useContractWrite, useWriteContract } from 'wagmi'
import { ALGEBRA_ABI, ALGEBRA_FACTORY_ABI, ERC20_ABI, FACTORY_ABI, ROUTERV2_ABI } from '../../constants/abi'
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
            [blastSepolia.id]: http()
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
            [blastSepolia.id]: http()
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

    if((state)[0].status === 'failure') return [0, 0, 0, 0, 0, false]
    const result: [number, number, number, number, number, boolean] = state[0].result as [number, number, number, number, number, boolean];

    return {
        price: sqrtPriceToPrice(result[0].toString()),
        currentTick: result[1]
    };
}

function sqrtPriceToPrice(sqrtPrice: string) {
    const sqrtPriceBigInt = BigInt(sqrtPrice);
    const priceQ64_96 = sqrtPriceBigInt * sqrtPriceBigInt;
    const price = priceQ64_96 / BigInt(2**96);
    const priceNumber = Number(price);

    return priceNumber;
}