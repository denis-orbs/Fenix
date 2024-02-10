'use client'

import Panel from './Panel'
import TradeProcess from '../Common/TradeProcess'
import TradeNavigation from '@/components/Common/TradeNavigation'

const Swap = () => {
  return (
    <section>
      <TradeNavigation />
      <div className="flex flex-col items-center gap-6 mb-4 xl:gap-10 xl:flex-row">
        <Panel />
        <section className="w-full xl:w-4/6 bg-shark-400 opacity-40 h-[585px] rounded-2xl">grafica</section>
      </div>
      <TradeProcess/>
    </section>
  )
}

export default Swap
