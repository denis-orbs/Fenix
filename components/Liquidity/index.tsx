'use client'

import Deposit from '@/components/Liquidity/Deposit'
import Steps from '@/components/Common/Steps'
import Pool from '@/components/Liquidity/Pool'

import { STEPS } from './data'

const Liquidity = () => {
  return (
    <section className="px-3 md:px-5">
      <div className="flex items-center gap-10 justify-around flex-col xl:flex-row mb-10 xl:h-[450px]">
        <Deposit />
        <Steps steps={STEPS} />
      </div>
      <Pool />
    </section>
  )
}

export default Liquidity
