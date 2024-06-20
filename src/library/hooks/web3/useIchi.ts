import { useState, useEffect } from 'react'
// import { useToken0, useToken1 } from '@/src/state/apr/liquidity/hooks'
import { useToken0, useToken1 } from '@/src/state/liquidity/hooks'
import {
  SupportedChainId,
  SupportedDex,
  UserAmountsInVault,
  getAllUserAmounts,
  getIchiVaultInfo,
  getVaultsByTokens,
  getLpApr,
  VaultApr,
} from '@ichidao/ichi-vaults-sdk'
import ichiVaultsData from './ichiVaultsData.json'
import { getWeb3Provider } from '../../utils/web3'
import { useAccount } from 'wagmi'
import { Address } from 'viem'
import { positions } from '@/src/components/Dashboard/MyStrategies/Strategy'
import { ichiVaults } from '@/src/components/Liquidity/Deposit/Panel/Concentrated/Automatic/ichiVaults'

export interface IchiVault {
  id: string
  tokenA: string
  tokenB: string
  allowTokenA: boolean
  allowTokenB: boolean
  apr: (VaultApr | null)[]
}

export const useIchiVault = (providedToken0?: string, providedToken1?: string) => {
  const defaultToken0 = useToken0()
  const defaultToken1 = useToken1()
  const token0 = providedToken0 ?? defaultToken0
  const token1 = providedToken1 ?? defaultToken1
  const sortedTokensArray = [token0, token1].sort()

  const tokenA = sortedTokensArray[0].toLowerCase()
  const tokenB = sortedTokensArray[1].toLowerCase()

  const [vault, setVault] = useState<IchiVault[] | null>()

  const getLp = async (vadd: string) => {
    const web3Provider = getWeb3Provider()
    const dex = SupportedDex.Fenix
    // get the apr for 7 days
    const averageDtr: (VaultApr | null)[] = await getLpApr(vadd, web3Provider, dex, [7])
    return averageDtr
  }

  useEffect(() => {
    const tokenVaults = ichiVaults.filter((vault: IchiVault) => {
      return vault.tokenA === tokenA && vault.tokenB === tokenB
    })

    tokenVaults.forEach(async (v: IchiVault) => {
      const kapr = await getLp(v.id)
      // FIXME: STARK
      v.apr = kapr
      //
      return v
    })

    // const tokenVaultsWithApr = tokenVaults.map(async (token) => {
    //   const apr = await getLp(token.id)
    //
    //   token.apr = apr
    //   return token
    // })
    //
    // FIXME: STARK
    setVault(tokenVaults)
  }, [token0, token1, tokenA, tokenB])

  return vault
}
// FIXME
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
  const [ichipositions, setichipositions] = useState<positions[]>([])
  const [ichiLoading, setichiLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchpositions = async () => {
      if (address) {
        setichiLoading(true)
        const amounts: UserAmountsInVault[] = await getAllUserAmounts(address, web3Provider, dex)
        const pos = await Promise.all(
          amounts?.map(async (item) => {
            const chain = SupportedChainId.blast

            const vaultInfo = await getIchiVaultInfo(chain, dex, item.vaultAddress)
            console.log('vaultInfo >> ', vaultInfo)
            const tokenAid = vaultInfo.tokenA
            const tokenBid = vaultInfo.tokenB
            //const vaultInfo = useIchiVaultsData(item.vaultAddress)
            //

            const getLp = async (vadd: string) => {
              const web3Provider = getWeb3Provider()
              const dex = SupportedDex.Fenix
              const averageDtr: (VaultApr | null)[] = await getLpApr(vadd, web3Provider, dex)
              return averageDtr
            }

            const app: (VaultApr | null)[] = await getLp(item.vaultAddress)

            return {
              id: item.vaultAddress,
              liquidity: 'ichi',
              depositedToken0: Number(item.userAmounts[0]),
              depositedToken1: Number(item.userAmounts[1]),
              tickLower: {
                price0: '0',
                price1: '0',
                tickIdx: '',
              },
              tickUpper: {
                price0: '0',
                price1: '0',
                tickIdx: '',
              },
              token0: {
                id: tokenAid,
                symbol: 'string',
                name: 'string',
                decimals: 'string',
                derivedMatic: 'string',
              },
              token1: {
                id: tokenBid,
                symbol: 'string',
                name: 'string',
                decimals: 'string',
                derivedMatic: 'string',
              },
              owner: address,
              withdrawnToken0: '',
              withdrawnToken1: '',
              pool: {
                id: 'string',
                fee: 'string',
                sqrtPrice: 'string',
                liquidity: 'string',
                tick: 'string',
                tickSpacing: 'string',
                totalValueLockedUSD: 'string',
                volumeUSD: 'string',
                feesUSD: 'string',
                untrackedFeesUSD: 'string',
                token0Price: 'string',
                token1Price: 'string',
                token0: {
                  id: 'string',
                  symbol: 'string',
                  name: 'string',
                  decimals: 'string',
                  derivedMatic: 'string',
                },
                token1: {
                  id: 'string',
                  symbol: 'string',
                  name: 'string',
                  decimals: 'string',
                  derivedMatic: 'string',
                },
                poolDayData: {
                  feesUSD: 'string',
                },
              },

              // FIXME: STARK
              // apr: app[1]?.apr <= 0 ? '0.00%' : app[1]?.apr.toFixed(0) + '%',
              apr: app[1] && app[1]?.apr ? (app[1]?.apr <= 0 ? '0.00%' : app[1]?.apr.toFixed(0) + '%') : '0.00%',
            }
          })
        )

        setichipositions(pos)
        setichiLoading(false)
      }
    }
    fetchpositions()
  }, [address])

  return { ichipositions, ichiLoading }
}

export const useIchiVaultsData = (vaultAddress: string) => {
  const dex = SupportedDex.Fenix
  const chain = SupportedChainId.blast
  // FIXME: STARK
  const [vaultData, setvaultData] = useState<any>({
    id: '',
    tokenA: '',
    tokenB: '',
    allowTokenA: false,
    allowTokenB: false,
    apr: [],
  })

  useEffect(() => {
    const fetchVault = async () => {
      const vaultInfo = await getIchiVaultInfo(chain, dex, vaultAddress)
      // FIXME: STARK
      if (vaultInfo) setvaultData(vaultInfo)
    }
    fetchVault()
  }, [vaultAddress])
  return vaultData
}
