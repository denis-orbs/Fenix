'use client'

import { Button } from '@/src/components/UI'
import MainBox from '@/src/components/Common/Boxes/MainBox'
import InfoBox from '../Common/InfoBox'
import { EXCHANGE_LIST } from './data'

const Deposit = () => {
  return (
    <MainBox>
      <div className="flex flex-col items-center justify-between w-full xl:flex-row relative z-10">
        <div className="w-full xl:w-1/2">
          <h4 className="mb-3 text-2xl font-semibold text-white">Vote</h4>
          <p className="mb-4 text-xs text-shark-100 font-normal">
            Voters earn a share of transaction fees and incentives for helping govern how emissions are distributed.
          </p>
          <div className="flex items-center flex-col md:flex-row gap-3">
            <div className="flex gap-2 items-center w-full xl:w-auto">
              <div className="bg-shark-400 p-1 rounded-lg border border-shark-400 border-1 bg-opacity-40">
                <span className="icon-clock p-1 text-lg text-gradient"></span>
              </div>
              <p className="text-white text-xs font-normal whitespace-nowrap">Current voting round</p>
            </div>
            <Button variant="tertiary" className="w-full xl:w-auto">
              <span className="flex text-xs font-normal whitespace-nowrap">Claim Earnings</span>
            </Button>
          </div>
          <p className="flex items-center gap-3 py-2  text-xs text-shark-100">
            <span className="inline-block text-2xl text-transparent icon-circles bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
            There are currently 54 tokens listed.
          </p>
          <div className="text-xs flex gap-2 text-shark-100 xl:mb-0">
            <p className="flex gap-1 cursor-pointer">
              <span className="icon-link"></span>
              View Tokens
            </p>
            <p className="flex gap-1 cursor-pointer">
              <span className="icon-link"></span>
              List New Token
            </p>
          </div>
        </div>
        <div className="relative flex flex-col w-full xl:max-h-[180px] mt-5 xl:mt-0 overflow-y-auto overflow-x-hidden xl:w-[40%]">
          {EXCHANGE_LIST.map((exchange, index) => (
            <InfoBox key={index} data={exchange} hasTooltip={false} />
          ))}
        </div>
      </div>
    </MainBox>
  )
}

export default Deposit
