'use client'

import Panel from '@/components/DepositLiquidity/Liquidity/Panel'
import { useState } from 'react'
import Navigation from '@/components/DepositLiquidity/common/Navigation'

const DepositLiquidity = () => {
  const [sectionActive, setSectionActive] = useState<string>('swap')

  return (
    <div>
      <Navigation setSectionActive={setSectionActive} />
      <div className="flex flex-col items-start gap-6 mb-4 xl:gap-10 xl:flex-row">
        <Panel />
        <div className="w-full xl:w-4/6 bg-shark-400 opacity-40 h-[585px] rounded-2xl text-white flex items-center justify-center">
          GRAFICA
        </div>
      </div>
    </div>
  )
}

export default DepositLiquidity
