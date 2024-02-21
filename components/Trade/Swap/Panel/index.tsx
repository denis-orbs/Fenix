'use client'
import { useState } from 'react'

import Swap from '@/components/Trade/Swap/Panel/Swap'
import For from '@/components/Trade/Swap/Panel/For'
import Separator from '@/components/Trade/Common/Separator'

import { IToken } from '@/types'

const Panel = () => {
  const [tokenSell, setTokenSell] = useState<IToken>({ name: 'Fenix', symbol: 'FNX' })
  const [tokenGet, setTokenGet] = useState<IToken>({ name: 'USDC', symbol: 'USDC' })
  const [swapValue, setSwapValue] = useState<number>(0)
  const [forValue, setForValue] = useState<number>(0)

  return (
    <section className="box-panel-trade">
      <div className="w-full flex flex-col xl:flex-row justify-between gap-12 items-center relative z-10">
        <div className="w-full relative">
          <div className="flex items-center justify-between mb-5">
            <h4 className="mb-3 text-lg text-white font-medium">Trade</h4>
            <span className="icon-reflesh text-shark-100 text-xl cursor-pointer"></span>
          </div>
          <div className="flex flex-col gap-1 mb-5 relative">
            <div className="mb-3">
              <Swap token={tokenSell} setToken={setTokenSell} value={swapValue} setValue={setSwapValue} />
              <Separator />
              <For token={tokenGet} setToken={setTokenGet} value={forValue} setValue={setForValue} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Panel
