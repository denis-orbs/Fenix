import { Abi } from 'viem'
import { useContract } from './contracts'
import { gammaUniProxyABI } from '../../constants/abi'
import { Address } from '../../types'
import { useToken0, useToken0TypedValue, useToken1 } from '@/src/state/liquidity/hooks'
import { useReadContract } from 'wagmi'
import useActiveConnectionDetails from './useActiveConnectionDetails'

export const useGammaSmartContracts = (token0: Address, token1: Address) => {
  //   const gammaProxySmartContract = useContract('0xA42d55074869491D60Ac05490376B74cF19B00e6', gammaUniProxyABI)
  //   const gammaHypervisorSmartContract = useContract('0x02203f2351E7aC6aB5051205172D3f772db7D814')
  const gammaProxySmartContract = '0xA42d55074869491D60Ac05490376B74cF19B00e6' as `0x${string}`
  const gammaHypervisorSmartContract = '0x02203f2351E7aC6aB5051205172D3f772db7D814' as `0x${string}`
  //   TODO: Return the smart contracts instances
  return { gammaProxySmartContract, gammaHypervisorSmartContract }
}

export const useGammaToken1Range = () => {
  const token0 = useToken0()
  const token1 = useToken1()

  const token0Amount = useToken0TypedValue()

  const { gammaProxySmartContract, gammaHypervisorSmartContract } = useGammaSmartContracts(token0, token1) as {
    gammaProxySmartContract: `0x${string}`
    gammaHypervisorSmartContract: `0x${string}`
  }
  const token1DepositRange = useReadContract({
    address: gammaProxySmartContract,
    abi: gammaUniProxyABI,
    functionName: 'getDepositAmount',
    args: [gammaHypervisorSmartContract, token0, token0Amount],
  })
  const range = token1DepositRange?.data || [0n, 0n]
  return range
}
