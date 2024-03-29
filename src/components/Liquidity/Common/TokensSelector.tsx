/* eslint-disable react/no-multi-comp */
'use client'

import { useState } from 'react'
import SelectToken from '@/src/components/Modals/SelectToken'

import { IToken } from '@/src/library/types'
import ExchangeBox from '@/src/components/Liquidity/Common/ExchangeBox'
import Separator from '@/src/components/Trade/Common/Separator'

interface TokenSelectorProps {
  token: IToken
  value: string
  setToken: (token: IToken) => void
  setValue: (value: string) => void
  variant?: 'primary' | 'secondary'
  onTokenValueChange?: (arg0: any, token: IToken) => void
  commonList: IToken[]
  tokenList: IToken[]
  tokenBalances: { [key: `0x${string}`]: string }
}

const TokenSelector = ({ token, setToken, variant, onTokenValueChange, value, tokenBalances, tokenList, commonList }: TokenSelectorProps) => {
  const [openSelectToken, setOpenSelectToken] = useState<boolean>(false)

  return (
    <div>
      <ExchangeBox token={token} onOpenModal={() => setOpenSelectToken(true)} variant={variant} onTokenValueChange={onTokenValueChange} value={value} />

      <SelectToken openModal={openSelectToken} setOpenModal={setOpenSelectToken} setToken={setToken} tokenList={tokenList} tokenBalances={tokenBalances} commonList={commonList} />
    </div>
  )
}

const TokensSelector = ({
  firstToken,
  secondToken,
  firstValue,
  secondValue,
  setFirstToken,
  setSecondToken,
  setFirstValue,
  setSecondValue,
  onTokenValueChange,
  commonList,
  tokenList,
  tokenBalances
}: {
  firstToken: IToken
  secondToken: IToken
  firstValue: string
  secondValue: string
  setFirstToken: (token: IToken) => void
  setSecondToken: (token: IToken) => void
  setFirstValue: (value: string) => void
  setSecondValue: (value: string) => void
  onTokenValueChange:(arg0: any, token: IToken) => void
  commonList: IToken[]
  tokenList: IToken[]
  tokenBalances: { [key: `0x${string}`]: string }
}) => {
  return (
    <div className="flex flex-col gap-1 mb-2 relative">
      <TokenSelector
        token={firstToken}
        value={firstValue}
        setToken={(token) => setFirstToken(token)}
        setValue={(value) => setFirstValue(value)}
        variant="primary"
        onTokenValueChange={onTokenValueChange}
        tokenBalances={tokenBalances}
        tokenList={tokenList}
        commonList={commonList}
      />
      <Separator single />
      <TokenSelector
        token={secondToken}
        value={secondValue}
        setToken={(token) => setSecondToken(token)}
        setValue={(value) => setSecondValue(value)}
        variant="secondary"
        onTokenValueChange={onTokenValueChange}
        tokenBalances={tokenBalances}
        tokenList={tokenList}
        commonList={commonList}
      />
    </div>
  )
}

export default TokensSelector
