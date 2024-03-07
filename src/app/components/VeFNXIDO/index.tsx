'use client'

import Steps from '@/src/app/components/Common/Steps'
import Offering from '@/src/app/components/VeFNXIDO/Offering'
import Detail from '@/src/app/components/VeFNXIDO/Detail'
import { STEPS } from './data'

const VeFNXIDO = () => {
  return (
    <section className="relative">
      <div className="flex flex-col items-start gap-5 py-5 2xl:flex-row justify-between">
        <Offering />
        <Detail />
        <Steps steps={STEPS} title="How to take part?" />
      </div>
    </section>
  )
}

export default VeFNXIDO
