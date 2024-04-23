'use client'
import { useState } from 'react'
import { Switch } from '@/src/components/UI'
import { useSetChart, useShowChart } from '@/src/state/swap-chart/hooks'
import Panel from '@/src/components/Trade/Swap/Panel'
import TradeProcess from '@/src/components/Trade/Common/TradeProcess'
import { TRADE_PROCESS } from '../data'
import Chart from '@/src/components/Liquidity/Deposit/Chart'
import BlastBanner from '@/src/components/Common/BlastBanner'

const Swap = () => {
  const showChart = useShowChart()
  const setChart = useSetChart()
  const [isChartVisible, setIsChartVisible] = useState(showChart)
  const handleSwitch = () => {
    setChart(!isChartVisible)
    setIsChartVisible((prevState) => !prevState)
  }
  return (
    <div className="flex flex-col items-start gap-6 mb-4 justify-center">
      <BlastBanner />
      <div className="flex flex-col w-full">
        <div className="flex flex-wrap w-full xl:gap-5 mb-10 xl:flex-nowrap justify-center mt-10">
          <Panel />
          {showChart && <Chart />}
          <div
            className={`flex items-center gap-3 w-[100%] justify-center py-4 xl:hidden ${showChart ? 'max-xl:bg-shark-400 max-xl:bg-opacity-40 max-xl:rounded-b-2xl' : ''}`}
          >
            <Switch active={showChart} setActive={handleSwitch} />
            <div className="text-xs text-shark-100 font-normal whitespace-nowrap">
              {showChart ? 'Hide' : 'Show'} Trading View
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Swap
