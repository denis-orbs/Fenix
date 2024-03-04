'use client'

import Image from 'next/image'
import { Button } from '@/components/UI'

const Panel = () => {
  return (
    <div className="veFNXIDO-box">
      <div className="flex flex-col gap-5 items-start justify-between w-full xl:flex-row relative z-10">
        <div className="w-full xl:w-1/2">
          <h4 className="mb-3 text-2xl text-white">veFNX IDO</h4>
          <div className="flex gap-4 items-center mb-4">
            <Image
              src="/static/images/tokens/USDC.svg"
              alt="token"
              className="w-8 h-8 rounded-full"
              width={20}
              height={20}
            />
            <div>
              <h4 className="text-white text-base">USDC Offering</h4>
              <p className="text-sm text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text">Finished</p>
            </div>
          </div>
          <div className="flex lg:gap-5 gap-3 box bg-shark-400 bg-opacity-40 2xl:w-[340px] lg:h-auto w-full rounded-lg mb-5 items-center">
            <div>
              <p className="text-shark-100 font-bold text-[12px]">Starting</p>
              <p className="text-green-400 text-[12px]">Time</p>
            </div>
            <div className="flex items-center flex-col">
              <span className="text-white text-xs bg-shark-300 flex items-center p-2 h-[27px] bg-opacity-30  rounded-md">
                05
              </span>
              <p className="text-shark-100 text-sm">Days</p>
            </div>
            <div className="flex items-center flex-col">
              <span className="text-white bg-shark-300 text-xs flex items-center p-2 h-[27px] bg-opacity-30  rounded-md">
                11
              </span>
              <p className="text-shark-100 text-sm">Month</p>
            </div>
            <div className="flex items-center flex-col">
              <span className="text-white bg-shark-300 text-xs flex items-center p-2 h-[27px] bg-opacity-30  rounded-md">
                2024
              </span>
              <p className="text-shark-100 text-sm">Year</p>
            </div>
            <div className="flex items-center flex-col">
              <span className="text-white bg-shark-300 flex text-xs  items-center p-2 h-[27px] bg-opacity-30  rounded-md">
                21:00
              </span>
              <p className="text-shark-100 text-sm">Hours</p>
            </div>
          </div>
          <div className="flex lg:gap-5 gap-3 box bg-shark-400 bg-opacity-40 2xl:w-[340px] lg:h-auto w-full rounded-lg mb-5 items-center">
            <div>
              <p className="text-shark-100 font-bold text-[12px]">End</p>
              <p className="text-red-400 text-[12px]">Time</p>
            </div>
            <div className="flex items-center flex-col">
              <span className="text-white text-xs bg-shark-300 flex items-center p-2 h-[27px] bg-opacity-30  rounded-md">
                05
              </span>
              <p className="text-shark-100 text-sm">Days</p>
            </div>
            <div className="flex items-center flex-col">
              <span className="text-white bg-shark-300 text-xs flex items-center p-2 h-[27px] bg-opacity-30  rounded-md">
                11
              </span>
              <p className="text-shark-100 text-sm">Month</p>
            </div>
            <div className="flex items-center flex-col">
              <span className="text-white bg-shark-300 text-xs flex items-center p-2 h-[27px] bg-opacity-30  rounded-md">
                2024
              </span>
              <p className="text-shark-100 text-sm">Year</p>
            </div>
            <div className="flex items-center flex-col">
              <span className="text-white bg-shark-300 flex text-xs  items-center p-2 h-[27px] bg-opacity-30  rounded-md">
                21:00
              </span>
              <p className="text-shark-100 text-sm">Hours</p>
            </div>
          </div>
          <h4 className="text-lg text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text mb-4 xl:mb-0">60,000 / 60,000 USDC</h4>
        </div>
        <div className="w-full xl:w-1/2">
          <div className="box bg-shark-400 bg-opacity-40 2xl:w-full rounded-lg mb-5 py-5 px-8">
            <div className="relative w-full">
              <div className="flex items-center justify-between w-full mb-2">
                <p className="text-white text-sm">Total Committed</p>
                <p className="text-white text-sm">60,000 USDC</p>
              </div>
              <div className="flex items-center justify-between w-full">
                <p className="text-white text-sm">Price Per veFNX Token</p>
                <p className="text-white text-sm">0.06 USDC</p>
              </div>
            </div>
          </div>
          <div className="box bg-shark-400 bg-opacity-40 2xl:w-full rounded-lg mb-5 py-5 px-8">
            <div className="relative w-full">
              <h4 className="text-white font-medium mb-2">DISTRIBUTION</h4>
              <div className="flex items-center justify-between w-full mb-2">
                <p className="text-white text-sm">veFNX</p>
                <p className="text-white text-sm">250,000</p>
              </div>
              <div className="flex items-center justify-between w-full mb-2">
                <p className="text-white text-sm">veFNX 180 Days</p>
                <p className="text-white text-sm">250,000</p>
              </div>
              <div className="flex items-center justify-between w-full mb-2">
                <p className="text-white text-sm">veFNX 365 Days</p>
                <p className="text-white text-sm">250,000</p>
              </div>
              <div className="flex items-center justify-between w-full">
                <p className="text-white text-sm">veFNX 730 Days</p>
                <p className="text-white text-sm">250,000</p>
              </div>
            </div>
          </div>
          <Button variant="tertiary" className="w-full mb-4">Claim</Button>
          <div className="box bg-shark-400 bg-opacity-40 2xl:w-full rounded-lg mb-5 py-5 px-8">
            <div className="relative w-full">
              <div className="flex items-center justify-between w-full mb-2">
                <p className="text-white text-sm">TOTAL COMMITED</p>
                <p className="text-white text-sm">0 USDC</p>
              </div>
              <div className="flex items-center justify-between w-full mb-2">
                <p className="text-white text-sm">veFNX</p>
                <p className="text-white text-sm">0</p>
              </div>
              <div className="flex items-center justify-between w-full mb-2">
                <p className="text-white text-sm">veFNX 180 Days</p>
                <p className="text-white text-sm">0</p>
              </div>
              <div className="flex items-center justify-between w-full mb-2">
                <p className="text-white text-sm">veFNX 365 Days</p>
                <p className="text-white text-sm">0</p>
              </div>
              <div className="flex items-center justify-between w-full">
                <p className="text-white text-sm">veFNX 730 Days</p>
                <p className="text-white text-sm">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Panel
