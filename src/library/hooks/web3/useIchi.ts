import { useState, useEffect } from 'react'
import { useToken0, useToken1 } from '@/src/state/liquidity/hooks'
import { IchiVault, SupportedChainId, SupportedDex, getVaultsByTokens } from '@ichidao/ichi-vaults-sdk'
import ichiVaultsData from './ichiVaultsData.json'
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

export const useIchiVaultInfo = (token0: string, token1: string) => {
  const [vaultInfo, setVaultInfo] = useState({
    apr: 0,
    id: '',
    allowTokenA: false,
    allowTokenB: false,
    isReverted: false,
  })

  useEffect(() => {
    const tokenALower = token0.toLowerCase()
    const tokenBLower = token1.toLowerCase()
    const isReverted = tokenALower > tokenBLower
    const [tokenA, tokenB] = isReverted ? [tokenBLower, tokenALower] : [tokenALower, tokenBLower]

    const vaultFound = ichiVaultsData.find((vault) => {
      const vaultTokenA = vault.tokenA.toLowerCase()
      const vaultTokenB = vault.tokenB.toLowerCase()
      const condition = vaultTokenA === tokenA && vaultTokenB === tokenB
      return condition && ((isReverted && vault.allowTokenB) || (!isReverted && vault.allowTokenA))
    })

    if (vaultFound) {
      setVaultInfo({
        apr: vaultFound.apr,
        id: vaultFound.id,
        allowTokenA: vaultFound.allowTokenA,
        allowTokenB: vaultFound.allowTokenB,
        isReverted: isReverted,
      })
    } else {
      setVaultInfo((prevState) => ({ apr: 0, isReverted: isReverted, id: '', allowTokenA: false, allowTokenB: false }))
    }
  }, [token0, token1])

  return vaultInfo
}
