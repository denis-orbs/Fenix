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
  variant?: 'primary' | 'secondary'
}

const TokenSelector = ({ token, setToken, variant }: TokenSelectorProps) => {
  const [openSelectToken, setOpenSelectToken] = useState<boolean>(false)

  return (
    <div>
      <ExchangeBox token={token} onOpenModal={() => setOpenSelectToken(true)} variant={variant} />

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
    <div className="flex flex-col gap-1 mb-2 relative">
      <TokenSelector
        token={firstToken}
        value={firstValue}
        setToken={(token) => setFirstToken(token)}
        setValue={(value) => setFirstValue(value)}
        variant="primary"
      />
      <Separator single />
      <TokenSelector
        token={secondToken}
        value={secondValue}
        setToken={(token) => setSecondToken(token)}
        setValue={(value) => setSecondValue(value)}
        variant="secondary"
      />
    </div>
  )
}

export default TokensSelector
