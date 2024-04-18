import { useState, useEffect } from 'react'
import { useToken0, useToken1 } from '@/src/state/liquidity/hooks'
import {
  SupportedChainId,
  SupportedDex,
  UserAmountsInVault,
  getAllUserAmounts,
  getIchiVaultInfo,
  getVaultsByTokens,
} from '@ichidao/ichi-vaults-sdk'
import ichiVaultsData from './ichiVaultsData.json'
import { getWeb3Provider } from '../../utils/web3'
import { useAccount } from 'wagmi'
import { Address } from 'viem'
import { positions } from '@/src/components/Dashboard/MyStrategies/Strategy'

export interface IchiVault {
  id: string
  tokenA: string
  tokenB: string
  allowTokenA: boolean
  allowTokenB: boolean
}

export const useIchiVault = (providedToken0?: string, providedToken1?: string) => {
  const defaultToken0 = useToken0()
  const defaultToken1 = useToken1()
  const token0 = providedToken0 ?? defaultToken0
  const token1 = providedToken1 ?? defaultToken1

  const [vault, setVault] = useState<IchiVault[] | null>()
  // TODO: Make this static?
  useEffect(() => {
    const fetchVault = async () => {
      const vaultData = await getVaultsByTokens(SupportedChainId.blast, SupportedDex.Fenix, token0, token1)
      console.log('vaultdata', vaultData)
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

export const useIchiPositions = () => {
  const web3Provider = getWeb3Provider()
  const dex = SupportedDex.Fenix
  const { address } = useAccount()
  const [positions, setpositions] = useState<positions[]>([])

  useEffect(() => {
    const fetchpositions = async () => {
      if (address) {
        const amounts: UserAmountsInVault[] = await getAllUserAmounts(address, web3Provider, dex)
        const pos = amounts?.map((item) => {
          let tokenA
          let tokenB
          //const vaultInfo = useIchiVaultsData(item.vaultAddress)
          console.log(tokenA)

          return {
            id: item.vaultAddress,
            liquidity: 'ichi',
            depositedToken0: item.userAmounts[0],
            depositedToken1: item.userAmounts[1],
            tickLower: {
              price0: '0',
              price1: '0',
            },
            tickUpper: {
              price0: '0',
              price1: '0',
            },
            token0: {
              name: 'token0',
              id: 'vaultInfo?.tokenA!',
              symbol: 'token0',
            },
            token1: {
              id: 'vaultInfo?.tokenB!',
              symbol: 'token1',
              name: 'token1',
            },
          }
        })
        console.log(pos, 'pos')
        setpositions(pos)
      }
    }
    fetchpositions()
  }, [address])

  return positions
}

export const useIchiVaultsData = (vaultAddress: string) => {
  const dex = SupportedDex.Fenix
  const chain = SupportedChainId.blast_sepolia_testnet
  const [vaultData, setvaultData] = useState<IchiVault>({
    id: '',
    tokenA: '',
    tokenB: '',
    allowTokenA: false,
    allowTokenB: false,
  })

  useEffect(() => {
    const fetchVault = async () => {
      const vaultInfo = await getIchiVaultInfo(chain, dex, vaultAddress)
      if (vaultInfo) setvaultData(vaultInfo)
    }
    fetchVault()
  }, [])
  return vaultData
}
