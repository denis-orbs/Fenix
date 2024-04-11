'use client'

import Panel from '@/src/components/Trade/Recurring/Panel'
import TradeProcess from '@/src/components/Trade/Common/TradeProcess'
import { RECURRING_PROCESS } from '../data'
import Chart from '@/src/components/Chart'

const Recurring = () => {
  return (
    <div className="flex flex-col items-start gap-6 mb-4 xl:gap-10 xl:flex-row">
      <div className="flex flex-col w-full">
        <div className="flex flex-wrap w-full gap-5 mb-10 xl:flex-nowrap overflow-hidden">
          <Panel />
          <Chart />
        </div>
        <div className="flex w-full">
          <TradeProcess title="Recurring Order" steps={RECURRING_PROCESS} />
        </div>
      </div>
    </div>
  )
}

export default Recurring
