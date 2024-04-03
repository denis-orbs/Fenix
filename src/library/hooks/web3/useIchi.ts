import { useState, useEffect } from 'react'
import { useToken0, useToken1 } from '@/src/state/liquidity/hooks'
import { IchiVault, SupportedChainId, SupportedDex, getVaultsByTokens } from '@ichidao/ichi-vaults-sdk'

export const useIchiVault = (providedToken0?: string, providedToken1?: string) => {
  const defaultToken0 = useToken0()
  const defaultToken1 = useToken1()
  const token0 = providedToken0 ?? defaultToken0
  const token1 = providedToken1 ?? defaultToken1

  const [vault, setVault] = useState<IchiVault[] | null>()
  // TODO: Make this static?
  useEffect(() => {
    const fetchVault = async () => {
      const vaultData = await getVaultsByTokens(
        SupportedChainId.blast_sepolia_testnet,
        SupportedDex.Fenix,
        token0,
        token1
      )
      console.log(vaultData)
      if (!vaultData) {
        setVault(null)
        console.log("Couldn't find vaults with these parameters")
      } else {
        setVault(vaultData)
      }
    }

    fetchVault()
  }, [token0, token1])

  return vault
}
