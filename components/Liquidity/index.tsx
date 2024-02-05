'use client'

import Deposit from '@/components/Liquidity/Deposit'
import Steps from '@/components/Common/Steps'
import Pool from '@/components/Liquidity/Pool'

import { STEPS } from './data'

const Liquidity = () => {
  return (
    <section className="px-3 md:px-0">
      <div className="flex items-center gap-6 justify-between flex-col md:flex-row mb-10 md:mb-0">
        <Deposit />
        <Steps steps={STEPS} />
      </div>
      <Pool />
    </section>
  )
}

export default Liquidity
