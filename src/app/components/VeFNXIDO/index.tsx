'use client'

import Steps from '@/src/app/components/Common/Steps'
import Panel from '@/src/app/components/VeFNXIDO/Panel'
import { STEPS } from './data'

const VeFNXIDO = () => {

  return (
    <section className="relative">
      <div className="flex flex-col items-start gap-5 py-5 2xl:flex-row">
        <div className="w-full 2xl:w-3/4">
          <Panel />
        </div>
        <Steps steps={STEPS} />
      </div>
    </section>
  )
}

export default VeFNXIDO
