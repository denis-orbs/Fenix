'use client'

import Panel from '@/components/Trade/DCA/Panel'
import Orders from '@/components/Trade/DCA/Orders'
import TradeProcess from '@/components/Trade/Common/TradeProcess'
import { DCA_PROCESS } from '../data'

const DCA = () => {
  return (
    <div className="flex flex-col items-start gap-6 mb-4 xl:gap-10 xl:flex-row">
      <div className="flex flex-col w-full">
        <div className="flex flex-wrap items-start w-full gap-5 mb-10 xl:flex-nowrap">
          <Panel />
          <div className="w-full xl:w-full bg-shark-400 opacity-40 h-[585px] rounded-2xl text-white flex items-center justify-center">
            GRAFICA DCA
          </div>
        </div>
        <div className="flex w-full">
          <TradeProcess title="DCA" steps={DCA_PROCESS} />
        </div>
        <div className="flex w-full">
          <Orders />
        </div>
      </div>
    </div>
  )
}

export default DCA
