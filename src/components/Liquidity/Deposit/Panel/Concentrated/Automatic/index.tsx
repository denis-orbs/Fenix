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
import WithdrawAmountsICHI from './WithdrawAmountsICHI'
import WithdrawAmountsGAMMA from './WithdrawAmountsGAMMA'

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
  const [optionActive, setOptionActive] = useState<'ADD' | 'WITHDRAW'>('ADD')
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

  const handlerOption = (option: 'ADD' | 'WITHDRAW') => {
    setOptionActive(option)
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

      <div className="bg-shark-400 bg-opacity-40 p-[13px] md:py-[11px] md:px-[19px] flex gap-1.5 md:gap-2.5 border border-shark-950 rounded-[10px] mb-2.5">
        <Button
          onClick={() => handlerOption('ADD')}
          className="w-full h-[38px] mx-auto !text-xs"
          variant={optionActive === 'ADD' ? 'primary' : 'secondary'}
        >
          Add
        </Button>
        <Button
          onClick={() => handlerOption('WITHDRAW')}
          className="w-full h-[38px] mx-auto !text-xs"
          variant={optionActive === 'WITHDRAW' ? 'primary' : 'secondary'}
        >
          Withdraw
        </Button>
      </div>

      {currentProvider === '1' && optionActive === 'ADD' && (
        <DepositAmountsICHI vaultInfo={vaultInfo} token={token0} tokenList={tokenList} />
      )}
      {currentProvider === '1' && optionActive === 'WITHDRAW' && (
        <WithdrawAmountsICHI vaultInfo={vaultInfo} token={token0} tokenList={tokenList} />
      )}

      {currentProvider === '2' && optionActive === 'ADD' && (
        <DepositAmountsGAMMA firstToken={token0} secondToken={token1} tokenList={tokenList} />
      )}
      {currentProvider === '2' && optionActive === 'WITHDRAW' && (
        <WithdrawAmountsGAMMA firstToken={token0} secondToken={token1} tokenList={tokenList} />
      )}

      {/* <Button className="w-full mx-auto !text-xs !h-[49px]" variant="tertiary">
        Create Position
      </Button> */}
    </>
  )
}

export default Automatic
