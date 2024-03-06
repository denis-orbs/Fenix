import { CHAIN_IDS_TO_NAMES, SupportedChainId } from 'constants/chains'

import { Address, useAccount, useNetwork } from 'wagmi'

interface IActiveConnectionDetails {
  chainId?: number
  chain?: any
  account?: Address
  isConnected: boolean
  isConnecting: boolean
}

export default function useActiveConnectionDetails(): IActiveConnectionDetails {
  /**
   * This hook is used to get the current connection details for the application
   * Used to display the current connection details, unifying account abstraction with defi
   * This hook should be the only one used in the application to interact with web3
   */

  // FIXME: This still needs to be more robust, but it's a start
  const { chain } = useNetwork()

  const { address: wagmiAddress, isConnected: wagmiIsConnected, isConnecting: wagmiIsConnecting } = useAccount()
  const { safeSelected: aaAddress, isConnected: aaIsConnected, isConnecting: aaIsConnecting } = useAA()

  return {
    chainId: SupportedChainId.BASE,
    isConnected: aaIsConnected,
    isConnecting: aaIsConnecting,
    account: aaAddress,
    
  }
}
