'use client'

import Migration from '@/components/Claim/Migration'
import Steps from '@/components/Common/Steps'
// import Pool from '@/components/Claim/Pool'

const Claim = () => {
  return (
    <section>
      <div className="flex items-center gap-5">
        <Migration />
        <Steps />
      </div>
      {/* <Pool /> */}
    </section>
  )
}

export default Claim
