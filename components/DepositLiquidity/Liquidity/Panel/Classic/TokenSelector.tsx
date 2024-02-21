'use client'

import { useState } from 'react'
import SelectToken from '@/components/Modals/SelectToken'

import { IToken } from '@/types'
import ExchangeBox from '@/components/Trade/Common/ExchangeBox'

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

export default TokenSelector
