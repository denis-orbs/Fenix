'use client'

import Panel from '@/components/DepositLiquidity/Liquidity/Panel'
import { useState } from 'react'
import Navigation from '@/components/DepositLiquidity/common/Navigation'
import Chart from '@/components/Chart'

const DepositLiquidity = () => {
  const [sectionActive, setSectionActive] = useState<string>('swap')

  return (
    <div>
      <Navigation setSectionActive={setSectionActive} />
      <div className="flex flex-col gap-6 mb-4 xl:gap-10 xl:flex-row">
        <Panel />
        <Chart className="w-full xl:w-4/6" />
      </div>
    </div>
  )
}

export default DepositLiquidity
