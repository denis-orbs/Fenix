'use client'

import Image from 'next/image'
import { MediumBox } from '@/components/UI'

const Steps = () => {
  return (
    <MediumBox>
      <div className="flex flex-col items-center justify-center w-full">
        <h4 className="w-full mb-3 text-sm text-white">Start now</h4>
        <div className="flex flex-col w-auto relative">
          <div className="w-[493px] h-[97px] flex gap-3 items-center p-3 box mb-3 relative">
            <div className="flex items-center justify-center w-12 h-12 p-3 rounded-lg bg-shark-400 bg-opacity-60">
              <span className="inline-block text-2xl text-transparent icon-lock bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
            </div>
            <div className="">
              <h5 className="text-xs text-shark-100">Select your Pool</h5>
              <p className="text-xs text-white">Select the pair that suits better your strategy.</p>
            </div>
          </div>
          <span className="absolute z-10 top-[80px] left-[10px]">
            <Image src="/static/images/components/line.svg" alt="line" className="h-8 w-1" width={1} height={35} />
          </span>
          <div className="w-[493px] h-[97px] flex gap-3 items-center p-3 box mb-3">
            <div className="flex items-center justify-center w-12 h-12 p-3 rounded-lg bg-shark-400 bg-opacity-40">
              <span className="inline-block text-2xl text-transparent icon-pig bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
            </div>
            <div className="">
              <h5 className="text-xs text-shark-100">Deposit your Liquidity</h5>
              <p className="text-xs text-white">
                The deeper the liquidity (TVL), the lower the slippage a pool will offer.
              </p>
            </div>
          </div>
          <span className="absolute z-10 bottom-[90px] left-[10px]">
            <Image src="/static/images/components/line.svg" alt="line" className="h-8 w-1" width={1} height={35} />
          </span>
          <div className="w-[493px] h-[97px] flex gap-3 items-center p-3 box">
            <div className="flex items-center justify-center w-12 h-12 p-3 rounded-lg bg-shark-400 bg-opacity-40">
              <span className="inline-block text-2xl text-transparent icon-coins bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
            </div>
            <div className="">
              <h5 className="text-xs text-shark-100">Receive Benefits</h5>
              <p className="text-xs text-white">
                LPs get FNX emissions, while veFNX lockers get the pool trading fees as an incentive to vote on the most
                productive pools.
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="flex items-center justify-end gap-3 py-2 text-sm cursor-pointer text-shark-100 hover:text-outrageous-orange-500">
        <span className="text-lg icon-link"></span>
        Read More
      </p>
    </MediumBox>
  )
}

export default Steps
