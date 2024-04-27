import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'
import { BigNumber, ethers } from 'ethers'
import { writeContract } from '@wagmi/core'
import { Abi } from 'viem'
import { config } from '@/src/app/layout'
import { NATIVE_ETH_LOWERCASE } from '@/src/library/Constants'

interface ApproveTokenParams {
  tokenAddress: `0x${string}`
  contractAddress: `0x${string}`
  abi: Abi
  amount?: BigNumber
  onSuccess: () => void
  onError: () => void
}

export const approveToken = async ({
  tokenAddress,
  contractAddress,
  abi,
  amount,
  onSuccess,
  onError,
}: ApproveTokenParams) => {
  try {
    const approvalAmount = amount || ethers.constants.MaxUint256
    const hash = await writeContract(config, {
      abi: abi,
      address: tokenAddress,
      functionName: 'approve',
      args: [contractAddress, approvalAmount],
    })
    onSuccess()
    return hash
  } catch (error) {
    console.error(error)
    onError()
  }
}
export const switchTokensValues = (
  token0: any,
  token1: any,
  setToken0: (token: any) => void,
  setToken1: (token: any) => void
) => {
  setToken0(token1)
  setToken1(token0)
}

export const isNativeToken = (token: string | undefined) => {
  if (!token) return false
  if (token?.toLowerCase() === NATIVE_ETH_LOWERCASE) return true
  return false
}
