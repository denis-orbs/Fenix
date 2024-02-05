'use client'

import Migration from '@/components/Claim/Migration'
import Steps from '@/components/Common/Steps'
import Overview from '@/components/Claim/Overview'
import { STEPS } from './data'

const Claim = () => {
  return (
    <section className="px-3 md:px-0">
      <div className="flex items-center gap-6 justify-between flex-col md:flex-row mb-10 md:mb-0">
        <Migration />
        <Steps steps={STEPS} />
      </div>
      <Overview />
    </section>
  )
}

export default Claim
