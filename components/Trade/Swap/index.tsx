'use client'

import Panel from '@/components/Trade/Swap/Panel'
import TradeProcess from '@/components/Trade/Common/TradeProcess'
import { TRADE_PROCESS } from '../data'

const Swap = () => {
  return (
    <div className="flex flex-col items-start gap-6 mb-4 xl:gap-10 xl:flex-row">
      <div className="flex flex-col w-full">
        <div className="flex flex-wrap items-start w-full gap-5 mb-10 xl:flex-nowrap">
          <Panel />
          <div className="w-full xl:w-full bg-shark-400 opacity-40 h-[585px] rounded-2xl text-white flex items-center justify-center">
            GRAFICA SWAP
          </div>
        </div>
        <div className="flex w-full">
          <TradeProcess title="Trade" steps={TRADE_PROCESS} />
        </div>
      </div>
    </div>
  )
}

export default Swap
