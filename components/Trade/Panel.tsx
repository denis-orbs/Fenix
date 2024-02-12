'use client'
import { useState } from 'react'
import Image from 'next/image'

import ExchangeBox from './ExchangeBox'
import Separator from './Separator'
import { Button } from '../UI'

interface IToken {
  name: string
  symbol: string
}

interface PanelProp {
  title: string
}

const Panel = ({ title }: PanelProp) => {
  const [tokenSwap, setTokenSwap] = useState<IToken>({ name: 'Fenix', symbol: 'FNX' })
  const [tokenFor, setTokenFor] = useState<IToken>({ name: 'ethereum', symbol: 'ETH' })

  return (
    <section className="relative w-full rounded-2xl xl:w-[667px] bg-shark-400 xl:bg-transparent bg-opacity-40">
      <div className="swap-box-top"></div>
      <div className="w-full flex flex-col xl:flex-row justify-between gap-12 items-center py-8 xl:py-0 px-6 xl:px-10 xl:bg-shark-400 xl:bg-opacity-40">
        <div className="w-full relative">
          <div className="flex items-center justify-between mb-5">
            <h4 className="mb-3 text-2xl text-white font-medium">{title}</h4>
            <span className="icon-reflesh text-shark-100 text-xl"></span>
          </div>
          <div className="flex flex-col gap-1 mb-5 relative">
            <ExchangeBox title="Swap" token={tokenSwap} />
            <Separator />
            <ExchangeBox title="For" token={tokenFor} />
          </div>
          <div className="flex items-center justify-between mb-5">
            <p className="text-shark-100 text-sm">Liquidity Routing</p>
            <Image
              src={`/static/images/swap/route.png`}
              alt="route"
              className="w-[336] h-auto opacity-50"
              width={336}
              height={100}
            />
          </div>
          <Button className="w-[80%] mx-auto">Swap 0.0,302 FNX to ETH</Button>
        </div>
      </div>
      <div className="swap-box-bottom"></div>
    </section>
  )
}

export default Panel
