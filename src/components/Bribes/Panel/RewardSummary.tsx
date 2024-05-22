import Image from 'next/image'
import { Button } from '@/src/components/UI'

const RewardSummary = () => {
  return (
    <>
      <div className="bg-shark-400 bg-opacity-40 py-[11px] px-[19px] flex items-center justify-between gap-2.5 border border-shark-950 rounded-[10px] mb-2.5 max-md:items-start">
        <div>
          <div className="text-white text-xs mb-2 block">Reward Token</div>
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="flex items-center flex-shrink-0">
              <Image
                src="/static/images/tokens/bribes.svg"
                alt="token"
                className="rounded-full w-6 h-6"
                width={30.5}
                height={30.5}
              />
              <Image
                src="/static/images/tokens/bribes.svg"
                alt="token"
                className="-ml-2.5 md:-ml-2 rounded-full w-6 h-6"
                width={30.5}
                height={30.5}
              />
            </div>
            <div className="flex gap-5">
              <h5 className="text-xs md:text-sm text-white leading-normal font-medium">- / -</h5>
              <div className="flex items-center gap-5 max-md:flex-wrap">
                <span className=" text-shark-100  text-xs">Volatile</span>
                <span className="text-xs text-shark-100">0.0%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs  text-center leading-normal text-shark-100">
          <p className="md:mb-[5px]">Rewards</p>
          <p className="md:mb-[5px]">$0.00</p>
        </div>
      </div>
    </>
  )
}

export default RewardSummary
