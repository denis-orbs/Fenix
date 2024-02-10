/* eslint-disable import/no-default-export */
'use client'
import Image from 'next/image'

import { Button } from '@/components/UI'
import ExchangeBox from './ExchangeBox'
import Separator from './Separator'

const Swap = () => {
  return (
    <div className="flex items-center gap-6 xl:gap-10 flex-col xl:flex-row">
      <section className="relative w-full rounded-2xl xl:w-[667px] bg-shark-400 xl:bg-transparent bg-opacity-40">
        <div className="swap-box-top"></div>
        <div className="w-full flex flex-col xl:flex-row justify-between gap-12 items-center py-8 xl:py-0 px-10 xl:bg-shark-400 xl:bg-opacity-40">
          <div className="w-full relative">
            <h4 className="mb-3 text-xl text-white">Trade</h4>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <Button variant="primary" className="!py-2 !rounded-xl">
                  Swap
                </Button>
                <Button variant="secondary" className="!py-2 !rounded-xl">
                  Limit
                </Button>
                <Button variant="secondary" className="!py-2 !rounded-xl">
                  Twap
                </Button>
              </div>
              <span className="icon-reflesh text-shark-100 text-lg"></span>
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
      <section className="w-full xl:w-4/6 bg-shark-400 opacity-40 h-[585px] rounded-2xl">grafica</section>
    </div>
  )
}

export default Swap
