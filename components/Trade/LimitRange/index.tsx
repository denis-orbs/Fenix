'use client'

import Panel from '@/components/Trade/LimitRange/Panel'
import TradeProcess from '@/components/Trade/Common/TradeProcess'
import { LIMIT_PROCESS } from '../data'
import Chart from '@/components/Chart'

const LimitRange = () => {
  return (
    <div className="flex flex-col items-start gap-6 mb-4 xl:gap-10 xl:flex-row">
      <div className="flex flex-col w-full">
        <div className="flex flex-wrap w-full gap-5 mb-10 xl:flex-nowrap">
          <Panel />
          <Chart className="w-full xl:w-full" />
        </div>
        <div className="flex w-full">
          <TradeProcess title="Limit" steps={LIMIT_PROCESS} />
        </div>
      </div>
    </div>
  )
}

export default LimitRange
