import useAlgebraSafelyStateOfAMM from '@/src/library/hooks/web3/useAlgebraSafelyStateOfAMM'
import {
  Token,
  computePoolAddress,
  Pool,
  WNATIVE,
  Route,
  Trade,
  CurrencyAmount,
  SwapRouter,
} from '@cryptoalgebra/integral-sdk'
import { useReadContract, useSimulateContract, useWriteContract } from 'wagmi'

import { DEFAULT_CHAIN_ID } from './default-chain-id'
import { PoolState, usePool } from './usePool'
import { ethers } from 'ethers'
import { contractAddressList } from '@/src/library/constants/contactAddresses'
import { algebraSwapABI } from '@/src/library/web3/abis/algebraSwap'
import { algebraQuoterV2ABI } from '@/src/library/web3/abis'
export const useAlgebraMultiRouting = () => {
  const WETH_TOKEN = new Token(81457, '0x4300000000000000000000000000000000000004', 18, 'WETH', 'Wrapped Ether')
  const USDB_TOKEN = new Token(81457, '0x4300000000000000000000000000000000000003', 18, 'USDB', 'USDB')
  const WBTC_TOKEN = new Token(81457, '0xF7bc58b8D8f97ADC129cfC4c9f45Ce3C0E1D2692', 8, 'WBTC', 'Wrapped Bitcoin')

  // si no tengo nada conectado, chainId null, ojo
  const quoteExactInputSingleCall = useSimulateContract({
    address: contractAddressList.cl_quoterV2 as `0x${string}`,
    abi: algebraQuoterV2ABI,
    functionName: 'quoteExactInput',
    args: [
      '0x43000000000000000000000000000000000000034300000000000000000000000000000000000004F7bc58b8D8f97ADC129cfC4c9f45Ce3C0E1D2692',
      100000000000000000n,
    ],
  })

  console.log(quoteExactInputSingleCall)
  const { data, error, isPending, isError, writeContract } = useWriteContract()

  const [pool1State, pool1] = usePool('0x1d74611f3ef04e7252f7651526711a937aa1f75e')
  const [pool2State, pool2] = usePool('0xc066a3e5d7c22bd3beaf74d4c0925520b455bb6f')

  if (pool1 == null || pool2 == null) return
  const swapRoute = new Route([pool1], USDB_TOKEN, WETH_TOKEN)
  // const swapRoute = new Route([pool1, pool2], USDB_TOKEN, WBTC_TOKEN)

  console.log('swapRoute', swapRoute)
  // const path = swapRoute.tokenPath.map((token) => token.address)
  // console.log(path)
  const path = ['0x1d74611f3ef04e7252f7651526711a937aa1f75e', '0xc066a3e5d7c22bd3beaf74d4c0925520b455bb6f']
  const pathInBytes = ethers.utils.solidityPack(['address[]'], [path])
  console.log('pathInBytes', pathInBytes)

  const swap = async () => {
    writeContract(
      {
        address: contractAddressList.cl_swap as `0x${string}`,
        abi: algebraSwapABI,
        functionName: 'exactInput',
        args: [
          {
            path: '0x43000000000000000000000000000000000000034300000000000000000000000000000000000004F7bc58b8D8f97ADC129cfC4c9f45Ce3C0E1D2692' as `0x${string}`,
            recipient: '0xb279Cb42Ab3d598Eb3A864399C11a52a5f506bA4',
            deadline: BigInt(Math.floor(Date.now() / 1000) + 60 * 20),
            amountIn: 100000000000000000n,
            amountOutMinimum: 0n,
          },
        ],
      },
      {
        onSuccess: async (data) => {
          console.log('everything went well')
        },
        onError: (e) => {
          console.log('There was an error, check the error', e)
        },
      }
    )
  }

  return 'a'
}
