'use client'
import { useShowChart } from '@/src/state/user/hooks'
import Panel from '@/src/components/Trade/Swap/Panel'
import TradeProcess from '@/src/components/Trade/Common/TradeProcess'
import { TRADE_PROCESS } from '../data'
import Chart from '@/src/components/Liquidity/Deposit/Chart'
import BlastBanner from '@/src/components/Common/BlastBanner'

const Swap = () => {
  const showChart = useShowChart()
  return (
    <div className="flex flex-col items-start gap-6 mb-4 justify-center">
      <BlastBanner />
      <div className="relative z-50">
      </div>
      <div className="flex flex-col w-full ">
        <div className="flex flex-wrap w-full xl:gap-5 mb-10 xl:flex-nowrap justify-center mt-10">
          <Panel />
          {showChart && <Chart token0="" token1="" />}
        </div>
      </div>
    </div>
  )
}

export default Swap
