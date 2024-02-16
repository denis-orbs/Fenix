'use client'
import { useState } from 'react'
import Image from 'next/image'

import ExchangeBox from '../Common/ExchangeBox'
import Separator from '../Common/Separator'
import { Button } from '@/components/UI'

interface IToken {
  name: string
  symbol: string
}

const Panel = () => {
  const [tokenSwap, setTokenSwap] = useState<IToken>({ name: 'Fenix', symbol: 'FNX' })
  const [tokenFor, setTokenFor] = useState<IToken>({ name: 'ethereum', symbol: 'ETH' })

  return (
    <section className="relative w-full rounded-2xl xl:w-[667px] bg-shark-400 xl:bg-transparent bg-opacity-40">
      <div className="swap-box-top"></div>
      <div className="w-full flex flex-col xl:flex-row justify-between gap-12 items-center py-8 xl:py-0 px-6 xl:px-10 xl:bg-shark-400 xl:bg-opacity-40">
        <div className="w-full relative">
          <div className="flex items-center justify-between mb-5">
            <h4 className="mb-3 text-xl text-white font-medium">Trade</h4>
            <span className="icon-reflesh text-shark-100 text-xl"></span>
          </div>
          <div className="flex flex-col gap-1 mb-5 relative">
            <ExchangeBox title="Swap" token={tokenSwap} />
            <Separator />
            <ExchangeBox title="For" token={tokenFor} />
          </div>
          <Button className="w-full mx-auto">Swap 0.0,302 FNX to ETH</Button>
        </div>
      </div>
      <div className="swap-box-bottom"></div>
    </section>
  )
}

export default Panel
