'use client'

import { useState } from 'react'
import TradeProcess from './Common/TradeProcess'
import Navigation from '@/components/Trade/Common/Navigation'
import Swap from './Swap'
import DCA from './DCA'

const Trade = () => {
  const [sectionActive, setSectionActive] = useState<string>("swap")

  const TRADE_SECTIONS: { [key: string]: JSX.Element } = {
    swap: <Swap />,
    dca: <DCA />,
  }

  return (
    <section>
      <Navigation setSectionActive={setSectionActive} />
      <div className="flex flex-col items-start gap-6 mb-4 xl:gap-10 xl:flex-row">{TRADE_SECTIONS[sectionActive]}</div>
      <TradeProcess />
    </section>
  )
}

export default Trade
