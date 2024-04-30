'use client'
import Panel from '@/src/components/Trade/Swap/Panel'
import BlastBanner from '@/src/components/Common/BlastBanner'

const Swap = () => {
  return (
    <div className="flex flex-col items-start gap-6 justify-center">
      <BlastBanner />
      <div className="flex flex-col w-full ">
        <div className="flex flex-wrap w-full xl:gap-5 xl:flex-nowrap justify-center ">
          <Panel />
        </div>
      </div>
    </div>
  )
}

export default Swap
