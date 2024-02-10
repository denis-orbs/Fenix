'use client'

import Panel from './Panel'
import TradeNavigation from '@/components/Common/TradeNavigation'

const Swap = () => {
  return (
    <section>
      <TradeNavigation />
      <div className="flex items-center gap-6 xl:gap-10 flex-col xl:flex-row">
        <Panel />
        <section className="w-full xl:w-4/6 bg-shark-400 opacity-40 h-[585px] rounded-2xl">grafica</section>
      </div>
    </section>
  )
}

export default Swap
