import { useMemo } from 'react'
import { Abi, Address, WalletClient, getContract } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'
import useActiveConnectionDetails from './useActiveConnectionDetails'
import { AddressZero } from '../../constants/misc'

export function useContract<T extends Abi>(
  addressOrAddressMap: string | { [chainId: number]: string } | null | undefined,
  ABI?: T
) {
  const { chainId } = useActiveConnectionDetails()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !chainId) return null
    let address: string | undefined
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId]
    if (!address || address === AddressZero) return null
    try {
      return getContract({
        address: address as Address,
        abi: ABI,
        client: {
          public: publicClient,
          wallet: (walletClient as WalletClient) ?? publicClient,
        },
      })
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, ABI, chainId, walletClient, publicClient])
}
