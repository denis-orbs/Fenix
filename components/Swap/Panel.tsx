'use client'
import Image from 'next/image'

import ExchangeBox from './ExchangeBox'
import Separator from './Separator'

const Panel = () => {
  return (
    <section className="relative w-full rounded-2xl xl:w-[667px] bg-shark-400 xl:bg-transparent bg-opacity-40">
      <div className="swap-box-top"></div>
      <div className="w-full flex flex-col xl:flex-row justify-between gap-12 items-center py-8 xl:py-0 px-10 xl:bg-shark-400 xl:bg-opacity-40">
        <div className="w-full relative">
          <div className="flex items-center justify-between mb-5">
            <h4 className="mb-3 text-2xl text-white font-medium">Trade</h4>
            <span className="icon-reflesh text-shark-100 text-xl"></span>
          </div>
          <div className="flex flex-col gap-1 mb-5 relative">
            <ExchangeBox title="Swap" />
            <Separator />
            <ExchangeBox title="For" />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-shark-100 text-sm">Liquidity Routing</p>
            <Image
              src={`/static/images/swap/route.png`}
              alt="route"
              className="w-[336] h-auto opacity-50"
              width={336}
              height={100}
            />
          </div>
        </div>
      </div>
      <div className="swap-box-bottom"></div>
    </section>
  )
}

export default Panel
