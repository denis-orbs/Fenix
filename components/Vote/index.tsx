'use client'

import Deposit from '@/components/Vote/Deposit'
import Steps from '@/components/Common/Steps'
import Pool from '@/components/Vote/Pool'

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
