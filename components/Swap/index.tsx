'use client'

import { useState } from 'react'
import TradeProcess from '../Common/TradeProcess'
import TradeNavigation from '@/components/Common/TradeNavigation'
import Trade from './Sections/Trade'
import DCA from './Sections/DCA'

const Swap = () => {
  const [sectionActive, setSectionActive] = useState<string>("swap")

  const TRADE_SECTIONS: { [key: string]: JSX.Element } = {
    swap: <Trade />,
    dca: <DCA />
  }

  return (
    <section>
      <TradeNavigation setSectionActive={setSectionActive} />
      <div className="flex flex-col items-center gap-6 mb-4 xl:gap-10 xl:flex-row">{TRADE_SECTIONS[sectionActive]}</div>
      <TradeProcess />
    </section>
  )
}

export default Swap
