'use client'

import Panel from '@/src/components/Trade/Swap/Panel'
import BlastBanner from '@/src/components/Common/BlastBanner'
const Swap = () => {
  return (
    <div className="flex flex-col items-start gap-6 mb-4 justify-center">
      <BlastBanner />
      <div className="relative z-50">
      </div>
      <div className="flex flex-col w-full ">
        <div className="flex flex-wrap w-full xl:gap-5 mb-10 xl:flex-nowrap justify-center mt-10">
          <Panel />
        </div>
      </div>
    </div>
  )
}

export default Swap
