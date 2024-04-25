'use client'

import Migration from '@/src/components/Claim/Migration'
import Steps from '@/src/components/Common/StepsClaim'
import Overview from '@/src/components/Claim/Overview'
import { STEPS } from './data'

const Claim = () => {
  return (
    <section className="px-3 py-6 md:py-0 md:px-0">
      <div className="flex flex-col items-center gap-6 mb-10 xl:flex-row">
        <Migration />
        <Steps steps={STEPS} />
      </div>
      <Overview />
    </section>
  )
}

export default Claim
