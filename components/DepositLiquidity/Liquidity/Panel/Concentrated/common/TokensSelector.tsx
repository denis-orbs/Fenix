/* eslint-disable react/no-multi-comp */
'use client'

import { useState } from 'react'
import SelectToken from '@/components/Modals/SelectToken'

import { IToken } from '@/types'
import ExchangeBox from '@/components/Trade/Common/ExchangeBox'
import Separator from '@/components/Trade/Common/Separator'

interface TokenSelectorProps {
  token: IToken
  value: number
  setToken: (token: IToken) => void
  setValue: (value: number) => void
}

const TokenSelector = ({ token, setToken, setValue, value }: TokenSelectorProps) => {
  const [openSelectToken, setOpenSelectToken] = useState<boolean>(false)

  return (
    <div>
      <ExchangeBox token={token} onOpenModal={() => setOpenSelectToken(true)} />

      <SelectToken openModal={openSelectToken} setOpenModal={setOpenSelectToken} setToken={setToken} />
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
}: {
  firstToken: IToken
  secondToken: IToken
  firstValue: number
  secondValue: number
  setFirstToken: (token: IToken) => void
  setSecondToken: (token: IToken) => void
  setFirstValue: (value: number) => void
  setSecondValue: (value: number) => void
}) => {
  return (
    <div className="flex flex-col gap-1 mb-5 relative">
      <TokenSelector
        token={firstToken}
        value={firstValue}
        setToken={(token) => setFirstToken(token)}
        setValue={(value) => setFirstValue(value)}
      />
      <Separator />
      <TokenSelector
        token={secondToken}
        value={secondValue}
        setToken={(token) => setSecondToken(token)}
        setValue={(value) => setSecondValue(value)}
      />
    </div>
  )
}

export default TokensSelector
