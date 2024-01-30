'use client'

import Deposit from '@/components/Liquidity/Deposit'
import Steps from '@/components/Liquidity/Steps'
import Pool from '@/components/Liquidity/Pool'

const Liquidity = () => {
  return (
    <section>
      <div className="flex items-center gap-5">
        <Deposit />
        <Steps />
      </div>
      <Pool />
    </section>
  )
}

export default Liquidity
