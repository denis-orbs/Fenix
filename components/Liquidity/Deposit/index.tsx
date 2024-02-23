'use client'

import Panel from '@/components/Liquidity/Deposit/Panel'
import Chart from '@/components/Chart'

const DepositLiquidity = () => {
  return (
    <div className="flex flex-col items-start gap-6 mb-4 xl:gap-10 xl:flex-row">
      <div className="flex flex-col w-full">
        <div className="flex flex-wrap w-full gap-5 mb-10 xl:flex-nowrap">
          <Panel />
          <Chart className="w-full xl:w-full" />
        </div>
      </div>
    </div>
  )
}

export default DepositLiquidity
