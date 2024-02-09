                                                                                                                    /* eslint-disable import/no-default-export */
'use client'
import Image from 'next/image'

import { Button } from '@/components/UI'
import HowToSwap from './HowToSwap'
import ExchangeBox from './ExchangeBox'
import Separator from './Separator'

const Swap = () => {
  return (
    <section className="mt-36 mb-52 relative w-full xl:w-3/4 rounded-2xl mx-auto max-w-[1200px]">
      <div className="swap-box-top"></div>
      <div className="swap-box-bottom"></div>
      <div className="flex flex-col xl:flex-row justify-between gap-12 items-center bg-shark-400 bg-opacity-40 px-10">
        <div className="w-full my-5 xl:w-[50%] relative">
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
        <HowToSwap />
      </div>
    </section>
  )
}

export default Swap
