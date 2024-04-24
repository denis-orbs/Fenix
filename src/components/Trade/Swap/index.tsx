'use client'
import BlastBanner from '@/src/components/Common/BlastBanner'
const Swap = () => {
  return (
    <div className="flex flex-col items-start gap-6 mb-4 justify-center">
      <BlastBanner />
      <div className="flex flex-col w-full">
        <div className="flex flex-wrap w-full gap-5 mb-10 xl:flex-nowrap justify-center">{/* <Panel /> */}</div>
      </div>
    </div>
  )
}

export default Swap
