'use client'

import { useState } from 'react'
import TradeProcess from '@/components/Trade/Common/TradeProcess'
import Navigation from '@/components/Trade/Common/Navigation'
import Swap from '@/components/Trade/Swap'
import DCA from '@/components/Trade/DCA'

const Trade = () => {
  const [sectionActive, setSectionActive] = useState<string>("swap")

  const TRADE_SECTIONS: { [key: string]: JSX.Element } = {
    swap: <Swap />,
    dca: <DCA />,
  }

  return (
    <section className="container">
      <Navigation setSectionActive={setSectionActive} />
      <div className="flex flex-col items-start gap-6 mb-4 xl:gap-10 xl:flex-row">{TRADE_SECTIONS[sectionActive]}</div>
    </section>
  )
}

export default Trade
