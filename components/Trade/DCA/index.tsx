'use client'

import Panel from '@/components/Trade/DCA/Panel'
import Orders from '@/components/Trade/DCA/Orders'
import TradeProcess from '@/components/Trade/Common/TradeProcess'
import { DCA_PROCESS } from '../data'
import Chart from '@/components/Chart'

const DCA = () => {
  return (
    <div className="flex flex-col items-start gap-6 mb-4 xl:gap-10 xl:flex-row">
      <div className="flex flex-col w-full">
        <div className="flex flex-wrap w-full gap-5 mb-10 xl:flex-nowrap">
          <Panel />

          <Chart className="w-full xl:w-full" />
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
