'use client'

import Deposit from '@/components/Liquidity/Deposit'
import Steps from '@/components/Common/Steps'
import Pool from '@/components/Liquidity/Pool'

import STEPS from './data'

const Vote = () => {
  return (
    <section>
      <div className="flex items-center gap-5">
        <Deposit />
        <Steps steps={STEPS} />
      </div>
      <Pool />
    </section>
  )
}

export default Vote
