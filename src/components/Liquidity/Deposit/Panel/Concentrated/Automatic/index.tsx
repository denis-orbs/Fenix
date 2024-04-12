import { useEffect, useState } from 'react'

import PairSelector from '@/src/components/Liquidity/Common/PairSelector'
import CLMProviderSelector from '@/src/components/Liquidity/Deposit/Panel/Concentrated/Automatic/CLMProviderSelector'
import DepositAmountsICHI from '@/src/components/Liquidity/Deposit/Panel/Concentrated/Automatic/DepositAmountsICHI'
import DepositAmountsGAMMA from '@/src/components/Liquidity/Deposit/Panel/Concentrated/Automatic/DepositAmountsGAMMA'
import {
  useSetToken0,
  useSetToken1,
  useToken0,
  useToken0Data,
  useToken1,
  useToken1Data,
} from '@/src/state/liquidity/hooks'
import { tokenList } from '@/src/library/constants/tokenList'

import { Button } from '@/src/components/UI'
import { useSearchParams } from 'next/navigation'
import { Token, fetchTokens } from '@/src/library/common/getAvailableTokens'
import { IToken } from '@/src/library/types'
import { useIchiVault } from '@/src/library/hooks/web3/useIchi'
import { IchiVault } from '@ichidao/ichi-vaults-sdk'

const providers = [
  {
    label: 'ICHI',
    value: '1',
    apr: -1,
    src: 'https://ichi.org/',
    logo: {
      src: '/static/images/providers/ichi.svg',
      width: 63.75,
      height: 21,
    },
  },
]

const Automatic = () => {
  const [firstToken, setFirstToken] = useState<IToken>()
  const [secondToken, setSecondToken] = useState<IToken>()
  const [currentProvider, setCurrentProvider] = useState<string>('1')
  const [tokenList, setTokenList] = useState<IToken[]>([])
  const setToken0 = useSetToken0()
  const setToken1 = useSetToken1()
  const searchParams = useSearchParams()
  const searchParamToken0 = searchParams.get('token0')
  const searchParamToken1 = searchParams.get('token1')
  // Defaults tokens
  useEffect(() => {
    const getData = async () => {
      const tokens = await fetchTokens()
      const parsedTokens = tokens.map((item: any, index) => {
        return {
          id: index,
          name: item.basetoken.name,
          symbol: item.basetoken.symbol,
          address: item.basetoken.address,
          decimals: item.decimals,
          img: item.logourl,
          isCommon: item.common,
          price: parseFloat(item.priceUSD),
        }
      })
      setTokenList(parsedTokens)
      let token0Data = parsedTokens.find(
        (token: any) => token.address.toLowerCase() === searchParamToken0?.toLowerCase()
      )
      let token1Data = parsedTokens.find(
        (token: any) => token.address.toLowerCase() === searchParamToken1?.toLowerCase()
      )
      setFirstToken(token0Data) // set token0
      setSecondToken(token1Data) // set token1
      setToken0(token0Data?.address.toLowerCase())
      setToken1(token1Data?.address.toLowerCase())
    }
    getData()
  }, [])
  let vaultInfo: any
  const token0 = useToken0()
  const token1 = useToken1()

  if (token0 && token1) {
    vaultInfo = useIchiVault(token0 as string, token1 as string)
    console.log(vaultInfo, 'parsed vault info')
  }

  return (
    <>
      <PairSelector firstToken={token0} secondToken={token1} tokenList={tokenList} />
      {vaultInfo && vaultInfo.length ? (
        <>
          <CLMProviderSelector
            providers={providers}
            currentProvider={currentProvider}
            setCurrentProvider={setCurrentProvider}
          />
        </>
      ) : (
        <></>
      )}

      {currentProvider === '1' && <DepositAmountsICHI vaultInfo={vaultInfo} token={token0} />}
      {currentProvider === '2' && <DepositAmountsGAMMA firstToken={token0} secondToken={token1} />}

      {/* <Button className="w-full mx-auto !text-xs !h-[49px]" variant="tertiary">
        Create Position
      </Button> */}
    </>
  )
}

export default Automatic
