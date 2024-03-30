import { ethers } from 'ethers'
import { useCallback, useState } from 'react'
import useERC20Allowance from '@/src/library/hooks/web3/erc20/useERC20Allowance'
import { useWriteContract } from 'wagmi'
import { Address } from '@/src/library/types'
import { erc20Abi } from 'viem'
interface ApproveTokenIfNeededArgs {
  tokenAddress: `0x${string}`
  spenderAddress: `0x${string}`
  userAddress: `0x${string}`
  amountNeeded: bigint
  desiredAmountToApprove?: bigint
}
export const useApproveTokenIfNeeded = ({
  tokenAddress,
  spenderAddress,
  userAddress,
  amountNeeded,
  desiredAmountToApprove,
}: ApproveTokenIfNeededArgs) => {
  const [isApproving, setIsApproving] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { allowance } = useERC20Allowance(tokenAddress, userAddress, spenderAddress)
  const { writeContractAsync } = useWriteContract()

  const approveIfNeeded = useCallback(async () => {
    setIsApproving(true)
    setError(null)

    try {
      // Determina si es necesario aplicar una aprobación "infinita".
      const amountToApprove = desiredAmountToApprove ?? ethers.MaxInt256

      // Procede con la aprobación si el allowance actual es menor que el monto deseado.
      if (allowance < amountNeeded) {
        await writeContractAsync({
          address: tokenAddress,
          abi: erc20Abi,
          functionName: 'approve',
          args: [spenderAddress, amountToApprove],
        })
      }
    } catch (e) {
      setError(e as Error)
      console.error('Error during token approval:', e)
    } finally {
      setIsApproving(false)
    }
  }, [tokenAddress, spenderAddress, amountNeeded, allowance, writeContractAsync, desiredAmountToApprove])

  return { approveIfNeeded, isApproving, error }
}
