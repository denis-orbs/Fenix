'use client'

import Panel from '@/src/components/Trade/Swap/Panel'
import TradeProcess from '@/src/components/Trade/Common/TradeProcess'
import { TRADE_PROCESS } from '../data'
import Chart from '@/src/components/Chart'

const Swap = () => {
  return (
    <div className="flex flex-col items-start gap-6 mb-4 xl:gap-10 xl:flex-row justify-center">
      <div className="flex flex-col w-full">
        <div className="flex flex-wrap w-full gap-5 mb-10 xl:flex-nowrap justify-center">
          <Panel />
        </div>
      </div>
    </div>
  )
}

export default Swap
